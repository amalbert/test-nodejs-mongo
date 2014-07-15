'use strict';
var Controllers = angular.module('users.controllers',['users.services']);

Controllers.controller('UsersController',function ($scope, usersService) {
	function readUsersSuccess(data) {
		$scope.users = data;
	}
	function insertUserSuccess(data) {
		$scope.findUsers();
		$scope.newUser = {coords:[2, 42]};
	}
	function delUserSuccess(data) {
		$scope.findUsers();
	}
	
	$scope.findUsers = function() {
		usersService.search(null, readUsersSuccess);
	}
	$scope.findUsersByLoc = function(lon, lat, rayon) {
		usersService.searchByLoc(lon, lat, rayon, readUsersSuccess);
	}
	
	$scope.deleteUser = function(index) {
		usersService.del($scope.users[index]._id, delUserSuccess);
	}
	
	$scope.insertUser = function(user) {
		if ($scope.userForm.$valid) {
			usersService.insert(user, insertUserSuccess);
		}
	}
	
	$scope.newUser = {coords:[2, 42]};
	$scope.search = {lng: 2, lat: 42, rayon: 500};
	$scope.findUsers();
});