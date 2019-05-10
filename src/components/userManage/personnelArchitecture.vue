<template>
  <div class="personnelArchitecture">
    <div class="mainContent">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="mgr10">公司人员架构</span>
          <i class="mgr10 fr fa fa-edit" v-show="!isEditDepartmentTree" @click="isEditDepartmentTree=true"></i>
          <i class="mgr10 fr fa fa-sign-out" v-show="isEditDepartmentTree" @click="isEditDepartmentTree=false"></i>
        </div>
        <div >
          <el-tree
            :data="departmentTree"
            node-key="Id"
            default-expand-all
            :expand-on-click-node="false"
            >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span @click="getStaffList(node,1)">{{ data.Name }}</span>
              <span class="mgl10" v-show="isEditDepartmentTree">
                <i v-if="node.level>1" class="fa fa-edit" @click="() => openEditDialog(node, data)"></i>
                <i v-if="node.level<3" class="fa fa-plus green bold" @click="() => openAppendDialog(node,data)"></i>
                <i v-if="node.level>1" class="fa fa-trash-o red" @click="() => removeDepart(node, data)"></i>
              </span>
            </span>
          </el-tree>
        </div>
      </el-card>
      <div class="manageUser" v-if="curPosition.data">
        <div class="tableName">
          <span>{{curPosition.parent.data.Name}}/{{curPosition.data.Name}}</span>
          <i class="fr mgr10 fa fa-plus" @click="createNewStaff"></i>
        </div>
        <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
          <thead  class="grey8C">
            <th>用户名</th>
            <th>用户全名</th>
            <th>用户权限</th>
            <th>用户电话</th>
            <th>用户邮箱</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr class="bold" v-for="(item,index) in staffList">
              <td>
                <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="staffEditingList[index].UserName"></el-input >
                <span v-else>{{item.UserName}}</span>
              </td>
              <td>
                <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="staffEditingList[index].RealName"></el-input >
                <span v-else>{{item.RealName}}</span>
              </td>
              <td>
                <el-select size="mini" v-if="item.isEdit" v-model="staffEditingList[index].RoleId" placeholder="请选择">
                  <el-option v-for="role in roleList"  :key="role.Id"  :label="role.Name"  :value="role.Id"></el-option>
                </el-select>
                <el-select size="mini" v-else v-model="item.RoleId" placeholder="请选择" disabled>
                  <el-option v-for="role in roleList"  :key="role.Id"  :label="role.Name"  :value="role.Id"></el-option>
                </el-select>
              </td>
              <td>
                <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="staffEditingList[index].PhoneNumber"></el-input >
                <span v-else>{{item.PhoneNumber}}</span>
              </td>
              <td>
                <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="staffEditingList[index].Email"></el-input >
                <span v-else>{{item.Email}}</span>
              </td>
              <td>
                <i class="mgr10 fa fa-save" v-show="item.isEdit" @click="saveStaff(item,index)"></i>
                <i class="mgr10 fa fa-edit" v-show="!item.isEdit" @click="editStaff(item)"></i>
                <i class="fa fa-trash-o" @click="deleteStaff(item,index)"></i>
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
    </div>
    <div class="dialogs">
      <el-dialog
        title="新增部门"
        :visible.sync="createNewDepartmentDialogVisible"
        width="30%">
        <div class="inputWapper">
          <span class="labelName">部门名称</span>
          <el-input v-model="newDepartment.name" class="inputArea"></el-input>
        </div>
        <div class="inputWapper">
          <span class="labelName">排序</span>
          <el-input v-model="newDepartment.sortId" class="inputArea"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createNewDepartmentDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitNewDepartment">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑部门"
        :visible.sync="editDepartmentDialogVisible"
        width="30%">
        <div class="inputWapper">
          <span class="labelName">部门名称</span>
          <el-input v-model="editDepartment.name" class="inputArea"></el-input>
        </div>
        <div class="inputWapper">
          <span class="labelName">排序</span>
          <el-input v-model="editDepartment.sortId" class="inputArea"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDepartmentDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEditDepartment">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增职位"
        :visible.sync="createNewPositionDialogVisible"
        width="30%">
        <div class="inputWapper">
          <span class="labelName">职位名称</span>
          <el-input v-model="newPosition.name" class="inputArea"></el-input>
        </div>
        <div class="inputWapper">
          <span class="labelName">排序</span>
          <el-input v-model="newPosition.sortId" class="inputArea"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createNewPositionDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitNewPosition">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑职位"
        :visible.sync="editPositionDialogVisible"
        width="30%">
        <div class="inputWapper">
          <span class="labelName">职位名称</span>
          <el-input v-model="editPosition.name" class="inputArea"></el-input>
        </div>
        <div class="inputWapper">
          <span class="labelName">排序</span>
          <el-input v-model="editPosition.sortId" class="inputArea"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editPositionDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEditPosition">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'personnelArchitecture',
  data () {
    return {
      departmentTree : [],
      isEditDepartmentTree:false,
      createNewDepartmentDialogVisible:false,
      newDepartment:{
        name:"",
        sortId:"",
        data:{},
        node:{}
      },
      editDepartmentDialogVisible:false,
      editDepartment:{
        name:"",
        sortId:"",
        data:{},
        node:{}
      },
      createNewPositionDialogVisible:false,
      newPosition:{
        name:"",
        sortId:"",
        data:{},
        node:{}
      },
      editPositionDialogVisible:false,
      editPosition:{
        name:"",
        sortId:"",
        data:{},
        node:{}
      },
      curPosition:{},
      roleList:[],
      staffList:[],
      staffEditingList:[],
      currentPage:1,
      pageSize:10,
      totalCount:0,
      newStaffData:{
        UserName:"",
        RealName:"",
        PositionId:"",
        RoleId:"",
        PhoneNumber:"",
        Email:"",
        isEdit:true,
      }
    }
  },
  created(){
    this.getDepartmentTree();
    this.getRoleList();
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"公司人员架构",
      isActive:true
    });
  },
/*  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"公司人员架构",
      isActive:true
    });
  },*/
  methods: {
    getDepartmentTree(){
      this.$axios.get(this.$store.commonData.state.url+"Department/Tree")
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let tempstr=JSON.stringify(response.data.RetData).replace(/Children/g,"children")
          this.departmentTree=[JSON.parse(tempstr)];
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
    openAppendDialog(node,data){
      if (node.level==1) {
        this.newDepartment.data=data;
        this.newDepartment.node=node;
        this.createNewDepartmentDialogVisible=true;
      }else if (node.level==2){
        this.newPosition.data=data;
        this.newPosition.node=node;
        this.createNewPositionDialogVisible=true;
      }
    },
    openEditDialog(node,data){
      if (node.level==2) {
        this.editDepartment.data=data;
        this.editDepartment.node=node;
        this.editDepartment.sortId=data.SortId;
        this.editDepartment.name=data.Name;
        this.editDepartmentDialogVisible=true;
      }else if (node.level==3){
        this.editPosition.data=data;
        this.editPosition.node=node;
        this.editPosition.sortId=data.SortId;
        this.editPosition.name=data.Name;
        this.editPositionDialogVisible=true;
      }
    },
    submitNewDepartment(){
      this.$axios.post(this.$store.commonData.state.url+"Department/Create",{
        Name:this.newDepartment.name,
        SortId:this.newDepartment.sortId,
        ParentId:this.newDepartment.data.Id,
        Id:0,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          const newChild = response.data.RetData;
          if (!this.newDepartment.data.children) {
            this.$set(this.newDepartment.data, 'children', []);
          }
          this.newDepartment.data.children.push(newChild);
          this.newDepartment={}
          this.createNewDepartmentDialogVisible=false;
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
    submitEditDepartment(){
      this.$axios.post(this.$store.commonData.state.url+"Department/Edit",{
        Name:this.editDepartment.name,
        SortId:this.editDepartment.sortId,
        ParentId:this.editDepartment.node.parent.data.Id,
        Id:this.editDepartment.data.Id,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.editDepartmentDialogVisible=false;
          for (let item in response.data.RetData){
            this.editDepartment.data[item]=response.data.RetData[item];
          }
          this.editDepartment.name="";
          this.editDepartment.sortId="";
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
    submitNewPosition(){
      this.$axios.post(this.$store.commonData.state.url+"Position/Create",{
        Name:this.newPosition.name,
        SortId:this.newPosition.sortId,
        DepartmentId:this.newPosition.data.Id,
        Id:0,//后端要
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          const newChild = response.data.RetData;
          if (!this.newPosition.data.children) {
            this.$set(this.newPosition.data, 'children', []);
          }
          this.newPosition.data.children.push(newChild);
          this.newPosition={}
          this.createNewPositionDialogVisible=false;
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
    submitEditPosition(){
      this.$axios.post(this.$store.commonData.state.url+"Position/Edit",{
        Name:this.editPosition.name,
        SortId:this.editPosition.sortId,
        DepartmentId:this.editPosition.node.parent.data.Id,
        Id:this.editPosition.data.Id,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.editPositionDialogVisible=false;
          for (let item in response.data.RetData){
            this.editPosition.data[item]=response.data.RetData[item];
          }
          this.editPosition.name="";
          this.editPosition.sortId="";
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
    removeDepart(node, data) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (node.level==2) {
          this.$axios.get(this.$store.commonData.state.url+`Department/Delete/${data.Id}`)
          .then( (response)=>{
            if (response.data.RetCode==0) {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.Id === data.Id);
              children.splice(index, 1);
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
        }else if (node.level==3) {
          this.$axios.get(this.$store.commonData.state.url+`Position/Delete/${data.Id}`)
          .then( (response)=>{
            if (response.data.RetCode==0) {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.Id === data.Id);
              children.splice(index, 1);
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
        }
      }).catch(() => {
       //doNoting
      });
      
    },

    getStaffList(node,pageIndex){
      if(node.level==3){
        this.curPosition=node;
      }else{
        this.curPosition={};
        return;
      }
      pageIndex>0?this.currentPage=pageIndex:"";
      this.$axios.post(this.$store.commonData.state.url+"Staff/List",{
        DepartmentId:this.curPosition.parent.data.Id,
        PositionId:this.curPosition.data.Id,
        Page:this.currentPage,
        PageSize:this.pageSize,
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let data=response.data.RetData.List
          this.totalCount=response.data.RetData.TotalRecord;
          this.staffEditingList=JSON.parse(JSON.stringify(data));
          for (var i = data.length - 1; i >= 0; i--) {
            data[i].isEdit=false;
          }
          this.staffList=data;
        }else{
          this.staffList=[];
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
      this.getStaffList(this.curPosition)
    },
    createNewStaff(){
      this.newStaffData={
        UserName:"",
        RealName:"",
        PositionId:"",
        RoleId:"",
        PhoneNumber:"",
        Email:"",
        isEdit:true,
      };
      this.newStaffData.PositionId=this.curPosition.data.Id;
      this.letStaffListIsEditAllFalse();
      this.staffList.unshift(JSON.parse(JSON.stringify(this.newStaffData)));
      this.staffEditingList.unshift(JSON.parse(JSON.stringify(this.newStaffData)));
    },
    editStaff(item){
      this.letStaffListIsEditAllFalse();
      item.isEdit=true;
    },
    saveStaff(item,index){
      if (!item.Id) {
        //新建
        this.$axios.post(this.$store.commonData.state.url+"Staff/Create",{
          UserName:this.staffEditingList[index].UserName,
          RealName:this.staffEditingList[index].RealName,
          PositionId:this.curPosition.data.Id,
          RoleId:this.staffEditingList[index].RoleId,
          PhoneNumber:this.staffEditingList[index].PhoneNumber,
          Email:this.staffEditingList[index].Email,
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            this.getStaffList(this.curPosition);
            this.newStaffData={
              UserName:"",
              RealName:"",
              PositionId:"",
              RoleId:"",
              PhoneNumber:"",
              Email:"",
              isEdit:true,
            };
            
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
      }else{
        //编辑
        this.$axios.post(this.$store.commonData.state.url+"Staff/Edit",{
          Id:this.staffEditingList[index].Id,
          UserName:this.staffEditingList[index].UserName,
          RealName:this.staffEditingList[index].RealName,
          PositionId:this.curPosition.data.Id,
          RoleId:this.staffEditingList[index].RoleId,
          PhoneNumber:this.staffEditingList[index].PhoneNumber,
          Email:this.staffEditingList[index].Email,
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            for(let key in this.staffEditingList[index]){
              this.staffList[index][key]=this.staffEditingList[index][key];
            }
            this.staffList[index].isEdit=false;
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
      }
    },
    deleteStaff(item,index){
      if (item.Id>-1) {
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get(this.$store.commonData.state.url+`Staff/Delete/${item.Id}`)
          .then( (response)=>{
            if (response.data.RetCode==0) {
              this.staffList.splice(index,1)
              this.staffEditingList.splice(index,1)
              this.totalCount=this.totalCount-1;
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
      }else{
        this.staffList.splice(index,1)
        this.staffEditingList.splice(index,1)
      }
      
    },
    letStaffListIsEditAllFalse(){
      for (var i = this.staffList.length - 1; i >= 0; i--) {
        this.staffList[i].isEdit=false;
      }
    }
  }
}
</script>

<style scoped>
.box-card{
  float: left;
}
[class*=" el-icon-"], [class^=el-icon-]{
  font-size: 16px;
}
.manageUser{
  overflow: hidden;
  padding-left: 20px;
}

</style>