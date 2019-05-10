<template>
<div id="shipArchives" class="wraper">
    <div class="clearfix grey8C">
      <span>首页>{{baseInfo.data.ShipName}}</span>
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="clearfix mgt20">
      <span>
        <span>编号：</span>
        <span>{{baseInfo.data.FileId}}</span>
        <span class="mgl20">建档时间</span>
        <span>{{baseInfo.data.AddTimeStr}}</span>
      </span>
      <span class="fr">
        <span>更新人：</span>
        <span>{{baseInfo.data.UpdatePerson}}</span>
        <span class="mgl20">更新时间</span>
        <span>{{baseInfo.data.UpdateTimeStr}}</span>
      </span>
    </div>
    <div class="baseInfo mgt20">
      <div class="tableName">
        <span>船舶档案基本信息</span>
        <i class="fr mgr10 fa " :class="baseInfo.isEdit?'fa-sign-out':'fa-edit'" @click="baseInfo.isEdit=!baseInfo.isEdit"></i>
        <i class="fr mgr10 fa fa-save" @click="saveBaseInfo" v-show="baseInfo.isEdit"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>船名</th>
          <th>船舶认证</th>
          <th>船舶拼音</th>
          <th>建造年代</th>
          <th>船籍港</th>
          <th>船舶类型</th>
          <th>呼号</th>
          <th>MMSI</th>
          <th>船长/船宽</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.ShipName"></el-input >
              <span v-else>{{baseInfo.data.ShipName}}</span>
            </td>
            <td :class="baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0?'green':''">
              <s-upload-img v-if="baseInfo.isEdit" @fileUpload="saveImgFileData" ref="imgPlugin" class="inputArea"></s-upload-img>
              <span v-else>
                <s-delete-img :img-list.sync="baseInfo.data.AuthSoureList" :soure-type="2" :soure-id='$route.params.shipId'>
                  {{baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0?"已认证":"未认证"}}
                  <i v-if="baseInfo.data.AuthSoureList&&baseInfo.data.AuthSoureList.length>0" class="fr el-icon-success"></i>
                </s-delete-img>
              </span>
            </td>
            <td>{{baseInfo.data.Spell}}</td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.YearOfPro"></el-input >
              <span v-else>{{baseInfo.data.YearOfPro}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.RegistryPort"></el-input >
              <span v-else>{{baseInfo.data.RegistryPort}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.ShipType"></el-input >
              <span v-else>{{baseInfo.data.ShipType}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.HuHao"></el-input >
              <span v-else>{{baseInfo.data.HuHao}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Mmsi"></el-input >
              <span v-else>{{baseInfo.data.Mmsi}}</span>
            </td>
            <td class="nowrap">
              <span v-if="baseInfo.isEdit">
                <el-input size="mini" class="noBorderInput smallInput" type="text" v-model="baseInfo.edit.Length"></el-input >
                <span>/</span>
                <el-input size="mini"  class="noBorderInput smallInput" type="text" v-model="baseInfo.edit.Width"></el-input >
              </span>
              
              <span v-else>{{baseInfo.data.Length}}/{{baseInfo.data.Width}}</span>
            </td>
          </tr>
        </tbody>
        <thead>
          <th>型深</th>
          <th>舱容</th>
          <th>舱口数</th>
          <th>载重吨</th>
          <th>总吨</th>
          <th>净吨</th>
          <th>满载吃水</th>
          <th>空载吃水</th>
          <th>船速</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Depth"></el-input >
              <span v-else>{{baseInfo.data.Depth}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.Capacity"></el-input >
              <span v-else>{{baseInfo.data.Capacity}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.HatchNum"></el-input >
              <span v-else>{{baseInfo.data.HatchNum}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.LoadTon"></el-input >
              <span v-else>{{baseInfo.data.LoadTon}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.TotalTon"></el-input >
              <span v-else>{{baseInfo.data.TotalTon}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.NetTon"></el-input >
              <span v-else>{{baseInfo.data.NetTon}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.LoadDraught"></el-input >
              <span v-else>{{baseInfo.data.LoadDraught}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.LightDraught"></el-input >
              <span v-else>{{baseInfo.data.LightDraught}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.MaxSpeed"></el-input >
              <span v-else>{{baseInfo.data.MaxSpeed}}</span>
            </td>
          </tr>
        </tbody>
        <thead>
          <th colspan="3">适载流向</th>
          <th colspan="3">适载货物</th>
          <th colspan="3">加油地点</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td colspan="3">
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.LoadFlow"></el-input >
              <span v-else>{{baseInfo.data.LoadFlow}}</span>
            </td>
            <td colspan="3">
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.OptimumGoods"></el-input >
              <span v-else>{{baseInfo.data.OptimumGoods}}</span>
            </td>
            <td colspan="3">
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.RefuelStation"></el-input >
              <span v-else>{{baseInfo.data.RefuelStation}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="center mgt20">
      <div class="cardPanel" @click="toShipHistoryTrack">
        <div class="header">航次记录</div>
        <div class="content">{{shipListNum}}</div>
      </div>
      <div class="cardPanel" @click="toShipSubscriber">
        <div class="header">被订阅</div>
        <div class="content">{{beContactNum}}</div>
      </div>
    </div>
    <div class="relatedCompany mgt20">
      <div class="tableName">
        <span>关联公司</span>
        <i class="fr mgr10 fa fa-plus" @click="companyMapDialogVisible=true"></i>
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
          <tr class="bold" v-for="(item,index) in relatedCompany.data" @click="toCompanyArchives(item)">
            <td>{{item.CompanyName}}</td>
            <td>{{item.CompanyType}}</td>
            <td>{{item.FlowDrection}}</td>
            <td>
              <span  class="green" v-if="item.AuthSoureList&&item.AuthSoureList.length>0">已认证<i class="fr el-icon-success"></i>
              </span>
              <span v-else>未认证</span>
            </td>
            <td @click.stop="">
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput smallInput" type="text" v-model="relatedCompany.edit[index].Relate"></el-input>
              <span v-else>{{item.Relate}}</span>
              <i v-if="item.isEdit" @click="saveCompanyRelated(item,index)" class="mgr10 fr fa fa-save"></i>
              <i v-else @click="editCompanyRelated(item)" class="mgr10 fr fa fa-edit"></i>
            </td>
            <td class="center" @click.stop="removeRelated(item.RelateId,index,'relatedCompany')"><i class="mgr10 fa fa-trash-o"></i></td>
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
    <el-dialog
      title="关联公司"
      :visible.sync="companyMapDialogVisible"
      width="300px">
      <el-autocomplete
        v-model="companyNameKeyword"
        :fetch-suggestions="queryCompanyNameAsync"
        placeholder="请输入内容"
        @select="handleCompanyNameSelect"
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
import reloadBtn from '@/components/common/reload-btn'
import uploadImg from '@/components/common/uploadImg'
import deleteImg from '@/components/common/deleteImg'
export default {
  name: 'shipArchives',
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
      shipListNum:0,
      beContactNum:0,

      companyMapDialogVisible:false,
      companyNameKeyword:"",
      relatedCompany:{
        edit:[],
        data:[],
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
    this.searchShip();
  },
  activated(){
    
  },
  watch:{
    '$route':"onRouterChange"
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="shipArchives"&&fromR.meta.pageId=="shipArchives") {
        //当前页面是船舶档案A 跳转船舶档案B(shipId变化)
        this.searchShip();
      }
    },
    searchShip(){
      this.$axios.post(this.$store.commonData.state.url+"Customer/SearchShip",{
        ShipId:this.$route.params.shipId
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.$store.tabs.commit('assignNewTab', {
            path:this.$route.path,
            name:retData.ShipModel.ShipName,
            isActive:true
          });
          retData.ShipModel.ShipId=retData.ShipModel.Id;
          this.baseInfo.data=JSON.parse(JSON.stringify(retData.ShipModel));
          this.baseInfo.edit=JSON.parse(JSON.stringify(retData.ShipModel));
          this.baseInfo.isEdit=false;
          this.shipListNum=retData.ShipListNum;
          this.beContactNum=retData.BeContactNum;
          let relatedCompany=retData.BeContactCompanys;
          for (var i = relatedCompany.length - 1; i >= 0; i--) {
            relatedCompany[i].isEdit=false;
          }
          this.relatedCompany.edit=JSON.parse(JSON.stringify(relatedCompany));
          this.relatedCompany.data=JSON.parse(JSON.stringify(relatedCompany));

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
        url: this.$store.commonData.state.url+'Customer/EditShip',
        headers:{'Content-Type':'multipart/form-data'} ,
        data: param,
        
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.searchShip();
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      });
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
          MainId:this.$route.params.shipId,
          MainType:2,
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
    queryCompanyNameAsync(queryString, cb){
      this.$axios.post(this.$store.commonData.state.url+"Customer/MapCompanyName",
        {CompanyName:queryString})
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let queryList=[];
          for (var i = response.data.RetData.length - 1; i >= 0; i--) {
            queryList.push({
              value:response.data.RetData[i].CompanyName,
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
    handleCompanyNameSelect(item){
      this.companyMapDialogVisible=false;
      this.$axios.post(this.$store.commonData.state.url+"Customer/CompanyBeContact",
        { CompanyBaseInfoId:item.id,
          RelateId:this.$route.params.shipId,
          RelateType:1, //1是船 2是人
        })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          let data=response.data.RetData;
          data.isEdit=false;
          this.relatedCompany.edit.unshift(JSON.parse(JSON.stringify(data)));
          this.relatedCompany.data.unshift(JSON.parse(JSON.stringify(data)));
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
    editCompanyRelated(item){
      item.isEdit=true;
    },
    saveCompanyRelated(item,index){
      this.$axios.post(this.$store.commonData.state.url+"Customer/EditContact",{
          RelateId:this.relatedCompany.edit[index].RelateId,
          Relate:this.relatedCompany.edit[index].Relate
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            this.relatedCompany.data[index].isEdit=false;
            this.relatedCompany.data[index].Relate=this.relatedCompany.edit[index].Relate;
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
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
      }).catch(() => {
       //doNoting
      });
    },
    toCompanyArchives(item){
      let companyId=item.Id;
      this.$router.push({ path: `/main/archives/companyArchives/${companyId}` })
    },
    toPersonArchives(item){
      let personId=item.Id;
      this.$router.push({ path: `/main/archives/personArchives/${personId}` })
    },
    toShipHistoryTrack(){
      let shipName=this.baseInfo.data.ShipName;
      this.$router.push({ path: `/main/archives/shipRelated/historyTrack/${shipName}` })
    },
    toShipSubscriber(){
      let shipName=this.baseInfo.data.ShipName;
      this.$router.push({ path: `/main/archives/shipRelated/subscriber/${shipName}` })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smallInput{
  width: 50px;
}
</style>
