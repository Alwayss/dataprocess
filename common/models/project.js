module.exports = function(Project) {
	Project.definition.rawProperties.createTime.default =
		Project.definition.properties.createTime.default = function() {
			return new Date();
		};
	Project.definition.rawProperties.lastUpdated.default =
		Project.definition.properties.lastUpdated.default = function() {
			return new Date();
		};
	Project.definition.rawProperties.status.default =
		Project.definition.properties.status.default = function() {
			return "待上传";
		};

	Project.updateState = function(projectId,state,cb){
		var str="";
		if(state == '0'){
			str = "正在处理";
		}else if(state == '1'){
			str = "已完成";
		}else{
			str = "处理错误";
		}
		project.updateAll({id:projectId},{status:str},function(err){
			if(err) console.log(err);
			cb(null,{code:200,msg:'success'});
		})
	}
};
