/**
 * Created by admin on 2016/9/28.
 */
angular.module('uavDataprocessFrontApp')
	.controller('loginCtrl',function($scope,Account,RoleMapping,$localStorage,$state,SweetAlert){
		$scope.user = {};
		$scope.login = function(){
			Account.login($scope.user,function(data){
				if(data.user.status == true){
					$localStorage.userId = data['userId'];
					$localStorage.token = data['id'];
					//查询该用户的角色信息
					RoleMapping.find({
						filter:{
							include:'role',
							where:{ principalId: data['userId'] }
						}
					},function(res){
						if(res.length == 1 && res[0].role.name == "administrator"){
							$localStorage.role="admin";
							$state.go('admin.index');
						}else{
							$localStorage.role="user";
							$state.go('home');
						}
					})
				}else{
					SweetAlert.swal("", "您未开启权限，请联系管理员","warning");
				}
			},function(err){
				alert(JSON.stringify(err));
			})
		}
	});