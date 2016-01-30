(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$scope','$http','$window', '$location'];
    function HomeController(UserService, $rootScope,$scope, $http, $window, FlashService, $location) {
        var vm = this;

        vm.user = null;
        vm.tags = [];
        vm.tag = null;
        vm.allUsers = [];
        vm.query = {}
        vm.deleteUser = deleteUser;
      
                
        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
        
        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    
}

})();