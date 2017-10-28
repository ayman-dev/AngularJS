(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems', FoundItemsDirective);

	function FoundItemsDirective() {
	  	var ddo = {
	     	templateUrl: 'menu-list.html',
	     	scope: {
			    found: '<',
			    show: '<',
			    wait: '<'
		    },
		    controller: FoundItemsDirectiveController,
    		controllerAs: 'menu',
    		bindToController: true
	    };
	    
	  	return ddo;
	}

	function FoundItemsDirectiveController() {
	  	var menu = this;

	  	menu.removeFromMenu = function(index){
			menu.found.splice(index, 1);
		}

	}

	NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
	function NarrowItDownController($scope, MenuSearchService) {
		var menu = this;
		
		menu.showMessage = false;
		menu.connectionInProgress = false;

		menu.displaySearchMenu = function (str){
			var str = $scope.menu_search;
			menu.connectionInProgress = true;

			if (str === undefined || str == ''){
				menu.foundItems = [];
				menu.showMessage = true;
				menu.connectionInProgress = false;
			}
			else {
				menu.showMessage = false;
				MenuSearchService.getMatchedMenuItems(str)
				.then(function (foundItems) {
		    		menu.foundItems = foundItems;
		    		menu.connectionInProgress = false;
		    		if (menu.foundItems.length == 0) menu.showMessage = true;
		  		})
		  		.catch(function (error) {
		    		console.log("Something went terribly wrong.");
		  		});
		  	}
		}
	};

	MenuSearchService.$inject = ['$http','$q'];
	function MenuSearchService($http,$q) {
		var service = this;
		var menu = [];

		service.getMatchedMenuItems = function (searchTerm) {
			var deferred = $q.defer();

			var promise = $http({
			method: "GET",
			url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			});
			
			promise.then(function (response) {
		      	var foundItems = response.data.menu_items;
		      	for (var i = 0; i < foundItems.length ; i++) {
		      		if (!foundItems[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
		      			foundItems.splice(i,1);
		      			i--;
		      		}
		      	}
		      	deferred.resolve(foundItems);
		    })

		return deferred.promise;
		}
	};
})();