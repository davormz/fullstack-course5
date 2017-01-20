(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope){
    $scope.lunchList = "";
    $scope.message = "";

    $scope.checkList = function(){
      //TODO
      var lunchMessage = validateLuch($scope.lunchList);
        $scope.message = lunchMessage;
    };

    function validateLuch(lunchList){
      return "a message";
    }

  }

})();
