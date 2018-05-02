<template>
  <div class="modifyPassword">
    <div class="center">
      <div class="inputWapper">
        <span class="labelName">旧密码</span>
        <el-input class="inputArea"></el-input>
      </div>
    </div>
    <div class="center">
      <div class="inputWapper">
        <span class="labelName">新密码</span>
        <el-input class="inputArea"></el-input>
      </div>
    </div>
    <div class="center">
      <el-button class="submitBtn" type="primary">确认修改</el-button> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'modifyPassword',
  data () {
    return {
      msg: '欢迎来到后台管理系统'
    }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"修改密码",
      isActive:true
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.inputWapper{
  box-sizing: border-box;
  padding: 10px;
  display: inline-block;
}
.labelName{
  margin: 0 10px;
  display: inline-block;
}
.inputArea{
  text-align: left;
  width: 500px;
}
</style>
