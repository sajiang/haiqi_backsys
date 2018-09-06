<template>
  <div class="statement">
    <div class="clearfix grey8C">
      <span>首页>订单管理>新增保单</span>
    </div>
    <el-table border
    :data="tableData">
    <el-table-column label="编号" prop="InsuranceNum" width="165"></el-table-column>
    <el-table-column label="保险单号" prop="GSNum" width="120"></el-table-column>
    <el-table-column label="被保险人名称" prop="Subject" width="100"></el-table-column>
    <el-table-column label="保险公司" prop="InsuranceCompany" width="120"></el-table-column>
    <el-table-column label="船舶名称" prop="ShipName" width="120"></el-table-column>
    <el-table-column label="联系人" prop="LinkMan" width="120"></el-table-column>
    <el-table-column label="联系电话" prop="Mobile" width="120"></el-table-column>
    <el-table-column label="货物名称" prop="GoodsName" width="120"></el-table-column>
    <el-table-column label="数量（吨）" prop="GoodsQuantity" width="120"></el-table-column>
    <el-table-column label="起运港" prop="StartPoint" width="100"></el-table-column>
    <el-table-column label="中转点" prop="TransferPoint" width="100"></el-table-column>
    <el-table-column label="目的港" prop="AimPoint" width="100"></el-table-column>
    <el-table-column  label="保额（万元）" prop="CoverageNum" width="120"></el-table-column>
    <el-table-column  label="保费" prop="InsurancePremium" width="120"></el-table-column>
    <el-table-column label="起运时间" width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.StartDate.split("T")[0]}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="收款金额" prop="ReceiptNum" width="120"></el-table-column>
    <el-table-column label="收款时间" prop="ReceiptTime" width="120"></el-table-column>
    <el-table-column  label="付款金额" prop="PayNum" width="120"></el-table-column>
    <el-table-column label="付款时间" prop="PayTime" width="120"></el-table-column>
    <el-table-column label="推荐人" prop="RecommentMan" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].RecommentMan" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.RecommentMan }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="总佣金" width="130" align="center">
      <template slot-scope="scope" >
        <div v-if="tableEditData[scope.$index].isEdit" >
          <span>{{ scope.row.InsurancePremium }}×</span>
          <el-input  class="rateInput" v-model="tableEditData[scope.$index].AllCommissionRate" placeholder="费率"></el-input>
        </div>
        <span v-else>{{ scope.row.AllCommission }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="业务员佣金" width="130" align="center">
      <template slot-scope="scope">
        <div v-if="tableEditData[scope.$index].isEdit">
          <span>{{ scope.row.InsurancePremium }}×</span>
          <el-input class="rateInput" v-model="tableEditData[scope.$index].SMCommissionRate" placeholder="费率"></el-input>
        </div>
        <span v-else>{{ scope.row.SMCommission }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="保险负责人佣金" width="130" align="center">
      <template slot-scope="scope">
        <div v-if="tableEditData[scope.$index].isEdit">
          <span>{{ scope.row.InsurancePremium }}×</span>
          <el-input class="rateInput" v-model="tableEditData[scope.$index].PPCommissionRate" placeholder="费率"></el-input>
        </div>
        <span v-else>{{ scope.row.PPCommission }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="是否退佣" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].IsBackCommission" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.IsBackCommission }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="备注" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].Remark" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.Remark }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <i class="fa fa-save" @click="handleSave(scope.$index, scope.row)" v-if="tableEditData[scope.$index].isEdit"></i>
        <i class="fa fa-sign-out" @click="handleOut(scope.$index, scope.row)" v-if="tableEditData[scope.$index].isEdit"></i>
        <i class="fa fa-edit" @click="handleEdit(scope.$index, scope.row)" v-else></i>
      </template>
    </el-table-column>
  </el-table>
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
</template>

<script>
export default {
  name: 'statement',
  data () {
    return {
      currentPage:1,
      pageSize:10,
      totalCount:0,
      tableData: []
    }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"对账单",
      isActive:true
    });
  },
  created(){
    this.getData();
  },
  methods: {
    getData(pageIndex){
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Insurance/QueryPayAccountStatement",{
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.totalCount=response.data.RetData.TotalCount;
          for (var i = response.data.RetData.list.length - 1; i >= 0; i--) {
            response.data.RetData.list[i].isEdit=false;
          }
          this.tableData=response.data.RetData.list;
          this.tableEditData=response.data.RetData.list.slice(0)
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
      this.getData()
    },
    handleEdit(index, row) {
      this.tableEditData[index].isEdit=true;
    },
    handleOut(index){
      this.tableEditData[index].isEdit=false;
    },
    handleSave(index, row){
      this.tableEditData[index].isEdit=false;
      
      this.$axios.post(this.$store.commonData.state.url+"Insurance/UpdatePayAccountStatement",{
        Gins_OrderBaseInfoId:this.tableEditData[index].Gins_OrderBaseInfoId,
        RecommentMan:this.tableEditData[index].RecommentMan,
        AllCommissionRate:this.tableEditData[index].AllCommissionRate,
        AllCommission:this.tableEditData[index].AllCommissionRate*this.tableEditData[index].InsurancePremium,
        SMCommissionRate:this.tableEditData[index].SMCommissionRate,
        SMCommission:this.tableEditData[index].SMCommissionRate*this.tableEditData[index].InsurancePremium,
        PPCommissionRate:this.tableEditData[index].PPCommissionRate,
        PPCommission:this.tableEditData[index].PPCommissionRate*this.tableEditData[index].InsurancePremium,
        IsBackCommission:this.tableEditData[index].IsBackCommission,
        Remark:this.tableEditData[index].Remark
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.tableData[index]=this.tableEditData[index];
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/deep/.el-table td, .el-table th{
  padding-right: 0;
  padding-left: 0;
}
.rateInput{
  width: 50px;

}
.rateInput/deep/.el-input__inner{
  padding: 0 5px;
}
</style>
