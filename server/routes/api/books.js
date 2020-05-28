const express = require("express");
const router = express.Router();

const Book = require("../../models/Books");
const User = require("../../models/User")
router.post("/Addbook", (req, res) => {
  Book.findOne({isbn: req.body.isbn}).then(book => {
      if(book){
          return res.status(400).json({ msg: "Book already exists"})
      }else{
          new Book({
              isbn: req.body.isbn,
              title: req.body.title,
              author: req.body.author
          })
              .save()
              .then(res => console.log(``))
              .catch(err => console.log(err));
      }
  })
    }
);

router.delete("/delbook/:id", (req, res) => {
    const deleted = req.params.id;
    Book.deleteOne({isbn: deleted})
        .then(res => console.log("deleted"))
        .catch(err => console.log(err))
});

router.get("/findbook/:id", (req, res) => {
   const book_id = req.params.id;
   Book.find( {isbn: book_id} )
       .then( data => {res.send(data)})
       .catch(err => console.log(err))
});

module.exports = router;
