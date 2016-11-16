(function () {
"use strict";

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('BaseUrl', 'https://davids-restaurant.herokuapp.com');

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var ctrl = this;

	ctrl.input = '';

	ctrl.found = [];

	ctrl.showNothing = false;


	ctrl.filter = function () {
		var searchTerm = ctrl.input;
		if (searchTerm && searchTerm.length > 0) {
			MenuSearchService.getMatchedMenuItems(searchTerm)
			.then(function(result) {
				ctrl.found = result;
				ctrl.showNothing = ctrl.found.length == 0;
			});
		} else {
			ctrl.found = [];
			ctrl.showNothing = true;
		}
	}

	ctrl.remove = function (index) {
		ctrl.found.splice(index, 1);
		ctrl.showNothing = ctrl.found.length == 0;
	}
}

MenuSearchService.$inject = ['$http', 'BaseUrl'];
function MenuSearchService($http, BaseUrl) {
	var search = this;

	search.getMatchedMenuItems = function(searchTerm) {
		return $http({
				      method: 'GET',
				      url: (BaseUrl + '/menu_items.json')
				    }).then(function (result) {
		      // process result and only keep items that match
		      var foundItems = result.data.menu_items.filter(function (item) {
		      	return item.description.indexOf(searchTerm) >=0;
		      });
		      return foundItems;
		  });
	}
}

function FoundItemsDirectiveController() {
	var list = this;
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'found_items.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundlist',
    bindToController: true,
    transclude: true
  };

  return ddo;
}
})();