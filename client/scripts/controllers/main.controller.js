/**
 * Created by admin on 2016/9/27.
 */
angular.module('uavDataprocessFrontApp')
	.controller('mainCtrl',function($scope,Project,$aside,SweetAlert,Reddit){
		$scope.project = {};
		$scope.pageIndex = 1;
		$scope.init = function(str){
			async.parallel({
			    one: function(callback) {
			    	Project.count({},function(data){
						$scope.allCount=data.count;
						callback(null, data.count);
					})
			    },
			    two: function(callback) {
			        Project.count({where:{status:"待上传"}},function(data){
						$scope.uploadCount=data.count;
						callback(null, data.count);
					})
			    },
			    three: function(callback) {
			        Project.count({where:{status:"待处理"}},function(data){
						$scope.treatCount=data.count;
						callback(null, data.count);
					})
			    },
			    four: function(callback) {
			       Project.count({where:{status:"正在处理"}},function(data){
						$scope.treatingCount=data.count;
						callback(null, data.count);
					})
			    },
			    five: function(callback) {
			        Project.count({where:{status:"已完成"}},function(data){
						$scope.completeCount=data.count;
						callback(null, data.count);
					})
			    }
			}, function(err, results) {
			    // results is now equals to: {one: 1, two: 2}
			    console.log(results);
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
				$scope.reddit = new Reddit(str,count);
			});
		}
		//$scope.init = function(str){
			
			// if(str == "" || str == undefined || str==null){
			// 	var temp= {};
			// }else{
			// 	var temp = { status:str };
			// }
			// Project.find({
			// 	filter:{ where:temp,limit:20,skip:($scope.pageIndex-1) * 20 }
			// },function(data){
			// 	if(data.length > 0){
			// 		angular.forEach(data,function(item){
			// 			item.createTime = moment(item.createTime).format('YYYY-MM-DD');
			// 			item.lastUpdated = moment(item.lastUpdated).format('YYYY-MM-DD');
			// 		});
			// 	}
			// 	$scope.projects = data;
			// },function(err){
			// 	SweetAlert.swal("", JSON.stringify(err),"warning");
			// });
			
		//};
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
				controller: function ($scope,$uibModalInstance) {
					$scope.project={};
					$scope.ok = function (e) {
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
