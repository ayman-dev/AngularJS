(function() {
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var firstlist = this;

  firstlist.items = ShoppingListCheckOffService.getToBuyItems();

  firstlist.buyItem = function(itemPosition) {
    ShoppingListCheckOffService.buyItem(itemPosition);
  };

  firstlist.listLength = function() {
    return ShoppingListCheckOffService.ToBuyListLength();
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var secondlist = this;

  secondlist.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

  secondlist.listLength = function() {
    return ShoppingListCheckOffService.AlreadyBoughtListLenght();
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of items (ToBuy & AlreadyBought variables for each component)
  var tobuyitems = [];
  var alreadyboughtitems = [];

  // Loading initial data into ToBuy
  tobuyitems.push({ name : 'Apples', quantity : '2 bags'});
  tobuyitems.push({ name : 'Banana', quantity : '4 bags'});
  tobuyitems.push({ name : 'Orange', quantity : '4 bags'});
  tobuyitems.push({ name : 'Pineapple', quantity : '1 bag'});
  tobuyitems.push({ name : 'Strawberry', quantity : '3 bags'});
  tobuyitems.push({ name : 'Grape', quantity : '5 bags'});
  tobuyitems.push({ name : 'Avocado', quantity : '2 bags'});
  tobuyitems.push({ name : 'Kiwi', quantity : '3 bags'});
  tobuyitems.push({ name : 'Peach', quantity : '5 bags'});
  tobuyitems.push({ name : 'Lemon', quantity : '1 bag'});

  // Returns ToBuy Items for the first List
  service.getToBuyItems = function (){
    return tobuyitems;
  }

  // Returns AlreadyBought Items for the second List
  service.getAlreadyBoughtItems = function (){
    return alreadyboughtitems;
  }

  // Returns ToBuy length to trigger the display 'Everything was bought!' when length = 0 (ng-if)
  service.ToBuyListLength = function() {
    return tobuyitems.length;
  };

  // Returns AlreadyBough list Length to trigger the display of 'Nothing bought yet!' when length = 0 (ng-if)
  service.AlreadyBoughtListLenght = function() {
    return alreadyboughtitems.length;
  };

  // Push the ToBuy item to AlreadyBought and then slice it
  service.buyItem = function (ItemIndex){
    alreadyboughtitems.push(tobuyitems[ItemIndex]);
    tobuyitems.splice(ItemIndex,1);
  }

}

})();
