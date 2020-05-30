const express = require("express");
const router = express.Router();

const Book = require("../../models/Books");
router.post("/Addbook", (req, res) => {
  Book.findOne({isbn: req.body.isbn}).then(book => {
      if(book){
          console.log(book)
        return res.status(400).json({bookfound : "A book with the given ISBN already exists."});
      }else{
          console.log(req.body.isbn,
              req.body.title,
              req.body.subject,
              req.body.copies)
          new Book({
              isbn: req.body.isbn,
              title: req.body.title,
              subject: req.body.subject,
              copies: req.body.copies
          })
              .save()
              .then( (dummy) => {
               return res.status(200).json({added: "Book Added."});
              })
              .catch(err => {
                  console.log(err)
                  res.status(403).json({error: true, message: "Book was not added"})});
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
