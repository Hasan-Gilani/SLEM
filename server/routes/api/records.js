const express = require("express")
router = express.Router();

const Record = require("../../models/Records")
const Book = require("../../models/Books")
const Student = require("../../models/Students")
const borrowNotifier = require("../api/mailer").borrow;
const manualNotifier = require("../api/mailer").manual;
const returnNotifier = require("../api/mailer").return;

validateLoanForm = arg => {
    let inputs = Object.keys(arg);
    let empty = inputs.filter(i => {
        return arg[i].length === 0;
    });
    empty.forEach(key => {
        let val = key.charAt(0).toUpperCase() + key.slice(1);
        throw `${val} cannot be empty. Kindly fill in the correct detail. Please note that All fields are required.`;
    });
    if(/^\d{13}$/.test(arg.isbn) === false)
        throw "ISBN must consist of exactly 13 digits"
    let d1 = new Date(arg.bdate), d2 =  new Date(arg.rdate), curDate = new Date();

    if(d2 < d1)
        throw "Due date must be greater than Loaning Date."
    if(( Math.floor((curDate - d1)/(3600 * 24 * 1000)) < -1 )){
        console.log(curDate, d1);
        console.log(( Math.floor((curDate - d1)/(3600 * 24 * 1000))));
        throw "Please enter today's date.";
    }

    if(((d2 - d1)/(3600*1000*24)) > 14)
        throw "Book cannot be loaned for more than 14 days.";
}
initDate = (bDate, rDate) => {
    let zone = new Date().toLocaleString("en-US", {timeZone: "Asia/Karachi"});
    let oldDate = new Date(zone + " UTC");
    let bdate = new Date(bDate);
    let rdate = new Date(rDate);

    bdate.setHours(oldDate.getHours());
    bdate.setMinutes(oldDate.getMinutes());
    bdate.setSeconds(oldDate.getSeconds());

    rdate.setHours(23);
    rdate.setMinutes(59);
    rdate.setSeconds(59);

    return {bdate, rdate};
}

router.get("/findRecord/:isbn", (req, res) => {
    Book.findOne({isbn: req.params.isbn})
        .then(bookData => {
            if(!bookData)
                throw "No such book exists in the records."
            Record.aggregate([{$match: { books: {$elemMatch: {isbn: req.params.isbn}}}},
                {$project: {_id: 0, id: 1,
                        books: {$filter: {input: "$books", as: "b", cond: {$eq: ["$$b.isbn", req.params.isbn]}}}}}
            ])
                .then(records => {
                    let ans = {};
                    ans.totalAssignment = `This book has been assigned to ${records.length} individual(s)`;
                    records.forEach(record => {
                        ans[record.id] = {
                            'Loaning Date': record.books[0].bdate,
                            'Return Date': record.books[0].rdate
                        };
                    });
                    ans.error = false;;
                    ans.bookInfo = bookData;
                    res.status(200);
                    res.send(ans)
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            res.status(400);
            res.send({error: true, message: err});
        });
});

router.put("/loanBook", (req, res) => {
    try {
        validateLoanForm(req.body)
    }
    catch (e) {
        res.status(400);
        res.send({error: true, message: e});
        return;
    }
    Student.findOne({id: req.body.id})// Find the student with the given ID
        .then(student => {
        if(!student){  // If no such student exists, return an error.
            res.status(400);
            res.send({error: true, message: "No such student exists"});

        } else if(student.surcharge >= 300){  //If student exists but surcharge exceeds, throw an error.
            res.status(400);
            res.send({error: true, message: "Surcharge amount exceeds PKR 299/-. Please pay the amount to loan further books."});
        }
        else{
            Book.findOne({isbn: req.body.isbn})
                .then(bookData => { // See if the book exists in the database.
                    if(!bookData){  //It doesn't exist
                        res.status(400);;
                        res.send({error: true, message: "No such book exists."} );
                    } else{  //Book exists. Check for its number of copies.
                        const copies = bookData.copies;
                        if(copies === 0){  //No copies available. Throw an error.
                            res.status(400)
                            res.send({error: true, message: "All copies have been loaned for the moment."});
                        }
                        else{  // Find the student in the record
                            Record.findOne({id: req.body.id})
                                .then(record => {
                                    let ans = {}
                                    let isAddable = true;  //Flag variable. will be set to false in case if any test fails.
                                    if(record){  //If the student is present in the record already,
                                        // console.log(record)  //printing for debug purposes.
                                        record.books.forEach(item => {
                                            if(item.isbn === req.body.isbn){
                                                isAddable = false;
                                                ans.error = true;
                                                ans.message = "User already has this book."
                                            }
                                        })
                                        if (record.books.length >= 3) {  //If the student possess more than 3 books already,
                                            isAddable = false;
                                            ans.error = true;
                                            ans.message = "User has already loaned 3 books. Maximum loan limit is - 3 Books per person"
                                        }
                                    }
                                    if(isAddable){  //See if its addable. Find the id of the student and append the book to the borrowed list.
                                        const dates = initDate(req.body.bdate, req.body.rdate);
                                        Record.findOneAndUpdate({id: req.body.id},
                                            {$push: {"books": {
                                                        "isbn": req.body.isbn,
                                                        "bdate": dates.bdate,
                                                        "rdate": dates.rdate
                                                    }}},
                                            {upsert: true, useFindAndModify: false})  //Add the student record if none exists before it.
                                            .then(() => {
                                                Book.updateOne({isbn: req.body.isbn}, {$inc: {copies: -1}})
                                                    .then(() => {  // Book assigned. Send the success response
                                                        let promise = borrowNotifier(req.body.id, bookData, dates.bdate.toString(), dates.rdate.toString());
                                                        promise.
                                                            then(ans =>{
                                                                if(!ans){
                                                                    throw {
                                                                        error: true,
                                                                        message: `Book assigned to ${req.body.id}, but error sending notification. Please manually check records to confirm`};
                                                                        }
                                                                else{
                                                                    return res.status(200).json({
                                                                        error: false,
                                                                        message: `Book assigned to student ${req.body.id}. You will receive an email
                                                                        confirmation soon.`
                                                                    })
                                                                }
                                                            })
                                                            .catch(err => {
                                                                res.status(400)
                                                                res.send(err);
                                                            })

                                                        })
                                                    .catch(err => {
                                                        res.status(400);
                                                        res.send(err);
                                                    });
                                            })
                                            .catch(err => console.log(err));
                                    }
                                    else{  //send the error.
                                        res.status(400)
                                        res.send(ans);//send error.
                                        // console.log("")
                                    }
                                })
                                .catch(err => console.log(err));
                        }
                    }
                }).catch(err => console.log(err));
        }
    })
        .catch(err => console.log(err))
});

router.post("/returnBook", (req, res) => {
    Student.findOne({id: req.body.id})
        .then(student => {
            if(!student){
                res.status(400);
                res.send({error: true, message: 'No such student exists'});
            }
            else if(student.surcharge > 0){
                res.status(400);
                res.send({error: true, surcharge: student.surcharge,message: `Sorry, You have RS ${student.surcharge}/- due. Please pay before returning the book.`});
            }
            else {
                Record.updateOne({id: req.body.id}, {$pull: {books: {isbn: req.body.isbn}}})
                    .then(toBeMod => {
                        if(toBeMod){
                            if(toBeMod.nModified === 1){
                                Book.findOneAndUpdate({isbn: req.body.isbn}, { $inc: {copies: 1}}, {useFindAndModify: false})
                                    .then( (updated) => {
                                        let promise = returnNotifier(req.body.id, updated)
                                        promise
                                            .then(ans => {
                                                if(ans){
                                                    return res.status(200).json({error: false, message: 'Book Returned. You will receive a confirmation email soon. Thank you!'});
                                                }
                                                else{
                                                    throw {error: true, message: "Book returned but mail could not be sent"};
                                                }
                                            })
                                            .catch(err => {
                                                res.status(400).send(err);
                                            })
                                        })
                                    .catch(err => {
                                        res.status(400);
                                        res.send(err);
                                    });
                            }
                            else{
                                res.status(400);
                                res.send({ error: true,message: "User has not loaned this book. Return Failed"})
                            }
                        }
                        else{
                            res.status(400);
                            res.send({error: true, message: "Error, No such book is owned by user."});
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
});

router.post("/sendReminder", (req, res) => {
    Record.findOne({id: req.body.id})
        .then(record => {
            if(!record){
                res.status(400);
                res.send({error: true, message: "No record exists against the given ID."});
            }
            else{
                Student.findOne({id: req.body.id}, {_id: 0, id: 0})
                    .then(student => {
                        let isSent = manualNotifier(record.id, record.books, student.fname + " " + student.lname, student.surcharge);
                        isSent
                            .then(ans => {
                                if(!ans){
                                    throw {error: true, message: `Mail Could not be sent. Sorry`}
                                }
                                else {
                                    return res.status(200).json({error: false, message: `Mail Recipient Name: ${student.fname + " " + student.lname}.\nNotification Sent Successfully`});
                                }
                            })
                            .catch(err => {
                                res.status(400)
                                res.send(err);
                            })
                    })
                    .catch(() => {
                        res.status(400);
                        res.send({error: true, message: "Error while searching Student Record."});
                    });
            }
        })
        .catch(err => {
            res.status(400);
            res.send({error: true, message: "Error while searching student Record."})});
});

module.exports = router;
