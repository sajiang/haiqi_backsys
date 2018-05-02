<template>
<el-container class="main">
  <el-header>Header</el-header>
  <el-container>
    <el-aside style="width:initial">
      <div class="center">
        <el-radio-group v-model="isCollapse"  size="small">
          <el-radio-button v-if="isCollapse" :label="false">展开</el-radio-button>
          <el-radio-button v-else :label="true">收起</el-radio-button>
        </el-radio-group>
      </div>
      
      <el-menu :default-active="$route.path" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">查看档案</span>
          </template>
          <el-menu-item  index="/main/archives/searchArchives">搜索档案</el-menu-item>
          
          <el-menu-item  index="/main/archives/companyArchives/测试公司A">公司档案</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">新建档案</span>
          </template>
          <el-menu-item  index="/main/archives/createNewCompanyArchive">新建公司档案</el-menu-item>
          <el-menu-item  index="/main/archives/createNewShipArchive">新建船舶档案</el-menu-item>
          <el-menu-item  index="/main/archives/createNewPersonArchive">新建个人档案</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item  index="/main/userManage/personnelArchitecture">人员管理</el-menu-item>
          <el-menu-item  index="/main/userManage/authorizationConfiguration">权限设置</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </template>
          <el-menu-item  index="/main/personalSetting/modifyPassword">修改密码</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">栏目管理</span>
          </template>
          <el-menu-item  index="/main/columnManage/columnManage">栏目划分</el-menu-item>
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
      }
    },
    methods: {
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
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style type="text/css" scoped>
  .leftNav{
    float: left;
    padding-top: 10px;
  }
  .rightContent{
    padding-top: 10px;
    padding-left: 10px;
    overflow: hidden;
  }

</style>