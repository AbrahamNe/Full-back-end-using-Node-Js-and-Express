angular.module(BookApp).controller("BookAddController",BookAddController);
function BookAddController(BookDataFactory){
    const vm = this;
    vm.addNewBook = function(){
        var book ={
            authors:vm.authors,
            title:vm.title,
            isbn:vm.isbn,
            pageCount:vm.pageCount,
            publishedDate :vm.publishedDate,
            category:vm.category


        };
        BookDataFactory.addBook(Book).then(function( response) {
            vm.addedBook = response;
        });
        
    }
}