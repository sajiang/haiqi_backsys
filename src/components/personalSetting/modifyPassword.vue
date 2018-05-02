<template>
  <div class="modifyPassword">
    <div class="center">
      <div class="inputWapper">
        <span class="labelName">旧密码</span>
        <el-input class="inputArea" type="password" v-model="OldPassWord"></el-input>
      </div>
    </div>
    <div class="center">
      <div class="inputWapper">
        <span class="labelName">新密码</span>
        <el-input class="inputArea" type="password" v-model="NewPassWord"></el-input>
      </div>
    </div>
    <div class="center">
      <el-button class="submitBtn" type="primary" @click="updatePassword">确认修改</el-button> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'modifyPassword',
  data () {
    return {
      OldPassWord: '',
      NewPassWord: ''
    }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"修改密码",
      isActive:true
    });
  },
  methods:{
    updatePassword(){
      this.$axios.post(this.$store.commonData.state.url+"Manage/UpdatePass",
        { OldPassWord:this.OldPassWord,
         NewPassWord:this.NewPassWord,
        })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.NewPassWord="";
          this.OldPassWord="";
          this.$message({
            message: response.data.RetMsg,
            type: 'success'
          });
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
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
