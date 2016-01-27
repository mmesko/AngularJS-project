(function () {

    angular
        .module('app')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['UserService', '$rootScope','$http','$window','$scope'];

    function AccountController(UserService, $rootScope,$http,$window,$scope) {
        var vm = this;
      
        vm.user = null;
        vm.images = [];
        vm.lists = [];
   
        $scope.stringify = JSON.stringify;
        
        initController();

        function initController() {
            loadCurrentUser();    
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });

        }
        
        
  vm.addList = function(){   
    vm.lists.push(vm.list = {
      values: [],
      addValue: function(valueTyped) {
        vm.values.push(valueTyped);
        console.log(vm.values);
      }
    });
  }
  
  vm.addValue = function(list, value){
    list.values.push(value);
  }
  
  vm.saveLists = function() {
    localStorage["lists"] = JSON.stringify(vm.lists);
  }
  
  vm.loadLists = function() {
    vm.lists = JSON.parse(localStorage['lists']);
  }
        

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