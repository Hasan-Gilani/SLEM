const express = require("express");
const router = express.Router();

const Book = require("../../models/Books");
const Record = require("../../models/Records");
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
    if(/^\d{13}$/.test(arg.isbn) === false)
        throw "ISBN must consist of exactly 13 digits"
    if(isNaN(copies))
        throw "No. of copies must contain digits only";
    if(copies < 0)
        throw "No. of copies must only be positive"

}

router.post("/Addbook", (req, res) => {
    try{
        validateInput(req.body);
    }
    catch (e) {
        res.status(400);
        res.send({error: true, message: e});
        return;
    }
  Book.findOne({isbn: req.body.isbn})
      .then(book => {
      if(book){
          throw "Book with the given ISBN already exists.";
      }else{
          let copy = parseInt(req.body.copies, 10);
          new Book({ isbn: req.body.isbn, title: req.body.title, subject: req.body.subject, copies: copy})
              .save()
              .then( () => { return res.status(200).json({error: false, message: "Book Added."});})
              .catch(() => { res.status(400); res.send({error: true, message: "Unknown error occurred."})});
      }
  })
      .catch(error => {
          res.status(400);
          res.send({error: true, message: error});
      });
    }
);

router.delete("/deleteBook/:isbn", (req, res) => {
    const deleted = req.params.isbn;
    Record.findOne({isbn: req.params.isbn})
        .then(record => {
            if(record){
                res.status(400);
                res.send({error: true, message: "Sorry, This book is owned by some user(s). Cannot deleted it"});
            }
            else{
                Book.deleteOne({isbn: deleted})
                    .then(del => {
                        if(del.deletedCount === 0){
                            res.status(400)
                            res.send({error: true, message: "No such book exists in the record."});
                        }
                        else{
                            res.status(200)
                            res.send({error: false, message: "Book record has been removed successfully."})
                        }
                    })
                    .catch(err => console.log(err));;
            }
        })
});

router.get("/findbook/:id", (req, res) => {
   const book_id = req.params.id;
   Book.find( {isbn: book_id} )
       .then( data => {
           res.send(data)
       })
       .catch(err => console.log(err))
});

module.exports = router;
