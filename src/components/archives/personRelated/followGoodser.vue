<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      关注货主/被关注
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关注了谁" name="follow">
          <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
            <thead class="backGrey">
              <th>关注时间</th>
              <th>关注货主的昵称</th>
              <th>关注货主的电话号码</th>
              <th>小程序推送发布动态记录</th>
              <th>小程序最近推送时间</th>
            </thead>
            <tbody >
              <tr v-for="item in followArr">
                <td>{{item.AddTime}}</td>
                <td>{{item.NickName}}</td>
                <td>{{item.MobilePhone}}</td>
                <td>{{item.PushCount}}</td>
                <td>{{item.LastPushTime}}</td>
              </tr>
            </tbody>
          </table>
          <div class="pager" v-show='followTotalCount/followPageSize>1'>
            <el-pagination
              :current-page="currentFollowPage"
              @current-change="getFollowNewPage"
              layout="prev, pager, next"
              :page-size='followPageSize'
              :total="followTotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="被谁关注" name="beFollowed">
          <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
            <thead class="backGrey">
              <th>被关注时间</th>
              <th>被关注货主的昵称</th>
              <th>被关注货主的电话号码</th>
            </thead>
            <tbody >
              <tr v-for="item in beFollowedArr">
                <td>{{item.AddTime}}</td>
                <td>{{item.NickName}}</td>
                <td>{{item.MobilePhone}}</td>
              </tr>
            </tbody>
          </table>
          <div class="pager" v-show='beFollowedTotalCount/beFollowedPageSize>1'>
            <el-pagination
              :current-page="currentBeFollowedPage"
              @current-change="getGoodsNewPage"
              layout="prev, pager, next"
              :page-size='beFollowedPageSize'
              :total="beFollowedTotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
      
    </div>
  </div>
</template>

<script>
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'followGoodser',
  components: {
    's-reload-btn': reloadBtn,
  },
  created(){
  },
  activated(){
    this.getShipRecordList(1);
    this.getGoodsRecordList(1);
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"关注货主",
      isActive:true
    })
  },
  data () {
    return {
      activeName: 'follow',
      followArr:[],
      beFollowedArr:[],
      currentFollowPage:1,
      followPageSize:10,
      followTotalCount:0,
      currentBeFollowedPage:1,
      beFollowedPageSize:10,
      beFollowedTotalCount:0,
    }
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    handleClick(tab, event) {
    },
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="followGoodser"&&fromR.meta.pageId=="followGoodser") {
        this.getShipRecordList(1);
        this.getGoodsRecordList(1);
        this.$store.tabs.commit('assignNewTab', {
          path:this.$route.path,
          name:"关注货主",
          isActive:true
        });
      }
    },
    getShipRecordList(pageIndex){
      pageIndex>0?this.currentFollowPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/MyAttentionUserList",{
        MobilePhone:this.$route.params.phoneNumber,
        PageIndex:this.currentFollowPage,
        PageSize:this.followPageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.followArr=retData.ShipList;
          this.followTotalCount=response.data.RetData.TotalRecord;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
          this.followArr=[];
          this.followTotalCount=0;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getFollowNewPage(e){
      this.currentBeFollowedPage=e;
      this.getShipRecordList();
    },
    getGoodsRecordList(pageIndex){
      pageIndex>0?this.currentBeFollowedPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/MyBeAttentionUserList",{
        MobilePhone:this.$route.params.phoneNumber,
        PageIndex:this.currentBeFollowedPage,
        PageSize:this.beFollowedPageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.beFollowedArr=retData.ShipList;
          this.beFollowedTotalCount=response.data.RetData.TotalRecord;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
          this.beFollowedArr=[];
          this.beFollowedTotalCount=0;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getGoodsNewPage(e){
      this.currentBeFollowedPage=e;
      this.getGoodsRecordList();
    }
  }
}
</script>

<style scoped>
</style>
