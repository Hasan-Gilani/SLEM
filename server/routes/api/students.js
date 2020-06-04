const express = require("express");
const router = express.Router();

const Student = require("../../models/Students");
const Record = require("../../models/Records");
const Book = require("../../models/Books");
const regNote = require("../api/mailer").register

router.get("/find/:id", (req, res) => {
    Student.findOne( {id:req.params.id})
        .then(student => {
            if(student) {
                let ans = {};
                Record.findOne({id: req.params.id})

                    .then(record => {
                        if(record) {
                            let isbns = record.books.map(elem => elem.isbn);
                            Book.find({isbn: {$in: isbns}})
                                .then(books => {
                                    let i = 0;
                                    books.forEach(book => {
                                        record.books[i].title = book.title;
                                        record.books[i].subject = book.subject;
                                        record.books[i].bdate = record.books[i].bdate.toString().split(" GMT")[0];
                                        record.books[i].rdate = record.books[i].rdate.toString().split(" GMT")[0];
                                        ++i;
                                    })
                                    ans.record = record;

                                    res.status(200);
                                    res.send(ans);
                                })
                                .catch(err => console.log(err));
                        }
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
    Student.findOne({id: req.body.id}).then(student => {
        if(student){
            throw {error: true, message: 'Student already exists in the record.'};
        }
        else{
            let password = Math.floor(Math.random() * 1000000000);
            let mailSent = regNote(req.body.id, password,req.body.fname, req.body.lname)
            mailSent
                .then(sent => {
                    if(sent){
                        new Student({
                            fname: req.body.fname,
                            lname: req.body.lname,
                            id: req.body.id,
                            password: password
                        })
                            .save()
                            .then( () => {
                                res.status(200).send({error: false, message:`Email sent to ${req.body.fname} ${req.body.lname}. Student Registered.`})
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).send({
                                    error: true,
                                    message: 'Could not save student data. Unknown Error Occurred. Please try again.'
                                })
                            });
                    }
                    else{
                        throw {error: true, message: "Sorry, the credentials could not be mailed due to some issue. Student cannot be registerd"};
                    }
                })
                .catch(error => res.status(400).send(error));
        }
    })
        .catch(error => res.status(400).send(error));
});

router.post("/login", (req, res) => {
    Student.findOne({id: req.body.id, password: req.body.password})
        .then(student => {
            if(!student){
                throw {error: true, message: "Sorry, Invalid ID or Password."}
            }
            else{
                return res.status(200).send(student);
            }
        })
        .catch(err => res.status(400).send(err));
})

router.delete("/removeStudent/:id", (req, res) => {
    Student.findOne({id: req.params.id})
        .then(student => {
            if(!student)
                throw {error: true, message: "Student does not exists in the record"}
            else {
                Record.findOne({id: req.params.id})
                    .then(record => {
                        if(record)
                            throw {error: true, message: "Student has loaned some items before. Cannot remove from record until loaned items returned."}
                        else{
                            Student.deleteOne({id: req.params.id})
                                .then(info => {
                                    if(info.deletedCount === 1){
                                        return res.status(200).send({error: false, message: "student removed from record"});
                                    }
                                    else{
                                        throw {error: true, message: "No such student exists in our record"};
                                    }
                                })
                                .catch(err => res.status(400).send(err));
                        }
                    })
                    .catch(err => res.status(400).send(err));
            }
        })
        .catch(err => res.status(400).send(err));
})

module.exports = router;
