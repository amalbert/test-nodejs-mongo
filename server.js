var cluster = require('cluster');
var log = require('./logger').logger;
 
if (cluster.isMaster) {
	for (var i = 0; i < 2; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
		log.error('worker ' + worker.process.pid + ' died, restarting ...');
		setTimeout(function () {
			cluster.fork();
		},5000);
	});
	cluster.on('online', function(worker) {
		log.info("Worker " + worker.process.pid + " is online");
	});
} else {
	var express = require('express');
	var mongoose = require('mongoose');
	var app = express();
	var path = require('path');
	var bodyParser = require('body-parser');
	//var router = express.Router();

	var ipaddr  = '127.0.0.1';
	var port    =  80;
	
	
	var d = require('domain').create();

	d.on('error', function(er) {
		log.error('Mongo DB connection lost, trying to reconnect');
	});

	d.run(function() {
		mongoose.connect('mongodb://localhost/mongotest');
		log.info('Trying to connect to Mongo DB');
	});
	

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	//app.use(router);
	app.use(express.static(path.join(__dirname, 'public')));

	var routes = require('./routes').routes;
	routes.configure(app, cluster);

	app.listen(port, ipaddr, function() {
	   log.info('%s: Server started on %s:%d ...', Date(Date.now() ),
				   ipaddr, port);
	});
}