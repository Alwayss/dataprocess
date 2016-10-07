/**
 * Created by admin on 2016/9/28.
 */
angular.module('uavDataprocessFrontApp')
	.controller('adminUserCtrl',function($scope,$uibModal,Account,SweetAlert){
		function init(){
			Account.find({},function(data){
				angular.forEach(data,function(item){
					item.created = moment(item.created).format('YYYY-MM-DD');
					item.lastUpdated = moment(item.lastUpdated).format('YYYY-MM-DD');
					if(item.status == true){
						item.tag = "正常";
					}else{
						item.tag = "禁用";
					}
				});
				$scope.users = data;
			},function(err){
				alert(JSON.stringify(err));
			})
		}
		init();

		//改变当前用户的状态
		$scope.changeStatus=function(id,flag){
			Account.updateAll({
				where:{id:id}
			},{
				status:flag
			},function(res){
				if(res.count){
					init();
				}
			});
		};

		$scope.addUser = function(){
			var modalInstance = $uibModal.open({
				templateUrl:'addUserContent.html',
				controller:'addUserContentCtrl',
				size:''
			});
			modalInstance.result.then(function(user){
				Account.create(user,function(data){
					init();
					SweetAlert.swal("", "添加成功","success");
				},function(err){
					alert(JSON.stringify(err));
				})
			});
		}
	})
	.controller('addUserContentCtrl',function($scope,$uibModalInstance){
		$scope.user = {};
		$scope.ok = function(){
			$uibModalInstance.close($scope.user);
		};
		$scope.cancel = function(){
			$uibModalInstance.dismiss('cancel');
		};
	});