<template>
	<div class="createNewCompanyArchive">
		<div class="newCompanyForm">
			<el-form label-position="right" label-width="100px" >
			  <el-form-item label="公司名">
			    <el-input v-model="companyData.CompanyName"></el-input>
			  </el-form-item>
			  <el-form-item label="公司认证">
			    <s-upload-img @fileUpload="saveImgFileData" ref="imgPlugin"></s-upload-img>
			  </el-form-item>
			  <el-form-item label="主营货物">
			    <el-input v-model="companyData.RunGoods"></el-input>
			  </el-form-item>
			  <el-form-item label="运输量">
			    <el-input v-model="companyData.Volume"></el-input>
			  </el-form-item>
			  <el-form-item label="主营流向">
			    <el-input v-model="companyData.FlowDrection"></el-input>
			  </el-form-item>
			  <el-form-item label="公司类型">
			    <el-input v-model="companyData.CompanyType"></el-input>
			  </el-form-item>
			  <el-form-item label="电话">
			    <el-input v-model="companyData.TelPhone"></el-input>
			  </el-form-item>
			  <el-form-item label="传真">
			    <el-input v-model="companyData.Fax"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱">
			    <el-input v-model="companyData.Email"></el-input>
			  </el-form-item>
			  <el-form-item label="地址">
			    <el-input v-model="companyData.Address"></el-input>
			  </el-form-item>
			</el-form>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
		</div>
		
	</div>
</template>
<script>
import uploadImg from '@/components/common/uploadImg'
export default {
  name: 'createNewCompanyArchive',
  data () {
    return {
    	imgObjs:[],
    	companyData:{
    		CompanyName:"",
    		RunGoods:"",
    		Volume:"",
    		FlowDrection:"",
    		CompanyType:"",
    		TelPhone:"",
    		Fax:"",
    		Email:"",
    		Address:""
    	},
    }
  },
  components: {
    's-upload-img': uploadImg,
  },
  created(){
  	this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"新建公司档案",
      isActive:true
    });
  },
/*  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"新建公司档案",
      isActive:true
    });
  },*/
  methods:{
  	onSubmit(e){
  		let param = new FormData(); //创建form对象  
  		for(let key in this.companyData){
  			param.append(key,this.companyData[key]);
  		}
  		for (var i = this.imgObjs.length - 1; i >= 0; i--) {
  			param.append('file', this.imgObjs[i].file,this.imgObjs[i].file.name);
  		}
  		if (this.imgObjs.length==0) {
  			param.append('file',"");
  		}
  		this.$axios({
		  method: 'post',
		  url: this.$store.commonData.state.url+'Customer/AddCompany',
		  headers:{'Content-Type':'multipart/form-data'} ,
		  data: param,
		  
		}).then((response)=>{
		  	if (response.data.RetCode==0) {
		  		this.$message({
	              message: response.data.RetMsg,
	              type: 'success'
	            });
	            this.companyData={
		    		CompanyName:"",
		    		RunGoods:"",
		    		Volume:"",
		    		FlowDrection:"",
		    		CompanyType:"",
		    		TelPhone:"",
		    		Fax:"",
		    		Email:"",
		    		Address:""
		    	};
		    	this.imgObjs=[];
		    	this.$refs.imgPlugin.clearImg();
	          }else{
	            this.$message({
	              message: response.data.RetMsg,
	              type: 'error'
	            });
	        }
		})
  	},
  	saveImgFileData(e){
  		this.imgObjs=e.imgObjs;
  	}
  }
}
</script>
<style scoped>
.newCompanyForm{
	width: 100%;
	max-width: 500px;
	margin: 20px auto;
	text-align: center;
}
</style>