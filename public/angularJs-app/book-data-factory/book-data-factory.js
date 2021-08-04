
angular.module("BooksApp").factory("BookDataFactory", BookDataFactory);

function BookDataFactory($http){
    return {
        getAllBooks: getAllBooks,
        findBookbyId:findBookbyId,
        addnewBook:addnewBook,
        removeBook:removeBook

    };
    function getAllBooks(){

        return $http.get("/api/books").then(complete).catch(failed);
    }
    function findBookbyId(bookId){
        return $http.get("/api/books/"+bookId).then(complete).catch(failed);
    }
    function addnewBook(book){
        return $http.post("/api/books/", book).then(complete).catch(failed);
    }
    function removeBook(bookId){
        return $http.delete("/api/books/"+bookId).then(complete).catch(failed);
    }
    function complete(response) {
        return response.data;
    }
    function failed(error){
        return error.status.statusText;
    }
}