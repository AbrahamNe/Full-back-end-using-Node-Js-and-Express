const express= require("express");
const router = express.Router();

const bookController = require("../controller/book.controller");
const publisherController = require("../controller/publisher.controller");
router.route("/books")
    .get(bookController.getAllBooks);

router.route("/books/:_bookId")
     .get(bookController.findBookbyId)
     .put(bookController.updateAllBooks)
     .patch(bookController.modifyBook);
     


router.route("/books/:_bookId/publisher")
     .get(publisherController.getpublisher);     

 
module.exports = router;    