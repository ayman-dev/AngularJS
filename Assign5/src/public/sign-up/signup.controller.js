(function () {

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var signupctrl = this;
  var list;

  signupctrl.submit = function () {

    MenuService.getItemsByShortName(signupctrl.short_name)
    .then(function(response){
      MenuService.firstname = signupctrl.firstname;
      MenuService.lastname = signupctrl.lastname;
      MenuService.email = signupctrl.email;
      MenuService.phone = signupctrl.phone;
      MenuService.short_name = signupctrl.short_name;
      MenuService.name = response.name;
      MenuService.description = response.description;
      console.log(MenuService);
      signupctrl.errordiv = "Your information has been saved." ;
    })
    .catch(function (error) {
    	console.log("Something went terribly wrong.");
    	signupctrl.errordiv = "Please, try again. No such menu number exists.";
  	});
  };
}

})();