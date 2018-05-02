<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      关注货主
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
              <tr v-for="i in 9">
                <td>2018-04-06 08:11</td>
                <td>小米</td>
                <td>18316544654</td>
                <td>250</td>
                <td>2018-04-06 08:13</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="被谁关注" name="beFollowed">
          <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
            <thead class="backGrey">
              <th>被关注时间</th>
              <th>被关注货主的昵称</th>
              <th>被关注货主的电话号码</th>
            </thead>
            <tbody >
              <tr v-for="i in 9">
                <td>2018-04-06 08:11</td>
                <td>小米</td>
                <td>18316544654</td>
              </tr>
            </tbody>
          </table>
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
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"关注货主",
      isActive:true
    })
  },
  data () {
    return {
      activeName: 'follow'
    }
  },
  methods:{
    handleClick(tab, event) {
    }
  }
}
</script>

<style scoped>
</style>
