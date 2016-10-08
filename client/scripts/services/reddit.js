angular.module('uavDataprocessFrontApp')
  .factory('Reddit', function(Project,$timeout) {
    var Reddit = function(type,count) {
      this.items = [];
      this.busy = false;
      this.pageIndex = 1;
      this.type = type;
      this.count = count;
    };

    Reddit.prototype.nextPage = function() {
      if (this.busy) return;
      this.busy = true;
      var temp = {};
      if(this.type == '' || this.type== undefined || this.type==null){
        temp = {};
      }else{
        temp = { status: this.type };
      }
      var list=[];
      if(this.items.length < this.count){
        Project.find({
          filter:{ where: temp,limit: 10, skip: (this.pageIndex - 1) * 10 }
        },function(data) {
          if(data.length > 0){
            angular.forEach(data,function(item){
              item.createTime = moment(item.createTime).format('YYYY-MM-DD');
              item.lastUpdated = moment(item.lastUpdated).format('YYYY-MM-DD');
              list.push(item);
            });
            this.items = this.items.concat(list);
            this.busy = false;
            this.pageIndex ++;
          }
        }.bind(this));
      }else{
        this.busy = false;
      }
    };

    return Reddit;
  });