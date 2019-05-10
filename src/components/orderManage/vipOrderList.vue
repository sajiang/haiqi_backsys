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
        <el-date-picker size="small"  style="width:125px"
          v-model="filter.CreateDateMin"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-date-picker size="small" style="width:125px"
          v-model="filter.CreateDateMax"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span class="label">货业务</span>
        <el-select size="small" v-model="filter.Hyewu" style="width:70px">
          <el-option v-for="item in operatorList" :label="item.UserName" :value="item.UserName" :key="item.Id"></el-option>
        </el-select>
        <span class="label">船业务</span>
        <el-select size="small" v-model="filter.Cyewu" style="width:70px">
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
      <el-table :data="vipOrderList" :border="true" :fit="true" size="mini" class="table" height="250" :summary-method="getSummaries" :show-summary="showSum" @selection-change="handleSelectionChange" @row-click="getOrderDetail">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="date" v-if="identity==1||identity==2" label="操作" width="120"></el-table-column>
        <el-table-column  prop="name" v-if="identity==0||identity==1" label="新消息" width="120"></el-table-column>
        <el-table-column  prop="OrderId" label="提单号" width="120"></el-table-column>
        <el-table-column  prop="CreateDateStr" label="下单日期" width="120"></el-table-column>
        <el-table-column  prop="ShipName" label="船名"  width="120"></el-table-column>
        <el-table-column  prop="StartPort" label="装货港" width="120"></el-table-column>
        <el-table-column  prop="EndPort" label="卸货港" width="120"></el-table-column>
        <el-table-column  prop="LoadDateStr" label="受载时间" width="120"></el-table-column>
        <el-table-column  prop="GoodsName" label="货种"  width="120"></el-table-column>
        <el-table-column  label="收价"  width="140">
          <template slot-scope="scope">
            {{ scope.row.ShouJia }}元 {{scope.row.ShouJiaBoat==1?'包船':'不包船'}}{{scope.row.ShouJiaTax==1?'含税':'不含税'}}
          </template>
        </el-table-column>
        <el-table-column label="付价"  width="140">
          <template slot-scope="scope">
            {{ scope.row.FuJia }}元 {{scope.row.FuJiaBoat==1?'包船':'不包船'}}{{scope.row.FuJiaTax==1?'含税':'不含税'}}
          </template>
        </el-table-column>
        <el-table-column  prop="LoadTon" label="载货吨"  width="120"></el-table-column>
        <el-table-column  prop="city" label="装港吨"  width="120"></el-table-column>
        <el-table-column  prop="Yshou" label="应收"  width="120"></el-table-column>
        <el-table-column  prop="ShiShou" label="实收"  width="120"></el-table-column>
        <el-table-column  prop="Yfu" label="应付"  width="120"></el-table-column>
        <el-table-column  prop="ShiFu" label="实付"  width="120"></el-table-column>
        <el-table-column  prop="Mli" label="毛利"  width="120"></el-table-column>
        <el-table-column prop="Cyewu"  label="船业务" width="120"></el-table-column>
        <el-table-column prop="Hyewu"  label="货业务" width="120"></el-table-column>
      </el-table>
      <div class="flexCenter bottom">
        <div>
          <span>已选</span>
          <span class="selectedNum">{{selectedRow.length}}</span>
          <span>条/{{totalCount}}条</span>
        </div>
        <div class="operator">
          <el-button type="text">删除</el-button>
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
            <el-option label="下单时间" :value="1"></el-option>
            <el-option label="提单号" :value="2"></el-option>
          </el-select>
          <el-select size="small" v-model="filter.orderByType" style="width:80px">
            <el-option label="降序" :value="1" :key="1"></el-option>
            <el-option label="升序" :value="2" :key="2"></el-option>
          </el-select>
        </div>
        <div>
           <el-table :data="orderSort.data" style="width: 100%" height="300">
            <el-table-column prop="name" label="勾选显示列项"></el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="orderSort.data = false">确 定</el-button>
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
      statusList:[{id:1,name:"全部"}],
      vipOrderList: [],
      selectedRow:[],
      showSum:true,
      orderSort:{
        orderSortVisible:false,
        data:[{name:"提单号"},{name:"下单日期"},{name:"船名"},{name:"装货港"},{name:"卸货港"},{name:"装货时间"}]
      },
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
  created(){
    this.queryIdentity();
    this.searchOrderList();
    this.getOperatorList();
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
          this.vipOrderList=response.data.RetData.list;
          this.totalCount=response.data.RetData.TotalCount;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
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
    getSummaries(){
      let a=Math.random()
      console.log(a);
      return ["总计",a,"sdg"]
    },
    handleSizeChange(val){
      this.filter.PageSize=val;
    },
    handleCurrentChange(val){

    },
    handleSelectionChange(val) {
      this.selectedRow = val;
      this.showSum=false;
      this.$nextTick()
      .then( ()=> {
        this.showSum=true;
      })
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

</style>
