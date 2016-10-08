var loopback = require('loopback');
var boot = require('loopback-boot');
var amqp = require('amqplib/callback_api');
var util = require('util');
var app = module.exports = loopback();

// app.use('/api/containers',function(req,res,next){
// 	if(req.query.id){
// 		var message = {
// 			Guid:req.query.id,
// 			Url:"D:/nodejs/uav-dataprocess/server/storage/data/"+req.query.filename
// 		};
// 		res.once('finish',function(){
// 			amqp.connect('amqp://localhost', function(err, conn) {
// 				conn.createChannel(function(err, ch) {
// 					var q = 'infoearth';
// 					ch.assertQueue(q, {durable: true});
// 					ch.sendToQueue(q, new Buffer(util.inspect(message)), {persistent: true});
// 				});
// 			});
// 			var project=app.models.project;
// 			project.updateAll({id:req.query.id},{status:"待处理"},function(err,pro){
// 				if(err) console.log(err);
// 			})
// 		});
// 	}
// 	next();
// });


app.start = function(){
	// start the web server
	return app.listen(function(){
		app.emit('started');
		var baseUrl = app.get('url').replace(/\/$/,'');
		console.log('Web server listening at: %s',baseUrl);
		if(app.get('loopback-component-explorer')){
			var explorerPath = app.get('loopback-component-explorer').mountPath;
			console.log('Browse your REST API at %s%s',baseUrl,explorerPath);
		}
	});
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app,__dirname,function(err){
	if(err) throw err;

	// start the server if `$ node server.js`
	if(require.main === module)
		app.start();
});
