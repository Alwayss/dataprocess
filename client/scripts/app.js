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
	.run(function($rootScope,$state){
		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
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
