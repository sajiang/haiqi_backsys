<template>
	<div class="createNewPersonArchive">
		<div class="newPersonForm">
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">姓名</span>
						<el-input v-model="personData.UserName" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">个人认证</span>
						<s-upload-img @fileUpload="saveImgFileData" ref="imgPlugin" class="inputArea"></s-upload-img>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">绑定电话</span>
						<el-input v-model="personData.TelPhone" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">其他电话</span>
						<el-input v-model="personData.OtherTel" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">传真</span>
						<el-input v-model="personData.Fax" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">性别</span>
						<el-radio-group class="inputArea" v-model="personData.Gender">
						    <el-radio label="男">男</el-radio>
						    <el-radio label="女">女</el-radio>
						</el-radio-group>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">生日</span>
						<el-date-picker class="inputArea" v-model="personData.Brithday" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">职务</span>
						<el-input v-model="personData.Duty" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">工作范围</span>
						<el-input v-model="personData.DutyRange" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">邮箱</span>
						<el-input v-model="personData.Email" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">身份证</span>
						<el-input v-model="personData.IdCard" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">身份证地址</span>
						<el-input v-model="personData.IdCardAddress" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			
			<el-button class="submitBtn" type="primary" @click="onSubmit">立即创建</el-button>
		</div>
		
	</div>
</template>
<script>
import uploadImg from '@/components/common/uploadImg'
export default {
  name: 'createNewPersonArchive',
  components: {
    's-upload-img': uploadImg,
  },
  data () {
    return {
    	personData:{
    		UserName:"",
    		TelPhone:"",
    		Fax:"",
    		Gender:"",
    		Brithday:"1985-01-01",
    		Email:"",
    		IdCard:"",
    		IdCardAddress:"",
    		Duty:"",
    		DutyRange:"",
    	},
    	imgObjs:[],
    }
  },
  created(){
  
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"新建个人档案",
      isActive:true
    });
  },
  methods:{
  	saveImgFileData(e){
  		this.imgObjs=e.imgObjs;
  	},
  	onSubmit(){
  		let param = new FormData(); //创建form对象  
  		for(let key in this.personData){
  			param.append(key,this.personData[key]);
  		}
  		for (var i = this.imgObjs.length - 1; i >= 0; i--) {
  			param.append('file', this.imgObjs[i].file,this.imgObjs[i].file.name);
  		}
  		if (this.imgObjs.length==0) {
  			param.append('file',"");
  		}
  		this.$axios({
		  method: 'post',
		  url: this.$store.commonData.state.url+'Customer/AddCompanyStaff',
		  headers:{'Content-Type':'multipart/form-data'} ,
		  data: param,
		  
		}).then((response)=>{
		  	if (response.data.RetCode==0) {
		  		this.$message({
	              message: response.data.RetMsg,
	              type: 'success'
	            });
	            this.personData={
		    		UserName:"",
		    		TelPhone:"",
		    		Fax:"",
		    		Gender:"",
		    		Brithday:"1985-01-01",
		    		Email:"",
		    		IdCard:"",
		    		IdCardAddress:"",
		    		Duty:"",
		    		DutyRange:"",
		    	};
		    	this.imgObjs=[];
		    	this.$refs.imgPlugin.clearImg();
	        }else{
	            this.$message({
	              message: response.data.RetMsg,
	              type: 'error'
	            });
	        }
		});
  	}
  }
}
</script>
<style scoped>
.newPersonForm{
	width: 100%;
	max-width: 1000px;
	margin: 20px auto;
	text-align: center;
}
.inputWapper{
	box-sizing: border-box;
	padding: 10px;
	text-align: right;
}
.labelName{
	margin: 0 10px;
	display: inline-block;
}
.inputArea{
	text-align: left;
	width: 70%;
	display: inline-block;
}
.submitBtn{
	margin-top: 20px;
}
</style>