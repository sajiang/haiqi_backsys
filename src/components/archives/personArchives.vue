<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      <span>首页>海南和宇运贸有限公司>小张</span>
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
        <span>{{baseInfo.data.UpdateTime}}</span>
      </span>
    </div>
    <div class="baseInfo mgt20">
      <div class="tableName">
        <span>用户个人资料</span>
        <i class="fr mgr10 fa " :class="baseInfo.isEdit?'fa-sign-out':'fa-edit'" @click="baseInfo.isEdit=!baseInfo.isEdit"></i>
        <i class="fr mgr10 fa fa-save" @click="saveBaseInfo" v-show="baseInfo.isEdit"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>姓名</th>
          <th>昵称</th>
          <th>个人认证</th>
          <th>绑定电话</th>
          <th>联系电话</th>
          <th>传真</th>
          <th>性别</th>
          <th>中文拼音</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.UserName"></el-input >
              <span v-else>{{baseInfo.data.UserName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.UserName"></el-input >
              <span v-else>{{baseInfo.data.UserName}}</span>
            </td>
            <td :class="baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0?'green':''">
              <s-upload-img v-if="baseInfo.isEdit" @fileUpload="saveImgFileData" ref="imgPlugin" class="inputArea"></s-upload-img>
              <span v-else>
                <s-delete-img :img-list.sync="baseInfo.data.AuthSoureList" :soure-type="3" :soure-id='$route.params.shipId'>
                  {{baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0?"已认证":"未认证"}}
                  <i v-if="baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0" class="fr el-icon-success"></i>
                </s-delete-img>
              </span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.TelPhone"></el-input >
              <span v-else>{{baseInfo.data.TelPhone}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.OtherTel"></el-input >
              <span v-else>{{baseInfo.data.OtherTel}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Fax"></el-input >
              <span v-else>{{baseInfo.data.Fax}}</span>
            </td>
            <td class="nowrap">
              <el-radio-group class="inputArea" v-if="baseInfo.isEdit"  v-model="baseInfo.edit.Gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
              <span v-else>{{baseInfo.data.Gender}}</span>
            </td>
            <td>
              {{baseInfo.data.Spell}}
            </td>
          </tr>
        </tbody>
        <thead>
          <th colspan="2">邮箱</th>
          <th colspan="2">身份证</th>
          <th colspan="2">身份证地址</th>
          <th>生日</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td colspan="2">
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Email"></el-input >
              <span v-else>{{baseInfo.data.Email}}</span>
            </td>
            <td colspan="2">
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.IdCard"></el-input >
              <span v-else>{{baseInfo.data.IdCard}}</span>
            </td>
            <td colspan="2">
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.IdCardAddress"></el-input >
              <span v-else>{{baseInfo.data.IdCardAddress}}</span>
            </td>
            <td>
              <el-date-picker size="mini" v-if="baseInfo.isEdit" class="inputArea smallInput" v-model="baseInfo.edit.Brithday" type="date" placeholder="选择日期"></el-date-picker>
              <el-date-picker size="mini" v-else class="inputArea smallInput" v-model="baseInfo.data.Brithday" type="date" placeholder="选择日期" disabled></el-date-picker>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="center mgt20">
      <div class="cardPanel" v-if="false">
        <div class="header">订单成交记录</div>
        <div class="content">10</div>
      </div>
      <div class="cardPanel" @click="toPersonReturnVisit">
        <div class="header">客户回访记录</div>
        <div class="content">{{returnVisiteNum}}</div>
      </div>
      <div class="cardPanel" @click="toPersonGoodsAndShipRecord">
        <div class="header">船期/货盘记录</div>
        <div class="content">{{publicShipListNum}}/{{publicGoodsNum}}</div>
      </div>
      <div class="cardPanel" @click="toPersonFollowGoodser">
        <div class="header">关注/被关注</div>
        <div class="content">{{contactNum}}/{{beContactNum}}</div>
      </div>
      <div class="cardPanel" @click="toPersonFollowShip">
        <div class="header">船队</div>
        <div class="content">{{contactShipNum}}</div>
      </div>
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
    <div class="accountInfo mgt20 mgb20">
      <div class="tableName">
        <span>账户记录</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead  class="grey8C">
          <th>产品端口</th>
          <th>注册时间</th>
          <th>最后登录时间</th>
          <th>登录次数</th>
        </thead>
        <tbody>
          <tr class="bold" v-for="i in 3">
            <td>PC</td>
            <td>2018/01/01 15:00</td>
            <td>2018/03/01 15:00</td>
            <td>15</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="relatedCompany mgt20">
      <div class="tableName">
        <span>关联公司</span>
        <i class="fr mgr10 fa fa-plus"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead  class="grey8C">
          <th>公司名</th>
          <th>公司类型</th>
          <th>主营流向</th>
          <th>公司认证</th>
          <th>关系</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold">
            <td>天津海旗船务有限公司</td>
            <td>综合</td>
            <td>洋浦-上海、八所-南通</td>
            <td class="green">已认证<i class="fr el-icon-success"></i></td>
            <td>
              <span>运营权</span>
              <i class="mgr10 fr fa fa-save"></i>
              <i class="mgr10 fr fa fa-edit"></i>
            </td>
            <td class="center"><i class="mgr10 fa fa-trash-o"></i></td>
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
  </div>
</template>

<script>
import reloadBtn from '@/components/common/reload-btn'
import uploadImg from '@/components/common/uploadImg'
import deleteImg from '@/components/common/deleteImg'
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
      contactNum:0,
      beContactNum:0,
      contactShipNum:0,
      publicGoodsNum:0,
      publicShipListNum:0,
      returnVisiteNum:0,
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
    }
  },
  created(){
  },
  activated(){
     this.searchPerson();
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="personArchives"&&fromR.meta.pageId=="personArchives") {
        //当前页面是公司档案A 跳转公司档案B(companyId变化)
        this.searchPerson();
      }
    },
    searchPerson(){
      this.$axios.post(this.$store.commonData.state.url+"Customer/SearchLinkMan",{
        LinkManId:this.$route.params.personId
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.$store.tabs.commit('assignNewTab', {
            path:this.$route.path,
            name:retData.CompanyStaffModel.UserName,
            isActive:true
          });
          this.baseInfo.data=JSON.parse(JSON.stringify(retData.CompanyStaffModel));
          this.baseInfo.edit=JSON.parse(JSON.stringify(retData.CompanyStaffModel));
          this.baseInfo.isEdit=false;
          this.contactNum=retData.ContactNum;
          this.beContactNum=retData.BeContactNum;
          this.contactShipNum=retData.ContactShipNum;
          this.publicGoodsNum=retData.PublicGoodsNum;
          this.publicShipListNum=retData.PublicShipListNum;
          this.returnVisiteNum=retData.ReturnVisiteNum;
          this.contactNum=retData.ContactNum;
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
        url: this.$store.commonData.state.url+'Customer/EditShip',
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
          RelateId:this.$route.params.shipId,
          RelateType:2,//人
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
    toPersonArchives(){
      let personId=456;
      this.$router.push({ path: `/main/archives/personArchives/${personId}` })
    },
    toShipArchives(){
      let shipId=123;
      this.$router.push({ path: `/main/archives/shipArchives/${shipId}` })
    },
    toPersonReturnVisit(){
      let personId=416;
      this.$router.push({ path: `/main/archives/personRelated/returnVisit/${personId}` })
    },
    toPersonGoodsAndShipRecord(){
      let personId=416;
      this.$router.push({ path: `/main/archives/personRelated/goodsAndShipRecord/${personId}` })
    },
    toPersonFollowGoodser(){
      let personId=416;
      this.$router.push({ path: `/main/archives/personRelated/followGoodser/${personId}` })
    },
    toPersonFollowShip(){
      let personId=416;
      this.$router.push({ path: `/main/archives/personRelated/followShip/${personId}` })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smallInput{
  width: 125px;
}
</style>
