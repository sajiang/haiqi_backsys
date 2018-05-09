<template>
	<div class="searchArchives">
		<div class="title"><h1>超船档案库</h1></div>
		<div class="searchPanel">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="公司" name="company"></el-tab-pane>
			    <el-tab-pane label="联系人" name="person"></el-tab-pane>
			    <el-tab-pane label="联系电话" name="telphone"></el-tab-pane>
			    <el-tab-pane label="船舶" name="ship"></el-tab-pane>
			</el-tabs>
			<div>
				<el-autocomplete
				  v-model="keyword"
				  :fetch-suggestions="querySearchAsync"
				  placeholder="请输入内容"
				  @select="handleSelect"
				></el-autocomplete>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'company',
		keyword:"",
		queryList:[],
      }
    },
    created(){

	},
	activated(){
		this.$store.tabs.commit('assignNewTab', {
			path:this.$route.path,
			name:"档案搜索",
			isActive:true
		})
	},
    methods: {
      	querySearchAsync(queryString, cb) {
      		let url="";
      		let data={};
      		if (this.activeName=="company") {
      			url="Customer/MapCompanyName";
      			data={CompanyName:queryString}
      		}else if(this.activeName=="person"){
      			url="Customer/MapLinkMan";
      			data={LinkMan:queryString}
      		}else if (this.activeName=="telphone") {
      			url="Customer/MapMobile";
      			data={Mobile:queryString}
      		}else if (this.activeName=="ship") {
      			url="Customer/MapShipName";
      			data={ShipName:queryString}
      		}
		    this.$axios.post(this.$store.commonData.state.url+url,data)
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.queryList=[];
					for (var i = response.data.RetData.length - 1; i >= 0; i--) {
						if (this.activeName=="company") {
			      			this.queryList.push({
								value:response.data.RetData[i].CompanyName,
								id:response.data.RetData[i].Id,
							});
			      		}else if(this.activeName=="person"){
			      			this.queryList.push({
								value:response.data.RetData[i].UserName,
								id:response.data.RetData[i].Id,
							});
			      		}else if (this.activeName=="telphone") {
			      			this.queryList.push({
								value:response.data.RetData[i].TelPhone,
								id:response.data.RetData[i].Id,
							});
			      		}else if (this.activeName=="ship") {
			      			this.queryList.push({
								value:response.data.RetData[i].ShipName,
								id:response.data.RetData[i].Id,
							});
			      		}
					}
					cb(this.queryList);
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
    	},
	  	handleClick:function(tab, event) {
		   this.keyword="";
		},
		handleSelect(item) {
	        let id=item.id;
	        if (this.activeName=="company") {
      			this.$router.push({ path: `/main/archives/companyArchives/${id}` });
      		}else if(this.activeName=="person"){
      			this.$router.push({ path: `/main/archives/personArchives/${id}` });
      		}else if (this.activeName=="telphone") {
      			this.$router.push({ path: `/main/archives/personArchives/${id}` });
      		}else if (this.activeName=="ship") {
      			this.$router.push({ path: `/main/archives/shipArchives/${id}` });
      		}
	    }
    }
  }
</script>
<style lang="less" scoped>
@import "../../assets/common.less";

.title{
	.center;
	.grey8C;
	margin-top: 100px;
}
.searchPanel{
	width: 666px;
	margin: 50px auto;
	.el-autocomplete{
		display: block;
	}
}
</style>