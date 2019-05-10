<template>
<el-container class="main">
  <el-aside style="width:initial" class="leftTree">
    <div @click="isCollapse=!isCollapse" class="flag">
      <img class="flagImg" src="../assets/img/flag.png">
      <img v-show="!isCollapse" class="companyName" src="../assets/img/companyName.png">
    </div>
    <el-menu :default-active="$route.path" :router="false" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" >
      <el-submenu index="8" v-if="shipmentAuth||publicGoodsAuth">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">船期货盘</span>
        </template>
        <el-menu-item v-if="shipmentAuth" @click="handleClick" index="/main/shipAndGoods/shipment">船期</el-menu-item>
        <el-menu-item v-if="publicGoodsAuth" @click="handleClick" index="/main/shipAndGoods/publicGoods">公共货盘</el-menu-item>
      </el-submenu>
      <el-submenu index="1" v-if="searchArchivesPageAuth">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">查看档案</span>
        </template>
        <el-menu-item v-if="searchArchivesPageAuth" @click="handleClick" index="/main/archives/searchArchives">搜索档案</el-menu-item>
      </el-submenu>
      <el-submenu index="2" v-if="createNewCompanyArchivePageAuth||createNewShipArchivePageAuth||createNewPersonArchivePageAuth">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">新建档案</span>
        </template>
        <el-menu-item v-if="createNewCompanyArchivePageAuth" @click="handleClick" index="/main/archives/createNewCompanyArchive">新建公司档案</el-menu-item>
        <el-menu-item v-if="createNewShipArchivePageAuth" @click="handleClick" index="/main/archives/createNewShipArchive">新建船舶档案</el-menu-item>
        <el-menu-item v-if="createNewPersonArchivePageAuth" @click="handleClick" index="/main/archives/createNewPersonArchive">新建个人档案</el-menu-item>
      </el-submenu>
      <el-submenu index="3" v-if="goodsInsuranceListPageAuth||createNewInsurancePageAuth||statementPageAuth">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">保险订单</span>
        </template>
        <el-menu-item v-if="goodsInsuranceListPageAuth" @click="handleClick" index="/main/insurance/goodsInsuranceList">货险订单</el-menu-item>
        <el-menu-item v-if="createNewInsurancePageAuth" @click="handleClick" index="/main/insurance/createNewInsurance">新增保单</el-menu-item>
        <el-menu-item v-if="statementPageAuth" @click="handleClick" index="/main/insurance/statement">对账单</el-menu-item>
      </el-submenu>
      <el-submenu index="4" v-if="createNewOrderPageAuth||vipOrderListPageAuth||orderFinancialControllerManagePageAuth">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item v-if="createNewOrderPageAuth" @click="handleClick" index="/main/order/createNewOrder">新建订单</el-menu-item>
        <el-menu-item v-if="vipOrderListPageAuth" @click="handleClick" index="/main/order/vipOrderList">vip撮合订单</el-menu-item>
        <el-menu-item v-if="orderFinancialControllerManagePageAuth" @click="handleClick" index="/main/order/orderFinancialControllerManage">订单财务管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5" v-if="personnelArchitecturePageAuth||authorizationConfigurationPageAuth">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item v-if="personnelArchitecturePageAuth" @click="handleClick" index="/main/userManage/personnelArchitecture">人员管理</el-menu-item>
        <el-menu-item v-if="authorizationConfigurationPageAuth" @click="handleClick" index="/main/userManage/authorizationConfiguration">权限设置</el-menu-item>
      </el-submenu>
      <el-submenu index="7" v-if="columnManagePageAuth">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">栏目管理</span>
        </template>
        <el-menu-item v-if="columnManagePageAuth" @click="handleClick" index="/main/columnManage/columnManage">栏目划分</el-menu-item>
      </el-submenu>
      <el-submenu index="9" v-if="adConfigurationAuth||freightAuth">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">功能操作</span>
        </template>
        <el-menu-item v-if="adConfigurationAuth" @click="handleClick" index="/main/adConfiguration/adConfiguration">广告配置</el-menu-item>
        <el-menu-item v-if="freightAuth" @click="handleClick" index="/main/freight/freight">运价表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header class="header">
      <div class="flex1">
        {{userName}}
      </div>
      <el-button type="text" v-if="modifyPasswordPageAuth" @click="naviToModifyPassword" >修改密码</el-button>
      <el-button type="text" @click="toLogin">退出</el-button>
      
    </el-header>
    <el-main>
      <!-- <div class="el-tabs el-tabs--card el-tabs--top">
        <div class="el-tabs__header is-top">
          <div class="el-tabs__nav-wrap is-top">
            <div class="el-tabs__nav-scroll">
              <div class="el-tabs__nav" >
                <div class="el-tabs__item is-top is-closable" @click="changePath(tab)" :class="tab.isActive?'is-active':''"  v-for="(tab, index) in $store.tabs.state.tabs">
                  {{tab.name}}
                  <span @click.stop="removeTab(tab)" class="el-icon-close"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> --> 
        <router-view/> 
    </el-main>
  </el-container>
</el-container>
    
    
    
  </div>
  
</template>
<script>
  import common from "../assets/common.js"
  export default {
    data() {
      return {
        isCollapse: false,
        searchArchivesPageAuth:false,
        createNewCompanyArchivePageAuth:false,
        createNewShipArchivePageAuth:false,
        createNewPersonArchivePageAuth:false,
        personnelArchitecturePageAuth:false,
        goodsInsuranceListPageAuth:false,
        createNewInsurancePageAuth:false,
        statementPageAuth:false,
        authorizationConfigurationPageAuth:false,
        modifyPasswordPageAuth:false,
        columnManagePageAuth:false,
        adConfigurationAuth:false,
        freightAuth:false,
        shipmentAuth:false,
        publicGoodsAuth:false,
        createNewOrderPageAuth:false,
        vipOrderListPageAuth:false,
        orderFinancialControllerManagePageAuth:false,
        userName:sessionStorage.getItem("UserName"),
      }
    },
    watch:{
      
    },
    created(){
      this.getAuth();
    },
    methods: {
      getAuth(){
        for (var i = this.$store.commonData.state.authPathArr.length - 1; i >= 0; i--) {
          switch (this.$store.commonData.state.authPathArr[i].PageUrl){
            case "main/archives/searchArchives":
              this.searchArchivesPageAuth=true;
              break;
            case "main/archives/createNewCompanyArchive":
              this.createNewCompanyArchivePageAuth=true;
              break;
            case "main/archives/createNewShipArchive":
              this.createNewShipArchivePageAuth=true;
              break;
            case "main/archives/createNewPersonArchive":
              this.createNewPersonArchivePageAuth=true;
              break;
            case "main/userManage/personnelArchitecture":
              this.personnelArchitecturePageAuth=true;
              break;
            case "main/userManage/authorizationConfiguration":
              this.authorizationConfigurationPageAuth=true;
              break;
            case "main/insurance/goodsInsuranceList":
              this.goodsInsuranceListPageAuth=true;
              break;
            case "main/insurance/createNewInsurance":
              this.createNewInsurancePageAuth=true;
              break;
            case "main/insurance/statement":
              this.statementPageAuth=true;
              break;
            case "main/personalSetting/modifyPassword":
              this.modifyPasswordPageAuth=true;
              break;
            case "main/columnManage/columnManage":
              this.columnManagePageAuth=true;
              break;
            case "main/adConfiguration/adConfiguration":
              this.adConfigurationAuth=true;
              break;
            case "main/freight/freight":
              this.freightAuth=true;
              break;
            case "main/shipAndGoods/shipment":
              this.shipmentAuth=true;
              break;
            case "main/shipAndGoods/publicGoods":
              this.publicGoodsAuth=true;
              break;
            case "main/order/createNewOrder":
              this.createNewOrderPageAuth=true;
              break;
            case "main/order/vipOrderList":
              this.vipOrderListPageAuth=true;
              break;
            case "main/order/orderFinancialControllerManage":
              this.orderFinancialControllerManagePageAuth=true;
              break;
          }
        }
        
      },
      /*handleNav(e){
        this.$router.push({ path: e.$el.dataset.path });
      },*/
      handleClick(e){
        let routeData = this.$router.resolve({ path: e.index });
        window.open(routeData.href, '_blank');
      },
      naviToModifyPassword(){
        common.openNewPage(this,"/main/personalSetting/modifyPassword");
      },
      changePath(tab){
        this.$router.push({ path: tab.path });
      },
      removeTab(tab) {
        this.$store.tabs.commit('removeTab', {
          path:tab.path,
        });
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      toLogin(){
        this.$router.push({ path: "/login" });
      },
    }
  }
</script>
<style lang="less" scoped>
  .leftNav{
    float: left;
    padding-top: 10px;
  }
  .rightContent{
    padding-top: 10px;
    padding-left: 10px;
    overflow: hidden;
  }
  .leftTree{
    background-color: #0E4268;
    color:#909399; 
    height: 100vh;
    .flag{
      background-color:#3177BC;
      height: 5vh;
      display: flex;
      align-items:center;
      padding:0 10px;
      .flagImg{
        width: 49px;
        height: 41px;
      }
      .companyName{
        width: 89px;
        height: 34px;
        margin-left: 20px;
      }
    }
  }
  .leftTree/deep/ .el-menu{
    background-color: #0E4268;
    border-right:none;
  }
  .leftTree/deep/ .el-submenu__title{
    color:#909399 !important; 
    &:hover {
      background-color: #103155;
    }
  }
  .leftTree/deep/ .el-menu-item.is-active{
    color: #409EFF;
  }
  .leftTree/deep/ .el-menu-item{
    background-color: #061b2e;
    color:#909399;
  }
  .leftTree/deep/.el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: #103155;
  }
  .leftTree/deep/.el-radio-button:first-child:last-child .el-radio-button__inner{
    background-color:#103155;
    border:none;
    color:#909399;
  }
  .header{
    background: white;
    border-bottom:1px solid #eee; 
    height: 5vh !important;
    display: flex;
    align-items: center;

  }
  /deep/ .el-main{
    position: relative;
  }
</style>