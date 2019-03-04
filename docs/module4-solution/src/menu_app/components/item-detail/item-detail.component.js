(function () {
'use strict';

angular.module('MenuApp')
.component('menuDetail', {
  templateUrl: 'src/menu_app/components/item-detail/item-detail.template.html',
  bindings: {
    categoryItems: '<'
  },
  // controllerAs: 'categoryItemsDetail'
});

})();
