
const mongoose = require("mongoose");
const Book = mongoose.model("Book");

// GET a publisher
module.exports.getpublisher = function(req, res){
    const bookId = req.params._bookId;
    Book.findById(bookId).select("publisher").exec( function(err, book){

        if(err) {res.status(500).json(err); console.log("Error finding publisher of this book") ;}
        else if(!book){ res.status(404).json({"message" :" book id not found"}); }
        else {  res.status(200).json(book.publisher); }
       
    });
};

// DELETE a publisher
module.exports.deletePublisher = function(req, res){
    const bookId = req.params._bookId;
    console.log("Deleting publisher");
    Book.findById(bookId).select("publisher").exec(function(err, book){
        if(err) { console.log("Error finding book publisher");
                  res.status(500).message= err ;}
        else if(!book) {res.status(400).message = "Book Id not found" ;} 
        else { book.publisher ="";}         
    });
 
}

