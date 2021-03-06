(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['categoryItems']
function ItemDetailController(categoryItems) {
  var categoryItemsDetail = this;
  categoryItemsDetail.categoryItems = categoryItems.menu_items;
  categoryItemsDetail.category = categoryItems.category;
}

})();
