/**
 * Created by admin on 2016/9/29.
 */
angular.module('uavDataprocessFrontApp')
	.controller('projectDetailCtrl',function($rootScope,$scope,$stateParams,Project,Upload,$timeout,$state,$window,Container){
		function init(){
			Project.findById({
				id:$stateParams.projectId
			},function(data){
				data.createTime=moment(data.createTime).format('YYYY-MM-DD');
				$scope.project = data;
				$scope.currentStep =getState($scope.project.status);
			},function(err){
				alert(JSON.stringify(err));
			})
		}
		init();

		function getState(str){
			var val= 0;
			switch(str){
				case "待上传":
					val=1;
					break;
				case "待处理":
					val=2;
					break;
				case "正在处理":
					val=3;
					break;
				case "已完成":
					val=4;
					break;
				case "处理错误":
					val=4;
					break;
			}
			return val;
		}

		$scope.upload = function (file) {
			var guid = $stateParams.projectId;
			Container.createContainer({
				name:guid
			},function(data){
				$scope.progress=0;
				$scope.showProgress=true;
				$scope.isMax=false;
				var newName = guid + '.' + file.name.split('.')[1];
				Upload.rename(file,newName);
				Upload.upload({
					url: '/api/containers/'+ guid +'/upload?id=' + guid + '&filename=' + newName,
					data: {file: file}
				}).then(function (resp) {
					console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
				}, function (resp) {
					console.log('Error status: ' + resp.status);
				}, function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					$scope.isMax=false;
					if(progressPercentage ==100){
						$timeout(function(){
							$scope.isMax=true;
						},1000);
						$timeout(function(){
							$scope.showProgress=false;
							init();
						},2000);
					}
					$scope.progress = progressPercentage;
					$scope.style= {
						"width":$scope.progress+"%"
					};
					console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
				});
			});

		};

		$scope.downloadFile=function(id){
			$window.open('/api/containers/'+id+'/download/'+id+'.zip');
		};

		$scope.goBack = function(){
			$state.go('home');
		}
	});