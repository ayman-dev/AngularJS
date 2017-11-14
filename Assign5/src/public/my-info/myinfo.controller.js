(function () {

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService'];
function MyInfoController(MenuService) {
  var myinfoctrl = this;

  myinfoctrl.firstname = MenuService.firstname;
  myinfoctrl.lastname = MenuService.lastname;
  myinfoctrl.email = MenuService.email;
  myinfoctrl.phone = MenuService.phone;
  myinfoctrl.short_name = MenuService.short_name;
  myinfoctrl.name = MenuService.name;
  myinfoctrl.description = MenuService.description;

}

})();