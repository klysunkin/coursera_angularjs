(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ["ShoppingListCheckOffService"];
AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];

function ToBuyController(ShoppingListCheckOffService) {
	var toBuy = this;
	toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

	toBuy.buy = function (itemIndex) {
		ShoppingListCheckOffService.buyItem(itemIndex);
	}
}

function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought = this;
	bought.itemsBought = ShoppingListCheckOffService.getItemsBought();
}


function ShoppingListCheckOffService() {
	var service = this;

	var itemsToBuy = [
		{name: "Eggs", quantity: 20},
		{name: "Cookies", quantity: 5},
		{name: "Milk bottles", quantity: 2},
		{name: "Tea pot", quantity: 1},
		{name: "Bread", quantity: 1},
		{name: "Onions", quantity: 7}
	];
	var itemsBought = [];

	service.buyItem = function (itemIdex) {
		var item = itemsToBuy[itemIdex];
		itemsToBuy.splice(itemIdex, 1);
		itemsBought.push(item);
	};

	service.getItemsToBuy = function () {
		return itemsToBuy;
	};

	service.getItemsBought = function () {
		return itemsBought;
	};
}
})();