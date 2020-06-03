const express = require("express");
const router = express.Router();

const Students = require("../../models/Students");
const Record = require("../../models/Records");

router.get("/find/:id", (req, res) => {
    Students.findOne( {id:req.params.id})
        .then(student => {
            if(student) {
                let ans = {};
                Record.findOne({id: req.params.id})
                    .then(record => {
                        if(record) {
                            ans.record = record;
                        }
                        res.send(ans);
                        res.status(200);
                    })
                    .catch(err => console.log(err));
                }
            else{
                throw {error: true, message: "No such student exists in records"};
            }
            })
        .catch(err => {
            res.status(400);;
            res.send(err);
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
