const express = require("express")
router = express.Router();

const SpRecord = require("../../models/SportsRecords")
const Sport = require("../../models/Sports")
const Student = require("../../models/Students")
const borrowNotifier = require("../api/mailer").sportBorrow;
const returnNotifier = require("../api/mailer").sportsReturn
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
    if (/^\d{5}$/.test(arg.goodID) === false)
        throw "ID must be a number of 5 digits"
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

router.get("/find/:goodID", (req, res) => {
    Sport.findOne({ goodID: req.params.goodID })
        .then(sportData => {
            if (!sportData)
                throw "No such sport good exists in the records."
            SpRecord.aggregate([{ $match: { goods: { $elemMatch: { goodID: req.params.goodID } } } },
            {
                $project: {
                    _id: 0, id: 1,
                    goods: { $filter: { input: "$goods", as: "g", cond: { $eq: ["$$g.goodID", req.params.goodID] } } }
                }
            }
            ])
                .then(records => {

                    let ans = {};
                    ans.totalAssignment = `This good has been assigned to ${records.length} individual(s)`;
                    records.forEach(record => {
                        ans[record.id] = {
                            'Loaning Date': record.goods[0].bdate,
                            'Return Date': record.goods[0].rdate
                        };
                    });
                    ans.error = false;
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

router.put("/loan", (req, res) => {
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
                throw {error: true, message: "No such student exists"}
            } else if (student.surcharge >= 300) {  //If student exists but surcharge exceeds, throw an error.
                throw { error: true, message: "Surcharge amount exceeds PKR 299/-. Please pay the amount to loan further goods." }
            }
            else {
                Sport.findOne({ goodID: req.body.goodID })
                    .then(sportData => { // See if the good exists in the database.
                        if (!sportData) {  //It doesn't exist
                            throw { error: true, message: "No such good exists." }
                        }
                        else {  //Good exists. Check for its number of copies.
                            const copies = sportData.copies;
                            if (copies === 0) {  //No copies available. Throw an error.
                                throw { error: true, message: "All items have been loaned for the moment." }
                            }

                            else {  // Find the student in the record
                                SpRecord.findOne({ id: req.body.id })
                                    .then(record => {

                                        if (record) {  //If the student is present in the record already,
                                            record.goods.forEach(item => {
                                                if (item.goodID === req.body.goodID) {
                                                    throw {error: true, message: "user already has this good"}
                                                }})

                                            if (record.goods.length >= 3) {  //If the student possess more than 3 goods already,
                                                throw {error: true,
                                                    message: "User has already loaned 3 goods. Maximum loan limit is - 3 sport goods per person"}
                                            }
                                        }
                                        const dates = initDate(req.body.bdate, req.body.rdate);
                                        SpRecord.findOneAndUpdate({ id: req.body.id },
                                            {
                                                $push: {
                                                    "goods": {
                                                        "goodID": req.body.goodID,
                                                        "bdate": dates.bdate,
                                                        "rdate": dates.rdate
                                                    }
                                                }
                                            },
                                            { upsert: true, useFindAndModify: false })  //Add the student record if none exists before it.
                                            .then(() => {
                                                Sport.updateOne({ goodID: req.body.goodID }, { $inc: { copies: -1 } })
                                                    .then(() => {  // Good assigned. Send the success response
                                                        let promise = borrowNotifier(req.body.id, sportData, dates.bdate.toString(), dates.rdate.toString())
                                                        promise
                                                            .then(ans => {
                                                                if(!ans){
                                                                    throw {
                                                                        error: true,
                                                                        message: `Good assigned to ${req.body.id}, but error sending notification. Please manually check records to confirm`};
                                                                    }
                                                                else{
                                                                    res.status(200)
                                                                    res.send({error: false, message: `Good Assigned to ${req.body.id}. You'll receive an email confirmation soon.`});
                                                                }

                                                            })
                                                            .catch(err => {res.status(400).send(err)});
                                                    })
                                                    .catch(err => console.log(err));
                                            })
                                            .catch(err => console.log(err))
                                    })
                                    .catch(err => res.status(400).send(err));
                                }
                            }
                        })
                        .catch(err => res.status(400).send(err));
                }
            })
            .catch(err => res.status(400).send(err));
});

router.post("/return", (req, res) => {
    Student.findOne({ id: req.body.id })
        .then(student => {

            if (!student) {
                throw { error: true, message: 'No such student exists' }
            }

            else if (student.surcharge > 0) {
                throw { error: true, message: `Sorry, You have RS ${student.surcharge}/- due. Please pay before returning the good.`,
                        surcharge: student.surcharge}
            }

            else {
                SpRecord.updateOne({ id: req.body.id }, { $pull: { goods: { goodID: req.body.goodID } } })
                    .then(toBeMod => {
                        if (toBeMod) {
                            if (toBeMod.nModified === 1) {
                                Sport.findOneAndUpdate({ goodID: req.body.goodID }, { $inc: { copies: 1 } }, {useFindAndModify: false})
                                    .then((updated) => {
                                        console.log(updated);
                                        let promise = returnNotifier(req.body.id, updated)
                                            promise
                                            .then(ans => {
                                                if(!ans)
                                                    throw {error: true, message: "Good returned but email could not be sent."}
                                                else{
                                                    res.status(200).send({error: false, message: "Good Returned. You will receive a confirmation mail shortly."})
                                                }
                                            })
                                            .catch(err => res.status(400).send(err))

                                    })
                                    .catch(err => console.log(err));
                            }
                            else {
                                throw { error: true, message: "User has not loaned this good. Return Failed" }
                            }
                        }
                        else {
                            throw { error: true, message: "Error, No such good is owned by user."}
                        }
                    })
                    .catch(err => res.status(400).send(err));
                }
        })
        .catch(err => { res.status(400).send(err);})
});

router.post("/sendsportReminder", (req, res) => {
    SpRecord.findOne({ goodID: req.body.goodID })
        .then(record => {
            if (!record) {
                throw { error: true, message: "No record exists against the given ID." }
            }
            else {
                Student.findOne({ goodID: req.body.goodID }, { _id: 0, goodID: 0 })
                    .then(student => {
                        // let sent = manualNotifier(record.goodID, record.sports, student.fname + " " + student.lname, student.surcharge);
                        // if (sent)
                        //     return res.status(200).json({ error: false, message: `Mail Recipient Name: ${student.fname + " " + student.lname}.\nNotification Sent Successfully` });
                        // else {
                        //     res.status(400)
                        //     res.send({ error: true, message: `Mail Could not be sent. Sorry` });
                        // }
                    })
                    .catch(() => {
                        res.status(400);
                        res.send({ error: true, message: "Error while searching Student Record." });
                    });
            }
        })
        .catch(err => {res.status(400).send(err);});
});

module.exports = router;
