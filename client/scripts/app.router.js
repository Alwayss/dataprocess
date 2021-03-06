/**
 * Created by admin on 2016/9/27.
 */
angular.module('uavDataprocessFrontApp')
	.config(function($stateProvider){
		$stateProvider
			.state('admin',{
				url:'/admin',
				templateUrl:'views/admin.html',
				abstract:true
			})
			.state('admin.index',{
				url:'/index',
				templateUrl:'views/admin-index.html',
				authenticate: true
			})
			.state('admin.users',{
				url:'/users',
				templateUrl:'views/admin-users.html',
				authenticate: true
			})
			.state('home',{
				url:'/home',
				templateUrl:'views/home.html',
				authenticate: true
			})
			.state('login',{
				url:'/login',
				templateUrl:'views/login.html'
			})
			.state('project',{
				url:'/project/:projectId',
				templateUrl:'views/project.html',
				authenticate: true
			})
	});