const express = require("express");
const router = express.Router();

const Sport = require("../../models/Sports");
const SpRecord = require("../../models/SportsRecords");


validateInput = arg => {
    let inputs = Object.keys(arg);

    let empty = inputs.filter(i => {
        return arg[i].length === 0;
    })
    empty.forEach(key => {
        let val = key.charAt(0).toUpperCase() + key.slice(1);
        throw `${val} cannot be empty. Kindly fill in the correct detail. Please note that All fields are required.`;
    });
    let copies = parseInt(arg.copies, 10);
    // TODO: Fix regex below for id validation
    if (/^\d{5}$/.test(arg.goodID) === false)
        throw "ID must be 5 digit number"
    if (isNaN(copies))
        throw "No. of copies must contain digits only";
    if (copies < 0)
        throw "No. of copies must only be positive"

}

router.post("/add", (req, res) => {
    try {
        validateInput(req.body);
    }
    catch (e) {
        res.status(400);
        res.send({ error: true, message: e });
        return;
    }
    Sport.findOne({ goodID: req.body.goodID })
        .then(sport => {
            if (sport) {
                throw "Sport Good with the given id already exists.";
            } else {
                let copy = parseInt(req.body.copies, 10);
                new Sport({ goodID: req.body.goodID, goodType: req.body.goodType.toLowerCase(), copies: copy })
                    .save()
                    .then(() => { return res.status(200).json({ error: false, message: "Good Added." }); })
                    .catch(() => { res.status(400); res.send({ error: true, message: "Unknown error occurred." }) });
            }
        })
        .catch(error => {
            res.status(400);
            res.send({ error: true, message: error });
        });
}
);

router.delete("/delete/:goodID", (req, res) => {
    const deleted = req.params.goodID;
    SpRecord.findOne({  goodID: req.params.goodID })
        .then(record => {
            if (record) {
                throw { error: true, message: "Sorry, This Sport good is owned by some user(s). Cannot deleted it" }
            }
            else {
                Sport.deleteOne({ goodID: deleted })
                    .then(del => {
                        if (del.deletedCount === 0) {
                            throw { error: true, message: "No such Sport good exists in the record." };
                        }
                        else {
                            res.status(200)
                            res.send({ error: false, message: "Sport good record has been removed successfully." })
                        }
                    })
                    .catch(err => res.status(400).send(err));
            }
        })
});

router.get("/find/:id", (req, res) => {
    const sportID = req.params.id;
    Sport.find({ goodID: sportID })
        .then(data => {
            if(data.length > 0)
                res.status(200).send(data)
            else
                throw {error: true, message: "No such item exists in the record"}
        })
        .catch(err => res.status(400).send(err));
});

module.exports = router;
