angular.module("BooksApp",["ngRoute"]).config(config);

function config ($routeProvider){
    $routeProvider
    .when("/",{
      templateUrl:"./angularJs-app/welcome/welcome.html"
    })
   .when("/books",{
        templateUrl:"angularJs-app/book-list/book-list.html",
        controller:"BookListController",
        controllerAs:"booklistctrl"
    }) 
    .when("/books/add",{
        templateUrl:"angularjs-app/book-add/book-add.html",
        controller:"BookAddController",
        controllerAs:"bookaddctrl"
    })
    .when("/books/:bookId",{
        templateUrl:"angularjs-app/book-detail/book-detail.html",
        controller:"BookDetailController",
        controllerAs:"bookdetailctrl"
    })
    .when("/books/:bookId/remove",{
        templateUrl:"./angularJs-app/delete-book/delete-book.html",
        controller :"DeleteBookController",
        controllerAs: "deletebookctrl"
    })
    
    // .otherwise({ redirectTo: "/"});
}