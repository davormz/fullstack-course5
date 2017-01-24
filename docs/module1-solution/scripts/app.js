(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope){
    $scope.lunchList = "";
    $scope.message = "";

    $scope.checkList = function(){
      var lunchMessage = validateLuch($scope.lunchList);
        $scope.message = lunchMessage;
    };

    function validateLuch(lunchList){
      var comma = ',';
      var arrayOfStr = lunchList.split(comma);
      if(lunchList === ''){
        return "Please enter data first";
      } else if(arrayOfStr.length <= 3){
        return "Enjoy!"
      }else{
        return "Too much"
      }
    }

  }

})();
