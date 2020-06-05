const express = require("express")
router = express.Router();

const sportRecord = require("../../models/sportRecords")
const Sport = require("../../models/Sports")
const Student = require("../../models/Students")
const borrowNotifier = require("../api/mailer").borrow;
const manualNotifier = require("../api/mailer").manual;

validateLoanForm = arg => {
    let inputs = Object.keys(arg);
    let empty = inputs.filter(i => {
        return arg[i].length === 0;
    });
    empty.forEach(key => {
        let val = key.charAt(0).toUpperCase() + key.slice(1);
        throw `${val} cannot be empty. Kindly fill in the correct detail. Please note that All fields are required.`;
    });
    // TODO: Fix regex below for id validation
    if (/^\d{13}$/.test(arg.good_id) === false)
        throw "ID must be type integer"
    let d1 = new Date(arg.bdate), d2 = new Date(arg.rdate), curDate = new Date();

    if (d2 < d1)
        throw "Due date must be greater than Loaning Date."
    if (!(d1.getFullYear() === curDate.getFullYear() && d1.getMonth() === curDate.getMonth() && d1.getDate() === curDate.getDate()))
        throw "Please enter today's date."
    if (((d2 - d1) / (3600 * 1000 * 24)) > 14)
        throw "Sport goods cannot be loaned for more than 14 days.";
}
initDate = (bDate, rDate) => {
    let zone = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" });
    let oldDate = new Date(zone + " UTC");
    let bdate = new Date(bDate);
    let rdate = new Date(rDate);

    bdate.setHours(oldDate.getHours());
    bdate.setMinutes(oldDate.getMinutes());
    bdate.setSeconds(oldDate.getSeconds());

    rdate.setHours(23);
    rdate.setMinutes(59);
    rdate.setSeconds(59)

    return { bdate, rdate };
}

router.get("/findsportRecord/:good_id", (req, res) => {
    Sport.findOne({ good_id: req.params.good_id })
        .then(sportData => {
            if (!sportData)
                throw "No such sport good exists in the records."
            sportRecord.aggregate([{ $match: { sports: { $elemMatch: { good_id: req.params.good_id } } } },
            {
                $project: {
                    _id: 0, id: 1,
                    sports: { $filter: { input: "$sports", as: "b", cond: { $eq: ["$$b.good_id", req.params.good_id] } } }
                }
            }
            ])
                .then(sportrecords => {
                    let ans = {};
                    ans.totalAssignment = `This good has been assigned to ${sportrecords.length} individual(s)`;
                    sportrecords.forEach(sportrecord => {
                        ans[sportrecord.id] = {
                            'Loaning Date': sportrecord.sports[0].bdate,
                            'Return Date': sportrecord.sports[0].rdate
                        };
                    });
                    ans.error = false;;
                    ans.sportInfo = sportData;
                    res.status(200);
                    res.send(ans)
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            res.status(400);
            res.send({ error: true, message: err });
        });
});

router.put("/loanSport", (req, res) => {
    try {
        validateLoanForm(req.body)
    }
    catch (e) {
        res.status(400);
        res.send({ error: true, message: e });
        return;
    }
    Student.findOne({ id: req.body.id })// Find the student with the given ID
        .then(student => {
            if (!student) {  // If no such student exists, return an error.
                res.status(400);
                res.send({ error: true, message: "No such student exists" });

            } else if (student.surcharge >= 300) {  //If student exists but surcharge exceeds, throw an error.
                res.status(400);
                res.send({ error: true, message: "Surcharge amount exceeds PKR 299/-. Please pay the amount to loan further goods." });
            }
            else {
                Sport.findOne({ good_id: req.body.good_id })
                    .then(sportData => { // See if the good exists in the database.
                        if (!sportData) {  //It doesn't exist
                            res.status(400);;
                            res.send({ error: true, message: "No such good exists." });
                        } else {  //Good exists. Check for its number of copies.
                            const copies = goodData.copies;
                            if (copies === 0) {  //No copies available. Throw an error.
                                res.status(400)
                                res.send({ error: true, message: "All copies have been loaned for the moment." });
                            }
                            else {  // Find the student in the record
                                sportRecord.findOne({ id: req.body.id })
                                    .then(sportrecord => {
                                        let ans = {}
                                        let isAddable = true;  //Flag variable. will be set to false in case if any test fails.
                                        if (sportrecord) {  //If the student is present in the record already,
                                            // console.log(record)  //printing for debug purposes.
                                            sportrecord.sports.forEach(item => {
                                                if (item.good_id === req.body.good_id) {
                                                    isAddable = false;
                                                    ans.error = true;
                                                    ans.message = "User already has this good."
                                                }
                                            })
                                            if (sportrecord.sports.length >= 3) {  //If the student possess more than 3 goods already,
                                                isAddable = false;
                                                ans.error = true;
                                                ans.message = "User has already loaned 3 goods. Maximum loan limit is - 3 sport goods per person"
                                            }
                                        }
                                        if (isAddable) {  //See if its addable. Find the id of the student and append the good to the borrowed list.
                                            const dates = initDate(req.body.bdate, req.body.rdate);
                                            sportRecord.findOneAndUpdate({ id: req.body.id },
                                                {
                                                    $push: {
                                                        "sports": {
                                                            "good_id": req.body.good_id,
                                                            "bdate": dates.bdate,
                                                            "rdate": dates.rdate
                                                        }
                                                    }
                                                },
                                                { upsert: true, useFindAndModify: false })  //Add the student record if none exists before it.
                                                .then(() => {
                                                    borrowNotifier(req.body.id, sportData, dates.bdate.toString(), dates.rdate.toString());
                                                    Sport.updateOne({ good_id: req.body.good_id }, { $inc: { copies: -1 } })
                                                        .then(() => {  // Good assigned. Send the success response
                                                            return res.status(200).json({
                                                                error: false,
                                                                message: `Good assigned to student ${req.body.id}. You will receive an email
                                                            confirmation soon.`,
                                                            });
                                                        })
                                                        .catch(err => console.log(err));
                                                })
                                                .catch(err => console.log(err))
                                        }
                                        else {  //send the error.
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

router.post("/returnSport", (req, res) => {
    Student.findOne({ id: req.body.id })
        .then(student => {
            if (!student) {
                res.status(400);
                res.send({ error: true, message: 'No such student exists' });
            }
            else if (student.surcharge > 0) {
                res.status(200);
                res.send({ error: true, message: `Sorry, You have RS ${student.surcharge}/- due. Please pay before returning the good.` });
            }
            else {
                sportRecord.updateOne({ id: req.body.id }, { $pull: { sports: { good_id: req.body.good_id } } })
                    .then(toBeMod => {
                        if (toBeMod) {
                            if (toBeMod.nModified === 1) {
                                Sport.updateOne({ good_id: req.body.good_id }, { $inc: { copies: 1 } })
                                    .then(() => {
                                        return res.status(200).json({ error: false, message: 'Good Returned. Thank you!' })
                                    })
                                    .catch();
                            }
                            else {
                                res.status(400);
                                res.send({ message: "User has not loaned this good. Return Failed" })
                            }
                        }
                        else {
                            res.status(400);
                            res.send({ error: true, message: "Error, No such good is owned by user." });
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
});

router.post("/sendsportReminder", (req, res) => {
    sportRecord.findOne({ id: req.body.id })
        .then(sportrecord => {
            if (!sportrecord) {
                res.status(400);
                res.send({ error: true, message: "No record exists against the given ID." });
            }
            else {
                Student.findOne({ id: req.body.id }, { _id: 0, id: 0 })
                    .then(student => {
                        let sent = manualNotifier(sportrecord.id, sportrecord.sports, student.fname + " " + student.lname, student.surcharge);
                        if (sent)
                            return res.status(200).json({ error: false, message: `Mail Recipient Name: ${student.fname + " " + student.lname}.\nNotification Sent Successfully` });
                        else {
                            res.status(400)
                            res.send({ error: true, message: `Mail Could not be sent. Sorry` });
                        }
                    })
                    .catch(() => {
                        res.status(400);
                        res.send({ error: true, message: "Error while searching Student Record." });
                    });
            }
        })
        .catch(err => {
            res.status(400);
            res.send({ error: true, message: "Error while searching student Record." })
        });
});

module.exports = router;
