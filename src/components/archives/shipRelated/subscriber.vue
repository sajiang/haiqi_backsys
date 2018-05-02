<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      海旗被订阅记录
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>订阅时间</th>
          <th>订阅昵称</th>
          <th>订阅人员电话号码</th>
        </thead>
        <tbody >
          <tr v-for="i in 9">
            <td>2018-04-06 08:11</td>
            <td>小五</td>
            <td>183056468421</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'subscriber',
  components: {
    's-reload-btn': reloadBtn,
  },
  created(){
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"订阅海旗者",
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
