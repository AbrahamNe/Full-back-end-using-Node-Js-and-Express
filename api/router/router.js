const express= require("express");
const router = express.Router();

const bookController = require("../controller/book.controller");
const publisherController = require("../controller/publisher.controller");

 // Books
router.route("/books")
    .get(bookController.getAllBooks);

router.route("/books/:_bookId")
     .get(bookController.findBookbyId)
     .put(bookController.updateEntireBook)
   //  .patch(bookController.modifyBook)
     .delete(bookController.removeBook);
     
// Publisher
router.route("/books/:_bookId/publisher")
     .get(publisherController.getpublisher);     

 
module.exports = router;    