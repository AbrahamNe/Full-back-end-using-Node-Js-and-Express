angular.module("BooksApp",["ngRoute"]).config(config);

function config ($routeProvider){
    $routeProvider
   .when("/books",{
        templateUrl:"angularJs-app/book-list/book-list.html",
        controller:"BookListController",
        controllerAs:"booklistctrl"
    }) 
    .when("/books/:bookId",{
        templateUrl:"angularjs-app/book-detail/book-detail.html",
        controller:"BookDetailController",
        controllerAs:"bookdetailctrl"
    })
    .when("book/add",{
        templateUrl:"angularjs-app/book-add/book-add.html",
        controller:"BookAddController",
        controllerAs:"bookaddctrl"
    })
    // .otherwise({ redirectTo: "/"});
}