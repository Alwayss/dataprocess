/**
 * Created by admin on 2016/9/27.
 */
angular.module('uavDataprocessFrontApp')
	.controller('headerCtrl',function($rootScope,$scope,Account,$localStorage,$state,$timeout,Project){
		$scope.logout=function(){
			delete $localStorage.token;
			delete $localStorage.userId;
			delete $localStorage.role;
			Account.logout({
				access_token:$localStorage.token
			},function(data){
				$state.go('login');
			},function(err){
				SweetAlert.swal("", JSON.stringify(err),"warning");
			})
		};
		$scope.dynamicPopover = {
		    templateUrl: 'myPopoverTemplate.html',
		    placement:'bottom',
		    text: ''
		};
		$scope.mykey=function(event){
			if(event.keyCode == 13){
				Project.find({
					filter:{"where":{"projectName":{"like":$scope.dynamicPopover.text},"accountId":$localStorage.userId}}
				},function(data){
					$scope.dynamicPopover.text='';
					$scope.$emit('searchProject',{ data:data});
				});
			}
		}
	});