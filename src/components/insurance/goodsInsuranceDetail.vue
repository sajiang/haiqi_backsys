<template>
  <div class="goodsInsuranceDetail">
    <div class="clearfix grey8C">
      <span>首页>订单管理>订单详情</span>
    </div>
    <div class="clearfix mgt20">
      <span>
        <span>编号：</span>
        <span>{{baseInfo.data.FileId}}</span>
        <span class="mgl20">建档时间:</span>
        <span>{{baseInfo.AddTimeStr}}</span>
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
        <span>基本信息</span>
        <i class="fr mgr10 fa " :class="baseInfo.isEdit?'fa-sign-out':'fa-edit'" @click="baseInfo.isEdit=!baseInfo.isEdit"></i>
        <i class="fr mgr10 fa fa-save" @click="saveBaseInfo" v-show="baseInfo.isEdit"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>货险类别</th>
          <th>保险公司</th>
          <th>货种</th>
          <th>货物</th>
          <th>货值/元</th>
          <th>货物数量</th>
          <th>费率</th>
          <th>保费</th>
          <th>状态</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>
              <el-select  v-if="baseInfo.isEdit" size="mini" v-model="baseInfo.edit.type" >
                <el-option label="基本险" value="1"></el-option>
                <el-option label="综合险" value="2"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.type}}</span>
            </td>
            <td>
              <el-select  v-if="baseInfo.isEdit" size="mini" v-model="baseInfo.edit.type" >
                <el-option label="太平洋保险" value="1"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.type}}</span>
            </td>
            <td>
              <el-select  v-if="baseInfo.isEdit" size="mini" v-model="baseInfo.edit.type" >
                <el-option label="基本险" value="1"></el-option>
                <el-option label="综合险" value="2"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.type}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.CompanyName"></el-input >
              <span v-else>{{baseInfo.data.CompanyName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.RunGoods"></el-input>
              <span v-else>{{baseInfo.data.RunGoods}}</span>
            </td>
            <td class="flex">
              <el-input v-if="baseInfo.isEdit" size="mini" class="goodsNum" v-model="baseInfo.edit.goodsNum"></el-input>
              <el-select v-if="baseInfo.isEdit" size="mini" class="goodsNumUnit" v-model="baseInfo.edit.fd">
                <el-option label="吨" value="1"></el-option>
                <el-option label="箱" value="2"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.type}}</span>
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
              <el-select  v-if="baseInfo.isEdit" size="mini" v-model="baseInfo.edit.type" >
                <el-option label="基本险" value="1"></el-option>
                <el-option label="综合险" value="2"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.type}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="beInsurancePerson mgt20">
      <div class="tableName">
        <span>被保险人</span>
        <i class="fr mgr10 fa " :class="beInsurancePerson.isEdit?'fa-sign-out':'fa-edit'" @click="beInsurancePerson.isEdit=!beInsurancePerson.isEdit"></i>
        <i class="fr mgr10 fa fa-save" @click="saveBeInsurancePerson" v-show="beInsurancePerson.isEdit"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>被保险人名称</th>
          <th>手机号</th>
          <th>合同号/运单号</th>
          <th>是否需要发票</th>
          <th>开票抬头</th>
          <th>纳税人识别号</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.RunGoods"></el-input>
              <span v-else>{{beInsurancePerson.data.RunGoods}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.CompanyName"></el-input >
              <span v-else>{{beInsurancePerson.data.CompanyName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.RunGoods"></el-input>
              <span v-else>{{beInsurancePerson.data.RunGoods}}</span>
            </td>
            
            <td>
              <el-select  v-if="beInsurancePerson.isEdit" size="mini" v-model="beInsurancePerson.edit.type" >
                <el-option label="太平洋保险" value="1"></el-option>
              </el-select>
              <span v-else>{{beInsurancePerson.data.type}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.Volume"></el-input>
              <span v-else>{{beInsurancePerson.data.Volume}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.RunGoods"></el-input>
              <span v-else>{{beInsurancePerson.data.RunGoods}}</span>
            </td>
          </tr>
        </tbody>
        <thead>
          <th>联系人</th>
          <th>联系电话</th>
          <th colspan="2">联系地址</th>
          <th>开户银行</th>
          <th>银行账户</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.RunGoods"></el-input>
              <span v-else>{{beInsurancePerson.data.RunGoods}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.CompanyName"></el-input >
              <span v-else>{{beInsurancePerson.data.CompanyName}}</span>
            </td>
            <td colspan="2">
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.RunGoods"></el-input>
              <span v-else>{{beInsurancePerson.data.RunGoods}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.Volume"></el-input>
              <span v-else>{{beInsurancePerson.data.Volume}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.RunGoods"></el-input>
              <span v-else>{{beInsurancePerson.data.RunGoods}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="transInfo mgt20">
      <div class="tableName">
        <span>运输信息</span>
        <i class="fr mgr10 fa " :class="transInfo.isEdit?'fa-sign-out':'fa-edit'" @click="transInfo.isEdit=!transInfo.isEdit"></i>
        <i class="fr mgr10 fa fa-save" @click="saveTransInfo" v-show="transInfo.isEdit"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>船名</th>
          <th>航次</th>
          <th>起运日期</th>
          <th>起运地</th>
          <th>中转站</th>
          <th>目的地</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.RunGoods"></el-input>
              <span v-else>{{transInfo.data.RunGoods}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.CompanyName"></el-input >
              <span v-else>{{transInfo.data.CompanyName}}</span>
            </td>
            <td>
              <el-date-picker size="mini" v-if="transInfo.isEdit" class="noBorderInput" :picker-options="pickerOptions"  v-model="transInfo.edit.date" type="date"  placeholder="选择日期"></el-date-picker>
              <span v-else>{{transInfo.data.RunGoods}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.RunGoods"></el-input>
              <span v-else>{{transInfo.data.RunGoods}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.Volume"></el-input>
              <span v-else>{{transInfo.data.Volume}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.RunGoods"></el-input>
              <span v-else>{{transInfo.data.RunGoods}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="onlineMoneyRecord mgt20">
      <div class="tableName">
        <span>线上收款信息</span>
        <span>小计：0元</span>
        <i class="fr mgr10 fa fa-plus hand" @click="createNewColumnData.visible=true"></i>
        <span class="fr mgr10 hand" @click="createNewColumnData.visible=true">增加收付款</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>微信支付订单号</th>
          <th>手机号</th>
          <th>支付完成时间</th>
          <th>收入（元）</th>
          <th>余额</th>
          <th>支出（元）</th>
          <th>收款账号</th>
        </thead>
        <tbody>
          <tr class="bold" :class="item.IsVaild==2?'backGrey':''" v-for="(item,index) in onlineMoneyRecord.data">
            <td>
              <span>{{item.GoodType}}</span>
            </td>
            <td>
              <span>{{item.ZF}}</span>
            </td>
            <td>
              <span>{{item.AddTimeStr}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="offlineMoneyRecord mgt20">
      <div class="tableName">
        <span>线下收款信息</span>
        <span>小计：0元</span>
        <i class="fr mgr10 fa fa-plus" @click="addOfflineMoneyRecord"></i>
        <span class="fr mgr10 hand" @click="addOfflineMoneyRecord">新增转账记录</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>流水号</th>
          <th>付款人</th>
          <th>手机号</th>
          <th>支付完成时间</th>
          <th>收入（元）</th>
          <th>余额</th>
          <th>支出（元）</th>
          <th>收款账号</th>
          <th>备注</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold" v-for="(item,index) in offlineMoneyRecord.data">
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].AccountName"></el-input >
              <span v-else>{{item.AccountName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].AccountName"></el-input >
              <span v-else>{{item.AccountName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].AccountName"></el-input >
              <span v-else>{{item.AccountName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].AccountName"></el-input >
              <span v-else>{{item.AccountName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].AccountName"></el-input >
              <span v-else>{{item.AccountName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].AccountName"></el-input >
              <span v-else>{{item.AccountName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].AccountNum"></el-input >
              <span v-else>{{item.AccountNum}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].BankName"></el-input >
              <span v-else>{{item.BankName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].BankName"></el-input >
              <span v-else>{{item.BankName}}</span>
            </td>
            <td class="nowrap">
              <i class="mgr10 fa fa-save" v-show="item.isEdit" @click="saveOfflineMoneyRecord(item,index)"></i>
              <i class="mgr10 fa fa-edit" v-show="!item.isEdit" @click="editOfflineMoneyRecord(item)"></i>
              <i class="mgr10 fa fa-trash-o" @click="deleteOfflineMoneyRecord(item,index)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div class="tableName">保单</div>
      <div>
        <el-button type="success" plain @click="updateContract.visible=true">上传保单</el-button>
        <el-row :gutter="30">
          <el-col class="imgPreview" :span="6" v-for="(item,index) in updateContract.data.imgList" :key="item.id">
            <img :src="item.Thumbnail" @click="previewBigImg(item)">
            <i class="deleteImg el-icon-circle-close" @click="deleteImg(item,index)"></i>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="onlineMoneyRecord mgt20">
      <div class="tableName backRed white">
        <span>退款审核</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>退款人</th>
          <th>退款申请时间</th>
          <th>退款金额</th>
          <th>退款原因</th>
          <th>退款审核人</th>
          <th>审核时间</th>
          <th>备注</th>
          <th>状态</th>
        </thead>
        <tbody>
          <tr class="bold" :class="item.IsVaild==2?'backGrey':''" v-for="(item,index) in refund.data">
            <td>
              <span>{{item.GoodType}}</span>
            </td>
            <td>
              <span>{{item.ZF}}</span>
            </td>
            <td>
              <span>{{item.AddTimeStr}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <el-button type="primary" @click="showRefund(item)">审核</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog
      title="新增收付款"
      :visible.sync="createNewColumnData.visible"
      width="600px">
      <div class="center">
        <el-select class="smallInput" v-model="createNewColumnData.data.type" >
          <el-option label="收款" value="1"></el-option>
          <el-option label="付款" value="2"></el-option>
        </el-select>
        <el-input class="smallInput mgr10" type="text" v-model="baseInfo.data.CompanyName"></el-input >元
      </div>
      <table class="mgt20 el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>金额</th>
          <th>操作人</th>
          <th>操作时间</th>
          <th>状态</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold" :class="item.IsVaild==2?'backGrey':''" v-for="(item,index) in createNewColumnData.data">
            <td>
              <span>{{item.AddTimeStr}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
            <td>
              <span>{{item.N_AdminName}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createNewColumnData.visible = false">取 消</el-button>
        <el-button type="primary" @click="createNewColumnData.visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="上传保单"
      :visible.sync="updateContract.visible"
      width="400px">
      <div class="center">
        <div>
          <span class="labelName">保单号</span>
          <el-input class="middleInput" v-model="updateContract.newData.id" placeholder="请输入内容"></el-input>
        </div>
        <div class="mgt10">
          <span class="labelName"></span>
          <s-upload-img @fileUpload="saveImgFileData" ref="imgPlugin" class="middleInput"></s-upload-img>
        </div>
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateContract.visible = false">取 消</el-button>
        <el-button type="primary" @click="uploadContractImg">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        width="80%"
        :visible.sync="updateContract.isPreviewBigImgShow"
        append-to-body>
        <img class="bigImg" :src="updateContract.currentImgDataUrl">
    </el-dialog>
    <el-dialog
      title="退款审核"
      :visible.sync="refund.visible"
      width="400px">
      <div class="center">
        <div>
          <span class="smallInput">实际退款金额</span>
          <el-input class="middleInput" v-model="refund.checkData.id" placeholder="请输入内容"></el-input>
        </div>
        <div  class="mgt10">
          <span class="smallInput">备注</span>
          <el-input class="middleInput" v-model="refund.checkData.id" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="checkRefund(true)">同意</el-button>
        <el-button type="danger" plain @click="checkRefund(false)">不同意</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadImg from '@/components/common/uploadImg'
export default {
  name: 'goodsInsuranceDetail',
  components: {
    's-upload-img': uploadImg,
  },
  data () {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()-24*60*60*1000;
        },
      },
      baseInfo:{
        isEdit:false,
        data:{},
        edit:{},
      },
      beInsurancePerson:{
        isEdit:false,
        data:{},
        edit:{},
      },
      transInfo:{
        isEdit:false,
        data:{},
        edit:{},
      },
      onlineMoneyRecord:{
        data:[],
      },
      createNewColumnData:{
        visible:false,
        data:{type:"1"},
      },
      offlineMoneyRecord:{
        edit:[],
        data:[],
      },
      updateContract:{
        visible:false,
        isPreviewBigImgShow:false,
        currentImgDataUrl:"",
        data:{},
        newData:{},
        imgObjs:[],
      },
      refund:{
        data:[{}],
        checkData:{},
        visible:false
      }
    }
  },
  activated(){
    this.searchInsuranceDetail();
  },
  watch:{
    '$route':"onRouterChange"
  },
  activated(){
    this.searchInsuranceDetail();
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"订单详情",
      isActive:true
    });
  },
  methods:{
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="goodsInsuranceDetail"&&fromR.meta.pageId=="goodsInsuranceDetail") {
        //当前页面是船舶档案A 跳转船舶档案B(shipId变化)
        this.searchInsuranceDetail();
      }
    },
    searchInsuranceDetail(){
      let goodsInsuranceId = this.$route.params.goodsInsuranceId
    },
    saveBaseInfo(){

    },
    saveBeInsurancePerson(){},
    saveTransInfo(){},
    editOfflineMoneyRecord(item){
      item.isEdit=true;
    },
    addOfflineMoneyRecord(){
      this.offlineMoneyRecord.edit.unshift({
        AccountName:"",
        AccountNum:"",
        BankName:"",
        isEdit:true});
      this.offlineMoneyRecord.data.unshift({
        AccountName:"",
        AccountNum:"",
        BankName:"",
        isEdit:true});
    },
    saveOfflineMoneyRecord(item,index){
      return;
      if (!item.Id) {
        //新建
        this.$axios.post(this.$store.commonData.state.url+"Customer/AddOfflineMoneyRecord",{
          RelateId:this.$route.params.companyId,
          RelateType:1,
          AccountName:this.offlineMoneyRecord.edit[index].AccountName,
          AccountNum:this.offlineMoneyRecord.edit[index].AccountNum,
          BankName:this.offlineMoneyRecord.edit[index].BankName,
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            item.isEdit=false;
            item.AccountName=this.offlineMoneyRecord.edit[index].AccountName;
            item.AccountNum=this.offlineMoneyRecord.edit[index].AccountNum;
            item.BankName=this.offlineMoneyRecord.edit[index].BankName;
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
          BankId:this.offlineMoneyRecord.edit[index].Id,
          AccountName:this.offlineMoneyRecord.edit[index].AccountName,
          AccountNum:this.offlineMoneyRecord.edit[index].AccountNum,
          BankName:this.offlineMoneyRecord.edit[index].BankName,
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            for(let key in this.offlineMoneyRecord.edit[index]){
              this.offlineMoneyRecord.data[index][key]=this.offlineMoneyRecord.edit[index][key];
            }
            this.offlineMoneyRecord.data[index].isEdit=false;
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
    deleteOfflineMoneyRecord(item,index){
      if (item.Id>-1) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(this.$store.commonData.state.url+`Customer/RemoveBankAccount`,{
            AccountId:item.Id
          })
          .then( (response)=>{
            if (response.data.RetCode==0) {
              this.offlineMoneyRecord.data.splice(index,1)
              this.offlineMoneyRecord.edit.splice(index,1)
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
        this.offlineMoneyRecord.data.splice(index,1)
        this.offlineMoneyRecord.edit.splice(index,1)
      }
    },
    saveImgFileData(e){
      this.updateContract.imgObjs=e.imgObjs;
    },
    uploadContractImg(){
      let param = new FormData(); //创建form对象  
      for(let key in this.updateContract.newData){
        param.append(key,this.updateContract.newData[key]);
      }
      for (var i = this.updateContract.imgObjs.length - 1; i >= 0; i--) {
        param.append('file', this.updateContract.imgObjs[i].file,this.updateContract.imgObjs[i].file.name);
      }
      if (this.updateContract.imgObjs.length==0) {
        param.append('file',"");
      }
      return;
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Customer/newDataShip',
        headers:{'Content-Type':'multipart/form-data'} ,
        data: param,
        
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.updateContract.visible=false;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      });
    },
    previewBigImg(item){
      this.updateContract.isPreviewBigImgShow=true;
      this.updateContract.currentImgDataUrl=item.Original;
    },
    deleteImg(item,index){
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(this.$store.commonData.state.url+"Customer/RemoveImgSoure",
          { 
          })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            this.updateContract.imgList.splice(index,1);
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
    showRefund(item){
      this.refund.visible=true;
    },
    checkRefund(status){

    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noBorderInput{
  border: none;
}
.labelName{
  display: inline-block;
  width: 60px;
}
.smallInput{
  display: inline-block;
  width: 100px;
}
.middleInput{
  width: 200px;
  display: inline-block;

}
.goodsNumUnit{
  width: 60%;
}
</style>
