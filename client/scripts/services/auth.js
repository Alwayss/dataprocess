'use strict';

angular.module('uavDataprocessFrontApp')
  .factory('Auth', function Auth($location, $rootScope, $localStorage, $q, Account, $state) {
    // var currentUser = {};
    // if($localStorage.userId) {
    //   	Account.findById({ id:$localStorage.userId },function(user){
    //   		currentUser = user;
    //   	},function(err){
    //   		console.log(err);
    //   	})
    // }

    return {
    	isLoggedIn:function(cb){
        if($localStorage.userId){
          cb(true);
        }else{
          cb(false);
        }
    	}
    };
  });
