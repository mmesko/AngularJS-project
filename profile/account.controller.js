(function () {

    angular
        .module('app')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['UserService', '$rootScope','$http','$window','$scope','$route'];

    function AccountController(UserService, $rootScope,$http,$window,$scope,$route) {
        var vm = this;
      
        vm.user;
        vm.images = [];
        vm.showInfoChangeTab = false;

        initController();

        function initController() {
            loadCurrentUser();    
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                    user.tags = [];
             });
        }
          
          // add data to user 
         UserService.GetByUsername($rootScope.globals.currentUser.username).then(function (data) {
               vm.user = {
                      userData: data
                   }
             });
                   
                   //disply/hide change info table
                  vm.changeInfo = function () {
                     vm.showInfoChangeTab = true;
                 };
                 
                 vm.closeTab = function(){
                     vm.showInfoChangeTab = false;
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
                 vm.saveTags = function (user) {
                     
                     var userTags = user.userData;
                    
                     UserService.Update(userTags).then(function (data) {
                        //changed data
                        $rootScope.globals.currentUser = data.tag;
                        $route.reload();               // reload route
                     })
                 
                 };
  
  
  function handleFileSelect(evt) {

    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
            
          document.getElementById('list').insertBefore(span, null);
          localStorage.setItem('img', e.target.result);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


  if(localStorage.img) { 

         var span = document.createElement('span');
          span.innerHTML += ['<img class="thumb" src="', localStorage.img,
                            '" title="test"/>'].join('');

          document.getElementById('list').insertBefore(span, null);
    
    }
    

      
}

})();