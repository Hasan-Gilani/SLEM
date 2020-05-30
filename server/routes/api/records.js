const express = require("express")
router = express.Router();

const Record = require("../../models/Records")
const Book = require("../../models/Books")
const Student = require("../../models/Students")

function initDate(bDate, rDate){
    let zone = new Date().toLocaleString("en-US", {timeZone: "Asia/Karachi"});
    let oldDate = new Date(zone + " UTC");
    let bdate = new Date(bDate);
    let rdate = new Date(rDate);

    bdate.setHours(oldDate.getHours());
    bdate.setMinutes(oldDate.getMinutes());
    bdate.setSeconds(oldDate.getSeconds());

    rdate.setHours(oldDate.getHours());
    rdate.setMinutes(oldDate.getMinutes());
    rdate.setSeconds(oldDate.getSeconds());

    return {bdate, rdate};
}


router.put("/loanBook", (req, res) => {
    Student.findOne({id: req.body.id})// Find the student with the given ID
        .then(student => {
        if(!student){  // If no such student exists, return an error.
            return res.status(404).json({error: true, message: "No such student exists"});
        } else if(student.surcharge >= 300){  //If student exists but surcharge exceeds, throw an error.
            return res.status(403).json({error: true, message: "Surcharge amount exceeds PKR 299/-. " +
                    "Please pay the amount to loan further books."});
        }
        else{
            Book.findOne({isbn: req.body.isbn})
                .then(bookData => { // See if the book exists in the database.
                    if(!bookData){  //It doesn't exist
                        return res.status(404).json({error: true, message: "No such book exists."} );
                    } else{  //Book exists. Check for its number of copies.
                        const copies = parseInt(bookData.copies, 10);
                        if(copies === 0){  //No copies available. Throw an error.
                            return res.status(403).json({error: true, message: "All copies have been loaned for the moment."});
                        }
                        else{  // Find the student in the record
                            Record.findOne({id: req.body.id})
                                .then(record => {
                                    let ans = {}
                                    let isAddable = true  //Flag variable. will be set to false in case if any test fails.
                                    if(record){  //If the student is present in the record already,
                                        console.log(record)  //printing for debug purposes.
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
                                            .then(ans => {
                                                let newCopies = (copies - 1).toString(10)  //Reduce the count of copies by 1.
                                                // console.log(newCopies)
                                                Book.updateOne({isbn: req.body.isbn}, {$set: {"copies": newCopies}})
                                                    .then(ans => {  // Book assigned. Send the success response
                                                        return res.status(200).json({
                                                            error: false,
                                                            message: `Book assigned to student ${req.body.id}`
                                                        });
                                                    })
                                                    .catch(err => console.log(err))
                                            })
                                            .catch(err => console.log(err))
                                    }
                                    else{  //send the error.
                                        return res.status(403).json(ans); //send error.
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

module.exports = router;
