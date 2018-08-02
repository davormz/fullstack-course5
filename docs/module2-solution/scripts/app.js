( function (){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider);

  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function ToBuyController($scope, ShoppingListCheckOffService){
    let ctrl = this;
    ctrl.items = ShoppingListCheckOffService.getItemsToBuy();
    ctrl.itemName = "";

    ctrl.addToBuyList = function(){
      ShoppingListCheckOffService.addToBuy(ctrl.itemName);
    };

    ctrl.addToBought = function(itemIndex){
      ShoppingListCheckOffService.addToBought(itemIndex);
    };

  }

  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function AlreadyBoughtController($scope, ShoppingListCheckOffService){
    let ctrl = this;
    ctrl.items = ShoppingListCheckOffService.getItemsBought();
    //TODO
  }

  function ShoppingListCheckOffService(){
    let service = this;

    let itemsToBuy = [];
    let itemsBought = [];

    service.addToBuy =  function(itemName){
      let item = {name: itemName};
      itemsToBuy.push(item);
    };

    service.addToBought = function(itemIndex){
      itemsBought.push(itemsToBuy[itemIndex]);
      itemsToBuy.splice(itemIndex, 1);
    };

    service.getItemsToBuy = function(){
      return itemsToBuy;
    };

    service.getItemsBought = function(){
      return itemsBought;
    };

  }

  function ShoppingListCheckOffServiceProvider(){
    var provider = this;

    provider.$get = function(){
      return new ShoppingListCheckOffService();
    };
  }


})();
