'use strict';

/**
 * @ngdoc overview
 * @name uavDataprocessFrontApp
 * @description
 * # uavDataprocessFrontApp
 *
 * Main module of the application.
 */
angular
	.module('uavDataprocessFrontApp',[
		'ngAnimate',
		'ngResource',
		'ngSanitize',
		'ui.router',
		'ui.bootstrap',
		'lbServices',
		'ngStorage',
		'ngFileUpload',
		'oitozero.ngSweetAlert',
		'ngAside',
		'infinite-scroll'
	])
	.config(function($urlRouterProvider){
		$urlRouterProvider.otherwise('/login');
	})
	.run(function($rootScope,$state,Auth,$timeout,$localStorage){
		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
	        Auth.isLoggedIn(function(logged){
	        	if(toState.authenticate && logged){            			//用户未登录根据用户的角色来控制页面的跳转
	        		if($localStorage.role == "admin"){               	//管理员
	    				if(toState.name.indexOf('admin') > -1){
	    					return;
	    				}else{
	    					event.preventDefault();
	    					$state.go('login');
	    				}
	    			}else{                                           	//普通用户
	    				if(toState.name.indexOf('admin') > -1){
	    					event.preventDefault();
	    					$state.go('login');
	    				}else{
	    					return;
	    				}
	    			}
	        	}else if(toState.authenticate && !logged){            	//用户未登录直接跳转至授权页面则强行跳转至登录页面
	        		event.preventDefault();
	        		$state.go('login');
	        	}
	        });
      		if(toState['name'].indexOf("admin") > -1){                
        		$rootScope.isAdmin = true;
     		}else{
        		$rootScope.isAdmin = false;
      		}
		});
		$rootScope.$on('addProject',function(event,data){
			$rootScope.$broadcast('addProjectSuccess',data);
		});
		$rootScope.$on('searchProject',function(event,data){
			$rootScope.$broadcast('searchProjectSuccess',data);
		});
	});
