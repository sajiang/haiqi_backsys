<template>
	<div class="createNewShipArchive">
		<div class="newShipForm">
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">船名</span>
						<el-input v-model="shipInfo.ShipName" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">船舶认证</span>
						<s-upload-img @fileUpload="saveImgFileData" ref="imgPlugin" class="inputArea"></s-upload-img>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">建造年代</span>
						<el-input v-model="shipInfo.YearOfPro" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">船速</span>
						<el-input v-model="shipInfo.MaxSpeed" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">船籍港</span>
						<el-input v-model="shipInfo.RegistryPort" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">船舶类型</span>
						<el-input v-model="shipInfo.ShipType" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">呼号</span>
						<el-input v-model="shipInfo.HuHao" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">MMSI</span>
						<el-input v-model="shipInfo.Mmsi" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">船长</span>
						<el-input v-model="shipInfo.Length" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">船宽</span>
						<el-input v-model="shipInfo.Width" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">型深</span>
						<el-input v-model="shipInfo.Depth" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">舱容</span>
						<el-input v-model="shipInfo.Capacity" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">舱口数</span>
						<el-input v-model="shipInfo.HatchNum" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">载重吨</span>
						<el-input v-model="shipInfo.LoadTon" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">总吨</span>
						<el-input v-model="shipInfo.TotalTon" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">净吨</span>
						<el-input v-model="shipInfo.NetTon" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">满载吃水</span>
						<el-input v-model="shipInfo.LoadDraught" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">空载吃水</span>
						<el-input v-model="shipInfo.LightDraught" class="inputArea"></el-input>
					</div>
				</el-col>
				
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">适载流向</span>
						<el-input v-model="shipInfo.LoadFlow" class="inputArea"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">加油地点</span>
						<el-input v-model="shipInfo.RefuelStation" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="inputWapper">
						<span class="labelName">适载货物</span>
						<el-input v-model="shipInfo.OptimumGoods" class="inputArea"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-button type="primary" class="submitBtn" @click="onSubmit">立即创建</el-button>
		</div>
		
	</div>
</template>
<script>
import uploadImg from '@/components/common/uploadImg'
export default {
  name: 'createNewShipArchive',
  components: {
    's-upload-img': uploadImg,
  },
  data () {
    return {
      imgObjs:[],
      shipInfo:{
      	ShipName:"",
      	YearOfPro:"",
      	RegistryPort:"",
      	ShipType:"",
      	HuHao:"",
      	MaxSpeed:"",
      	Mmsi:"",
      	Length:"",
      	NetTon:"",
      	Width:"",
      	Depth:"",
      	Capacity:"",
      	HatchNum:"",
      	LoadTon:"",
      	TotalTon:"",
      	LoadDraught:"",
      	LightDraught:"",
      	LoadFlow:"",
      	OptimumGoods:"",
      	RefuelStation:"",
      }
    }
  },
  created(){
      this.$store.tabs.commit('assignNewTab', {
	      path:this.$route.path,
	      name:"新建船舶档案",
	      isActive:true
	    });
  },
/*  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"新建船舶档案",
      isActive:true
    });
  },*/
  methods:{
  	saveImgFileData(e){
  		this.imgObjs=e.imgObjs;
  	},
  	onSubmit(){
  		let param = new FormData(); //创建form对象  
  		for(let key in this.shipInfo){
  			param.append(key,this.shipInfo[key]);
  		}
  		for (var i = this.imgObjs.length - 1; i >= 0; i--) {
  			param.append('file', this.imgObjs[i].file,this.imgObjs[i].file.name);
  		}
  		if (this.imgObjs.length==0) {
  			param.append('file',"");
  		}
  		this.$axios({
		  method: 'post',
		  url: this.$store.commonData.state.url+'Customer/AddShip',
		  headers:{'Content-Type':'multipart/form-data'} ,
		  data: param,
		  
		}).then((response)=>{
		  	if (response.data.RetCode==0) {
		  		this.$message({
	              message: response.data.RetMsg,
	              type: 'success'
	            });
	            this.shipInfo={
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
		});
  	}
  }
}
</script>
<style scoped>
.newShipForm{
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