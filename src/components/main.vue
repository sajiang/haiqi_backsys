<template>
<el-container class="main">
  <el-header class="header">
    <el-button class="fr" type="text" @click="toLogin">退出</el-button>
  </el-header>
  <el-container>
    <el-aside style="width:initial" class="leftTree">
      <div class="center">
        <el-radio-group v-model="isCollapse"  size="small">
          <el-radio-button v-if="isCollapse" :label="false">展开</el-radio-button>
          <el-radio-button v-else :label="true">收起</el-radio-button>
        </el-radio-group>
      </div>
      
      <el-menu :default-active="$route.path" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="8" v-if="shipmentAuth||publicGoodsAuth">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">船期货盘</span>
          </template>
          <el-menu-item v-if="shipmentAuth" index="/main/shipAndGoods/shipment">船期</el-menu-item>
          <el-menu-item v-if="publicGoodsAuth" index="/main/shipAndGoods/publicGoods">公共货盘</el-menu-item>
        </el-submenu>
        <el-submenu index="1" v-if="searchArchivesPageAuth">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">查看档案</span>
          </template>
          <el-menu-item v-if="searchArchivesPageAuth" index="/main/archives/searchArchives">搜索档案</el-menu-item>
        </el-submenu>
        <el-submenu index="2" v-if="createNewCompanyArchivePageAuth||createNewShipArchivePageAuth||createNewPersonArchivePageAuth">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">新建档案</span>
          </template>
          <el-menu-item v-if="createNewCompanyArchivePageAuth" index="/main/archives/createNewCompanyArchive">新建公司档案</el-menu-item>
          <el-menu-item v-if="createNewShipArchivePageAuth" index="/main/archives/createNewShipArchive">新建船舶档案</el-menu-item>
          <el-menu-item v-if="createNewPersonArchivePageAuth" index="/main/archives/createNewPersonArchive">新建个人档案</el-menu-item>
        </el-submenu>
        <el-submenu index="3" v-if="goodsInsuranceListPageAuth||createNewInsurancePageAuth||statementPageAuth">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item v-if="goodsInsuranceListPageAuth" index="/main/insurance/goodsInsuranceList">货险订单</el-menu-item>
          <el-menu-item v-if="createNewInsurancePageAuth" index="/main/insurance/createNewInsurance">新增保单</el-menu-item>
          <el-menu-item v-if="statementPageAuth" index="/main/insurance/statement">对账单</el-menu-item>
        </el-submenu>
        <el-submenu index="4" v-if="personnelArchitecturePageAuth||authorizationConfigurationPageAuth">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item v-if="personnelArchitecturePageAuth" index="/main/userManage/personnelArchitecture">人员管理</el-menu-item>
          <el-menu-item v-if="authorizationConfigurationPageAuth" index="/main/userManage/authorizationConfiguration">权限设置</el-menu-item>
        </el-submenu>

        <el-submenu index="5" v-if="modifyPasswordPageAuth">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </template>
          <el-menu-item v-if="modifyPasswordPageAuth" index="/main/personalSetting/modifyPassword">修改密码</el-menu-item>
        </el-submenu>
        <el-submenu index="6" v-if="columnManagePageAuth">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">栏目管理</span>
          </template>
          <el-menu-item v-if="columnManagePageAuth" index="/main/columnManage/columnManage">栏目划分</el-menu-item>
        </el-submenu>
        <el-submenu index="7" v-if="adConfigurationAuth||freightAuth">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">功能操作</span>
          </template>
          <el-menu-item v-if="adConfigurationAuth" index="/main/adConfiguration/adConfiguration">广告配置</el-menu-item>
          <el-menu-item v-if="freightAuth" index="/main/freight/freight">运价表</el-menu-item>
        </el-submenu>
        
      </el-menu>
    </el-aside>
    <el-main>
      <div class="el-tabs el-tabs--card el-tabs--top">
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
      </div>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </el-main>
  </el-container>
</el-container>
    
    
    
  </div>
  
</template>
<script>
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
        publicGoodsAuth:false
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
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/archives/searchArchives"){
            this.searchArchivesPageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/archives/createNewCompanyArchive"){
            this.createNewCompanyArchivePageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/archives/createNewShipArchive"){
            this.createNewShipArchivePageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/archives/createNewPersonArchive"){
            this.createNewPersonArchivePageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/userManage/personnelArchitecture"){
            this.personnelArchitecturePageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/insurance/goodsInsuranceList"){
            this.goodsInsuranceListPageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/insurance/createNewInsurance"){
            this.createNewInsurancePageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/insurance/statement"){
            this.statementPageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/userManage/authorizationConfiguration"){
            this.authorizationConfigurationPageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/personalSetting/modifyPassword"){
            this.modifyPasswordPageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/columnManage/columnManage"){
            this.columnManagePageAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/adConfiguration/adConfiguration"){
            this.adConfigurationAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/freight/freight"){
            this.freightAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/shipAndGoods/shipment"){
            this.shipmentAuth=true;
          }
          if(this.$store.commonData.state.authPathArr[i].PageUrl=="main/shipAndGoods/publicGoods"){
            this.publicGoodsAuth=true;
          }
        }
        
      },
      handleNav(e){
        this.$router.push({ path: e.$el.dataset.path });
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
    height: 96vh
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
    background: #0E4268; 
    height: 4vh !important;
  }
  /deep/ .el-main{
    position: relative;
  }
</style>