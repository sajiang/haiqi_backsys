<template>
<div id="goodsAndShipRecord" class="wraper">
    <div class="clearfix grey8C">
      发布船期/货盘记录
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发布船期记录" name="ship">
          <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
            <thead class="backGrey">
              <th>发布时间</th>
              <th>船名</th>
              <th>货种</th>
              <th>吨位</th>
              <th>空船港口</th>
              <th>空港时间</th>
            </thead>
            <tbody >
              <tr v-for="item in shipRecordArr">
                <td>{{item.AddDate}}</td>
                <td>{{item.ShipName}}</td>
                <td>{{item.GoodsTypeName}}</td>
                <td>{{item.LoadTom}}</td>
                <td>{{item.LoadPortName}}</td>
                <td>{{item.LoadDate}}</td>
              </tr>
            </tbody>
          </table>
          <div class="pager" v-show='shipTotalCount/shipPageSize>1'>
            <el-pagination
              :current-page="currentShipPage"
              @current-change="getShipNewPage"
              layout="prev, pager, next"
              :page-size='shipPageSize'
              :total="shipTotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发布货盘记录" name="Goods">
          <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
            <thead class="backGrey">
              <th>发布时间</th>
              <th>货种</th>
              <th>货量</th>
              <th>装货港</th>
              <th>卸货港</th>
              <th>装载日期</th>
              <th>备注</th>
              <th>是否公开</th>
              <th>被联系</th>
              <th>被浏览</th>
            </thead>
            <tbody >
              <tr v-for="item in goodsRecordArr">
                <td>{{item.AddTime}}</td>
                <td>{{item.GoodsTypeName}}</td>
                <td>{{item.CargoVolume}}</td>
                <td>{{item.StartPortName}}</td>
                <td>{{item.EndPortName}}</td>
                <td>{{item.LoadDate}}</td>
                <td>{{item.Remarks}}</td>
                <td>{{item.IsOpenText}}</td>
                <td>{{item.ContactNum}}</td>
                <td>{{item.ViewNum}}</td>
              </tr>
            </tbody>
          </table>
          <div class="pager" v-show='goodsTotalCount/goodsPageSize>1'>
            <el-pagination
              :current-page="currentGoodsPage"
              @current-change="getGoodsNewPage"
              layout="prev, pager, next"
              :page-size='goodsPageSize'
              :total="goodsTotalCount">
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
  name: 'goodsAndShipRecord',
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
      name:"发布记录",
      isActive:true
    });
  },
  data () {
    return {
      activeName: 'ship',
      shipRecordArr:[],
      goodsRecordArr:[],
      currentShipPage:1,
      shipPageSize:10,
      shipTotalCount:0,
      currentGoodsPage:1,
      goodsPageSize:10,
      goodsTotalCount:0,
    }
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    handleClick(tab, event) {
    },
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="goodsAndShipRecord"&&fromR.meta.pageId=="goodsAndShipRecord") {
        this.getShipRecordList(1);
        this.getGoodsRecordList(1);
        this.$store.tabs.commit('assignNewTab', {
          path:this.$route.path,
          name:"发布记录",
          isActive:true
        });
      }
    },
    getShipRecordList(pageIndex){
      pageIndex>0?this.currentShipPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/PublicShipListLog",{
        CompanyStaffId:this.$route.params.personId,
        PageIndex:this.currentShipPage,
        PageSize:this.shipPageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.shipRecordArr=retData.ShipList;
          this.shipTotalCount=response.data.RetData.TotalRecord;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
          this.shipRecordArr=[];
          this.shipTotalCount=0;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getShipNewPage(e){
      this.currentGoodsPage=e;
      this.getShipRecordList();
    },
    getGoodsRecordList(pageIndex){
      pageIndex>0?this.currentGoodsPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/PublicGoodsLog",{
        CompanyStaffId:this.$route.params.personId,
        PageIndex:this.currentGoodsPage,
        PageSize:this.goodsPageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.goodsRecordArr=retData.GoodsList;
          this.goodsTotalCount=response.data.RetData.TotalRecord;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
          this.goodsRecordArr=[];
          this.goodsTotalCount=0;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getGoodsNewPage(e){
      this.currentGoodsPage=e;
      this.getGoodsRecordList();
    }
  }
}
</script>

<style scoped>
</style>
