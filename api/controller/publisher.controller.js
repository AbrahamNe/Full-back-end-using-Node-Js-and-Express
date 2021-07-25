
const mongoose = require("mongoose");
const Book = mongoose.model("Book");


module.exports.getpublisher = function(req, res){
    const bookId = req.params._bookId;
    Book.findById(bookId).select("publisher").exec( function(err, book){

        if(err) {res.status(500).json(err); console.log("Error finding publisher of this book") ;}
        else if(!book){ res.status(404).json({"message" :" book id not found"}); }
        else {  res.status(200).json(book.publisher); }
       
    });
};

