/**
 * Created by admin on 2016/9/26.
 */
var async = require('async');

module.exports = function(app){
	var mongoDs = app.dataSources.mongoDs;
	var RoleMapping = app.models.RoleMapping;
	var project = app.models.project;

	async.parallel({
	  role: async.apply(createAdminRole),
	  accounts: async.apply(createAdminUser),
	  project: async.apply(changeExistedProject)
	}, function (err, results) {
	  if (err) throw err;
	  results.role.principals.create({          //默认admin为管理员用户
	    principalType: RoleMapping.USER,
	    principalId: results.accounts[0].id
	  }, function (err) {
	    if (err) throw err;
	  });
	  if(results.project > 0){                    
	  	project.updateAll({},{accountId:results.accounts[1].id},function(err,info){
	  		if (err) throw err;
	  	});
	  }

	});

	function createAdminRole(cb){
		mongoDs.automigrate('Role',function(err){
			if(err) return cb(err);
			var Role = app.models.Role;
			Role.create({name:'administrator',description:'系统管理员'},cb);
		});
	}

	function createAdminUser(cb){
		mongoDs.automigrate('account',function(err){
			if(err) return cb(err);
			var Account = app.models.account;
			Account.create([{username:'admin',password:'admin',email:'admin@infoearth.com'},{username:'guest',password:'guest',email:'guest@infoearth.com'}],cb);
		});
	}

	function changeExistedProject(cb){           //若数据库中存在project的数据则更新projectId为guest的用户ID
		project.count({},function(err,count){
			if(err) return cb(err);
			cb(null,count);
		});
	}
}