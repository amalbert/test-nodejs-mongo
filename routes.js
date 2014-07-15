(function() {
	var users = require('./controllers/users').users;
	var log = require('./logger').logger;

	this.configure = function(app, cluster) {
		app.all('*', function(req, res, next) {
			log.trace('Worker ' + cluster.worker.process.pid + ' received request ' + req.method + " " + req.url);
			if (req.method == "POST")
				log.trace(req.body);
			
			return next();
		});
		
		app.post('/users', users.save);
		app.get('/users/near/:latitude/:longitude/:dist?', users.near);
		app.get('/users/:email', users.detail);
		app.get('/users', users.list);
		app.delete('/users/:id', users.del);
	}
    module.exports = {
        routes : this
    }

}());