var __gutils=require('./../apps/gutils');
var __search=require('./../apps/services/search');
/*
 * GET home page.
 */

module.exports = function(app) {
	app.get('/', function(req, res) {
		// res.render('index', { title: 'Hello express' });
		__gutils.sendjson(200,'welcome to gererio',res);
	});

	app.get('/:clientId/api/healthcheck',function(req,res){
		__gutils.sendjson(200,'i am good, how you doing?');

	});
	app.get('/:clientId/api/search/:type',function(req,res){
		__search(req,res);

	});
	app.use(function(req,res){
		__gutils.e404("api call to ["+req.url+"] doesn't exists" ,res);

	});
	// app.get('/:clientId/api/:service/:subservice',function(req,res)){
	// 	console.log('api with service and subservice is accessed');
	// });
};

