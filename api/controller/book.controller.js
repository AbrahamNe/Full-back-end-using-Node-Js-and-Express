const mongoose = require("mongoose");
const express = require("express");
const Book = mongoose.model("Book");

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
  console.log("Book full update request recieved");

  const bookId = req.params._bookId;
  Book.findById(bookId).exec(function(err, book) {
    if (err) {  console.log("Error finding book");
                res.status(500).message(err);  } 
    else if (!book) { console.log("Book id not found");
                      res.status(404).message("Book id not found");  }
    else {
      console.log("matching book properties to request body");
      book.title = req.body.title;
      book.isbn = req.body.isbn;
      book.pageCount = parseInt(req.body.pageCount);
      book.publishedDate = req.body.publishedDate;
      book.Description = req.body.Description;
      book.authors = req.body.authors;
      book.category = req.body.category;
      book.publisher = {};

      book.save(function (err, updatedBook) {
        if (err) {res.status(500).json(err); } 
        else {  res.status(200).json(updatedBook); }
      });
    }

  });
};

// PATCH method
// module.exports.modifyBook = function (req, res) {
//   const bookId = req.params._bookId;

//   Book.findById(bookId).exec(function (err, book) {
//     if (err) {
//       response.status(400).message("error");
//     } else if (!book) {
//       response.status(400).message("Game id not found");
//     } else {
//       book.title = req.body.title;
//       book.isbn = req.body.isbn;
//       book.pageCount = req.body.pageCount;
//       book.publishedDate = req.body.publishedDate;
//       book.Description = req.body.Description;
//       book.authors = req.body.authors;
//       book.category = req.body.category;
//       book.publisher = {};

//       if (req.body.title) {
//         book.title = req.body.title;
//       }
//       if (req.body.isbn) {
//         book.isbn = req.body.isbn;
//       }
//       if (req.body.pageCount) {
//         book.pageCount = req.body.pageCount;
//       }
//       if (req.body.publishedDate) {
//         book.publishedDate = req.body.publishedDate;
//       }
//       if (req.body.Description) {
//         book.Description = req.body.Description;
//       }
//       if (req.body.authors) {
//         book.authors = req.body.authors;
//       }
//       if (req.body.category) {
//         book.category = req.body.category;
//       }
//     }

//     book.save(function (err, Updatedbook) {
//       if (err) {
//         res.status(400).message("error");
//       } else {
//         res.status(400).json(updatedBook);
//       }
//     });
//   });
// };




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
