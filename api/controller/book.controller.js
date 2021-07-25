const mongoose = require("mongoose");
const Book = mongoose.model("Book");

 // get All Books
module.exports.getAllBooks = function (req, res) {
  console.log("All Books");
  let count = 18;
  let offset = 0;
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 5);
  }
  if (req.query && req.query.offset) {
    count = parseInt(req.query.offset, 2);
  }

  Book.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, books) {
      if (err) {
        console.log("error finding books");
        res.status(500).json(err);
      } else {
        console.log("Number of Books " + books.length);
        res.status(200).json(books);
      }
    });
};

// get a book by Id
module.exports.findBookbyId = function (req, res) {
  const bookId = req.params._bookId;
  Book.findById(bookId).exec(function (err, book) {
    if (err) {
      console.log("Error finding a book");
      res.status(500).json(err);
    } else if (!book) {
      res.status(404).json({ message: " book id not found" });
    } else {
      res.status(200).json(book);
    }
  });
};

// PUT method

module.exports.updateEntireBook = function (req, res) {
  console.log("\nBook full update request recieved");

  const bookId = req.params._bookId;
  console.log("book id"+ bookId);
  Book.findById(bookId).exec( function (err, book) {
    const response = {
      status: 204,
      message: { message: "Game updated successfully" },
    };
    if (err) {
      console.log("Error finding book");
      response.status; response.message= "Internal server error";
     // res.status(500).send({"message":"Internal Server Error"});
    } else if (!book) {
      console.log("Book id not found");
      response.status =404 ; response.message= " book id not found error";
     } if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } 
    else {
      
      console.log("  matching book properties to request body");
      console.log("request body : "+req.body);
      console.log("book : "+ book.title);
      book.title = req.body.title;
      book.isbn = req.body.isbn;
      book.pageCount = parseInt(req.body.pageCount);
      book.publishedDate = req.body.publishedDate;
      book.Description = req.body.Description;
      book.authors = req.body.authors;
      book.category = req.body.category;
      book.publisher = req.body.publisher;

      book.save(function (err, updatedBook) {
        if (err) {
            console.log("Error inside book.save "+ err);
          res.status(500).json(err);
        } else {
          res.status(200).json(updatedBook);
        }
      });
    }
  });
};

// PATCH method
module.exports.modifyBook = function (req, res) {
  const bookId = req.params._bookId;

  Book.findById(bookId).exec( function (err, book) {
    if (err) {
     res.status(500).send({"message":"Internal server error"});
      console.log(err);
    } else if (!book) {
      res.status(400).message("Book id not found");
      console.log("book id not found");
    } else {
        console.log("seeing req.body");
      if (req.body.title) {
        book.title = req.body.title;
      }
      if (req.body.isbn) {
        book.isbn = req.body.isbn;
      }
      if (req.body.pageCount) {
        book.pageCount = parseInt(req.body.pageCount);
      }
      if (req.body.publishedDate) {
        book.publishedDate = req.body.publishedDate;
      }
      if (req.body.Description) {
        book.Description = req.body.Description;
      }
      if (req.body.authors) {
        book.authors = req.body.authors;
      }
      if (req.body.category) {
        book.category = req.body.category;
      }
      if(req.body.publisher){
          book.publisher = req.body.publisher;
      }
    }

    Book.save(function (err, UpdatedBook) {
      if (err) {
        res.status(400).message("error");
      } else {
        res.status(400).message(UpdatedBook);
      }
    })
  })
};

// Delete
module.exports.removeBook = function (req, res) {
  const bookId = req.params._bookId;

  console.log("Removing a book with book ID " + bookId);
  Book.findByIdAndRemove(bookId).exec(function (err, deletedBook) {
    const response = { status: 404 };
    if (err) {
      console.log("Error finding book");
      response.status = 500;
      response.message = err;
    } else if (!deletedBook) {
      response.status = 404;
      response.message = { message: "Book Id not found" };
    }
    res.status(response.status).json(response.message);
  });
};
