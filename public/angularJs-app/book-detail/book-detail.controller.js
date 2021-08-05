angular
  .module("BooksApp")
  .controller("BookDetailController", BookDetailController);

// function BookDetailController(BookDataFactory, $routeParams, $location) {
//   console.log("===== HTML Page book detail page =======");
//   const vm = this;
//   const bookId = $routeParams.bookId;
//   BookDataFactory
//        .findBookbyId(bookId).then(function (response) {
//        vm.bookDetail = response;
//   });
// }

function BookDetailController(BookDataFactory, $routeParams, $location) {
  const bookId = $routeParams.bookId;
  BookDataFactory
       .findBookbyId(bookId).then((response) => this.bookDetail = response)
       .catch(console.error());

   this.deleteBookDetail = (bookId) => {
     BookDataFactory
        .deleteBookbyId(bookId)
        .then(() => $location.pathname("/"))
        .catch(console.error());       
   }    

   this.goback = () => { 
     $location.path("#!/books/")
   }
};
