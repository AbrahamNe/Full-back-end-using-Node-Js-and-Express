const mongoose = require("mongoose");
const Book = mongoose.model("Book");

// GET a publisher
module.exports.getpublisher = function (req, res) {
  const bookId = req.params._bookId;
  Book.findById(bookId)
    .select("publisher")
    .exec(function (err, book) {
      if (err) {
        res.status(500).json(err);
        console.log("Error finding publisher of this book");
      } else if (!book) {
        res.status(404).json({ message: " book id not found" });
      } else {
        res.status(200).json(book.publisher);
      }
    });
};



// PUT method
module.exports.updateEntirePublisher = function (req, res) {
    console.log("\nPublisher full update request recieved");
  
    const bookId = req.params._bookId;
    if(req.body && req.body.name && req.body.location)
    console.log("Boook ID => " + bookId);
    Book.findById(bookId).exec(function (err, book) {
      const response = {
        status: 204,
        message: { message: "updated successfully" },
      };
      if (err) {
        console.log("Error finding book");
        response.status;
        response.message = "Internal server error";
      } else if (!book) {
        console.log("Book id not found");
        response.status = 404;
        response.message = " book id not found error";
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        console.log("  matching publisher properties to request body");
        console.log("Request body =>  " + req.body.publisher);
        console.log("Book's publisher Info => " + book.publisher);
        book.publisher.name = req.body.name;
        book.publisher.location = req.body.location;
       // book.publisher = req.body.publisher;
  
        book.save(function (err, updatedpublisher) {
          if (err) {
            console.log("Error inside book.save method => " + err);
            res.status(500).json(err);
          } else {
            res.status(200).json(updatedpublisher);
          }
        });
      }
    });
  };

  // PATCH
  module.exports.modifyPublisher = function (req, res) {
    console.log("\nPublisher full update request recieved");
  
    const bookId = req.params._bookId;
    if(req.body && req.body.name && req.body.location)
    console.log("Boook ID => " + bookId);
    Book.findById(bookId).exec(function (err, book) {
      const response = {
        status: 204,
        message: { message: "updated successfully" },
      };
      if (err) {
        console.log("Error finding book");
        response.status;
        response.message = "Internal server error";
      } else if (!book) {
        console.log("Book id not found");
        response.status = 404;
        response.message = " book id not found error";
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
         if(req.body.name) {book.publisher.name = req.body.name;}
         if(req.body.location) {book.publisher.name = req.body.location;}
        
        Book.save(function (err, updatedpublisher) {
          if (err) {
            console.log("Error inside book.save method => " + err);
            res.status(500).json(err);
          } else {
            res.status(200).json(updatedpublisher);
          }
        });
      }
    });
  };


  
 // DELETE publisher
module.exports.deletePublisher = function (req, res) {
  const bookId = req.params._bookId;
  console.log("POST to delete publisher");
  Book.update(
    { _id: book },
    { $unset: { publisher: 1 } },
    function (err, pub) {
      const response = {
        status: 204,
        message: pub,
      };
      if (err) {
        console.log(err);
        response.status = 500;
        response.messge = err;
      }
      if (!pub) {
        console.log("There is no publisher to be deleted");
        res.status(400).json({ error: "There is no publisher to be deleted" });
      }
      res.status(response.status).json(response.message);
    }
  );
};
