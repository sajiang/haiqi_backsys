<template>
  <div class="vipOrderList">
    <div class="mainContent">
      <div class="filter flexCenter">
        <span class="label">状态</span>
        <el-select size="small" v-model="filter.OrderState" style="width:70px">
          <el-option label="全部" :value="0" ></el-option>
          <el-option label="正常" :value="1" ></el-option>
          <el-option label="归档" :value="2" ></el-option>
          <el-option label="退船" :value="3" ></el-option>
          <el-option label="纠纷" :value="4" ></el-option>
        </el-select>
        <span class="label">下单日期</span>
        <el-date-picker size="small"  style="width:125px" value-format="yyyy-MM-dd"
          v-model="filter.CreateDateMin"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-date-picker size="small" style="width:125px" value-format="yyyy-MM-dd"
          v-model="filter.CreateDateMax"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span class="label">货业务</span>
        <el-select size="small" v-model="filter.Hyewu" style="width:70px">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in operatorList" :label="item.UserName" :value="item.UserName" :key="item.Id"></el-option>
        </el-select>
        <span class="label">船业务</span>
        <el-select size="small" v-model="filter.Cyewu" style="width:70px">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in operatorList" :label="item.UserName" :value="item.UserName" :key="item.Id"></el-option>
        </el-select>
        <el-input class="mgl10 input-with-select" placeholder="请输入内容" v-model="filter.KeyWord" style="width:200px" size="small">
          <el-select  size="small" v-model="filter.KeyType" slot="prepend" placeholder="请选择" >
            <el-option label="货主" value="1"></el-option>
            <el-option label="船东" value="2"></el-option>
            <el-option label="船名" value="3"></el-option>
            <el-option label="订单号" value="4"></el-option>
          </el-select>
          <i slot="append" class="el-icon-search"></i>
        </el-input>
        <div class="btns">
          <el-button  class="fr mgl10" type="primary" size="small" @click="toCreateNewOrderPage">新建订单</el-button>
          <el-button  class="fr" type="info" size="small" plain @click="orderSort.orderSortVisible=true">排序</el-button>
        </div>
      </div>
      <el-table ref="table" :data="vipOrderList" :border="true" :fit="true" size="mini" class="table" height="250" :summary-method="getSummaries" :show-summary="showSum" @selection-change="handleSelectionChange" @row-click="getOrderDetail">
        <el-table-column fixed type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="date" v-if="identity==1||identity==2" label="操作" width="120"></el-table-column>
        <el-table-column fixed prop="name" v-if="identity==0||identity==1" label="状态" width="120"></el-table-column>
        <el-table-column fixed prop="OrderId" label="提单号" width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.CreateDate" prop="CreateDateStr" label="下单日期" width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.ShipName"  prop="ShipName" label="船名"  width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.StartPort"  prop="StartPort" label="装货港" width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.EndPort"  prop="EndPort" label="卸货港" width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.LoadDate" prop="LoadDateStr" label="受载时间" width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.GoodsName" prop="GoodsName" label="货种"  width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.ShouJia" prop="ShouJiaFormat" label="收价"  width="140"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.FuJia" prop="FuJiaFormat" label="付价"  width="140"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.LoadTon" prop="LoadTon" label="载货吨"  width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.Zgton" prop="Zgton" label="装港吨"  width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.Yshou" prop="Yshou" label="应收"  width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.ShiShou" prop="ShiShou" label="实收"  width="130"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.Yfu" prop="Yfu" label="应付"  width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.ShiFu" prop="ShiFu" label="实付"  width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.Mli" prop="Mli" label="毛利"  width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.Cyewu" prop="Cyewu"  label="船业务" width="120"></el-table-column>
        <el-table-column v-if="!orderSort.hidden.Hyewu" prop="Hyewu"  label="货业务" width="120"></el-table-column>
      </el-table>
      <div class="flexCenter bottom">
        <div>
          <span>已选</span>
          <span class="selectedNum">{{selectedRow.length}}</span>
          <span>条/{{totalCount}}条</span>
        </div>
        <div class="operator">
          <el-button type="text" @click="deleteOrder"  v-if="identity==1||identity==0">删除</el-button>
        </div>
        <div class="flex1"></div>
        <div class="el-pagination"><button class="pageMost" @click="filter.PageIndex=1"><i class="el-icon-d-arrow-left"></i></button></div>
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page.sync="filter.PageIndex"
          :page-size="filter.PageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev,jumper,next,slot,sizes"
          :total="totalCount">
          <button class="pageMost" @click="filter.PageIndex=pageNum"><i class="el-icon-d-arrow-right"></i></button>
        </el-pagination>
        <div>共{{pageNum}}页</div>
      </div>
    </div>
    <el-dialog title="列表设置" width="370px"  :visible.sync="orderSort.orderSortVisible">
      <div>
        <div class="center">
          <span>排序设置</span>
          <el-select size="small" v-model="filter.orderBy" style="width:120px">
            <el-option label="下单时间" value="CreateDate"></el-option>
            <el-option label="提单号" value="OrderId"></el-option>
            <el-option label="船名" value="ShipName"></el-option>
            <!-- <el-option label="货主名" value="2"></el-option> -->
            <el-option label="毛利" value="Mli"></el-option>
            <el-option label="船业务员" value="Cyewu"></el-option>
            <el-option label="货业务员" value="Hyewu"></el-option>
          </el-select>
          <el-select size="small" v-model="filter.orderByType" style="width:80px">
            <el-option label="降序" :value="1" :key="1"></el-option>
            <el-option label="升序" :value="2" :key="2"></el-option>
          </el-select>
        </div>
        <div class="sortTableContainer">
          <table>
            <tr>
              <td>勾选显示列项</td>
              <td><el-switch v-model="filter.allCheck"></el-switch></td>
            </tr>
            <tr v-for="item in orderSort.data">
              <td>{{item.name}}</td>
              <td><el-switch v-model="item.isCheck"></el-switch></td>
            </tr>
          </table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSortType">确 定</el-button>
      </span>
    </el-dialog>
    <s-operator-component :visible.sync="sideDrawer.visible" :order-id="sideDrawer.curOrderId"></s-operator-component>
  </div>
</template>

<script>
import common from "../../assets/common.js"
import operatorComponent from '@/components/orderManage/operator-component'
export default {
  name: 'vipOrderList',
  components: {
    's-operator-component': operatorComponent,
  },
  data () {
    return {
      identity:0,//0业务员 1叶玲（业务员+主管） 2主管  3财务 4出纳
      filter:{
        OrderState: 0,
        CreateDateMin:"",
        CreateDateMax:"",
        KeyWord:"",
        KeyType:"1",
        Cyewu:"",
        Hyewu:"",
        orderBy:"",
        orderByType:"",
        PageIndex:1,
        PageSize:10,
      },
      totalCount:1,
      operatorList:[],
      vipOrderList: [],
      selectedRow:[],
      showSum:true,
      orderSort:{
        orderSortVisible:false,
        hidden:{},
        data:[
          {name:"下单日期",key:"CreateDate",isCheck:true},
          {name:"船名",key:"ShipName",isCheck:true},
          {name:"装货港",key:"StartPort",isCheck:true},
          {name:"卸货港",key:"EndPort",isCheck:true},
          {name:"受载时间",key:"LoadDate",isCheck:true},
          {name:"货种",key:"GoodsName",isCheck:true},
          {name:"收价",key:"ShouJia",isCheck:true},
          {name:"付价",key:"FuJia",isCheck:true},
          {name:"载货吨",key:"LoadTon",isCheck:true},
          {name:"装港吨",key:"Zgton",isCheck:true},
          {name:"应收",key:"Yshou",isCheck:true},
          {name:"实收",key:"ShiShou",isCheck:true},
          {name:"应付",key:"Yfu",isCheck:true},
          {name:"实付",key:"ShiFu",isCheck:true},
          {name:"毛利",key:"Mli",isCheck:true},
          {name:"船业务",key:"Cyewu",isCheck:true},
          {name:"货业务",key:"Hyewu",isCheck:true},
        ]
      },
      totalSum:{},
      sideDrawer:{
        curOrderId:"",
        visible:false,
      },
    }
  },
  computed:{
    pageNum:function(){
      return Math.ceil(this.totalCount/this.filter.PageSize)
    }
  },
  watch:{
    "filter.allCheck":function(newval,oldval){
      for(let o of this.orderSort.data){
        o.isCheck=newval;
      }
    },
    "filter.OrderState":function(newval,oldval){
      this.searchOrderList();
    },
    "filter.CreateDateMin":function(newval,oldval){
      this.searchOrderList();
    },
    "filter.CreateDateMax":function(newval,oldval){
      this.searchOrderList();
    },
    "filter.Hyewu":function(newval,oldval){
      this.searchOrderList();
    },
    "filter.Cyewu":function(newval,oldval){
      this.searchOrderList();
    },
    "filter.KeyType":function(newval,oldval){
      this.searchOrderList();
    },
    "filter.KeyWord":function(newval,oldval){
      this.searchOrderList();
    },
  },
  created(){
    this.queryIdentity();
    this.searchOrderList();
    this.getOperatorList();
    this.getSortType();
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"vip撮合订单",
      isActive:true
    });
  },
  methods:{
    queryIdentity(){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/QueryIdentity',
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.identity=response.data.RetData;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      });
    },
    searchOrderList(){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/QueryBusinessOrder',
        data:this.filter
      }).then((response)=>{
        if (response.data.RetCode==0) {
          let list=response.data.RetData.list;
          for (var i = list.length - 1; i >= 0; i--) {
            list[i].ShouJiaFormat=list[i].ShouJia+"元 "+ (list[i].ShouJiaBoat==1?'包船':'不包船')+(list[i].ShouJiaTax==1?'含税':'不含税');
            list[i].FuJiaFormat=list[i].FuJia+"元 "+ (list[i].FuJiaBoat==1?'包船':'不包船')+(list[i].FuJiaTax==1?'含税':'不含税');
          } 
          this.vipOrderList=response.data.RetData.list;
          this.totalCount=response.data.RetData.TotalCount;
          this.totalSum=response.data.RetData.tjModel;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
    },
    getSummaries(param){
      const { columns, data } = param;
      const sums=[];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        let values = [];
        let total = 0;
        let isSelectRow=this.selectedRow.length>0
        if(isSelectRow){
          values=this.selectedRow.map(item => Number(item[column.property]))
          total=values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
        switch (column.property)
        {
        case "FuAdjust":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.FuTiaoZheng) 
          break;
        case "Mli":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.MaoLi)
          break;
        case "ShiFu":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.ShiFu)
          break;
        case "ShiShou":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.ShiShou)
          break;
        case "ShouAdjust":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.ShouTiaoZheng)
          break;
        case "WeiFu":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.WeiFu)
          break;
        case "WeiShou":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.WeiShou)
          break;
        case "Xgton":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.Xgton)
          break;
        case "Zgton":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.Zgton)
          break;
        case "LoadTon":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.ZaiHuoDun)
          break;
        case "Yfu":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.YingFu)
          break;
        case "Yshou":
          isSelectRow?(sums[index] = total):(sums[index] = this.totalSum.YingShou)
          break;
        default:
          sums[index] = "/"
        }
      });
      return sums;
    },
    updateSummaries(rows){
      this.vipOrderList.push({});
      this.vipOrderList.pop();
    },
    getOperatorList(){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/QueryStaff',
        
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.operatorList=response.data.RetData;
        }
      })
    },
    submitSortType(){
      let updata={
        orderBy:this.filter.orderBy,
        orderByType:this.filter.orderByType
      };
      for (var i = this.orderSort.data.length - 1; i >= 0; i--) {
        updata[this.orderSort.data[i].key]=0
        if(!this.orderSort.data[i].isCheck){
          updata[this.orderSort.data[i].key]=1; //1隐藏
        }
      }
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/Create_YeWuOrderSetItem',
        data:updata
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.orderSort.orderSortVisible = false;
          this.getSortType();
          this.searchOrderList();
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
    },
    getSortType(){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/QueryYeWuOrderSetItem',
        data:{},
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.orderSort.hidden={};
          for(let o of response.data.RetData.list){
            this.orderSort.hidden[o.ItemName]=true;
            for(let i of this.orderSort.data){
              if (o.ItemName==i.key) {
                i.isCheck=false;
              }
            }
          }
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
    },
    handleSizeChange(val){
      this.filter.PageSize=val;
    },
    handleCurrentChange(val){
      this.filter.PageIndex=val;
    },
    deleteOrder(){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/RemoveOrder',
        data:{OrderIds:this.selectedRow.map((item)=>{return item.OrderId}).join(",")},
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.searchOrderList();
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
    },
    handleSelectionChange(val) {
      this.selectedRow = val;
      this.updateSummaries();
    },
    toCreateNewOrderPage(){
      common.openNewPage(this,"/main/order/createNewOrder");
    },
    getOrderDetail(e){
      this.sideDrawer.curOrderId=e.OrderId;
      this.sideDrawer.visible=true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.filter /deep/ .el-input__inner{
  padding: 0 5px;
}
.filter /deep/ .el-date-editor .el-input__inner{
  padding: 0 30px;
}
.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
  width: 30px;
}
.input-with-select /deep/ input{
  border-right: none;
}
.input-with-select /deep/ .el-input-group__append{
  background-color: #fff;
  padding: 5px;
}
.table{
  margin-top: 10px;
}
/deep/ .el-table-column--selection .cell{
  padding: 0;
}
.mainContent{
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  bottom:0;
  left: 10px;
  right: 10px;
}
.filter{
  flex-wrap:wrap;
  .label{
    margin:10px;
  }
  .btns{
    flex: 1;
    min-width: 156px;
  }
}

.bottom{
  padding:10px;
  .selectedNum{
    font-size: 20px
  }
  .operator{
    margin-left: 20px;
    padding-left:20px;
    border-left:1px solid #ccc;
  }
  /deep/ .el-pagination__jump{
    margin-left: 0;
  }
  .el-pagination {
    padding:0;
    .pageMost{
      min-width: 10px;
      padding:0;
    }
  }
  /deep/ .el-pagination .pageMost{
    min-width: 10px;
    padding:0;
  }
}
.sortTableContainer{
  height: 300px;
  overflow-y: scroll;
  table{
    width: 100%;padding: 10px 30px;
    td{
      height: 30px;
      border-bottom:1px solid #EEE;
    }
  }
}
</style>
