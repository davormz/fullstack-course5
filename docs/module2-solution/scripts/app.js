( function (){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
  .config(Config);

  Config.$inject = ['ShoppingListCheckOffServiceProvider'];
  function Config(ShoppingListCheckOffServiceProvider){
    ShoppingListCheckOffServiceProvider.initialList = [
      {name: "milk", quantity: "1 galon of"},
      {name: "cookies", quantity: "10"},
      {name: "bread", quantity: "1"},
      {name: "Ham", quantity: "1"},
      {name: "mayo", quantity: "1"}
    ]
  }

  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function ToBuyController($scope, ShoppingListCheckOffService){
    let ctrl = this;
    ctrl.items = ShoppingListCheckOffService.getItemsToBuy();
    ctrl.itemName = "";
    ctrl.itemQuantity = "";

    ctrl.addToBuyList = function(){
      ShoppingListCheckOffService.addToBuy(ctrl.itemName, ctrl.itemQuantity);
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

  function ShoppingListCheckOffService(initialList){
    let service = this;

    let itemsToBuy = initialList;
    let itemsBought = [];

    service.addToBuy =  function(itemName, quantity){
      let item = {name: itemName,
        quantity: quantity};
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
    provider.initialList = [];

    provider.$get = function(){
      return new ShoppingListCheckOffService(provider.initialList);
    };
  }


})();
