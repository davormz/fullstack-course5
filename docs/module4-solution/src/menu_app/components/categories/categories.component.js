(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menu_app/components/categories/categories.template.html',
  bindings: {
    items: '<'
  },
  controllerAs: 'categoriesList'
});

})();
