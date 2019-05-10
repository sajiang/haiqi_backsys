<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="baseInfo mgt20">
      <div class="tableName">
        <span>回访记录</span>
        <i class="fr mgr10 fa fa-plus" @click="dialogVisible=true"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead class="backGrey">
          <th>客服名字</th>
          <th>回访时间</th>
          <th>回访事项</th>
          <th>回访结果</th>
        </thead>
        <tbody >
          <tr v-for="item in returnVisitArr">
            <td>{{item.AdminName}}</td>
            <td>{{item.AddTime}}</td>
            <td>{{item.VisiteTitle}}</td>
            <td>{{item.VisiteContent}}</td>
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
      title="添加回访记录"
      :visible.sync="dialogVisible"
      width="500px">
      <div class="inputWapper">
        <span class="labelName">回访事项</span>
        <el-input v-model="forwhat" class="inputArea"></el-input>
      </div>
      <div class="inputWapper">
        <span class="labelName">回访结果</span>
        <el-input type="textarea" v-model="result" class="inputArea"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addReturnVisiteRecord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'returnVisit',
  components: {
    's-reload-btn': reloadBtn,
  },
  data () {
    return {
      returnVisitArr:[],
      currentPage:1,
      pageSize:10,
      totalCount:0,
      dialogVisible:false,
      forwhat:"",
      result:"",
    }
  },
  created(){
    this.getReturnVisiteList(1);
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"回访记录",
      isActive:true
    });
  },
/*  activated(){
    this.getReturnVisiteList(1);
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"回访记录",
      isActive:true
    });
  },*/
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="returnVisit"&&fromR.meta.pageId=="returnVisit") {
        this.getReturnVisiteList(1);
        this.$store.tabs.commit('assignNewTab', {
          path:this.$route.path,
          name:"回访记录",
          isActive:true
        });
      }
    },
    getReturnVisiteList(pageIndex){
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Customer/SearchReturnVisiteList",{
        CompanyStaffId:this.$route.params.personId,
        PageIndex:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.returnVisitArr=retData.VisitList;
          this.totalCount=response.data.RetData.TotalRecord;
        }else{
          this.returnVisitArr=[];
          this.totalCount=0;
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
      this.getReturnVisiteList();
    },
    addReturnVisiteRecord(){
      this.$axios.post(this.$store.commonData.state.url+"Customer/AddReturnVisite",{
        CompanyStaffId:this.$route.params.personId,
        VisiteTitle:this.forwhat,
        VisiteContent:this.result,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.getReturnVisiteList(1);
          this.forwhat="";
          this.result="";
          this.dialogVisible=false;
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
  }
}
</script>

<style scoped>
</style>
