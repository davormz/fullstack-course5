( function (){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('API_URL', 'https://davids-restaurant.herokuapp.com/');

  function FoundItemsDirective(){
    var ddo = {
      urlTemplate: 'found-items.template.html',
      scope:{
        items: '<',
        title: '@title',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController(){
    //TODO
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    let narrowDownCtrl = this;

    narrowDownCtrl.searchTerm = "";
    narrowDownCtrl.foundItems = [];

    narrowDownCtrl.getMatchedMenuItems = function(){
      console.log("calling seervice ...");
      let promise = MenuSearchService.getMatchedMenuItems(narrowDownCtrl.searchTerm);

      promise.then(function success(response){
        let menuItems = response.data.menu_items;
        let itemsLength = menuItems.length;

        for(let i = 0 ; i < itemsLength ; i++ ){
          if(menuItems[i].description.includes(narrowDownCtrl.searchTerm)){
            narrowDownCtrl.foundItems.push(menuItems[i]);
          }
        }

        console.log("Elements retrieved: " + narrowDownCtrl.foundItems.length);

      }).catch(function (error) {
        console.log("Something went wrong. " + error.message);
      });
    };

    narrowDownCtrl.removeItem = function(index){
      narrowDownCtrl.foundItems.splice(index, 1);
    }

  }

  MenuSearchService.$inject = ['$http', 'API_URL'];
  function MenuSearchService($http, API_URL){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      var response = $http({method: "GET", url: (API_URL + 'menu_items.json') });

      return response;
    };

  }



})();
