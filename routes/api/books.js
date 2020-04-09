const express = require("express");
const router = express.Router();

const Book = require("../../models/Books");

router.post("/Addbook", (req, res) => {
  Book.findOne({isbn: req.body.isbn}).then(book => {
      if(book){
          return res.status(400).json({ msg: "Book already exists"})
      }else{
          const newBook = new Book({
              isbn: req.body.isbn,
              name: req.body.name,
              author: req.body.author,
              subject: req.body.subject
          })
              .save()
              .then(res => console.log(``))
              .catch(err => console.log(err));
      }
  })
}
);

router.delete("/delbook/:id", (req, res) => {
    const delled = req.params.id;
    Book.deleteOne({isbn: delled})
        .then(res => console.log("deleted"))
        .catch(err => console.log(err))
});

router.get("/findbook/:id", (req, res) => {
   const fbook = req.params.id;
   Book.find( {isbn: fbook} )
       .then( data => {res.send(data)})
       .catch(err => console.log(err))
});

module.exports = router;