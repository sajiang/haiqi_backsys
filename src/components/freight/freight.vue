<template>
  <div class="freight">
    <div class="freightList mgt20">
      <div class="tableName">
        <span>运价表</span>
        <i class="fr mgr10 fa fa-plus hand" @click="createNewColumnData.visible=true"></i>
        <span class="fr mgr10 blue hand" @click="freightList.visible=true"> 生成图片</span>
        <span class="fr mgr10 blue hand" @click="updatePriceData.visible=true"> 修改价格</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>吨位区间</th>
          <th>装货港--卸货港</th>
          <th>货物名称</th>
          <th>价格</th>
          <th>涨幅</th>
          <th>发布时间</th>
          <th>操作人</th>
          <th>操作</th>
          <th>展示</th>
        </thead>
        <tbody>
          <tr class="bold" :class="item.IsVaild==2?'backGrey':''" v-for="(item,index) in freightList.data">
            <td>
              <span>{{item.showTon}}</span>
            </td>
            <td>
              <span>{{item.CourseStart}}-{{item.CourseEnd}}</span>
            </td>
            <td>
              <span>{{item.GoodType}}</span>
            </td>
            <td>
              <span v-if="item.MaxPrice>item.StartPrice">{{item.StartPrice}}-{{item.MaxPrice}}</span>
              <span v-else>{{item.StartPrice}}</span>
            </td>
            <td>
              <span :class="item.ZF.substr(0,item.ZF.length-1)>0?'red':(item.ZF.substr(0,item.ZF.length-1)<0)?'green':''">{{item.ZF}}</span>
            </td>
            <td>
              <span>{{item.AddTimeStr}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span class="blue hand" @click="toHistory(item.TId)">历史</span>
            	<span v-if="item.IsVaild==2" class="green hand" @click="inDate(item.TId)">恢复</span>
            	<span v-else class="red hand" @click="outDate(item.TId)">失效</span>
            </td>
            <td><el-switch :active-value="1" :inactive-value="2" v-model="item.IsCreatePic" @change="updateIsCreatePic(index)" ></el-switch></td>
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
      title="新增栏目"
      :visible.sync="createNewColumnData.visible"
      width="600px">
      <el-row class="row">
        <el-col :span="6" ><div>吨位区间</div></el-col>
        <el-col :span="8" :offset="1"><div><el-input-number  class="inputArea" v-model="createNewColumnData.subData.MinTonnage" controls-position="right"  :min="0"></el-input-number></div></el-col>
        <el-col :span="1" ><div class="center">-</div></el-col>
        <el-col :span="8" ><div><el-input-number  class="inputArea" v-model="createNewColumnData.subData.MaxTonnage" controls-position="right"  :min="0"></el-input-number></div></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="6" ><div>装货港-卸货港</div></el-col>
        <el-col :span="8" :offset="1"><div><el-input v-model="createNewColumnData.subData.CourseStart"class="inputArea"></el-input></div></el-col>
        <el-col :span="1" ><div class="center">-</div></el-col>
        <el-col :span="8" ><div><el-input v-model="createNewColumnData.subData.CourseEnd"class="inputArea"></el-input></div></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="6" ><div>货物名称</div></el-col>
        <el-col :span="17" :offset="1"><div><el-input v-model="createNewColumnData.subData.GoodType"class="inputArea"></el-input></div></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createNewColumnData.visible = false">取 消</el-button>
        <el-button type="primary" @click="addNewColumn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="updatePriceDataDialog"
      title="修改价格"
      :visible.sync="updatePriceData.visible"
      width="700px">
      <div>
        <span class="mgr10">关联日期</span>
        <el-date-picker
          v-model="updatePriceData.relatedDate"
          type="date"
          placeholder="选择日期"
          :picker-options="updatePriceData.pickerOptions">
        </el-date-picker>
      </div>
      <table class="mgt20 el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>吨位区间</th>
          <th>装货港--卸货港</th>
          <th>货物名称</th>
          <th>价格</th>
        </thead>
        <tbody>
          <tr class="bold" v-for="(item,index) in updatePriceData.data">
            <td>
              <span v-if="item.MinTonnage!=null">{{item.MinTonnage}}-{{item.MaxTonnage}}</span>
              <span v-else>{{item.MaxTonnage}}</span>
            </td>
            <td>
              <span>{{item.CourseStart}}-{{item.CourseEnd}}</span>
            </td>
            <td>
              <span>{{item.GoodType}}</span>
            </td>
            <td>
              <el-input-number  class="inputArea" v-model="item.StartPrice" controls-position="right"  :min="0"></el-input-number><span class="mgr10 mgl10">-</span><el-input-number  class="inputArea" v-model="item.MaxPrice" controls-position="right"  :min="0"></el-input-number>
            </td>
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePriceData.visible = false">取 消</el-button>
        <el-button type="primary" v-loading="isSubmit" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.5)" customClass="fl" @click="updatePriceList">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      title="生成图片"
      :visible.sync="freightList.visible"
      width="500px">
      <div class="center priceListTitle">超级船东</div>
      <div > <span class="fr">{{createdPicList.length>0?createdPicList[0].AddTimeStr.split(" ")[0]:''}}</span></div>
      <table class="priceList" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>吨位</th>
          <th>装港</th>
          <th>卸港</th>
          <th>运价</th>
          <th>货种</th>
          <th>环比</th>
        </thead>
        <tbody>
          <tr class="bold" v-for="(item,index) in createdPicList" >
            <td :rowspan="item.rowspan" v-if="item.display">
              <span>{{item.showTon}}</span>
            <td>
              <span>{{item.CourseStart}}</span>
            </td>
            <td>
              <span>{{item.CourseEnd}}</span>
            </td>
            <td>
              <span v-if="item.MaxPrice>item.StartPrice&&item.StartPrice!==null">{{item.StartPrice}}-{{item.MaxPrice}}</span>
              <span v-else>{{item.StartPrice}}</span>
            </td>
            <td>
              <span>{{item.GoodType}}</span>
            </td>
            <td>
              <span :class="item.ZF.substr(0,item.ZF.length-1)>0?'red':(item.ZF.substr(0,item.ZF.length-1)<0)?'green':''">{{item.ZF}}</span>
            </td>
          </tr>
          <tr class="tip">
            <td colspan="6">以上运价仅供参考，以市场行情为准(运价单位：元/吨)</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'freight',
  data () {
    return {
      isSubmit:false,
      freightList: {
      	data:[],
        visible:false
      },
      createdPicList:[],
      createNewColumnData:{
        visible:false,
        subData:{},
      },
      updatePriceData:{
        visible:false,
        relatedDate:Date.now(),
        pickerOptions:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        data:{}
      },
      currentPage:1,
      pageSize:15,
      totalCount:0,
    }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"运价表", 
      isActive:true
    });
  },
  created(){
    this.getPriceList();
    this.getUpdatePriceDataList();
  },
  methods:{
    getPriceList(pageIndex){
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/QueryShipFreightTempLatePriceList",{
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          let createdPicList=[];
          for (var i = 0;i<retData.list.length;i++) {
            if(retData.list[i].MinTonnage==retData.list[i].MaxTonnage){
              retData.list[i].showTon=retData.list[i].MinTonnage;
            }else{
              if (retData.list[i].MinTonnage==null||retData.list[i].MaxTonnage==null) {
                retData.list[i].showTon=retData.list[i].MinTonnage?retData.list[i].MinTonnage:retData.list[i].MaxTonnage;
              }else{
                retData.list[i].showTon=retData.list[i].MinTonnage+'-'+retData.list[i].MaxTonnage;
              }
              
            }
            retData.list[i].rowspan=1;
            retData.list[i].display=true;
            
          }
          this.freightList.data=retData.list;
          this.generateCreatePicList();
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
    generateCreatePicList(){
      let createdPicList=[];
      for (var i = 0;i<this.freightList.data.length; i++) {
        if(this.freightList.data[i].IsCreatePic==1){
          this.freightList.data[i].rowspan=1;
          this.freightList.data[i].display=true;
          createdPicList.push(this.freightList.data[i]);
        }
      }
      for(var i=0;i<createdPicList.length-1;i++){
        var k=1;
        while(createdPicList[i].showTon==createdPicList[i+k].showTon){
          if (createdPicList[i].IsCreatePic==1) {
            createdPicList[i].rowspan++;
            createdPicList[i+k].display=false;
          }
          k++;
          if (i+k>createdPicList.length-1) {break;}
        }
        i=i+k-1;
      }
      this.createdPicList=createdPicList;
    },
    getUpdatePriceDataList(){
      this.$axios.post(this.$store.commonData.state.url+"Customer/QueryShipFreightTempLateList",{
        PageIndex:1,
        PageSize:2000,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.updatePriceData.data=retData.list;
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
    getNewPage(e){
      this.currentPage=e;
      this.getPriceList()
    },
    addNewColumn(){
      if (this.createNewColumnData.subData.MaxTonnage<=0 ||
          !this.createNewColumnData.subData.CourseStart ||
          !this.createNewColumnData.subData.CourseEnd ||
          !this.createNewColumnData.subData.GoodType ) {
        this.$message({
          message: "每一项都是必填项",
          type: 'error'
        });
        return;
      }
      if (this.createNewColumnData.subData.MinTonnage<=0) {
        this.createNewColumnData.subData.MinTonnage=null;
      }
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Customer/AddShipFreightTempLate',
        data: this.createNewColumnData.subData,
        
      }).then((response)=>{
          if (response.data.RetCode==0) {
            this.$message({
              message: response.data.RetMsg,
              type: 'success'
            });
            this.createNewColumnData.subData={};
            this.createNewColumnData.visible=false;
            this.getUpdatePriceDataList(1);
          }else{
            this.$message({
              message: response.data.RetMsg,
              type: 'error'
            });
          }
      });
    },
    updatePriceList(){
      if (this.isSubmit) {return}
      this.isSubmit=true;
      var subData={};
      subData.listParms=[];
      for (var i = 0;i<this.updatePriceData.data.length ;i++) {
        if (this.updatePriceData.data[i].StartPrice<=0||!this.updatePriceData.data[i].StartPrice) {
          this.$message({
            message: "最低运价为必填项",
            type: 'error'
          });
          return;
        }
        if (!this.updatePriceData.relatedDate) {
          this.$message({
            message: "日期为必填项",
            type: 'error'
          });
          return;
        }
        subData.listParms.push({
          TId:this.updatePriceData.data[i].TId,
          CourseStart:this.updatePriceData.data[i].CourseStart,
          CourseEnd :this.updatePriceData.data[i].CourseEnd ,
          GoodType :this.updatePriceData.data[i].GoodType,
          MaxTonnage  :this.updatePriceData.data[i].MaxTonnage ,
          MinTonnage :this.updatePriceData.data[i].MinTonnage,
          StartPrice:this.updatePriceData.data[i].StartPrice,
          MaxPrice:this.updatePriceData.data[i].MaxPrice?this.updatePriceData.data[i].MaxPrice:this.updatePriceData.data[i].StartPrice,
          AddTime:new Date(this.updatePriceData.relatedDate).toLocaleString().split(" ")[0]
        });
      }
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Customer/UpdateShipFreightTempLatePrice',
        data: subData,
        
      }).then((response)=>{
        this.isSubmit=false;

        if (response.data.RetCode==0) {
          this.$message({
            message: response.data.RetMsg,
            type: 'success'
          });
          this.updatePriceData.visible=false;
          this.getPriceList();
          }else{
            this.$message({
              message: response.data.RetMsg,
              type: 'error'
            });
          }
      });
    },
    updateIsCreatePic(index){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Customer/updateIsCreatePic',
        data: {
          IsCreatePic:this.freightList.data[index].IsCreatePic,
          tempLateId:this.freightList.data[index].TId,
        },
        
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.$message({
            message: response.data.RetMsg,
            type: 'success'
          });
          this.generateCreatePicList();
        }
      });
    },
    inDate(id){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Customer/exeShipFreightTempLateRecover',
        data: {TId:id},
        
      }).then((response)=>{
          if (response.data.RetCode==0) {
            this.$message({
              message: "恢复成功",
              type: 'success'
            });
            this.getPriceList();
            this.getUpdatePriceDataList();
          }else{
            this.$message({
              message: response.data.RetMsg,
              type: 'error'
            });
          }
      });
    },
    outDate(id){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Customer/exeShipFreightTempLateFailure',
        data: {TId:id},
        
      }).then((response)=>{
          if (response.data.RetCode==0) {
            this.$message({
              message: "移除成功",
              type: 'success'
            });
            this.getPriceList();
            this.getUpdatePriceDataList();
          }else{
            this.$message({
              message: response.data.RetMsg,
              type: 'error'
            });
          }
      });
    },
    toHistory(id){
      this.$router.push({ path: `/main/freight/freightHistory/${id}` })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.row{
  line-height: 40px;
  margin: 10px;
}
.updatePriceDataDialog /deep/ .el-input-number{
  width: 150px;
}
.priceListTitle{
  color: #99B2DA;
  font-size: 25px;
}
.priceList {
  margin-top:20px;
  width:100%;
  line-height:40px;
  text-align:center;
  border:1px solid #EEE;
  font-size:16px;
  th{
    border:1px solid #EEE;
    background-color: #99B2DA;
    color: white;
  }
  td{
    border:1px solid #EEE;
  }
  tbody tr:nth-child(odd){
    background: #DDE7E8;
  }
  .tip{
    background-color: #99B2DA;
    color: white;
    font-size:14px;
  }
}
</style>
