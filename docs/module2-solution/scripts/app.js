(function (){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceprovider);

  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function ToBuyController($scope, ShoppingListCheckOffService){
    let ctrl = this;
    ctrl.items = ShoppingListCheckOffService.getItemsToBuy();
    ctrl.itemName = "";

    ctrl.addToBuyList = function(){
      ShoppingListCheckOffService.addToBuy(itemName);
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

    service.addToBuy(itemName){
      let item = {name: itemName};
      itemsToBuy.push(item);
    };

    service.addToBought(itemIndex){
      itemsBought.push(itemsToBuy[itemIndex]);
      itemsToBuy.splice(itemIndex);
    };

    service.getItemsToBuy(){
      return itemsToBuy;
    };

    service.getItemsBought(){
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
