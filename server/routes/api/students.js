const express = require("express");
const router = express.Router();

const Students = require("../../models/Students");

router.post("/find", (req, res) => {
    Students.findOne( {id:req.body.id})
        .then(student => {
            return res.status(200).json(student);
        })
        .catch(err => {
            return res.status(400).json({StudentNotFound: "Error. No such ID exists."});
        })

});

router.post("/add", (req, res) => {
    Students.findOne({id: req.body.id}).then(student => {
        if(student){
            res.status(406).json({StudentFound: "Error. Students already exists."});
        }
        else{
            new Students({
                fname: req.body.fname,
                lname: req.body.lname,
                id: req.body.id
            })
                .save()
                .then(dummy => {
                    res.status(200).json({StudentAdded: "Students Record Added."});
                })
                .catch(err => console.log(err))
        }
    })
});

module.exports = router;
