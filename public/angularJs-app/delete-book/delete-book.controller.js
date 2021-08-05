angular.module("BooksApp")
       .controller("DeleteBookController", DeleteBookController);

function DeleteBookController(BookDataFactory ,$routeParams){
     const vm = this;
     const bookId = $routeParams.bookId;

     BookDataFactory.removeBook(bookId).then(function(response){
         vm.deletedBook = response;
      //   console.log("message :", vm.deletedBook);
      
     });
}

