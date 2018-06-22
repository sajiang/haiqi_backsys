<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      广告位历史
      
    </div>
    <div>
    	<div>
	    	<span class="mgr10">建立时间：{{baseInfo.CreateTimeStr}}</span>
	    	<span class="mgl10">建立人：{{baseInfo.CreatePerson}}</span>
	    </div>
    </div>
    
    <div class=" mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>吨位区间</th>
          <th>装货港-卸货港</th>
          <th>货物名称</th>
          <th>价格</th>
          <th>涨幅</th>
          <th>发布时间</th>
          <th>操作时间</th>
          <th>操作人</th>
        </thead>
        <tbody >
          <tr v-for="item in historyTrackArr">
            <td>
              <span v-if="item.MinTonnage!=item.MaxTonnage">{{item.MinTonnage}}-{{item.MaxTonnage}}</span>
              <span v-else>{{item.MinTonnage}}</span>
            </td>
            <td>
              <span>{{item.CourseStart}}-{{item.CourseEnd}}</span>
            </td>
            <td>
              <span>{{item.GoodType}}</span>
            </td>
            <td>
              <span>{{item.StartPrice}}-{{item.MaxPrice}}</span>
            </td>
            <td>
              <span :class="item.ZF.substr(0,item.ZF.length-1)>0?'red':(item.ZF.substr(0,item.ZF.length-1)<0)?'green':''">{{item.ZF}}</span>
            </td>
            <td>
              <span>{{item.AddTimeStr}}</span>
            </td>
            <td>
              <span>{{item.NowTimeStr}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
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
  name: 'freightHistory',
  
  data () {
    return {
      baseInfo:{},
      historyTrackArr:[],
      currentPage:1,
      pageSize:10,
      totalCount:0,
    }
  },
  created(){
  },
  activated(){
    this.getHistoryTack(1);
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"历史运价",
      isActive:true
    });
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="freightHistory"&&fromR.meta.pageId=="freightHistory") {
        this.getHistoryTack(1);
      }
    },
    getHistoryTack(pageIndex){
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/QueryHistoryShipFreightPrice",{
        TId:this.$route.params.TId,
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.baseInfo=retData;
          this.historyTrackArr=retData.list;
          this.totalCount=response.data.RetData.TotalRecord;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getNewPage(e){
      this.currentPage=e;
      this.getHistoryTack()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
