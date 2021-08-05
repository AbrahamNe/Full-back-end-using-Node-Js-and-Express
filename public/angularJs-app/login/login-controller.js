
angular.module("BooksApp").controller("loginController", loginController);

function loginController(BookDataFactory, $window, AuthFactory, jwtHelper){
    const vm = this;
    vm.isLoggedIn = function() {
        console.log(AuthFactory.isLoggedIn);
        return AuthFactory.isLoggedIn;
    }

    vm.login = function() {
        if(vm.username && vm.password){
            const user  = {
                username = vm.username,
                password = vm.password,
            };console.log("user ", user);

            BookDataFactory.login(user).then(function(response){
                console.log("response ", response);

                if(response.sucess){
                    $window.sessionStorage.token = response.token;
                    AuthFactory.isLoggedIn =true;
                    const token = $window.sessionStorage.token;
                    const decodedToken = jwtHelper.decodedToken(token);
                    vm.loggedInUser = decodedToken.name;
                    console.log("Hii ", vm.loggedInUser);
                }
                vm.message = "success";
                vm.err = "";
            }).catch(function(err){
                console.log(err);
            })
        }
    }
    vm.logout = function(){
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path("/");
    }
    vm.isActiveTab = function(url){
        var  currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }

}