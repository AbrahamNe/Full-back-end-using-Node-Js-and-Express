
const mongoose = require("mongoose");
const Book = mongoose.model("Book");


module.exports.getpublisher = function(req, res){
    const bookId = req.params._bookId;
    Book.findById(bookId).select("publisher").exec( function(err, book){
        res.status(200).json(book.publisher);
    });
};

