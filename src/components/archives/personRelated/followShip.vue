<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      关注船队
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>订阅时间</th>
          <th>关注船舶</th>
          <th>服务号推送动态次数</th>
          <th>服务号最近推送时间</th>
        </thead>
        <tbody >
          <tr v-for="i in 9">
            <td>2018-04-06 08:11</td>
            <td>海旗</td>
            <td>260</td>
            <td>2018-04-06 08:55</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'followShip',
  components: {
    's-reload-btn': reloadBtn,
  },
  created(){
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"关注船舶",
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

<style scoped>
</style>
