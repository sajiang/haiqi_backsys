<template>
  <div class="orderFinancialControllerManage">
    <div class="mainContent">
      <div class="filter flexCenter">
        <span class="label">状态</span>
        <el-select size="small" v-model="filter.status" style="width:70px">
          <el-option v-for="item in statusList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
        <span class="label">下单日期</span>
        <el-date-picker size="small"  style="width:125px"
          v-model="filter.startDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-date-picker size="small" style="width:125px"
          v-model="filter.endDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span class="label">货业务</span>
        <el-select size="small" v-model="filter.status" style="width:70px">
          <el-option v-for="item in statusList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
        <span class="label">船业务</span>
        <el-select size="small" v-model="filter.status" style="width:70px">
          <el-option v-for="item in statusList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
        <el-input class="mgl10 input-with-select" placeholder="请输入内容" v-model="filter.keyword" style="width:200px" size="small">
          <el-select  size="small" v-model="filter.searchType" slot="prepend" placeholder="请选择" >
            <el-option label="货主" value="1"></el-option>
            <el-option label="船东" value="2"></el-option>
            <el-option label="船名" value="3"></el-option>
            <el-option label="订单号" value="4"></el-option>
          </el-select>
          <i slot="append" class="el-icon-search"></i>
        </el-input>
        <div class="btns">
          <el-button  class="fr mgl10" type="primary" size="small" @click="">导出word</el-button>
          <el-button  class="fr" type="info" size="small" plain @click="orderSort.orderSortVisible=true">排序</el-button>
        </div>
      </div>
      <el-table :data="orderFinancialControllerManage" :border="true" :fit="true" size="mini" class="table" height="250" :summary-method="getSummaries" :show-summary="showSum" @selection-change="handleSelectionChange" @row-click="showSideDialog">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="date" label="操作" width="120"></el-table-column>
        <el-table-column  prop="name" label="新消息" width="120"></el-table-column>
        <el-table-column  prop="province" label="提单号" width="120"></el-table-column>
        <el-table-column  prop="date" label="下单日期" width="120"></el-table-column>
        <el-table-column  prop="city" label="船名"  width="120"></el-table-column>
        <el-table-column  prop="address" label="装货港" width="120"></el-table-column>
        <el-table-column  prop="address" label="卸货港" width="120"></el-table-column>
        <el-table-column  prop="city" label="收价"  width="120"></el-table-column>
        <el-table-column  prop="city" label="收价含税"  width="120"></el-table-column>
        <el-table-column  prop="city" label="收包船"  width="120"></el-table-column>
        <el-table-column  prop="city" label="应收"  width="120"></el-table-column>
        <el-table-column  prop="city" label="实收"  width="120"></el-table-column>
        <el-table-column  prop="city" label="未收"  width="120"></el-table-column>
        <el-table-column  prop="city" label="收调整"  width="120"></el-table-column>
        <el-table-column  prop="city" label="付价"  width="120"></el-table-column>
        <el-table-column  prop="city" label="付价含税"  width="120"></el-table-column>
        <el-table-column  prop="city" label="付包船"  width="120"></el-table-column>
        <el-table-column  prop="city" label="应付"  width="120"></el-table-column>
        <el-table-column  prop="city" label="实付"  width="120"></el-table-column>
        <el-table-column  prop="city" label="已付"  width="120"></el-table-column>
        <el-table-column  prop="city" label="付调整"  width="120"></el-table-column>
        <el-table-column  prop="city" label="毛利"  width="120"></el-table-column>
      </el-table>
      <div class="flexCenter bottom">
        <div>
          <span>已选</span>
          <span class="selectedNum">{{selectedRow.length}}</span>
          <span>条/{{totalPage}}条</span>
        </div>
        <div class="operator">
          <el-button type="text">删除</el-button>
        </div>
        <div class="flex1"></div>
        <div class="el-pagination"><button class="pageMost" @click="currentPage=1"><i class="el-icon-d-arrow-left"></i></button></div>
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev,jumper,next,slot,sizes"
          :total="totalPage">
          <button class="pageMost" @click="currentPage=pageNum"><i class="el-icon-d-arrow-right"></i></button>
        </el-pagination>
        <div>共{{pageNum}}页</div>
      </div>
    </div>
    <el-dialog title="列表设置" width="370px"  :visible.sync="orderSort.orderSortVisible">
      <div>
        <div class="center">
          <span>排序设置</span>
          <el-select size="small" v-model="filter.status" style="width:120px">
            <el-option v-for="item in statusList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <el-select size="small" v-model="filter.status" style="width:80px">
            <el-option label="升序" :value="1" :key="1"></el-option>
            <el-option label="降序" :value="2" :key="2"></el-option>
          </el-select>
        </div>
        <div>
           <el-table  :data="orderSort.data" style="width: 100%" height="300">
            <el-table-column prop="name" label="勾选显示列项"></el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="orderSort.data = false">确 定</el-button>
      </span>
    </el-dialog>
    <s-operator-component :visible.sync="sideDrawer.visible"></s-operator-component>
  </div>
</template>
<script>
import common from "../../assets/common.js"
import operatorComponent from '@/components/orderManage/operator-component'
export default {
  name: 'orderFinancialControllerManage',
  components: {
    's-operator-component': operatorComponent,
  },
  data () {
    return {
      filter:{
        status: 1,
        startDate:"",
        endDate:"",
        keyword:"",
        searchType:"1"
      },
      statusList:[{id:1,name:"全部"}],
      orderFinancialControllerManage: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海8 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '18 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市8 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市 弄',
          zip: 200333
        }
      ],
      selectedRow:[],
      currentPage:1,
      pageSize:10,
      totalPage:1000,
      showSum:true,
      orderSort:{
        orderSortVisible:false,
        data:[{name:"提单号"},{name:"下单日期"},{name:"船名"},{name:"装货港"},{name:"卸货港"},{name:"装货时间"}]
      },
      sideDrawer:{
        visible:false,
      },
      
    }
  },
  computed:{
    pageNum:function(){
      return parseInt(this.totalPage/this.pageSize)
    }
  },
  created(){
    this.orderFinancialControllerManage=this.orderFinancialControllerManage.concat(JSON.parse(JSON.stringify(this.orderFinancialControllerManage)));
    this.orderFinancialControllerManage=this.orderFinancialControllerManage.concat(JSON.parse(JSON.stringify(this.orderFinancialControllerManage)));
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"订单财务管理",
      isActive:true
    });
  },
  methods:{
    getSummaries(){
      let a=Math.random()
      console.log(a);
      return ["总计",a,"sdg"]
    },
    handleSizeChange(val){
      this.pageSize=val;
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
    showSideDialog(){
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