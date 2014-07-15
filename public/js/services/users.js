'use strict';
var Services = angular.module('users.services',[]);

Services.factory('usersService',function($http) {

	var instance = {};
	instance.search = function(email, success) {
		$http({method: 'GET', url: '/users'}).
		success(function(data) {
			success(data);
		});
	};
	
	instance.searchByLoc = function(lon, lat, rayon, success) {
		$http({method: 'GET', url: '/users/near/' + lat + '/' + lon + '/' + rayon}).
		success(function(data) {
			success(data);
		});
	};
	
	instance.insert = function(user, success) {
		$http({method: 'POST', url: '/users', data: user}).
		success(function(data) {
			success(data);
		});
	};
	
	instance.del = function(id, success) {
		$http({method: 'DELETE', url: '/users/' + id}).
		success(function(data) {
			success(data);
		});
	};
	return instance;
});