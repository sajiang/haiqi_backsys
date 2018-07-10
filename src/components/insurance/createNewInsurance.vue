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
                  <el-select class="goodsNumUnit" v-model="newInsuranceData.fd">
                    <el-option label="吨" value="1"></el-option>
                    <el-option label="箱" value="2"></el-option>
                  </el-select>
                </div>
                
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">费率</span>
                <el-input  class="flex1"  v-model="newInsuranceData.rate"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">保费</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">状态</span>
                <div class="flex1">
                  <el-select v-model="newInsuranceData.fd" placeholder="请选择">
                    <el-option label="吨" value="1"></el-option>
                    <el-option label="箱" value="2"></el-option>
                  </el-select>
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
                <el-input  class="flex1"  v-model="newInsuranceData.name"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">手机号</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">合同号/运单号</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">是否需要发票</span>
                <div class="flex1">
                  <el-select v-model="newInsuranceData.fd" placeholder="请选择">
                    <el-option label="不需要" value="1"></el-option>
                    <el-option label="增值税普票" value="2"></el-option>
                    <el-option label="增值税专票" value="3"></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">开票人抬头</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">纳税人识别号</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">联系人</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">联系电话</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">联系地址</span>
                <el-input class="flex1"  v-model="newInsuranceData.address"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">开户银行</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">银行账号</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
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
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">航次</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">起运时间</span>
                <el-date-picker class="flex1" :picker-options="pickerOptions"  v-model="newInsuranceData.date" type="date"  placeholder="选择日期"></el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mgt10">
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">起运地</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="flex">
                <span class="labelName">中转站</span>
                <el-input class="flex1"  v-model="newInsuranceData.value"></el-input>
              </div>
            </el-col>
            <el-col :span="8"  class="flex">
                <span class="labelName">目的地</span>
                <el-input class="flex1"  v-model="newInsuranceData.address"></el-input>
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
