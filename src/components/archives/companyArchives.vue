<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      <span>首页>{{baseInfo.data.CompanyName}}</span>
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="clearfix mgt20">
      <span>
        <span>编号：</span>
        <span>{{baseInfo.data.FileId}}</span>
        <span class="mgl20">建档时间</span>
        <span>{{baseInfo.data.AddTime}}</span>
      </span>
      <span class="fr">
        <span>更新人：</span>
        <span>刘xx</span>
        <span class="mgl20">更新时间</span>
        <span>2018.04.01 09:15</span>
      </span>
    </div>
    <div class="baseInfo mgt20">
      <div class="tableName">
        <span>基本信息</span>
        <i class="fr mgr10 fa " :class="baseInfo.isEdit?'fa-sign-out':'fa-edit'" @click="baseInfo.isEdit=!baseInfo.isEdit"></i>
        <i class="fr mgr10 fa fa-save" @click="saveBaseInfo" v-show="baseInfo.isEdit"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>公司名</th>
          <th>公司认证</th>
          <th>主营货物</th>
          <th>运输量</th>
          <th>主营流向</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.CompanyName"></el-input >
              <span v-else>{{baseInfo.data.CompanyName}}</span>
            </td>
            <td :class="baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0?'green':''">
              <s-upload-img v-if="baseInfo.isEdit" @fileUpload="saveImgFileData" ref="imgPlugin" class="inputArea"></s-upload-img>
              <span v-else>
                <s-delete-img :img-list.sync="baseInfo.data.AuthSoureList" :soure-type="1" :soure-id='$route.params.companyId'>
                  {{baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0?"已认证":"未认证"}}
                  <i v-if="baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0" class="fr el-icon-success"></i>
                </s-delete-img>
              </span>
              </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.RunGoods"></el-input>
              <span v-else>{{baseInfo.data.RunGoods}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Volume"></el-input>
              <span v-else>{{baseInfo.data.Volume}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.FlowDrection"></el-input>
              <span v-else>{{baseInfo.data.FlowDrection}}</span>
            </td>
          </tr>
          <tr class="grey8C">
            <td>公司类型</td>
            <td>电话</td>
            <td>传真</td>
            <td>邮箱</td>
            <td>地址</td>
          </tr>
          <tr class="bold">
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.CompanyType"></el-input>
              <span v-else>{{baseInfo.data.CompanyType}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.TelPhone"></el-input>
              <span v-else>{{baseInfo.data.TelPhone}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Fax"></el-input>
              <span v-else>{{baseInfo.data.Fax}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Email"></el-input>
              <span v-else>{{baseInfo.data.Email}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Address"></el-input>
              <span v-else>{{baseInfo.data.Address}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bankAccountInfo mgt20">
      <div class="tableName">
        <span>银行账户</span>
        <i class="fr mgr10 fa fa-plus" @click="addBankAccount"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>户名</th>
          <th>银行账号</th>
          <th>开户行</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold" v-for="(item,index) in bankAccountInfo.data">
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="bankAccountInfo.edit[index].AccountName"></el-input >
              <span v-else>{{item.AccountName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="bankAccountInfo.edit[index].AccountNum"></el-input >
              <span v-else>{{item.AccountNum}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="bankAccountInfo.edit[index].BankName"></el-input >
              <span v-else>{{item.BankName}}</span>
            </td>
            <td>
              <i class="mgr10 fa fa-save" v-show="item.isEdit" @click="saveBankAccout(item,index)"></i>
              <i class="mgr10 fa fa-edit" v-show="!item.isEdit" @click="editBankAccout(item)"></i>
              <i class="mgr10 fa fa-trash-o" @click="deleteBankAccount(item,index)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="relatedShip mgt20">
      <div class="tableName">
        <span>关联船舶</span>
        <i class="fr mgr10 fa fa-plus" @click="shipMapDialogVisible=true"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead  class="grey8C">
          <th>船名</th>
          <th>吨位</th>
          <th>船长/船宽</th>
          <th>满载吃水</th>
          <th>类型</th>
          <th>公司认证</th>
          <th>关系</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold" @click="toShipArchives(item)" v-for="(item,index) in relatedShips.data">
            <td>{{item.ShipName}}</td>
            <td>{{item.LoadTon}}</td>
            <td>{{item.Length}}/{{item.Width}}</td>
            <td>{{item.LoadDraught}}</td>
            <td>{{item.ShipType}}</td>
            <td>
              <span  class="green" v-if="item.AuthSoureList&&item.AuthSoureList.length>0">已认证<i class="fr el-icon-success"></i>
              </span>
              <span v-else>未认证</span>
            </td>
            <td @click.stop="">
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput smallInput" type="text" v-model="relatedShips.edit[index].Relate"></el-input>
              <span v-else>{{item.Relate}}</span>
              <i v-if="item.isEdit" @click="saveShipRelated(item,index)" class="mgr10 fr fa fa-save"></i>
              <i v-else @click="editShipRelated(item)" class="mgr10 fr fa fa-edit"></i>
            </td>
            <td class="center" @click.stop="removeRelated(item.RelateId,index,'relatedShips')"><i class="mgr10 fa fa-trash-o"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="relatedPerson mgt20">
      <div class="tableName">
        <span>关联人员</span>
        <i class="fr mgr10 fa fa-plus" @click="personMapDialogVisible=true"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead  class="grey8C">
          <th>姓名</th>
          <th>绑定电话</th>
          <th>职务</th>
          <th>工作范围</th>
          <th>实名认证</th>
          <th>关系</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold" @click="toPersonArchives(item)" v-for="(item,index) in relatedPeople.data">
            <td>{{item.UserName}}</td>
            <td>{{item.TelPhone}}</td>
            <td>{{item.Duty}}</td>
            <td>{{item.DutyRange}}</td>
            <td>
              <span  class="green" v-if="item.AuthSoureList&&item.AuthSoureList.length>0">已认证<i class="fr el-icon-success"></i>
              </span>
              <span v-else>未认证</span>
            </td>
            <td @click.stop="">
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput smallInput" type="text" v-model="relatedPeople.edit[index].Relate"></el-input>
              <span v-else>{{item.Relate}}</span>
              <i v-if="item.isEdit" @click="savePersonRelated(item,index)" class="mgr10 fr fa fa-save"></i>
              <i v-else @click="editPersonRelated(item)" class="mgr10 fr fa fa-edit"></i>
            </td>
            <td class="center" @click.stop="removeRelated(item.RelateId,index,'relatedPeople')"><i class="mgr10 fa fa-trash-o"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="enterpriseInfo mgt20">
      <div class="tableName">
        <span>工商信息</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead  class="grey8C">
          <th>注册资本</th>
          <th>实缴资本</th>
          <th>经营状态</th>
          <th>成立日期</th>
        </thead>
        <tbody>
          <tr>
            <td>2000万元人民币</td>
            <td>2000万元人民币</td>
            <td>存续（在营、开业、在册）</td>
            <td>2006-04-27</td>
          </tr>
        </tbody>
        <thead  class="grey8C">
          <th>注册号</th>
          <th>组织机构代码</th>
          <th>纳税人识别号</th>
          <th>统一社会信用代码</th>
        </thead>
        <tbody>
          <tr>
            <td>460300000003877</td>
            <td>78660695-1</td>
            <td>914603007866069512</td>
            <td>914603007866069512</td>
          </tr>
        </tbody>
        <thead  class="grey8C">
          <th>核准日期</th>
          <th>公司类型</th>
          <th>所属行业</th>
          <th>登记机关</th>
        </thead>
        <tbody>
          <tr>
            <td>2018-01-17</td>
            <td>有限责任公司（非自然人投资或控股的法人还有很多看不清楚）</td>
            <td>交通运输、仓储和邮政业</td>
            <td>洋浦经济开发区工商行政管理局</td>
          </tr>
        </tbody>
        <thead  class="grey8C">
          <th>所属地区</th>
          <th>英文名</th>
          <th>曾用名</th>
          <th>经营方式</th>
        </thead>
        <tbody>
          <tr>
            <td>海南省</td>
            <td>haikou yangpu heyu freight trade co。，ltd</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <thead  class="grey8C">
          <th>人员规模</th>
          <th>营业期限</th>
          <th colspan="2">企业地址</th>
        </thead>
        <tbody>
          <tr>
            <td>100-499人</td>
            <td>2006-04-27至2026-04-27</td>
            <td colspan="2">洋浦经济开发区港北路海岸华庭一期（洋浦海岸华庭一期）J1005号</td>
          </tr>
        </tbody>
        <thead  class="grey8C">
          <th>经营范围</th>
          <th colspan="3">我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用『动态路径参数』（dynamic segment）来达到这个效果：现在呢，像 /user/foo 和 /user/bar 都将映射到相同的路由。一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。于是，我们可以更新 User 的模板，输出当前用户的 ID：
          </th>
        </thead>
      </table>
    </div>
    <div class="stockholderInfo mgt20 mgb20">
      <div class="tableName">
        <span>股东信息</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead  class="grey8C">
          <th>股东</th>
          <th>持股比例</th>
          <th>认缴出资额（万元）</th>
          <th>认缴出资日期</th>
          <th>股东类型</th>
        </thead>
        <tbody>
          <tr class="bold">
            <td>海南海旗投资有限公司</td>
            <td>58.5001%</td>
            <td>650</td>
            <td>2017-12-29</td>
            <td>企业法人</td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog
      title="关联船舶"
      :visible.sync="shipMapDialogVisible"
      width="300px">
      <el-autocomplete
        v-model="shipNameKeyword"
        :fetch-suggestions="queryShipNameAsync"
        placeholder="请输入内容"
        @select="handleShipNameSelect"
      ></el-autocomplete>
    </el-dialog>
    <el-dialog
      title="关联人员"
      :visible.sync="personMapDialogVisible"
      width="300px">
      <el-autocomplete
        v-model="personNameKeyword"
        :fetch-suggestions="queryPersonNameAsync"
        placeholder="请输入内容"
        @select="handlePersonNameSelect"
      ></el-autocomplete>
    </el-dialog>
  </div>
</template>

<script>
import uploadImg from '@/components/common/uploadImg'
import deleteImg from '@/components/common/deleteImg'
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'companyArchives',
  components: {
    's-reload-btn': reloadBtn,
    's-upload-img': uploadImg,
    's-delete-img': deleteImg,
  },
  data () {
    return {
      baseInfo: {
        isEdit:false,
        edit:{
        },
        data:{
        },
        imgObjs:[],
      },
      bankAccountInfo:{
        edit:[],
        data:[],
      },
      shipMapDialogVisible:false,
      shipNameKeyword:"",
      relatedShips:{
        edit:[],
        data:[]
      },
      personMapDialogVisible:false,
      personNameKeyword:"",
      relatedPeople:{
        edit:[],
        data:[],
      }
    }
  },
  created(){
    
  },
  watch:{
    '$route':"onRouterChange"
  },
  activated(){
    this.searchCompany();
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="companyArchives"&&fromR.meta.pageId=="companyArchives") {
        //当前页面是公司档案A 跳转公司档案B(companyId变化)
        this.searchCompany();
      }
    },
    searchCompany(){
      this.$axios.post(this.$store.commonData.state.url+"Customer/SearchCompany",{
        CompanyId:this.$route.params.companyId
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.$store.tabs.commit('assignNewTab', {
            path:this.$route.path,
            name:retData.CompanyModel.CompanyName,
            isActive:true
          });
          this.baseInfo.data=JSON.parse(JSON.stringify(retData.CompanyModel));
          this.baseInfo.edit=JSON.parse(JSON.stringify(retData.CompanyModel));
          this.baseInfo.edit.CompanyBaseInfoId=this.baseInfo.edit.Id;
          this.baseInfo.isEdit=false;
          let bankAccountInfo=retData.BankAccounts;
          for (var i = bankAccountInfo.length - 1; i >= 0; i--) {
            bankAccountInfo[i].isEdit=false;
          }
          this.bankAccountInfo.edit=JSON.parse(JSON.stringify(bankAccountInfo));
          this.bankAccountInfo.data=JSON.parse(JSON.stringify(bankAccountInfo));
          let relatedShips=retData.BeContactShips;
          for (var i = relatedShips.length - 1; i >= 0; i--) {
            relatedShips[i].isEdit=false;
          }
          this.relatedShips.edit=JSON.parse(JSON.stringify(relatedShips));
          this.relatedShips.data=JSON.parse(JSON.stringify(relatedShips));
          let relatedPeople=retData.BeContactCompanyStaffs;
          for (var i = relatedPeople.length - 1; i >= 0; i--) {
            relatedPeople[i].isEdit=false;
          }
          this.relatedPeople.edit=JSON.parse(JSON.stringify(relatedPeople));
          this.relatedPeople.data=JSON.parse(JSON.stringify(relatedPeople));
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
          this.$store.tabs.commit('assignNewTab', {
            path:this.$route.path,
            name:response.data.RetMsg,
            isActive:true
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    saveImgFileData(e){
      this.baseInfo.imgObjs=e.imgObjs;
    },
    saveBaseInfo(){
      let param = new FormData(); //创建form对象  
      for(let key in this.baseInfo.edit){
        param.append(key,this.baseInfo.edit[key]);
      }
      for (var i = this.baseInfo.imgObjs.length - 1; i >= 0; i--) {
        param.append('file', this.baseInfo.imgObjs[i].file,this.baseInfo.imgObjs[i].file.name);
      }
      if (this.baseInfo.imgObjs.length==0) {
        param.append('file',"");
      }
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Customer/EditCompany',
        headers:{'Content-Type':'multipart/form-data'} ,
        data: param,
        
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.searchCompany();
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      });
    },
    addBankAccount(){
      this.bankAccountInfo.edit.unshift({
        AccountName:"",
        AccountNum:"",
        BankName:"",
        isEdit:true});
      this.bankAccountInfo.data.unshift({
        AccountName:"",
        AccountNum:"",
        BankName:"",
        isEdit:true});
    },
    editBankAccout(item){
      item.isEdit=true;
    },
    saveBankAccout(item,index){
      if (!item.Id) {
        //新建
        this.$axios.post(this.$store.commonData.state.url+"Customer/AddBankAccount",{
          RelateId:this.$route.params.companyId,
          RelateType:1,
          AccountName:this.bankAccountInfo.edit[index].AccountName,
          AccountNum:this.bankAccountInfo.edit[index].AccountNum,
          BankName:this.bankAccountInfo.edit[index].BankName,
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            item.isEdit=false;
            item.AccountName=this.bankAccountInfo.edit[index].AccountName;
            item.AccountNum=this.bankAccountInfo.edit[index].AccountNum;
            item.BankName=this.bankAccountInfo.edit[index].BankName;
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
        this.$axios.post(this.$store.commonData.state.url+"Customer/EditBankAccount",{
          BankId:this.bankAccountInfo.edit[index].Id,
          AccountName:this.bankAccountInfo.edit[index].AccountName,
          AccountNum:this.bankAccountInfo.edit[index].AccountNum,
          BankName:this.bankAccountInfo.edit[index].BankName,
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            for(let key in this.bankAccountInfo.edit[index]){
              this.bankAccountInfo.data[index][key]=this.bankAccountInfo.edit[index][key];
            }
            this.bankAccountInfo.data[index].isEdit=false;
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
    deleteBankAccount(item,index){
      if (item.Id>-1) {
        this.$axios.post(this.$store.commonData.state.url+`Customer/RemoveBankAccount`,{
          AccountId:item.Id
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            this.bankAccountInfo.data.splice(index,1)
            this.bankAccountInfo.edit.splice(index,1)
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
        this.bankAccountInfo.data.splice(index,1)
        this.bankAccountInfo.edit.splice(index,1)
      }
    },
    queryShipNameAsync(queryString, cb){
      this.$axios.post(this.$store.commonData.state.url+"Customer/MapShipName",
        {ShipName:queryString})
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let queryList=[];
          for (var i = response.data.RetData.length - 1; i >= 0; i--) {
            queryList.push({
              value:response.data.RetData[i].ShipName,
              id:response.data.RetData[i].Id,
            });
          }
          cb(queryList);
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
    handleShipNameSelect(item){
      this.shipMapDialogVisible=false;
      this.$axios.post(this.$store.commonData.state.url+"Customer/ShipBeContact",
        {ShipId:item.id,
          MainId:this.$route.params.companyId,
          MainType:1,
        })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let data=response.data.RetData;
          data.isEdit=false;
          this.relatedShips.edit.unshift(JSON.parse(JSON.stringify(data)));
          this.relatedShips.data.unshift(JSON.parse(JSON.stringify(data)));
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
    editShipRelated(item){
      item.isEdit=true;
    },
    saveShipRelated(item,index){
      this.$axios.post(this.$store.commonData.state.url+"Customer/EditContact",{
          RelateId:this.relatedShips.edit[index].RelateId,
          Relate:this.relatedShips.edit[index].Relate
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            this.relatedShips.data[index].isEdit=false;
            this.relatedShips.data[index].Relate=this.relatedShips.edit[index].Relate;
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
    toShipArchives(item){
      let shipId=item.Id;
      this.$router.push({ path: `/main/archives/shipArchives/${shipId}` })
    },
    queryPersonNameAsync(queryString, cb){
      this.$axios.post(this.$store.commonData.state.url+"Customer/MapLinkMan",
        {LinkMan:queryString})
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let queryList=[];
          for (var i = response.data.RetData.length - 1; i >= 0; i--) {
            queryList.push({
              value:response.data.RetData[i].UserName,
              id:response.data.RetData[i].Id,
            });
          }
          cb(queryList);
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
    handlePersonNameSelect(item){
      this.personMapDialogVisible=false;
      this.$axios.post(this.$store.commonData.state.url+"Customer/CompanyStaffBeContact",
        { CompanyStaffId:item.id,
          MainId:this.$route.params.companyId,
          MainType:1,
        })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let data=response.data.RetData;
          data.isEdit=false;
          this.relatedPeople.edit.unshift(JSON.parse(JSON.stringify(data)));
          this.relatedPeople.data.unshift(JSON.parse(JSON.stringify(data)));
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
    editPersonRelated(item){
      item.isEdit=true;
    },
    savePersonRelated(item,index){
      this.$axios.post(this.$store.commonData.state.url+"Customer/EditContact",{
          RelateId:this.relatedPeople.edit[index].RelateId,
          Relate:this.relatedPeople.edit[index].Relate
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            this.relatedPeople.data[index].isEdit=false;
            this.relatedPeople.data[index].Relate=this.relatedPeople.edit[index].Relate;
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
    removeRelated(relateId,index,segment){
      this.$axios.post(this.$store.commonData.state.url+"Customer/RmoveContact",{
        RelateId:relateId
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this[segment].data.splice(index,1);
          this[segment].edit.splice(index,1);
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
    toPersonArchives(item){
      let personId=item.Id;
      this.$router.push({ path: `/main/archives/personArchives/${personId}` })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smallInput{
  width: 100px;
}
</style>
