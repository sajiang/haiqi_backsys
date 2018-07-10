<template>
  <div class="statement">
    <div class="clearfix grey8C">
      <span>首页>订单管理>新增保单</span>
    </div>
    <el-table border
    :data="tableData"
    style="width: 100%">
    <el-table-column label="编号" prop="date" width="120"></el-table-column>
    <el-table-column label="保险单号" prop="date" width="120"></el-table-column>
    <el-table-column label="被保险人名称" prop="date" width="120"></el-table-column>
    <el-table-column label="保险公司" prop="date" width="120"></el-table-column>
    <el-table-column label="船舶名称" prop="date" width="120"></el-table-column>
    <el-table-column label="联系人" prop="date" width="120"></el-table-column>
    <el-table-column label="联系电话" prop="date" width="120"></el-table-column>
    <el-table-column label="货物名称" prop="date" width="120"></el-table-column>
    <el-table-column label="数量（吨）" prop="date" width="120"></el-table-column>
    <el-table-column label="起运港" prop="date" width="120"></el-table-column>
    <el-table-column label="目的港" prop="date" width="120"></el-table-column>
    <el-table-column  label="保额（万元）" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="保费" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="起运时间" prop="date" width="120"></el-table-column>
    <el-table-column  label="收款金额" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="收款时间" prop="date" width="120"></el-table-column>
    <el-table-column  label="付款金额" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="付款时间" prop="date" width="120"></el-table-column>
    <el-table-column label="推荐人" prop="date" width="120"></el-table-column>
    <el-table-column  label="总佣金" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="业务员佣金" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="保险负责人佣金" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="是否退佣" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="备注" width="120">
      <template slot-scope="scope">
        <el-input v-if="tableEditData[scope.$index].isEdit" v-model="tableEditData[scope.$index].name" placeholder="请输入内容"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template slot-scope="scope">
        <i class="fa fa-save" @click="handleSave(scope.$index, scope.row)" v-if="tableEditData[scope.$index].isEdit"></i>
        <i class="fa fa-sign-out" @click="handleOut(scope.$index, scope.row)" v-if="tableEditData[scope.$index].isEdit"></i>
        <i class="fa fa-edit" @click="handleEdit(scope.$index, scope.row)" v-else></i>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'statement',
  data () {
    return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableEditData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isEdit:false,
        }, {
          date: '2016-05-04',
          name: '王小虎',
          isEdit:false,
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          isEdit:false,
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          isEdit:false,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"对账单",
      isActive:true
    });
  },
  methods: {
      handleEdit(index, row) {
        this.tableEditData[index].isEdit=true;
      },
      handleOut(index){
        this.tableEditData[index].isEdit=false;
      },
      handleSave(index, row){
        this.tableEditData[index].isEdit=false;
        this.tableData[index]=this.tableEditData[index];
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
