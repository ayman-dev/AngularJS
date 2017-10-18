(function(){
	'use strict';

	angular.module('LunchCheck', [])

	.controller('LunchCheckController', LunchCheckController)

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope){

		$scope.result = "";

		$scope.display = function(){
			var count = 0;
			if ($scope.dishes === undefined || $scope.dishes == ''){
				$scope.result = 'Please, enter data first';
				$scope.styleChangeResult = {
					"color" : "red"
				}
				$scope.styleChangeTextBox = {
					"border" : "1px solid #f00"
				}
			}
			else {
				count = Counter($scope.dishes);
				if (count < 4) {
					$scope.result = 'Enjoy!';
					$scope.styleChangeResult = {
						"color" : "limegreen"
					}
					$scope.styleChangeTextBox = {
						"border" : "1px solid #0f0"
					}
				}
				else {
					$scope.result = 'Too much!';
					$scope.styleChangeResult = {
						"color" : "limegreen"
					}
					$scope.styleChangeTextBox = {
						"border" : "1px solid #0f0"	
					}
				}
			}
		};

		function Counter(string){
			var array = string.split(',');
			return array.length;
		};
	};	

})();