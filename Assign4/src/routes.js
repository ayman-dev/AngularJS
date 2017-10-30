(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })

    // Premade list page
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/categorieslist.template.html',
        controller: 'CategoriesController as categoriesCtrl',
        resolve: {
            categories: ['MenuDataService', function(MenuDataService) {
                return MenuDataService.getAllCategories().then(function(response) {
                    return response.data;
                });
            }]
        }
    })

    // Items page
    .state('items', {
        url: '/items/{category}',
        templateUrl: 'src/menuapp/templates/itemslist.template.html',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
            items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.category).then(function(response) {
                    return response.data.menu_items;
                });
            }]
        }
    })
}

})();
