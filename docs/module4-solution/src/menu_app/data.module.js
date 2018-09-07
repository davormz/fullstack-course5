(function () {
'use strict';

angular.module('Data',[])
.service('MenuDataService', MenuDataService)
constant('ApiBasePath', "http://davids-restaurant.herokuapp.com/");

MenuDataService.$inject = ['$http','ApiBasePath'];
function MenuDataService($http, ApiBasePath){
  let service = this;
  let menuItems = [];
  let categoryItems = [];

  service.getAllCategories = function(){
    return $http({ method: "GET", url: (ApiBasePath + "categories.json")})
    .then(function success(response){
      menuItems = response.data;
      return menuItems;
    }).catch(function (error) {
      console.log("Something went wrong. " + error.message);
    });
  };

  service.getItemsForCategory = function(shortName){
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    })
    .then(function success(response){
      categoryItems = response.data.menu_items;
      return categoryItems;
    }).catch(function (error) {
      console.log("Something went wrong. " + error.message);
    });
  };
}

})();
