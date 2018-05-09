<template>
  <div class="columnManage">
    <el-tree
      :data="columnData"
      node-key="Id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.Name }}</span>
        <span class="mgl10">
          <i @click="openEditNodeDialog(data,node)" class="fa fa-edit"></i>
          <i v-if="node.level<5" class="fa fa-plus green " @click="() => openCreateNewNodeDialog(data,node)"></i>
          <i v-if="node.level>1" class="fa fa-trash-o red" @click="() => remove(data, node)"></i>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="新建栏目"
      :visible.sync="createNewNodeData.createNewColumnVisible"
      width="500px">
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">栏目名称</span>
          <el-input v-model="createNewNodeData.name" class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">Url</span>
          <el-input v-model="createNewNodeData.url" class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">PageUrl</span>
          <el-input v-model="createNewNodeData.pageUrl" class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">ControllerName</span>
          <el-input v-model="createNewNodeData.controllerName"class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">ActionName</span>
          <el-input v-model="createNewNodeData.actionName"class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">排序</span>
          <el-input v-model="createNewNodeData.priority"class="inputArea"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createNewNodeData.createNewColumnVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewColumn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑栏目"
      :visible.sync="editNodeData.editColumnVisible"
      width="500px">
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">栏目名称</span>
          <el-input v-model="editNodeData.name" class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">Url</span>
          <el-input v-model="editNodeData.url" class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">PageUrl</span>
          <el-input v-model="editNodeData.pageUrl" class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">ControllerName</span>
          <el-input v-model="editNodeData.controllerName"class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">ActionName</span>
          <el-input v-model="editNodeData.actionName"class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">排序</span>
          <el-input v-model="editNodeData.priority"class="inputArea"></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">修改人</span>
          <el-input v-model="editNodeData.editPerson" class="inputArea" disabled></el-input>
        </div>
      </div>
      <div class="center">
        <div class="inputWapper">
          <span class="labelName">修改时间</span>
          <el-input v-model="editNodeData.editTime" class="inputArea" disabled></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editNodeData.editColumnVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'columnManage',
  data () {
    return {
      columnData : [],
      createNewNodeData:{
        createNewColumnVisible:false,
        data:{},
        node:{},
        url:"",
        pageUrl:"",
        actionName:"",
        controllerName:"",
        priority:"",
        name:"",
      },
      editNodeData:{
        editColumnVisible:false,
        data:{},
        node:{},
        url:"",
        pageUrl:"",
        actionName:"",
        controllerName:"",
        name:"",
        priority:"",
        editPerson:"",
        editTime:"",
      },
      
    }
  },
  created(){
    this.getColumnData();
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"栏目划分",
      isActive:true
    });
  },
  methods: {
    getColumnData(){
      this.$axios.get(this.$store.commonData.state.url+"Column/Tree")
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let tempstr=JSON.stringify(response.data.RetData).replace(/Children/g,"children")
          this.columnData=[JSON.parse(tempstr)];
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
    openCreateNewNodeDialog(data,node){
      this.createNewNodeData.createNewColumnVisible=true;
      this.createNewNodeData.data=data;
      this.createNewNodeData.node=node;
    },
    submitNewColumn(){
      if (this.createNewNodeData.name=="") {
        this.$message({
          message: '栏目名称不能为空',
          type: 'warning'
        });
        return false;
      }
      this.$axios.post(this.$store.commonData.state.url+"Column/Create", {
        Name: this.createNewNodeData.name,
        ControllerName: this.createNewNodeData.controllerName,
        ActionName: this.createNewNodeData.actionName,
        Url: this.createNewNodeData.url,
        PageUrl: this.createNewNodeData.pageUrl,
        Priority:this.createNewNodeData.priority,
        Level:this.createNewNodeData.data.Level+1,
        ParentId:this.createNewNodeData.data.Id,
        Id:0,//后端要要
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          const newChild = response.data.RetData;
          if (!this.createNewNodeData.data.children) {
            this.$set(this.createNewNodeData.data, 'children', []);
          }
          this.createNewNodeData.data.children.push(newChild);
          this.createNewNodeData.createNewColumnVisible=false;
          this.createNewNodeData.name="";
          this.createNewNodeData.url="";
          this.createNewNodeData.api="";
          this.createNewNodeData.actionName="";
          this.createNewNodeData.controllerName="";
          this.createNewNodeData.priority="";
          this.createNewNodeData.data={};
          this.createNewNodeData.node={};
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
    openEditNodeDialog(data,node){
      this.editNodeData.editColumnVisible=true;
      this.editNodeData.data=data;
      this.editNodeData.node=node;
      this.editNodeData.name=data.Name;
      this.editNodeData.url=data.Url;
      this.editNodeData.pageUrl=data.PageUrl;
      this.editNodeData.controllerName=data.ControllerName;
      this.editNodeData.actionName=data.ActionName;
      this.editNodeData.priority=data.Priority;
      this.editNodeData.editPerson=data.editPerson;
      this.editNodeData.editTime=data.editTime;
    },
    editNode(){
      if (this.editNodeData.name=="") {
        this.$message({
          message: '栏目名称不能为空',
          type: 'warning'
        });
        return false;
      }
      this.$axios.post(this.$store.commonData.state.url+"Column/Edit", {
        Id:this.editNodeData.data.Id,
        Name: this.editNodeData.name,
        ControllerName: this.editNodeData.controllerName,
        ActionName: this.editNodeData.actionName,
        Url: this.editNodeData.url,
        PageUrl: this.editNodeData.pageUrl,
        Priority:this.editNodeData.priority,
        Level:this.editNodeData.data.Level,
        ParentId:this.editNodeData.node.parent.data.Id,
        AdminId:0,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.editNodeData.editColumnVisible=false;
          for (let item in response.data.RetData){
            this.editNodeData.data[item]=response.data.RetData[item];
          }
          this.editNodeData.name="";
          this.editNodeData.url="";
          this.editNodeData.api="";
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
    remove(data, node) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(this.$store.commonData.state.url+`Column/Delete/${data.Id}`)
        .then( (response)=>{
          if (response.data.RetCode==0) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.Id === data.Id);
            children.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
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
      })
      .catch(()=>{
          //doNoting
      });
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-tree/deep/.el-tree-node__children .el-tree-node__children .el-tree-node__children .el-tree-node__children{
  white-space: normal;
  .el-tree-node{
    display: inline-block; 
    &:not(:first-child) .el-tree-node__content{
      padding-left: 0px !important;
    }
  } 
}
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
}
</style>
