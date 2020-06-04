const express = require("express");
const router = express.Router();

const Students = require("../../models/Students");
const Record = require("../../models/Records");
const Book = require("../../models/Books");

router.get("/find/:id", (req, res) => {
    Students.findOne( {id:req.params.id})
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
