<template>
  <div class="goodsInsuranceDetail">
    <div class="clearfix grey8C">
      <span>首页>订单管理>订单详情</span>
    </div>
    <div class="clearfix mgt20">
      <span>
        <span>编号：</span>
        <span>{{baseInfo.data.InsuranceNum}}</span>
        <span class="mgl20">建档时间:</span>
        <span>{{baseInfo.data.AddTimeStr}}</span>
      </span>
      <span class="fr">
        <span>更新人：</span>
        <span>{{baseInfo.data.AdminName}}</span>
        <span class="mgl20">更新时间</span>
        <span>{{baseInfo.data.EditTimeStr}}</span>
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
          <th>付款人电话</th>
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
              <el-select  v-if="baseInfo.isEdit" size="mini" v-model="baseInfo.edit.Gins_BaseTypeId" >
                <el-option :key="item.Id" :label="item.TypeName" v-for="item in baseData.BaseTypeList" :value="item.Id"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.Gins_BaseTypeName}}</span>
            </td>
            <td>
              <el-select  v-if="baseInfo.isEdit" size="mini" v-model="baseInfo.edit.Gins_BaseCompanyId" >
                <el-option :key="item.Id" :label="item.CompanyName" v-for="item in baseData.BaseCompanyList" :value="item.Id"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.Gins_BaseCompanyName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.PayerMobile"></el-input >
              <span v-else>{{baseInfo.data.PayerMobile}}</span>
            </td>
            <td>
              <el-select  v-if="baseInfo.isEdit" size="mini" v-model="baseInfo.edit.Gins_BaseGoodsTypeId" @change="goodsTypeChange">
                <el-option :key="item.Id" :label="item.GoodsTypeName" v-if="baseInfo.edit.Gins_BaseCompanyId==item.Gins_BaseCompanyId&&baseInfo.edit.Gins_BaseTypeId==item.Gins_BaseTypeId" v-for="item in baseData.BaseGoodsTypeList" :value="item.Id"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.Gins_BaseGoodsTypeName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.GoodsName"></el-input >
              <span v-else>{{baseInfo.data.GoodsName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.GoodsValue"></el-input>
              <span v-else>{{baseInfo.data.GoodsValue}}</span>
            </td>
            <td class="flex">
              <el-input v-if="baseInfo.isEdit" size="mini" class="goodsNum" v-model="baseInfo.edit.GoodsQuantity"></el-input>
              <el-select v-if="baseInfo.isEdit" size="mini" class="goodsNumUnit" v-model="baseInfo.edit.Gins_BaseGoodsUnitId">
                <el-option :key="item.Id" :label="item.Unit" v-for="item in baseData.BaseGoodsUnitList" :value="item.Id"></el-option>
              </el-select>
              <span v-else>{{baseInfo.data.GoodsQuantity}}/{{baseInfo.data.Gins_BaseGoodsUnitName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.InsuranceRate"></el-input>
              <span v-else>{{baseInfo.data.InsuranceRate}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="baseInfo.isEdit" class="noBorderInput" type="text" v-model="baseInfo.edit.InsurancePremium"></el-input>
              <span v-else>{{baseInfo.data.InsurancePremium}}</span>
            </td>
            <td>
              <span class="nowrap">{{baseInfo.data.StateName}}</span>
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
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.Subject"></el-input>
              <span v-else>{{beInsurancePerson.data.Subject}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.Mobile"></el-input >
              <span v-else>{{beInsurancePerson.data.Mobile}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.ContractNum"></el-input>
              <span v-else>{{beInsurancePerson.data.ContractNum}}</span>
            </td>
            
            <td>
              <el-select  v-if="beInsurancePerson.isEdit" size="mini" v-model="beInsurancePerson.edit.NeedInvoice" >
                <el-option label="不需要" :value=1 ></el-option>
                <el-option label="增值税普票" :value=2 ></el-option>
                <el-option label="增值税专票" :value=3 ></el-option>
              </el-select>
              <span v-else>{{beInsurancePerson.data.NeedInvoice==1?"不需要":(beInsurancePerson.data.NeedInvoice==2?"增值税普票":"增值税专票")}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.InvoiceTitle"></el-input>
              <span v-else>{{beInsurancePerson.data.InvoiceTitle}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.RatepayerNum"></el-input>
              <span v-else>{{beInsurancePerson.data.RatepayerNum}}</span>
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
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.LinkMan"></el-input>
              <span v-else>{{beInsurancePerson.data.LinkMan}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.MobilePhone"></el-input >
              <span v-else>{{beInsurancePerson.data.MobilePhone}}</span>
            </td>
            <td colspan="2">
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.Address"></el-input>
              <span v-else>{{beInsurancePerson.data.Address}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.Bank"></el-input>
              <span v-else>{{beInsurancePerson.data.Bank}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="beInsurancePerson.isEdit" class="noBorderInput" type="text" v-model="beInsurancePerson.edit.BankAccount"></el-input>
              <span v-else>{{beInsurancePerson.data.BankAccount}}</span>
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
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.ShipName"></el-input>
              <span v-else>{{transInfo.data.ShipName}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.Voyage"></el-input >
              <span v-else>{{transInfo.data.Voyage}}</span>
            </td>
            <td>
              <el-date-picker size="mini" v-if="transInfo.isEdit" class="noBorderInput" :picker-options="pickerOptions"  v-model="transInfo.edit.StartDate" type="date"  placeholder="选择日期"></el-date-picker>
              <span v-else>{{transInfo.data.StartDate}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.StartPoint"></el-input>
              <span v-else>{{transInfo.data.StartPoint}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.TransferPoint"></el-input>
              <span v-else>{{transInfo.data.TransferPoint}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="transInfo.isEdit" class="noBorderInput" type="text" v-model="transInfo.edit.AimPoint"></el-input>
              <span v-else>{{transInfo.data.AimPoint}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="onlineMoneyRecord mgt20">
      <div class="tableName">
        <span>线上收付款信息</span>
        <span>小计：{{OnLineSubTotal}}元</span>
        <i class="fr mgr10 fa fa-plus hand" @click="createNewColumnData.visible=true"></i>
        <span class="fr mgr10 hand" @click="createNewColumnData.visible=true">增加收付款</span>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>微信支付订单号</th>
          <th>手机号</th>
          <th>支付完成时间</th>
          <th>收入（元）</th>
          <!-- <th>余额</th> -->
          <th>支出（元）</th>
        </thead>
        <tbody>
          <tr class="bold" :class="item.IsVaild==2?'backGrey':''" v-for="(item,index) in onlineMoneyRecord.data">
            <td>
              <span>{{item.WeChatOrderNum}}</span>
            </td>
            <td>
              <span>{{item.Mobile}}</span>
            </td>
            <td>
              <span>{{item.PaytTimeStr}}</span>
            </td>
            <td>
              <span>{{item.Income==0?'':item.Income}}</span>
            </td>
            <!-- <td>
              <span>{{item.Balance}}</span>
            </td> -->
            <td>
              <span>{{item.Expend==0?'':item.Expend}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="offlineMoneyRecord mgt20">
      <div class="tableName">
        <span>线下收款信息</span>
        <span>小计：{{OffLineSubTotal}}元</span>
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
          <!-- <th>余额</th> -->
          <th>支出（元）</th>
          <th>收款账号</th>
          <th>备注</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold" v-for="(item,index) in offlineMoneyRecord.data">
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].SerialNum"></el-input >
              <span v-else>{{item.SerialNum}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].PayMan"></el-input >
              <span v-else>{{item.PayMan}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].Mobile"></el-input >
              <span v-else>{{item.Mobile}}</span>
            </td>
            <td>
              <el-date-picker size="mini" v-if="item.isEdit" class="noBorderInput"
                v-model="offlineMoneyRecord.edit[index].PaytTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              <span v-else>{{item.PaytTimeStr}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].Income"></el-input >
              <span v-else>{{item.Income==0?"":item.Income}}</span>
            </td>
            <!--<td>
              <span>{{item.Balance}}</span>
            </td> -->
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].Expend"></el-input >
              <span v-else>{{item.Expend==0?"":item.Expend}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].AccountNum"></el-input >
              <span v-else>{{item.AccountNum}}</span>
            </td>
            <td>
              <el-input size="mini" v-if="item.isEdit" class="noBorderInput" type="text" v-model="offlineMoneyRecord.edit[index].BackRemark"></el-input >
              <span v-else>{{item.BackRemark}}</span>
            </td>
            <td class="nowrap">
              <i class="mgr10 fa fa-save" v-show="item.isEdit" @click="saveOfflineMoneyRecord(item,index)"></i>
              <i class="mgr10 fa fa-edit" v-show="!item.isEdit" @click="editOfflineMoneyRecord(index)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div class="tableName">保单</div>
      <div>
        <el-button type="success" plain @click="updateContract.visible=true">上传保单</el-button>
        <div  class="mgt20" v-for="(item,index) in updateContract.data" :key="item.id">
            <!-- <img class="preview" :src="item.thumImgUrl" @click="previewBigImg(item)"> -->
            <a :href="item.OriginImgUrl" target="blank">{{item.FileName}}</a>
            <i class="el-icon-circle-close" @click="deleteImg(item,index)"></i>
        </div>
      </div>
    </div>
    <div class="onlineMoneyRecord mgt20" v-if="Object.keys(refund.data).length>0">
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
          <tr class="bold" v-for="item in refund.data">
            <td>
              <span>{{item.ApplyMan}}</span>
            </td>
            <td>
              <span>{{item.ApplyTimeStr}}</span>
            </td>
            <td>
              <span>{{item.RefundNum}}</span>
            </td>
            <td>
              <span>{{item.ApplyReason}}</span>
            </td>
            <td>
              <span>{{item.AdminName}}</span>
            </td>
            <td>
              <span>{{item.CheckTimeStr}}</span>
            </td>
            <td>
              <span>{{item.CheckRemark}}</span>
            </td>
            <td>
              <span v-if="item.CheckState==1">
                <el-button type="primary" @click="showRefund(item)">审核</el-button>
              </span>
              <span  v-else-if="item.CheckState==2">
                <span>已通过</span>
              </span>
              <span  v-else="item.CheckState==3">
                <span>未通过</span>
              </span>
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
        <el-select class="smallInput" v-model="createNewColumnData.data.Rap" >
          <el-option label="收款" value="1"></el-option>
          <el-option label="退款" value="2"></el-option>
        </el-select>
        <el-input class="smallInput mgr10" type="text" v-model="createNewColumnData.data.MoneySum"></el-input >元
        <el-button type="primary" @click="requstPayReceipt">确 定</el-button>
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
          <tr class="bold" :class="item.IsVaild==2?'backGrey':''" v-for="(item,index) in payReceiptList">
            <td :class="item.Rap==1?'red':'green'">
              <span>{{item.Rap==1?'+':'-'}}{{item.MoneySum}}</span>
            </td>
            <td>
              <span>{{item.AdminName}}</span>
            </td>
            <td>
              <span>{{item.AddTimeStr}}</span>
            </td>
            <td>
              <span>{{item.StateNum==1?'进行中':(item.StateNum==2?"撤回":"已成功")}}</span>
            </td>
            <td>
              <span v-if="item.StateNum==1" class="red hand" @click="withdraw(item)">撤回</span>
            </td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
    <el-dialog
      title="上传保单"
      :visible.sync="updateContract.visible"
      width="400px">
      <div class="center">
        <div>
          <span class="labelName">保单号</span>
          <el-input class="middleInput" v-model="updateContract.newData.GSNum" placeholder="请输入内容"></el-input>
        </div>
        <div class="mgt10">
          <span class="labelName"></span>
          <!-- <s-upload-img @fileUpload="saveImgFileData" ref="imgPlugin" class="middleInput"></s-upload-img> -->
          <input class="middleInput" ref="file" type="file" placeholder="请选择文件">
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
          <span class="middleInput">{{refund.checkData.RefundNum}}</span>
        </div>
        <div  class="mgt10">
          <span class="smallInput">备注</span>
          <el-input class="middleInput" v-model="refund.checkData.tip" placeholder="请输入内容"></el-input>
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
      OnLineSubTotal:0,
      OffLineSubTotal:0,
      pickerOptions: {
       /* disabledDate(time) {
          return time.getTime() < Date.now()-24*60*60*1000;
        },*/
      },
      baseData:{},
      baseInfo:{
        isEdit:false,
        data:{},
        edit:{GoodsValue:'',InsuranceRate:''},
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
        data:{Rap:"1"},
      },
      offlineMoneyRecord:{
        edit:[],
        data:[],
      },
      payReceiptList:[],
      updateContract:{
        visible:false,
        isPreviewBigImgShow:false,
        currentImgDataUrl:"",
        data:{},
        newData:{},
        imgObjs:[],
      },
      refund:{
        data:{},
        checkData:{},
        visible:false
      }
    }
  },
  created(){
    this.getBaseData();
  },
  watch:{
    '$route':"onRouterChange",
    "baseInfo.edit.GoodsValue":function(val1,val2){
      this.baseInfo.edit.InsurancePremium=val1*this.baseInfo.edit.InsuranceRate/1000;     
    },
    "baseInfo.edit.InsuranceRate":function(val1,val2){
      this.baseInfo.edit.InsurancePremium=val1*this.baseInfo.edit.GoodsValue/1000;     
    },
  },
  activated(){
    this.searchInsuranceDetail();
    this.getPayReceiptList();
  },
  methods:{
    goodsTypeChange(e){
      for (var i = this.baseData.BaseGoodsTypeList.length - 1; i >= 0; i--) {
        if(this.baseData.BaseGoodsTypeList[i].Id==e){
          this.baseInfo.edit.InsuranceRate=this.baseData.BaseGoodsTypeList[i].InsuranceRate;
          return;
        }
      }
    },
    onRouterChange(toR,fromR){
      if (toR.meta.pageId=="goodsInsuranceDetail"&&fromR.meta.pageId=="goodsInsuranceDetail") {
        //当前页面是船舶档案A 跳转船舶档案B(shipId变化)
        this.searchInsuranceDetail();
      }
    },
    searchInsuranceDetail(){
      let goodsInsuranceId = this.$route.params.goodsInsuranceId
      this.$axios.post(this.$store.commonData.state.url+"Insurance/QueryInsuranceDetail",{
        InsuranceBaseInfoId:goodsInsuranceId
      })
      .then((response)=>{
        
        if (response.data.RetCode==0) {
          let retData=response.data.RetData;
          this.OffLineSubTotal=retData.OffLineSubTotal;
          this.OnLineSubTotal=retData.OnLineSubTotal;
          this.baseInfo.data=Object.assign({},retData.OrderBaseInfo);
          this.baseInfo.edit=Object.assign({},retData.OrderBaseInfo);
          this.beInsurancePerson.data= Object.assign({}, retData.InvoiceModel,retData.OrderBaseSubject);
          this.beInsurancePerson.edit= Object.assign({}, retData.InvoiceModel,retData.OrderBaseSubject);

          this.transInfo.data=Object.assign({},retData.OrderBaseTransportInfo);
          this.transInfo.edit=Object.assign({},retData.OrderBaseTransportInfo) ;
          this.onlineMoneyRecord.data=retData.PayOnLineReceiptInfo;
          for (var i = retData.PayOffLineReceiptInfo.length - 1; i >= 0; i--) {
            retData.PayOffLineReceiptInfo[i].isEdit=false;
          }
          this.offlineMoneyRecord.data=retData.PayOffLineReceiptInfo.slice(0);
          this.offlineMoneyRecord.edit=retData.PayOffLineReceiptInfo.slice(0);
          this.updateContract.data=retData.OrderBaseResource;

          this.refund.data=retData.PayRefundApplyList;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
        this.$store.tabs.commit('assignNewTab', {
          path:this.$route.path,
          name:this.baseInfo.data.InsuranceNum?this.baseInfo.data.InsuranceNum:"错误",
          isActive:true
        });
      })
      .catch( (error)=> {
          console.log(error);
      });
    },
    saveBaseInfo(){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/UpdateOrderBaseInfo",{
        InsuranceBaseInfoId:this.$route.params.goodsInsuranceId,
        Gins_BaseTypeId:this.baseInfo.edit.Gins_BaseTypeId,
        Gins_BaseCompanyId:this.baseInfo.edit.Gins_BaseCompanyId,
        Gins_BaseGoodsTypeId:this.baseInfo.edit.Gins_BaseGoodsTypeId,
        PayerMobile:this.baseInfo.edit.PayerMobile,
        GoodsName:this.baseInfo.edit.GoodsName,
        GoodsValue:this.baseInfo.edit.GoodsValue,
        GoodsQuantity:this.baseInfo.edit.GoodsQuantity,
        Gins_BaseGoodsUnitId:this.baseInfo.edit.Gins_BaseGoodsUnitId,
        InsuranceRate:this.baseInfo.edit.InsuranceRate,
        InsurancePremium:this.baseInfo.edit.InsurancePremium,
      })
      .then((response)=>{
        if (response.data.RetCode==0) {
          this.baseInfo.isEdit=false;
          this.searchInsuranceDetail();
          this.$message({
            message: response.data.RetMsg,
            type: 'success'
          });
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
      .catch( (error)=> {
          console.log(error);
      });
    },
    saveBeInsurancePerson(){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/UpdateOrderBaseSubject ",
        this.beInsurancePerson.edit)
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.beInsurancePerson.isEdit=false;
          this.searchInsuranceDetail();
          this.$message({
            message: response.data.RetMsg,
            type: 'success'
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
    },
    saveTransInfo(){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/UpdateOrderBaseTransportInfo",
        Object.assign(this.transInfo.edit,{InsuranceBaseInfoId:this.$route.params.goodsInsuranceId}))
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.transInfo.isEdit=false;
          this.transInfo.data=Object.assign({},this.transInfo.edit)
          this.$message({
            message: response.data.RetMsg,
            type: 'success'
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
    },
    editOfflineMoneyRecord(index){
      this.offlineMoneyRecord.edit[index].isEdit=true;
    },
    addOfflineMoneyRecord(){
      this.offlineMoneyRecord.edit.unshift({
        isEdit:true});
      this.offlineMoneyRecord.data.unshift({
        isEdit:true});
    },
    saveOfflineMoneyRecord(item,index){
      if (this.offlineMoneyRecord.edit[index].Expend>0&&this.offlineMoneyRecord.edit[index].Income>0) {
        this.$message({
          message: "收入与支出只能选填一个",
          type: 'error'
        });
        return;
      }
      if (!item.Id) {
        //新建
        this.$axios.post(this.$store.commonData.state.url+"Insurance/NewlyPayOffLineReceiptInfo",{
          InsuranceBaseInfoId: this.$route.params.goodsInsuranceId,
          SerialNum:this.offlineMoneyRecord.edit[index].SerialNum,
          PayMan:this.offlineMoneyRecord.edit[index].PayMan,
          Mobile:this.offlineMoneyRecord.edit[index].Mobile,
          PaytTime:this.offlineMoneyRecord.edit[index].PaytTime,
          Income:this.offlineMoneyRecord.edit[index].Income,
          Expend:this.offlineMoneyRecord.edit[index].Expend,
          AccountNum:this.offlineMoneyRecord.edit[index].AccountNum,
          BackRemark:this.offlineMoneyRecord.edit[index].BackRemark
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            item.isEdit=false;
            this.searchInsuranceDetail();
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
        this.$axios.post(this.$store.commonData.state.url+"Insurance/UpdatePayOffLineReceiptInfo",{
          InsuranceBaseInfoId: this.$route.params.goodsInsuranceId,
          PayOffLineReceiptInfoId:this.offlineMoneyRecord.edit[index].Id,
          SerialNum:this.offlineMoneyRecord.edit[index].SerialNum,
          PayMan:this.offlineMoneyRecord.edit[index].PayMan,
          Mobile:this.offlineMoneyRecord.edit[index].Mobile,
          PaytTime:this.offlineMoneyRecord.edit[index].PaytTime,
          Income:this.offlineMoneyRecord.edit[index].Income,
          Expend:this.offlineMoneyRecord.edit[index].Expend,
          AccountNum:this.offlineMoneyRecord.edit[index].AccountNum,
          BackRemark:this.offlineMoneyRecord.edit[index].BackRemark
        })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            item.isEdit=false;
            this.searchInsuranceDetail();
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
    getPayReceiptList(){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/QueryPayReceiptList",{
        InsuranceBaseInfoId:this.$route.params.goodsInsuranceId
      })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.payReceiptList=response.data.RetData;
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
    requstPayReceipt(){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/RequstPayReceipt",
        Object.assign(this.createNewColumnData.data,{InsuranceBaseInfoId:this.$route.params.goodsInsuranceId}))
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.getPayReceiptList();
          this.createNewColumnData.data.MoneySum=0;
          this.$message({
            message: response.data.RetMsg,
            type: 'success'
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
    },
    withdraw(item){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/RebackPayReceipt",
        {PayReceiptId:item.Id})
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.getPayReceiptList();
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
      this.updateContract.imgObjs=e.imgObjs;
    },
    uploadContractImg(){
      let param = new FormData(); //创建form对象  
      for(let key in this.updateContract.newData){
        param.append(key,this.updateContract.newData[key]);
      }
      param.append('file', this.$refs.file.files[0]);
      console.log(this.$refs.file.files[0])
      param.append("InsuranceBaseInfoId",this.$route.params.goodsInsuranceId);
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Insurance/UploadInsuranceResource',
        headers:{'Content-Type':'multipart/form-data'} ,
        data: param,
        
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.updateContract.visible=false;
          this.$message({
            message: "上传成功",
            type: 'success'
          });
          this.searchInsuranceDetail();
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
      this.updateContract.currentImgDataUrl=item.OriginImgUrl;
    },
    deleteImg(item,index){
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(this.$store.commonData.state.url+"Insurance/RemoveInsuranceResource",
          { 
            ResourceId:item.Id,
          })
        .then( (response)=>{
          if (response.data.RetCode==0) {
            this.updateContract.data.splice(index,1);
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
      this.refund.checkData.RefundNum=item.RefundNum;
      this.refund.checkData.Id=item.Id;
    },
    checkRefund(state){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/CheckPayRefundApply",{
        InsuranceBaseInfoId:this.$route.params.goodsInsuranceId,
        PayRefundApplyId:this.refund.checkData.Id,
        CheckResult:state?2:3,
        CheckRemark:this.refund.checkData.tip,
      })
      .then((response)=>{
        if (response.data.RetCode==0) {
          this.refund.visible=false;
          this.searchInsuranceDetail();
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
      .catch( (error)=> {
          console.log(error);
      });
    },
    getBaseData(){
      this.$axios.post(this.$store.commonData.state.url+"Insurance/QueryBaseData")
      .then((response)=>{
        if (response.data.RetCode==0) {
          this.baseData=response.data.RetData;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
      .catch( (error)=> {
          console.log(error);
      });
      
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
.preview{
  width: 50px;
  height: 50px;
  float: left;
  margin: 10px;
}
</style>
