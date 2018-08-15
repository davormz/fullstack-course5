(function (){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('API_URL', 'https://davids-restaurant.herokuapp.com/menu_items.json');

  function FoundItemsDirective(){
    var ddo = {
      urlTemplate: 'found-items.template.html',
      scope:{
        items: '<',
        title: '@title',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: list,
      bindToController: true
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    //TODO:
    let narrowDownCtrl = this;

    narrowDownCtrl.getMatchedMenuItems = function(){
      let promise = MenuSearchService.getMatchedMenuItems();

      promise.then(function success(response){
        console.log(response.data);

        //TODO:
      }, function error(errorResponse){
        console.log(errorResponse.message);
      });
    }
    
  }

  MenuSearchService.$inject = ['$http', 'API_URL'];
  function MenuSearchService($http, API_URL){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      var response = $http(method: "GET", url: API_URL );

      return response;
    };

  }



})();
