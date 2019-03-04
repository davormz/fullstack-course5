(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/home',
    templateUrl: 'src/menu_app/components/home/home.state.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menu_app/components/categories/categories.state.html',
    controller: 'CategoriesController as categoriesList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Item detail
  .state('items', {
    url: '/item-detail/{short_name}',
    templateUrl: 'src/menu_app/components/item-detail/item-detail.state.html',
    controller: 'ItemDetailController as categoryItemsDetail',
    resolve: {
      categoryItems: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.short_name);

            }]
    }
  });

}

})();
