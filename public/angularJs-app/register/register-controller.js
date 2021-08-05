angular.module("BooksApp")
.controller("RegisterController", RegisterController);

function RegisterController(BookDataFactory){
    const vm = this;
    vm.register = function(){
        if(vm.username && vm.password){
            var user = {
            username: username,
            password: password,
            name: vm.name
        };
        console.log(user);
       if(!vm.username || vm.password){
           vm.message ="",
           vm.err = "please add username and password";
       } else{
           if(vm.password !== vm.passwordRepeat) {
               vm.err = "please make sure the passwords match";
           } 
           else {
               BookDataFactory.register(user).then(function (result) {
                   console.log("result ", result);
                   vm.message = "successfully registrated, please login";
                   vm.err="";
               }).catch(function(err){
                   console.log("error ", err);
               })

           }
       }

        }
    }

}