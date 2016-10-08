/**
 * Created by admin on 2016/9/26.
 */
var async = require('async');

module.exports = function(app){
	var mongoDs = app.dataSources.mongoDs;
	var RoleMapping = app.models.RoleMapping;

	async.parallel({
	  role: async.apply(createAdminRole),
	  accounts: async.apply(createAdminUser)
	}, function (err, results) {
	  if (err) throw err;
	  results.accounts.forEach(function (account) {
	    results.role.principals.create({
	      principalType: RoleMapping.USER,
	      principalId: account.id
	    }, function (err) {
	      if (err) throw err;
	    });
	  });
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
			Account.create([{username:'admin',password:'admin',email:'admin@admin.com'}],cb);
		});
	}
}