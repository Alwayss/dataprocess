/**
 * Created by admin on 2016/9/27.
 */
angular.module('uavDataprocessFrontApp')
	.controller('adminMainCtrl',function($scope,Account,Project){
		Account.count({},function(data){
			$scope.userCount=data['count'];
		});
		Project.count({},function(data){
			$scope.projectCount=data['count'];
		});
	});
