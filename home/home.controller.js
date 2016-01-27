(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$scope','$http','$window', '$location','localStorageService'];
    function HomeController(UserService, $rootScope,$scope, $http, $window, FlashService, $location, localStorageService) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.query = {}
        vm.deleteUser = deleteUser;
        vm.tags = [{"name":"Tag1"},{"name":"Tag2"},{"name":"Tag3"}];
                
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
        

  
  vm.saveTags = function() {
    localStorage["tags"] = JSON.stringify(vm.tags);
  }
  
  vm.loadTags = function() {
    vm.tags = JSON.parse(localStorage['tags']);
  }
      
 
      
        
    }

})();