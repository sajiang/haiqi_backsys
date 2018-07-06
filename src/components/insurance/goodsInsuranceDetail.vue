<template>
  <div class="hello">
    <div class="clearfix grey8C">
      <span>首页>订单管理>货险订单</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsInsuranceDetail',
  data () {
    return {
    }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"货险订单",
      isActive:true
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
