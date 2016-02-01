(function () {

    angular
        .module('app')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['UserService', '$rootScope','$http','$window','$scope','$route'];

    function AccountController(UserService, $rootScope,$http,$window,$scope,$route) {
        var vm = this;
      
        vm.user;
        vm.showInfoChangeTab = false;
        vm.showBasicInfoChangeTab = false;

        initController();

        function initController() {
            loadCurrentUser();    
        }


        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                    user.tags = [];
                    user.image=[];
             });
        }
        
          // add data to user 
         UserService.GetByUsername($rootScope.globals.currentUser.username).then(function (data) {
               vm.user = {
                      userData: data
                   }
             });
                   vm.changeBasicInfo = function(){
                     vm.showInfoChangeTab = false;
                     vm.showBasicInfoChangeTab = true; 
                   }
                   //disply/hide change info table
                  vm.changeInfo = function () {
                     vm.showInfoChangeTab = true;
                     vm.showBasicInfoChangeTab = false;
                 };
                 
                 vm.closeTab = function(){
                     vm.showInfoChangeTab = false;
                     
                 }
                 
                   vm.closeBasicTab = function(){
                     vm.showBasicInfoChangeTab = false;
                 }
                 
                  // Confirm  change  
                 vm.confirmAdditionalInfoEdit = function (user) {
                     
                      var userToUpload = user.userData;
                    
                     UserService.Update(userToUpload).then(function (data) {
                        //changed data
                        $rootScope.globals.currentUser = data.education;
                        $rootScope.globals.currentUser = data.workplace;
                        $route.reload();               // reload route
                     })
                 
                 };
                 
                    // Confirm  change  
                 vm.confirmBasicInfoEdit = function (user) {
                     
                      var userToUpload = user.userData;
                    
                     UserService.Update(userToUpload).then(function (data) {
                        //changed data
                        $rootScope.globals.currentUser = data.firstName;
                        $rootScope.globals.currentUser = data.lastName;
                        $rootScope.globals.currentUser = data.username;
                        
                        $route.reload();               // reload route
                     })
                 
                 }; 
                 
                 
                 vm.saveTags = function (user) {
                     
                     var userTags = user.userData;
                    
                     UserService.Update(userTags).then(function (data) {
                        //changed data
                        $rootScope.globals.currentUser = data.tag;
                        $route.reload();               // reload route
                     })
                 
                 };
  
     
             vm.saveImg = function (user) {
                     
                     var userImg = user.userData;
                    
                     UserService.Update(userImg).then(function (data) {
                        //changed data
                        $rootScope.globals.currentUser = data.img
                        $route.reload();               // reload route
                     })
                 
                 };
  
    

      
}

})();