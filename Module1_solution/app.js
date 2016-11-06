(function () {
    "use strict";

    angular.module("module1Solution", [])
        .controller("LunchCheckController", Mod1Controller);

    Mod1Controller.$inject = ["$scope"];
    function Mod1Controller($scope) {
        $scope.lunchMenu = "";
        $scope.checkResultMessage = "";
        $scope.checkItems = function () {
            var itemsCount = CheckMenuItems($scope.lunchMenu);
            $scope.checkResultMessage = itemsCount == 0 ? "Please enter data first" : itemsCount <= 3 ? "Enjoy!" : "Too much!";
        }
    }

    function CheckMenuItems(items) {
        return items.split(',')
            .map(function (o) {
                return o.trim();
            }).filter(function (o) {
                return o.length > 0;
            }).length;
    }

})();