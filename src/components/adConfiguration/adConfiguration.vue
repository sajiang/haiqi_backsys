<template>
  <div class="adConfiguration">
    <div class="confList mgt20">
      <div class="tableName">
        <span>广告栏配置</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>端口</th>
          <th>页面</th>
          <th>类型</th>
          <th>图片信息</th>
          <th>跳转链接</th>
          <th>起始时间</th>
          <th>结束时间</th>
          <th>备注</th>
          <th>上传时间</th>
          <th>上传人</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr :class="item.IsVaild==2?'backGrey':''" class="bold" v-for="(item,index) in confList.data">
            <td><span>{{item.PortName}}</span></td>
            <td><span>{{item.PageName}}</span></td>
            <td><span>{{item.AdType}}</span></td>
            <td><span><a class="blue" target= _blank :href="item.ImgUrl">{{item.ImgName}}</a></span></td>
            <td><span>{{item.SkipUrl}}</span></td>
            <td><span>{{item.StartTimeStr}}</span></td>
            <td><span>{{item.EndTimeStr}}</span></td>
            <td><span>{{item.Remark}}</span></td>
            <td><span>{{item.AddTimeStr}}</span></td>
            <td><span>{{item.N_AdminName}}</span></td>
            <td class="nowrap">
              <i :class="item.IsVaild==2?'':'blue hand'" class="mgr10 fa fa-plus  " @click="openCreateNewDialog(item,index)"></i>
              <span :class="item.IsVaild==2?'':'blue'" class="hand" @click="toHistory(item)">历史</span>
              <span :class="item.IsVaild==2?'':'red hand'" @click="disableAd(item)">{{item.IsVaild==2?'已失效':'失效'}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pager" v-show='totalCount/pageSize>1'>
        <el-pagination
          :current-page="currentPage"
          @current-change="getNewPage"
          layout="prev, pager, next"
          :page-size='pageSize'
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="新增记录"
      :visible.sync="createNewEventData.visible"
      width="500px">
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">图片信息</span>
          <s-upload-img @fileUpload="saveImgFileData" ref="imgPlugin" class="inputArea">请上传{{createNewEventData.imgSize}}像素的图片</s-upload-img>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">起始时间</span>
          <el-date-picker class="inputArea" value-format="yyyy-MM-dd" v-model="createNewEventData.subData.StartTime"  type="date" :picker-options="pickerOptions" :disabled="createNewEventData.isTimeBase"  placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">结束时间</span>
          <el-date-picker class="inputArea" value-format="yyyy-MM-dd" v-model="createNewEventData.subData.EndTime"  type="date" :picker-options="pickerOptions" :disabled="createNewEventData.isTimeBase"  placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">备注</span>
          <el-input v-model="createNewEventData.subData.Remark"class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">跳转链接</span>
          <el-input v-model="createNewEventData.subData.SkipUrl"class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">出现频率</span>
          <el-select class="inputArea" :disabled="createNewEventData.isTimeBase" v-model="createNewEventData.subData.Hz" placeholder="请选择">
		    <el-option 
		      v-for="item in createNewEventData.frequencyOptions"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value" >
		    </el-option>
		  </el-select>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">出现时长</span>
          <el-input-number :disabled="createNewEventData.isTimeBase" class="inputArea" v-model="createNewEventData.subData.HzDuration" controls-position="right"  :min="1" :max="10"></el-input-number>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createNewEventData.visible = false">取 消</el-button>
        <el-button type="primary" @click="createNewEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadImg from '@/components/common/uploadImg'
export default {
  name: 'adConfiguration',
  components: {
    's-upload-img': uploadImg,
  },
  data () {
    return {
      imgObjs:[],
      confList:{
        data:[],
      },
      pickerOptions:{
      	disabledDate(time) {
            return time.getTime() < Date.now() - 86400000
          },
      },
      createNewEventData:{
      	visible:false,
      	isTimeBase:false,
      	frequencyOptions:[{
          value: '1',
          label: '每天出现一次'
        }, {
          value: '2',
          label: '每次都出现'
        }, {
          value: '3',
          label: '只出现一次'
        }],
        subData:{
        	StartTime:"",
        	EndTime:"",
        	Remark:"",
        	SkipUrl:"",
        	Hz:'',
        	HzDuration:"",
        },
      },
      currentPage:1,
      pageSize:10,
      totalCount:0,
    }
  },
  created(){
  	this.getConfList();
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"广告配置", 
      isActive:true
    });
  },
/*  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"广告配置", 
      isActive:true
    });
  },*/
  methods:{
  	saveImgFileData(e){
  		this.imgObjs=e.imgObjs;
  	},
  	getNewPage(e){
      this.currentPage=e;
      this.getConfList()
    },
  	getConfList(pageIndex){
  	  pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/QueryAdConfigList",{
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.confList.data=retData.list;
          this.totalCount=response.data.RetData.TotalCount;
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
  	openCreateNewDialog(item){
  		if (item.IsVaild==2) {return}
  		this.createNewEventData.visible=true;
  		this.createNewEventData.isTimeBase=item.IsParmanet==1?true:false;
  		this.createNewEventData.subData={
        	StartTime:"",
        	EndTime:"",
        	Remark:"",
        	SkipUrl:"",
        	Hz:'',
        	HzDuration:"",
        };
  		this.createNewEventData.subData.AdId=item.AdId;
  		this.createNewEventData.imgSize=item.ImgSize;
  	},
  	createNewEvent(){
      if (this.imgObjs.length==0) {
        this.$message({
          message: "未上传图片",
          type: 'error'
        });
      }

  		let param = new FormData(); //创建form对象  
  		for(let key in this.createNewEventData.subData){
  			param.append(key,this.createNewEventData.subData[key]);
  		}
  		for (var i = this.imgObjs.length - 1; i >= 0; i--) {
  			param.append('file', this.imgObjs[i].file,this.imgObjs[i].file.name);
  		}
  		this.$axios({
  		  method: 'post',
  		  url: this.$store.commonData.state.url+'Customer/AddAdMedia',
  		  headers:{'Content-Type':'multipart/form-data'} ,
  		  data: param,
  		  
  		}).then((response)=>{
  		  	if (response.data.RetCode==0) {
  		  		this.$message({
  	              message: response.data.RetMsg,
  	              type: 'success'
  	            });
  		    	this.imgObjs=[];
  		    	this.createNewEventData.visible=false;
  		    	this.$refs.imgPlugin.clearImg();
  		    	this.getConfList(1);
  	        }else{
  	            this.$message({
  	              message: response.data.RetMsg,
  	              type: 'error'
  	            });
  	        }
  		});
  	},
  	disableAd(item){
  		if (item.IsVaild==2) {return}

  		let id=item.AdId;
  		this.$axios.post(this.$store.commonData.state.url+"Customer/RemoveAdConfig",{
        AdId:id
      	})
      	.then( (response)=>{
	        if (response.data.RetCode==0) {
	         this.getConfList();
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
  	toHistory(item){
  		let id=item.AdId;
  		this.$router.push({ path: `/main/adConfiguration/history/${id}` })
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
  width: 100px;
  display: inline-block;
}
.inputArea{
  text-align: left;
  width: 300px;
  display: inline-block;
}
</style>
