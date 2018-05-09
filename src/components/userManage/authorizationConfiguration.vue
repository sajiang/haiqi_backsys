<template>
  <div class="authorizationConfiguration">
    <div class="tableName">
      <span>权限设置</span>
      <i class="fr mgr10 fa fa-plus" @click="showConfigurationDialog(true)"></i>
    </div>
    <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
      <thead  class="grey8C">
        <th>时间</th>
        <th>权限名称</th>
        <th>描述</th>
        <th>权限设置人员</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr class="bold" v-for="(item,index) in roleList">
          <td>{{item.UpdateTime}}</td>
          <td>{{item.Name}}</td>
          <td>{{item.Description}}</td>
          <td>{{item.AdminName}}</td>
          <td>
            <i @click="showConfigurationDialog(false,item)" class="mgr10 fa fa-edit"></i>
            <i @click="deleteAuth(index,item)" class="fa fa-trash-o"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog
    :title="isCreateNew?'新增权限':'修改权限'"
    :visible.sync="dialogVisible"
    width="700px">
      <div class="buttons">
        <a class="fr" @click="resetChecked">清空所有权限</a>
      </div>
      <div class="inputWapper">
        <span class="labelName">权限名称</span>
        <el-input class="inputArea" v-model="authName"></el-input>
      </div>
      <div class="inputWapper">
        <span class="labelName">权限描述</span>
        <el-input class="inputArea" v-model="authDescribe"></el-input>
      </div>
      
      <el-tree class="configurationTree"
        :data="confInfo"
        show-checkbox
        node-key="Id"
        ref="tree"
        default-expand-all
        :props="defaultProps">
       <!--  <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.Name }}</span>
        </span> -->
      </el-tree>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'authorizationConfiguration',
  data () {
    return {
      isCreateNew:true,
      dialogVisible:false,
      roleList:[],
      confInfo:[],
      authName:"",
      authDescribe:"",
      defaultProps: {
        children: 'Children',
        label: 'Name'
      }
    }
  },
  created(){
    this.getRoleList();
    this.getconfInfo();
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"权限设置",
      isActive:true
    });
  },
  methods:{
    getconfInfo(){
      this.$axios.get(this.$store.commonData.state.url+"Column/Tree")
      .then( (response)=>{
        if (response.data.RetCode==0) {
          //let tempstr=JSON.stringify(response.data.RetData).replace(/Children/g,"children")
          this.confInfo=[response.data.RetData];
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
    getRoleList(){
      this.$axios.get(this.$store.commonData.state.url+"Rights/RoleDropList")
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.roleList=response.data.RetData;
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
    showConfigurationDialog(isCreateNew,item){
      this.dialogVisible=true;
      this.isCreateNew=isCreateNew;
      if (isCreateNew) {
        //新建
        this.authName="",
        this.authDescribe="",
        this.resetChecked();
      }else{
        this.authName=item.Name;
        this.authDescribe=item.Description;
        this.authId=item.Id;
        this.getAuthInfo();
      }
    },
    submitChange(){
      if (this.isCreateNew) {
        this.createNewAuth();
      }else{
        this.saveEditAuth();
      }
    },
    createNewAuth(){
      this.$axios.post(this.$store.commonData.state.url+"Rights/Create",{
        "Name": this.authName,
        "Desc": this.authDescribe,
        "RigthsIds": this.$refs.tree.getCheckedKeys()
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.dialogVisible=false;
          this.getRoleList();
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
    saveEditAuth(){
      this.$axios.post(this.$store.commonData.state.url+"Rights/Edit",{
        "Name": this.authName,
        "Desc": this.authDescribe,
        "Id": this.authId,
        "RigthsIds": this.$refs.tree.getCheckedKeys()
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.dialogVisible=false;
          this.getRoleList();
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
    getAuthInfo(){
      this.$axios.get(this.$store.commonData.state.url+`Rights/FindById/${this.authId}`)
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.$refs.tree.setCheckedKeys(response.data.RetData);
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
    deleteAuth(index,item){
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(this.$store.commonData.state.url+`Rights/Delete/${item.Id}`)
        .then( (response)=>{
          if (response.data.RetCode==0) {
            this.roleList.splice(index,1)
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
      }).catch(() => {
       //doNoting
      });
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([14,19]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-tree/deep/.el-tree-node__children .el-tree-node__children .el-tree-node__children{
  white-space:normal;
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
}
.labelName{
  margin: 0 10px;
  display: inline-block;
}
.inputArea{
  text-align: left;
  width: 70%;
}
</style>
