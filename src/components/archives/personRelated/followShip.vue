<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      关注船队
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>订阅时间</th>
          <th>关注船舶</th>
          <th>服务号推送动态次数</th>
          <th>服务号最近推送时间</th>
        </thead>
        <tbody >
          <tr v-for="item in followShipArr">
            <td>{{item.AddTime}}</td>
            <td>{{item.ShipName}}</td>
            <td>{{item.PushCount}}</td>
            <td>{{item.LastPushTime}}</td>
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
  name: 'followShip',
  components: {
    's-reload-btn': reloadBtn,
  },
  created(){
    this.getReturnVisiteList(1);
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"关注船舶",
      isActive:true
    })
  },
/*  activated(){
    this.getReturnVisiteList(1);
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"关注船舶",
      isActive:true
    })
  },*/
  data () {
    return {
      followShipArr:[],
      currentPage:1,
      pageSize:10,
      totalCount:0,
    }
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="followShip"&&fromR.meta.pageId=="followShip") {
        this.getReturnVisiteList(1);
        this.$store.tabs.commit('assignNewTab', {
          path:this.$route.path,
          name:"关注船舶",
          isActive:true
        });
      }
    },
    getReturnVisiteList(pageIndex){
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/MyShipTeamList",{
        MobilePhone:this.$route.params.phoneNumber,
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.followShipArr=retData.ShipList;
          this.totalCount=response.data.RetData.TotalRecord;
        }else{
          this.followShipArr=[];
          this.totalCount=0;
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
      this.getReturnVisiteList();
    }
  }
}
</script>

<style scoped>
</style>
