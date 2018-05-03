<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      海旗历史船期
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>发布时间</th>
          <th>货种</th>
          <th>吨位</th>
          <th>空船港</th>
          <th>空船时间</th>
        </thead>
        <tbody >
          <tr v-for="item in historyTrackArr">
            <td>{{item.AddDate}}</td>
            <td>{{item.GoodsTypeName}}</td>
            <td>{{item.LoadTom}}</td>
            <td>{{item.LoadPortName}}</td>
            <td>{{item.LoadDate}}</td>
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
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'historyTrack',
  components: {
    's-reload-btn': reloadBtn,
  },
  data () {
    return {
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
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="historyTrack"&&fromR.meta.pageId=="historyTrack") {
        this.getHistoryTack(1);
      }
    },
    getHistoryTack(pageIndex){
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/SreachShipList",{
        ShipName:this.$route.params.shipName,
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.$store.tabs.commit('assignNewTab', {
            path:this.$route.path,
            name:this.$route.params.shipName+"历史船期",
            isActive:true
          });
          this.historyTrackArr=retData.ShipList;
          this.totalCount=response.data.RetData.TotalRecord;
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
      this.getHistoryTack()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
