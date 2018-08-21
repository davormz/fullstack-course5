( function (){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('API_URL', 'https://davids-restaurant.herokuapp.com/');

  function FoundItemsDirective(){
    var ddo = {
      restrict: 'E',
      templateUrl: 'found-items.template.html',
      scope:{
        items: '<',
        onRemove: '&'
      },
      controllerAs: 'list'
    };
    return ddo;
  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    let narrowDownCtrl = this;
    let menuSearchService = MenuSearchService;
    let MESSAGE = "Nothing found!";

    narrowDownCtrl.searchTerm = "";
    narrowDownCtrl.found = [];
    narrowDownCtrl.message = "";
    narrowDownCtrl.messageEnabled = false;

    narrowDownCtrl.getMatchedMenuItems = function(){
      narrowDownCtrl.found = [];

      if(narrowDownCtrl.searchTerm.length === 0){
        narrowDownCtrl.message = MESSAGE;
        narrowDownCtrl.messageEnabled = true;
      }else{
        console.log("calling seervice ...");
        let promise = menuSearchService.getMatchedMenuItems(narrowDownCtrl.searchTerm);

        promise.then(function success(response){
          if(response.length === 0){
            narrowDownCtrl.message = MESSAGE;
            narrowDownCtrl.messageEnabled = true;
          }else{
            narrowDownCtrl.found = response;
            narrowDownCtrl.messageEnabled = false;
          }
          console.log("Elements found: " + narrowDownCtrl.found.length);
        }).catch(function (error) {
          console.log("Something went wrong. " + error.message);
        });
      }
    };

    narrowDownCtrl.removeItem = function(index){
      narrowDownCtrl.found.splice(index, 1);
    };

  }

  MenuSearchService.$inject = ['$http', 'API_URL'];
  function MenuSearchService($http, API_URL){
    let service = this;
    let items = [];

    service.getMatchedMenuItems = function(searchTerm){
      return $http({method: "GET", url: (API_URL + 'menu_items.json') })
      .then(function success(response){
        let menuItems = response.data.menu_items;
        let itemsLength = menuItems.length;

        for(let i = 0 ; i < itemsLength ; i++ ){
          if(menuItems[i].description.includes(searchTerm)){
            items.push(menuItems[i]);
          }
        }
        console.log("Elements retrieved: " + items.length);

        return items;

      }).catch(function (error) {
        console.log("Something went wrong. " + error.message);
      });
    };

  }



})();
