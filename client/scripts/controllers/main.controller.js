/**
 * Created by admin on 2016/9/27.
 */
angular.module('uavDataprocessFrontApp')
	.controller('mainCtrl',function($scope,Project,$aside,SweetAlert,Reddit,$localStorage){
		$scope.userId = $localStorage.userId;
		$scope.project = {};            //用来存储添加项目时数据 
		$scope.init = function(str){
			async.parallel({
			    one: function(callback) {
			    	Project.count({where:{accountId:$scope.userId}},function(data){
						$scope.allCount=data.count;
						callback(null, data.count);
					})
			    },
			    two: function(callback) {
			        Project.count({where:{status:"待上传",accountId:$scope.userId}},function(data){
						$scope.uploadCount=data.count;
						callback(null, data.count);
					})
			    },
			    three: function(callback) {
			        Project.count({where:{status:"待处理",accountId:$scope.userId}},function(data){
						$scope.treatCount=data.count;
						callback(null, data.count);
					})
			    },
			    four: function(callback) {
			       Project.count({where:{status:"正在处理",accountId:$scope.userId}},function(data){
						$scope.treatingCount=data.count;
						callback(null, data.count);
					})
			    },
			    five: function(callback) {
			        Project.count({where:{status:"已完成",accountId:$scope.userId}},function(data){
						$scope.completeCount=data.count;
						callback(null, data.count);
					})
			    }
			}, function(err, results) {
			    // results is now equals to: {one: 1, two: 2}
				var count = 0;
				if(str == '' || str == undefined || str == null){
					count = $scope.allCount;
				}else if(str=="待上传"){
					count = $scope.uploadCount;
				}else if(str=="待处理"){
					count = $scope.treatCount;
				}else if(str=="正在处理"){
					count = $scope.treatingCount;
				}else{
					count = $scope.completeCount;
				}
				$scope.reddit = new Reddit(str,count,$scope.userId);
				$scope.reddit.nextPage();
			});
		}
		$scope.init();

		$scope.$on('addProjectSuccess',function(evt,data){
			if(data.msg=="success"){
				$scope.init();
			}
		});
		$scope.$on('searchProjectSuccess',function(evt,data){
			if(data.data.length > 0){
				angular.forEach(data.data,function(item){
					item.createTime = moment(item.createTime).format('YYYY-MM-DD');
					item.lastUpdated = moment(item.lastUpdated).format('YYYY-MM-DD');
				});
			}
			$scope.reddit.items = data.data;
		});

		$scope.openAside=function(){
			$aside.open({
				templateUrl: 'asideContent.html',
				placement: 'bottom',
				size: 'lg',
				backdrop: true,
				controller: function ($scope,$uibModalInstance,$localStorage) {
					$scope.project={};
					$scope.ok = function (e) {
						$scope.project.accountId = $localStorage.userId;
						Project.create($scope.project,function(){
							$scope.$emit('addProject',{msg:'success'});
							SweetAlert.swal("", "添加成功","success");
						},function(err){
							SweetAlert.swal("", JSON.stringify(err),"warning");
						});
						$uibModalInstance.close();
						e.stopPropagation();
					};
					$scope.cancel = function (e) {
						$uibModalInstance.dismiss();
						e.stopPropagation();
					};
				}
			});
		}
	});
