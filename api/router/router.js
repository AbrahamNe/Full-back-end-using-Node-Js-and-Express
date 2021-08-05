const express= require("express");
const router = express.Router();

const bookController = require("../controller/book.controller");
const publisherController = require("../controller/publisher.controller");
const userController = require("../controller/user.controller");
// hocking if its a book do this
 // Books
router.route("/books")
    .get(bookController.getAllBooks)
    .post(bookController.addnewBook);

router.route("/books/:_bookId")
// binding function to and event  get is an event
// related to and event its a call back
     .get(bookController.findBookbyId)
     .put(bookController.updateEntireBook)
     .patch(bookController.modifyBook)
     .delete(bookController.removeBook);
     
// Publisher
router.route("/books/:_bookId/publisher")
     .get(publisherController.getpublisher)
     .put(publisherController.updateEntirePublisher)
     .patch(publisherController.modifyPublisher)
     .delete(publisherController.deletePublisher); 

// users
router.route("/user/register")
    .post(userController.register);
 
router.route("/user/login")
    .post(userController.login) ;

module.exports = router;    