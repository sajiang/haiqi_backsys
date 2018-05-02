<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      海旗历史船期
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>发布时间</th>
          <th>货种</th>
          <th>吨位</th>
          <th>空船港</th>
          <th>空船时间</th>
        </thead>
        <tbody >
          <tr v-for="i in 9">
            <td>2018-04-06 08:11</td>
            <td>沙子</td>
            <td>4000吨</td>
            <td>葫芦岛</td>
            <td>04-17</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'historyTrack',
  components: {
    's-reload-btn': reloadBtn,
  },
  created(){
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"海旗历史船期",
      isActive:true
    })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
