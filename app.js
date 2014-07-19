
/**
 * Module dependencies.
 */

var express = require('express');
var config= require('./conf/config')();

var app = module.exports = express.createServer();


var logger=function(req,res,next){
	console.log('[Request] '+req.url + ' is processed');
	next();
};

app.use(logger);


require('./routes/routes.js')(app);
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('dev', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('prod', function(){
  app.use(express.errorHandler()); 
});

app.listen(config.port);
console.log("Express server listening on port %d in %s mode", config.port, config.env);
