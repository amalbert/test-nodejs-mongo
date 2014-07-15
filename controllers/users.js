(function() {
	var User = require('../model/users');
	var mongodb = require('mongodb');
	var q = require("q");
	
	var api = {};
	api.save = function(req, res) {
		var user = new User(req.body);
		user.save(function (err) {
			if (err)
				throw err;
			res.send(user);
		});
	}

	api.list = function(req, res) {
		list().then(function (users) {
			console.log(users);
			res.setHeader('Content-Type', 'text/json');
			res.send(users);
		}, function (error) {
			console.log(error);
		});
		/*
		User.find(function(err, users) {
			res.setHeader('Content-Type', 'text/json');
			res.send(users);
		});*/
	}
	
	function list() {
		var deferred = q.defer();
		User.find(function(err, users) {
			if (err) deferred.reject(err);
			else deferred.resolve(users);
		});
		return deferred.promise;
	}

	api.detail = (function(req, res) {
		User.findOne({email: req.params.email}, function(error, user) {
			res.send([{user: user}]);
		})
	});
	
	api.del = (function(req, res) {
		//User.remove({email: req.params.email}, function(error, user) {
		User.remove({_id: new mongodb.ObjectID(req.params.id)}, function(error, user) {
			res.send({result: "ok"});
		})
	});
	
	api.near = function(req, res) {
		User.find({coords : { $nearSphere : [req.params.longitude, req.params.latitude], $maxDistance : req.params.dist/6371000}}, {dist: {$meta: "geoNearDistance"}}, 

		  function (error, users) {
			res.setHeader('Content-Type', 'text/json;charset=UTF-8');
			res.send(users);
		})
	}


    module.exports = {
        users : api
    }

}());