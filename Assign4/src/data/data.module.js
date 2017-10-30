(function () {
'use strict';

angular.module('Data', []);

angular.module('Data')
.config(function () {
  console.log("Spinner config fired.");
}).
run(function () {
  console.log("Spinner run fired.");
});

})();
