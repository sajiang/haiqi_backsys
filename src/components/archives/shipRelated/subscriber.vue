<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      {{$route.params.shipName}}被订阅记录
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>订阅时间</th>
          <th>订阅昵称</th>
          <th>订阅人员电话号码</th>
        </thead>
        <tbody >
          <tr v-for="item in subscriberArr">
            <td>{{item.AddTime}}</td>
            <td>{{item.NickName}}</td>
            <td>{{item.MobilePhone}}</td>
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
  name: 'subscriber',
  components: {
    's-reload-btn': reloadBtn,
  },
  data () {
    return {
      subscriberArr:[],
      currentPage:1,
      pageSize:10,
      totalCount:0,
    }
  },
  created(){
  },
  activated(){
   this.getSubscriberList(1);
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="subscriber"&&fromR.meta.pageId=="subscriber") {
        this.getSubscriberList(1);
      }
    },
    getSubscriberList(pageIndex){
      this.$store.tabs.commit('assignNewTab', {
        path:this.$route.path,
        name:this.$route.params.shipName+"被订阅",
        isActive:true
      });
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/SearchShipBeAttention",{
        ShipName:this.$route.params.shipName,
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          
          this.subscriberArr=retData.UserList;
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
      this.getSubscriberList();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
