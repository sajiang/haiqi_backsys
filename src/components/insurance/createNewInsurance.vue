<template>
  <div class="createNewInsurance">
    <div class="hello">
      <div class="clearfix grey8C">
        <span>首页>订单管理>新增保单</span>
      </div>
    </div>
    <div class="mgt20">
      <el-form>
        <el-tabs>
          <el-tab-pane label="基础信息"></el-tab-pane>
        </el-tabs>
        <div class="baseInfo">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="flex">
                <span class="labelName">货险类别</span>
                <el-select class="flex1" v-model="newInsuranceData.Gins_BaseTypeId" placeholder="货险类别">
                  <el-option :key="item.Id" :label="item.TypeName" v-for="item in baseData.BaseTypeList" :value="item.Id"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex">
                <span class="labelName">保险公司</span>
                <el-select  class="flex1" v-model="newInsuranceData.Gins_BaseCompanyId" placeholder="保险公司">
                  <el-option :key="item.Id" :label="item.CompanyName" v-for="item in baseData.BaseCompanyList" :value="item.Id"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex">
                <span class="labelName">货种</span>
                <el-select  class="flex1"  v-model="newInsuranceData.Gins_BaseGoodsTypeId" placeholder="货种" @change="goodsTypeChange">
                  <el-option :key="item.Id" :label="item.GoodsTypeName" v-if="newInsuranceData.Gins_BaseCompanyId==item.Gins_BaseCompanyId&&newInsuranceData.Gins_BaseTypeId==item.Gins_BaseTypeId" v-for="item in baseData.BaseGoodsTypeList" :value="item.Id"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">货物</span>
                <el-input  class="flex1"  v-model="newInsuranceData.GoodsName" placeholder="货物"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">货值/元</span>
                <el-input-number :controls="false" class="flex1" v-model="newInsuranceData.GoodsValue"></el-input-number>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">货物数量</span>
                <div class="flex flex1">
                  <el-input-number :controls="false"  class="flex2 goodsNum"  v-model="newInsuranceData.GoodsQuantity"></el-input-number>
                  <el-select class="goodsNumUnit flex2"  v-model="newInsuranceData.BaseGoodsUnitId">
                    <el-option :key="item.Id" :label="item.Unit" v-for="item in baseData.BaseGoodsUnitList" :value="item.Id"></el-option>
                  </el-select>
                </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">费率</span>
                <el-input-number :controls="false" class="flex1"  v-model="newInsuranceData.InsuranceRate"></el-input-number>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">保费</span>
                <el-input-number :controls="false" :precision="2" class="flex1"  v-model="newInsuranceData.InsurancePremium"></el-input-number>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">付款人电话</span>
                <el-input-number :controls="false" class="flex1"  v-model="newInsuranceData.PayerMobile"></el-input-number>
              </div>
            </el-col>
            
          </el-row>
        </div>
        <el-tabs class="mgt20">
          <el-tab-pane label="被保险人"></el-tab-pane>
        </el-tabs>
        <div>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">被保险人名称</span>
                <el-input  class="flex1"  v-model="newInsuranceData.Subject"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">手机号</span>
                <el-input class="flex1"  v-model="newInsuranceData.MobilePhone"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">合同号/运单号</span>
                <el-input class="flex1"  v-model="newInsuranceData.ContractNum"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">是否需要发票</span>
                <div class="flex1">
                  <el-select v-model="newInsuranceData.NeedInvoice" placeholder="请选择">
                    <el-option label="不需要" value=1></el-option>
                    <el-option label="增值税普票" value=2></el-option>
                    <el-option label="增值税专票" value=3></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">开票人抬头</span>
                <el-input class="flex1"  v-model="newInsuranceData.InvoiceTitle"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">纳税人识别号</span>
                <el-input class="flex1"  v-model="newInsuranceData.RatepayerNum"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">联系人</span>
                <el-input class="flex1"  v-model="newInsuranceData.LinkMan"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">联系电话</span>
                <el-input class="flex1"  v-model="newInsuranceData.MobileNum"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">联系地址</span>
                <el-input class="flex1"  v-model="newInsuranceData.Address"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">开户银行</span>
                <el-input class="flex1"  v-model="newInsuranceData.Bank"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">银行账号</span>
                <el-input class="flex1"  v-model="newInsuranceData.BankAccount"></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-tabs class="mgt20">
          <el-tab-pane label="运输信息"></el-tab-pane>
        </el-tabs>
        <div>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">船名</span>
                <el-input class="flex1"  v-model="newInsuranceData.ShipName"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">航次</span>
                <el-input class="flex1"  v-model="newInsuranceData.Voyage"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">起运时间</span>
                <el-date-picker class="flex1" :picker-options="pickerOptions"  v-model="newInsuranceData.StartDate" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"></el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">起运地</span>
                <el-input class="flex1"  v-model="newInsuranceData.StartPoint"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">中转站</span>
                <el-input class="flex1"  v-model="newInsuranceData.TransferPoint"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">目的地</span>
                <el-input class="flex1"  v-model="newInsuranceData.AimPoint"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="mgt20 center">
            <el-button type="primary" @click="onSubmit">创建</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'createNewInsurance',
  data () {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()-24*60*60*1000;
        },
      },
      baseData:{},
      newInsuranceData: {
        GoodsValue:"",
        InsuranceRate:'',
      },
    }
  },
  watch:{
    "newInsuranceData.GoodsValue":function(val1,val2){
      if (this.newInsuranceData.InsuranceRate) {
        this.newInsuranceData.InsurancePremium=val1*this.newInsuranceData.InsuranceRate/1000;
      }
    },
    "newInsuranceData.InsuranceRate":function(val1,val2){
      if (this.newInsuranceData.GoodsValue) {
        this.newInsuranceData.InsurancePremium=val1*this.newInsuranceData.GoodsValue/1000;  
      }   
    },
  },
  created(){
    this.getBaseData();
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"新增保单",
      isActive:true
    });
  },
/*  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"新增保单",
      isActive:true
    });
  },*/
  methods:{
    goodsTypeChange(e){
      for (var i = this.baseData.BaseGoodsTypeList.length - 1; i >= 0; i--) {
        if(this.baseData.BaseGoodsTypeList[i].Id==e){
          this.newInsuranceData.InsuranceRate=this.baseData.BaseGoodsTypeList[i].InsuranceRate;
          return;
        }
      }
    },
    onSubmit(){
      if (!this.newInsuranceData.PayerMobile) {
        this.$message({
            message: "付款人电话为必填项",
            type: 'error'
        });
        return
      }
      this.$axios.post(this.$store.commonData.state.url+"Insurance/AddInsuranceOrder",this.newInsuranceData)
      .then((response)=>{
        if (response.data.RetCode==0) {
          this.$message({
            message: response.data.RetMsg,
            type: 'success'
          });
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
      .catch( (error)=> {
          console.log(error);
      });
    },
    getBaseData(){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/QueryBaseData")
      .then((response)=>{
        if (response.data.RetCode==0) {
          this.baseData=response.data.RetData;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
      .catch( (error)=> {
          console.log(error);
      });
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex{
  align-items: center;
  justify-content:space-between;
}
.flex1{
  margin-left: 20px;
}
.labelName{
  width: 90px;
  text-align: right;
}
/deep/.el-input-number{
  width: initial;
} 

</style>
