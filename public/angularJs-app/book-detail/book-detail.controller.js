angular
  .module("BooksApp")
  .controller("BookDetailController", BookDetailController);

function BookDetailController(BookDataFactory, $routeParams) {
  const vm = this;
  const bookId = $routeParams.bookId;
  BookDataFactory.findBookbyId(bookId).then(function (response) {
    vm.bookDetail = response;
  });
}
