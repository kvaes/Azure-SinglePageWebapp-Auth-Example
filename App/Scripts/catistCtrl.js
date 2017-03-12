'use strict';
angular.module('catApp')
.controller('catListCtrl', ['$scope', '$location', 'catListSvc', 'adalAuthenticationService', function ($scope, $location, catListSvc, adalService) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.catList = null;
    $scope.editingInProgress = false;
    $scope.newCatCaption = "";


    $scope.editInProgressCat = {
        Description: "",
        ID: 0
    };

    

    $scope.editSwitch = function (cat) {
        cat.edit = !cat.edit;
        if (cat.edit) {
            $scope.editInProgressCat.Description = cat.Description;
            $scope.editInProgressCat.ID = cat.ID;
            $scope.editingInProgress = true;
        } else {
            $scope.editingInProgress = false;
        }
    };

    $scope.populate = function () {
        catListSvc.getItems().success(function (results) {
            $scope.catList = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.delete = function (id) {
        catListSvc.deleteItem(id).success(function (results) {
            $scope.loadingMessage = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.update = function (cat) {
        catListSvc.putItem($scope.editInProgressCat).success(function (results) {
            $scope.loadingMsg = "";
            $scope.populate();
            $scope.editSwitch(cat);
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.add = function () {

        catListSvc.postItem({
            'Description': $scope.newCatCaption,
            'Owner': adalService.userInfo.userName
        }).success(function (results) {
            $scope.loadingMsg = "";
            $scope.newCatCaption = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMsg = "";
        })
    };
}]);