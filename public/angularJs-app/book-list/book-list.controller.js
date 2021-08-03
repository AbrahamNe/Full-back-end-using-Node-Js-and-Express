angular.module("BooksApp").controller("BookListController", BookListController);

// function BookListController(){
//     const vm = this;
//     vm.title = "List of Books";
// }

function BookListController(BookDataFactory){
    console.log("Inside the book data factory");
    const vm = this;
    BookDataFactory.getAllBooks().then(function (response){
        vm.BookContent = response;
    });
}

