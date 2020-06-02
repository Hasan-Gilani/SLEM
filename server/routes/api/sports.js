const express = require("express");
const router = express.Router();

const Sport = require("../../models/Sports");
const sportRecord = require("../../models/sportRecords");
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
    if (/^\d{13}$/.test(arg.good_id) === false)
        throw "ID must be type integer"
    if (isNaN(copies))
        throw "No. of copies must contain digits only";
    if (copies < 0)
        throw "No. of copies must only be positive"

}

router.post("/Addsport", (req, res) => {
    try {
        validateInput(req.body);
    }
    catch (e) {
        res.status(400);
        res.send({ error: true, message: e });
        return;
    }
    Sport.findOne({ good_id: req.body.good_id })
        .then(sport => {
            if (sport) {
                throw "Sport Good with the given id already exists.";
            } else {
                let copy = parseInt(req.body.copies, 10);
                new Sport({ good_id: req.body.good_id, good_type: req.body.good_type, copies: copy })
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

router.delete("/deleteSport/:good_id", (req, res) => {
    const deleted = req.params.good_id;
    sportRecord.findOne({ isbn: req.params.good_id })
        .then(sportrecord => {
            if (sportrecord) {
                res.status(400);
                res.send({ error: true, message: "Sorry, This Sport good is owned by some user(s). Cannot deleted it" });
            }
            else {
                Sport.deleteOne({ good_id: deleted })
                    .then(del => {
                        if (del.deletedCount === 0) {
                            res.status(400)
                            res.send({ error: true, message: "No such Sport good exists in the record." });
                        }
                        else {
                            res.status(200)
                            res.send({ error: false, message: "Sport good record has been removed successfully." })
                        }
                    })
                    .catch(err => console.log(err));;
            }
        })
});

router.get("/findsport/:id", (req, res) => {
    const sport_id = req.params.id;
    Sport.find({ good_id: sport_id })
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
});

module.exports = router;
