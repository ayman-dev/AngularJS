(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)

	NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
	function NarrowItDownController($scope, MenuSearchService) {
		var menu = this;

		menu.displaySearchMenu = function (str){
			var str = $scope.menu_search;
			MenuSearchService.getMatchedMenuItems(str).then(
				function (foundItems) {
		    	menu.foundItems = foundItems;
		  		})
		  	.catch(function (error) {
		    console.log("Something went terribly wrong.");
		  	});

		}
	};

	MenuSearchService.$inject = ['$http','$q'];
	function MenuSearchService($http,$q) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
			var deferred = $q.defer();
			var message = "";
			var menu = [];
			console.log(searchTerm);

			var promise = $http({
			method: "GET",
			url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			});
			console.log(promise);

			promise.then(function (response) {
				console.log(searchTerm);
				//return response.data.menu_items;
		      	var foundItems = response.data.menu_items;
		      	console.log(foundItems);
		      	console.log(foundItems.length);
		      	for (var i = 0; i < foundItems.length ; i++) {
		      		//console.log(i + foundItems[i].name);
		      		if (!foundItems[i].name.includes(searchTerm)){
		      			console.log(foundItems[i].name);
		      			foundItems.splice(i,1);
		      			i--;
		      		}
		      	}
		      	console.log(foundItems);
		      	deferred.resolve(foundItems);
		    })
		return deferred.promise;
		}
	};

})();