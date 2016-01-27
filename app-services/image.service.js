(function () {
    'use strict';

    angular
        .module('app')
        .factory('ImageService', ImageService);

    ImageService.$inject = ['$cookieStore', '$localStorage'];
    
    function ImageService($localStorage) {
     var service = {};

     service.convertImageToBase64t = convertImageToBase64 ;


   function convertImageToBase64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
 
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
 
    var dataURL = canvas.toDataURL("image/png");
 
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


     

      
}

    
})();