<template>
  <div>
    <div class="hello">
      <div class="clearfix grey8C">
        <span>首页>订单管理>货险订单</span>
      </div>
    </div>
    <el-row class="mgt20">
      <el-col :span="10" :offset="4"><el-input v-model="keyword" placeholder="搜索编号/电话"></el-input></el-col>
      <el-col :span="6"><el-button type="primary" @click="getInsuranceList(1)">搜索</el-button></el-col>
    </el-row>
    <div class="baseInfo mgt20">
      <div class="tableName">
        <span>订单列表</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>编号</th>
          <th>货险类别</th>
          <th>保险公司</th>
          <th>货种</th>
          <th>货值/元</th>
          <th>货物数量</th>
          <th>费率</th>
          <th>小程序昵称</th>
          <th>付款人电话</th>
          <th>下单时间</th>
          <th>保费</th>
          <th>提示</th>
          <th>状态</th>
        </thead>
        <tbody >
          <tr v-for="item in insuranceList" @click="toGoodsInsuranceDetail(item)">
            <td>{{item.InsuranceNum}}</td>
            <td>{{item.Gins_BaseTypeName}}</td>
            <td>{{item.Gins_BaseCompanyName}}</td>
            <td>{{item.Gins_BaseGoodsTypeName}}</td>
            <td class="red">{{item.GoodsValue}}</td>
            <td>{{item.GoodsQuantity}}</td>
            <td>{{item.InsuranceRate}}</td>
            <td>{{item.nickname}}</td>
            <td>{{item.PayerMobile}}</td>
            <td>{{item.AddTimeStr}}</td>
            <td class="red">{{item.InsurancePremium}}</td>
            <td><span class="backRed dot" v-if="item.Tip">{{item.Tip}}</span></td>
            <td>{{item.StateName}}</td>
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
  name: 'HelloWorld',
  data () {
    return {
      keyword: '',
      insuranceList:[{}],
      currentPage:1,
      pageSize:10,
      totalCount:0,
    }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"货险订单",
      isActive:true
    });
  },
  created(){
    this.getInsuranceList();
  },
  methods:{
    getNewPage(e){
      this.currentPage=e;
      this.getInsuranceList()
    },
    getInsuranceList(pageIndex){
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Insurance/QueryGoodsInsuranceOrderList",{
        KeyWord:this.keyword,
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.insuranceList=retData.list;
          this.totalCount=response.data.RetData.TotalCount;
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
    toGoodsInsuranceDetail(item){
      this.$router.push({ path: `/main/insurance/goodsInsuranceDetail/${item.InsuranceBaseInfoId}` });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
