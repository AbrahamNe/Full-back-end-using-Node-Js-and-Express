angular.module("BooksApp").
controller("BookAddController",BookAddController);

function BookAddController(BookDataFactory){

    console.log("===== HTML add book page ======");
    let vm = this;
    vm.bookHandler =function() {
        if(vm.form.$valid){
        let book = {
            title:vm.title,
            authors:vm.authors,
            isbn:vm.isbn,
            pageCount:vm.pageCount,
            publishedDate :vm.publishedDate,
            category:vm.category,
            Description:vm.Description
    } 
    // BookDataFactory. addnewBook(book).then(function (response){
    //     vm.addnewBook = response;
    // });
    BookDataFactory
         .addnewBook(book)
         .then( () => location.href ="/#!/")
         .catch(err => console.log(err))
      }
   }
}

//  vm.isSubmitted = false;
//     vm.addNewBook = () => {
//         if(vm.form.$valid){

//         let book ={
//             title:vm.title,
//             authors:vm.authors,
//             isbn:vm.isbn,
//             pageCount:vm.pageCount,
//             publishedDate :vm.publishedDate,
//             category:vm.category,
//             Description:vm.Description


//         };
//         BookDataFactory.addNewBook(book)
//         .then( () => location.href ='/#!/')
//         .catch(err => console.log(err));
//          console.log("Form is valid");
//     } else{
//         console.log("form is invalid");
//     } 
        
//     }
// }