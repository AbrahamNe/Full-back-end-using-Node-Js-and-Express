angular.module("BooksApp").controller("BookListController", BookListController);
function BookListController(BookDataFactory){
    console.log("======== HTML Page List of books page =======");

    const vm = this;
    BookDataFactory.getAllBooks().then(function (response){
        vm.BookContent = response;
    });
}

