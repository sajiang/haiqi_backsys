<template>
  <div class="createNewInsurance">
    <div class="hello">
      <div class="clearfix grey8C">
        <span>首页>订单管理>新增保单</span>
      </div>
    </div>
    <div class="mgt20">
      <el-form>
        <div>基础信息</div>
        <div class="baseInfo">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="flex">
                <span class="labelName">货险类别</span>
                <el-select class="flex1" v-model="newInsuranceData.type" placeholder="货险类别">
                  <el-option label="基本险" value="1"></el-option>
                  <el-option label="综合险" value="2"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex">
                <span class="labelName">保险公司</span>
                <el-select  class="flex1" v-model="newInsuranceData.company" placeholder="保险公司">
                  <el-option label="太平洋保险" value="1"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex">
                <span class="labelName">货种</span>
                <el-select  class="flex1"  v-model="newInsuranceData.goodsType" placeholder="货种">
                  <el-option label="太平洋保险" value="1"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">货物</span>
                <el-input  class="flex1"  v-model="newInsuranceData.goodsName" placeholder="货物"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">货值/元</span>
                <el-input class="flex1"  v-model="newInsuranceData.goodsName"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">货物数量</span>
                <div class="flex flex2">
                  <el-input class="flex1 goodsNum" v-model="newInsuranceData.goodsNum"></el-input>
                  <el-select class="goodsNumUnit" v-model="newInsuranceData.fd" slot="prefix" placeholder="请选择">
                    <el-option label="吨" value="1"></el-option>
                    <el-option label="箱" value="2"></el-option>
                  </el-select>
                </div>
                
            </el-col>
          </el-row>
        </div>
        <div>
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
      newInsuranceData: {},
    }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"新增保单",
      isActive:true
    });
  },
  methods:{
    onSubmit(){

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
.goodsNumUnit{
  width: 30%;
}
</style>
