<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      广告位历史
      
    </div>
    <div>
    	<div class="mgt20">
	    	<span class="mgr10">建立时间：{{new Date(historyData.AddTime).toLocaleString()}}</span>
	    	<span class="mgl10">建立人：{{historyData.N_AdminName}}</span>
	    </div>
	    <div class="mgt10">
	    	<span class="mgr10">服务端：{{historyData.PortName}}</span>
	    	<span class="mgr10 mgl10">页面：{{historyData.PageName}}</span>
	    	<span class="mgr10 mgl10">类型：{{historyData.AdType}}</span>
	    	<span class="fr">图片大小：{{historyData.ImgSize}}</span>
	    </div>
    </div>
    
    <div class="baseInfo mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>图片信息</th>
          <th>起始时间</th>
          <th>结束时间</th>
          <th>备注</th>
          <th>跳转链接</th>
          <th>出现频率</th>
          <th>出现时长</th>
          <th>上传时间</th>
          <th>上传人</th>
        </thead>
        <tbody >
          <tr v-for="item in historyData.list">
            <td>{{item.ImgName}}</td>
            <td>{{item.StartTimeStr}}</td>
            <td>{{item.EndTimeStr}}</td>
            <td>{{item.Remark}}</td>
            <td>{{item.SkipUrl}}</td>
            <td>{{item.Hz==1?'每天出现一次':(item.Hz==2?'每次都出现':'只出现一次')}}</td>
            <td>{{item.HzDuration}}</td>
            <td>{{item.AddTimeStr}}</td>
            <td>{{item.AdminName}}</td>
          </tr>
        </tbody>
      </table>
      <div class="pager" v-show='totalCount/pageSize>1'>
        <el-pagination
          :current-page="currentPage"
          @current-change="getNewPage"
          layout="prev, pager, next"
          :page-size='pageSize'
          :total="totalCount">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'adHistory',
  
  data () {
    return {
    	historyData:{
    		list:[],
    	},
		currentPage:1,
		pageSize:10,
		totalCount:0,
    }
  },
  created(){
  },
  activated(){
    this.getHistoryList(1);
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="adHistory"&&fromR.meta.pageId=="adHistory") {
        this.getHistoryList(1);
      }
    },
    getHistoryList(pageIndex){
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/QueryHistoryAdList",{
        AdId:this.$route.params.columnId,
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.historyData=retData.model;
          this.totalCount=retData.TotalCount;
          this.$store.tabs.commit('assignNewTab', {
            path:this.$route.path,
            name:retData.model.AdType+"历史广告",
            isActive:true
          });
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
          this.$store.tabs.commit('assignNewTab', {
            path:this.$route.path,
            name:response.data.RetMsg,
            isActive:true
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getNewPage(e){
      this.currentPage=e;
      this.getHistoryList()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
