<template>
  <div class="login">
    <div class="form">
      <div class="content">
        <div class="center title">
          <div class="inputWapper">
            欢迎登陆
          </div>
        </div>
        <div class="center">
          <div class="inputWapper">
            <span class="labelName">账户名</span>
            <el-input class="inputArea" v-model="userName"></el-input>
          </div>
        </div>
        <div class="center">
          <div class="inputWapper">
            <span class="labelName">密码</span>
            <el-input class="inputArea" type="password" v-model="password"></el-input>
          </div>
        </div>
        <div class="center">
          <el-button class="submitBtn mgt20" type="primary" @click="login">登录</el-button> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "../../assets/md5.js"
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  
  mounted(){
  	let height=window.innerHeight;
    document.getElementsByClassName("login")[0].style.height=height+"px";
  },
  methods:{
  	login(){
      this.$axios.post(this.$store.commonData.state.url+"Account/AdminLogin", {
        UserName:this.userName,
        Pwd:md5.hex_md5(this.password)
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          sessionStorage.setItem("Token", response.data.RetData.Token);
          this.$axios.defaults.headers.common['Token'] = response.data.RetData.Token;
          this.$router.push({ path: "/main" })
          this.$store.commonData.commit('updateToken', response.data.RetData.Token);
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
<style scoped lang="less">
.login{
  width: 100%;
  background: url("../../assets/img/loginBack.jpg");
  background-size: 100% 100%;
}
.form{
  background: white;
  position: absolute;
  right: 5%;
  padding: 250px 20px;
  top: 50%;
  margin-top: -340px;
}
.inputWapper{
  box-sizing: border-box;
  padding: 10px;
  display: inline-block;
}
.labelName{
  margin: 0 10px;
  width: 50px;
  display: inline-block;
}
.inputArea{
  text-align: left;
  width: 250px;
}
.title{
  font-size: 20px;
  margin-bottom: 10px;
}
.submitBtn{
  width: 320px;
}
</style>
