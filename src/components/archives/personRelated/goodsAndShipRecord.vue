<template>
<div id="companyArchives" class="wraper">
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
              <tr v-for="i in 9">
                <td>2018-04-06 08:11</td>
                <td>海旗2</td>
                <td>煤炭</td>
                <td>400000</td>
                <td>秦皇岛</td>
                <td>04-16</td>
              </tr>
            </tbody>
          </table>
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
              <tr v-for="i in 9">
                <td>2018-04-06 08:11</td>
                <td>煤炭</td>
                <td>4000</td>
                <td>秦皇岛</td>
                <td>广州</td>
                <td>2018-04-16</td>
                <td>无</td>
                <td>公开</td>
                <td>12次</td>
                <td>136</td>
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
  name: 'returnVisit',
  components: {
    's-reload-btn': reloadBtn,
  },
  created(){
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"发布记录",
      isActive:true
    })
  },
  data () {
    return {
      activeName: 'ship'
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
