<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      回访记录
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>客服名字</th>
          <th>回访时间</th>
          <th>回访事项</th>
          <th>回访结果</th>
          <th>操作</th>
        </thead>
        <tbody >
          <tr v-for="i in 9">
            <td>王丽菊</td>
            <td>2018-04-06 08:11</td>
            <td>给客服推广新功能</td>
            <td>已推广到该客户，该用户反馈已尝试使用，暂时没有……</td>
            <td>
              <i class="mgr10 fa fa-save"></i>
              <i class="mgr10 fa fa-edit"></i>
            </td>
          </tr>
        </tbody>
      </table>
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
      name:"回访记录",
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
