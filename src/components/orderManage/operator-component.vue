<template>
	<div class="operatorComponent" v-cloak>
		<s-side-dialog class="sideDrawer" :visible.sync="visible" @changeVisible="changeVisible" width="844">
	      <template #title >
	        <div class="flexCenter title">
	          <div class="bold">{{orderDetail.ShipName}}{{orderDetail.LoadTon?("（"+orderDetail.LoadTon+"吨）"):""}} 提单号：{{orderDetail.OrderId}}</div>
	          <div class="flex1"></div>
	          <div class="icon" v-if="orderDetail.IsBelongMy==1"  @click="payAndReceive.visible=true">
	            <img src="../../assets/img/pay.png">
	            <div>收付款</div>
	          </div>
	          <div class="icon" v-if="orderDetail.IsBelongMy==1" @click="showWayBill">
	            <img src="../../assets/img/order.png">
	            <div>运单</div>
	          </div>
	          <div class="icon" v-if="orderDetail.IsBelongMy==1" @click="naviToEditOrder">
	            <img src="../../assets/img/edit.png">
	            <div>编辑</div>
	          </div>
	          <div class="icon" v-if="identity==4" @click="openFinancialReceive">
	            <img src="../../assets/img/received.png">
	            <div>收款</div>
	          </div>
	          <div class="icon" v-if="identity==4" @click="financialAdjust.visible=true">
	            <img src="../../assets/img/control.png">
	            <div>调整</div>
	          </div>
	        </div>
	      </template>
	      <template #content >
	        <div class="flexCenter">
	          <div class="flex1 grey8C">
	            <span v-if="orderDetail.CreatePerson">创建人：{{orderDetail.CreatePerson}}</span>
	            <span class="mgl20" v-if="orderDetail.CreateDateStr">创建 ：{{orderDetail.CreateDateStr}}</span>
	            <span class="mgl20" v-if="orderDetail.UpTimeStr">更新时间：{{orderDetail.UpTimeStr}}</span>
	          </div>
	          <div v-if="orderDetail.IsBelongMy==1">
	            <el-select size="small" v-model="status" style="width:80px" @change="changeStatus">
	              <el-option label="正常" :value="1" ></el-option>
	              <el-option label="归档" :value="2" ></el-option>
	              <el-option label="退船" :value="3" ></el-option>
	              <el-option label="纠纷" :value="4" ></el-option>
	            </el-select>
	          </div>
	          <div v-else>{{orderDetail.OrderStateStr}}</div>
	        </div>
	        <el-tabs v-model="activeTab" type="border-card" class="mgt10">
	          <el-tab-pane label="资金记录" name="0">
	          	<div class="flexCenter line font16">
	          		<div><span class="grey8C">盈利：</span><span class="bold">{{fmoney(orderDetail.Mli)}}元</span></div>
	          		<div class="flex1 center"><span class="grey8C">装港吨 ：</span><span class="bold" v-if="orderDetail.Zgton">{{orderDetail.Zgton}}吨</span></div>
	          		<div class="grey8C">卸港吨：<span class="bold" v-if="orderDetail.Xgton">{{orderDetail.Xgton}}吨</span></div>
	          	</div>
	          	<table class="moneyTable" cellspacing="0" cellpadding="0">
	          		<tr>
	          			<td>收价</td>
	          			<td>包船</td>
	          			<td>含税</td>
	          			<td>应收</td>
	          			<td>实收</td>
	          			<td>未收</td>
	          			<td>收调整</td>
	          		</tr>
	          		<tr>
	          			<td>{{orderDetail.ShouJia}}</td>
	          			<td>{{orderDetail.ShouJiaBoat==1?"是":"否"}}</td>
	          			<td>{{orderDetail.ShouJiaTax==1?"是":"否"}}</td>
	          			<td>{{fmoney(orderDetail.Yshou)}}</td>
	          			<td>{{fmoney(orderDetail.ShiShou)}}</td>
	          			<td>{{fmoney(orderDetail.WeiShou)}}</td>
	          			<td>{{fmoney(orderDetail.ShouAdjust)}}</td>
	          		</tr>
	          		<tr>
	          			<td>付价</td>
	          			<td>包船</td>
	          			<td>含税</td>
	          			<td>应付</td>
	          			<td>实付</td>
	          			<td>未付</td>
	          			<td>付调整</td>
	          		</tr>
	          		<tr>
	          			<td>{{orderDetail.FuJia}}</td>
	          			<td>{{orderDetail.FuJiaBoat==1?"是":"否"}}</td>
	          			<td>{{orderDetail.FuJiaTax==1?"是":"否"}}</td>
	          			<td>{{fmoney(orderDetail.Yfu)}}</td>
	          			<td>{{fmoney(orderDetail.ShiFu)}}</td>
	          			<td>{{fmoney(orderDetail.WeiFu)}}</td>
	          			<td>{{fmoney(orderDetail.FuAdjust)}}</td>
	          		</tr>
	          	</table>
	          	<div class="itemList">
	          		<div class="textRight line">
	          			<el-radio-group v-model="filter" class="filter">
						    <el-radio :label="1">全部</el-radio>
						    <el-radio :label="2">收</el-radio>
						    <el-radio :label="3">付</el-radio>
						    <el-radio :label="4">改</el-radio>
						</el-radio-group>
	          		</div>
	          		<div :style="scroll" >
	          			<div class="item" v-for="item in orderDetail.Datas" @click="curItem=item">
	          				<!-- 修改运单start  -->
		          			<div v-if="item.DataType==1&&(filter==1||filter==4)">
	          					<div class="main">
			          				<div class="title">
			          					<div>
			          						<div class="font16 bold">{{item.AdminName}}</div>
			          						<div class="grey8C font14">{{item.IsFix==1?"上传运单":"修改运单"}}</div>
			          						<div class="grey8C font14">{{item.TimeStr}}</div>
			          					</div>
			          				</div>
			          				<div class="flex1">
			          					<div>
			          						<span class="grey8C">装港吨：</span>
			          						<span >{{item.Zgton}}吨</span> 
			          					</div>
			          				</div>
			          				<div class="info">
			          					<div class="flex1">
			          						<div v-for="img in item.FileList">
			          							<img class="pic" :src="img.Url">
			          						</div>
			          					</div>
			          					<div class="operation" v-if="orderDetail.IsBelongMy==1" @click="showWayBill">
			          						<img class="icon" src="../../assets/img/repair.png">
			          						<span>修改</span>
			          					</div>
			          				</div>
			          			</div>    
		          			</div>
		          			<!-- 修改运单end  -->
		          			<!-- 付款申请start  -->
		          			<div v-if="item.DataType==2&&(filter==1||filter==3)">
		          				<div class="main redBorder">
			          				<div class="title">
			          					<div class="font16 bold">{{item.AdminName}}</div>
		          						<div class="grey8C font14">申请付款</div>
		          						<div class="grey8C font14">{{item.AddTimeStr}}</div>
			          				</div>
			          				<div class="flex1">
			          					<div>
			          						<span class="grey8C">付款项目：</span>
			          						<span>{{item.Fkxm}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">付款金额：</span>
			          						<span class="red">{{fmoney(item.Fkje)}}元</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">付款日期：</span>
			          						<span>{{item.Fkrq}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">开户名称：</span>
			          						<span>{{item.B_UserName}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">收款账号：</span>
			          						<span>{{item.ShouKuanAccount}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">开户银行：</span>
			          						<span>{{item.Bank}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">备注：</span>
			          						<span class="bold">{{item.Remark}}</span> 
			          					</div>
			          				</div>
			          				<div class="info">
			          					<div class="flex1">
			          						<div class="step" :class="person.CheckResult==1?'green':'red'" v-for="person in item.list">
			          							<div class="stepLineWapper">
			          								<div class="stepLine" :class="person.CheckResult==1?'backGreen':'backRed'"></div>
			          								<div><i :class="person.CheckResult==1?'el-icon-check':'el-icon-close'"></i></div>
			          							</div>
			          							<div class="flex1">
			          								<div class="name">{{person.Name}}</div>
			          								<div class="description">{{person.AddTimeStr}}</div>
			          							</div>
			          						</div>
			          						<div class="step" v-if="item.list.length==0">
			          							<div class="stepLineWapper">
			          								<div class="stepLine"></div>
			          								<div><i class="el-icon-check"></i></div>
			          							</div>
			          							<div class="flex1">
			          								<div class="name">叶玲</div>
			          								<div class="description">- -</div>
			          							</div>
			          						</div>
			          						<div class="step" v-if="item.list.length<2">
			          							<div class="stepLineWapper">
			          								<div class="stepLine"></div>
			          								<div><i class="el-icon-check"></i></div>
			          							</div>
			          							<div class="flex1">
			          								<div class="name">王毅</div>
			          								<div class="description">- -</div>
			          							</div>
			          						</div>
			          						<div class="step" v-if="item.list.length<3">
			          							<div class="stepLineWapper">
			          								<div class="stepLine"></div>
			          								<div><i class="el-icon-check"></i></div>
			          							</div>
			          							<div class="flex1">
			          								<div class="name">黄姐</div>
			          								<div class="description">- -</div>
			          							</div>
			          						</div>
			          						<div class="step" v-if="item.list.length<4">
			          							<div class="stepLineWapper">
			          								<div class="stepLine"></div>
			          								<div><i class="el-icon-check"></i></div>
			          							</div>
			          							<div class="flex1">
			          								<div class="name">邓少玲</div>
			          								<div class="description">- -</div>
			          							</div>
			          						</div>
			          					</div>
			          					<div class="operation" v-if="identity==4&&item.list.length==4" @click="print.visible=true">
			          						<i class="el-icon-printer icon"></i>
			          						<span>打印</span>
			          					</div>
			          					<div class="operation" v-else-if="identity==0&&item.list.length==0" @click="rebackPayAndReceive(item.Id,2)">
			          						<img class="icon" src="../../assets/img/undo.png">
			          						<span>撤回</span>
			          					</div>
			          					<div class="operation" v-else-if="identity==4&&item.list.length==3&&item.list[item.list.length-1].CheckResult==1" @click="financialPayCheck.visible=true"><!-- 财务确认 -->
			          						<img class="icon" src="../../assets/img/check.png">
			          						<span class="blue">审核</span>
			          					</div>
			          					<div class="operation" v-else-if="identity==(item.list.length+1)&&identity!=0&&(identity==1||item.list[item.list.length-1].CheckResult==1)" @click="check.visible=true"><!-- 普通审核 -->
			          						<img class="icon" src="../../assets/img/check.png">
			          						<span class="blue">审核</span>
			          					</div>
			          				</div> 
			          			</div>
			          			<div class="footer redBorder" v-if="item.ShenPiConfrim">
			          				<div class="title">
			          					<div class="font16 bold">{{item.ShenPiConfrim.HeName}}</div>
		          						<div class="grey8C font14">确认付款</div>
		          						<div class="grey8C font14">{{item.ShenPiConfrim.ConfirmTimeStr}}</div>
			          				</div>
			          				<div class="flex1">
			          					<div>
			          						<span class="grey8C">付款金额：</span>
				          					<span class="red">{{fmoney(item.ShenPiConfrim.Fukuan)}}元</span>
				          				</div>
				          				<div>
			          						<span class="grey8C">付款时间：</span>
				          					<span>{{item.ShenPiConfrim.FuKuanDate}}</span>
				          				</div>
			          				</div>
			          				<div class="info">
			          					<div class="flex1">
			          						<div v-for="img in item.ShenPiConfrim.Files">
			          							<img class="pic" :src="img.Url" @click="previewImg(img.Url)">
			          						</div>
			          					</div> 
			          					<div class="operation" @click="editFinancialPayCheck(item.ShenPiConfrim)" v-if="identity==4">
			          						<img class="icon" src="../../assets/img/repair.png">
			          						<span>修改</span>
			          					</div>
			          				</div>
			          			</div>
		          			</div>
		          			<!-- 付款申请end  -->
		          			<!-- 收款申请start  -->
		          			<div v-if="item.DataType==3&&(filter==1||filter==2)">
		          				<div class="main greenBorder">
			          				<div class="title">
			          					<div class="font16 bold">{{item.AdminName}}</div>
		          						<div class="grey8C font14">申请收款</div>
		          						<div class="grey8C font14">{{item.AddTimeStr}}</div>
			          				</div>
			          				<div class="flex1">
			          					<div>
			          						<span class="grey8C">收款项目：</span>
			          						<span>{{item.Skxm}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">收款金额：</span>
			          						<span class="red">{{fmoney(item.Skje)}}元</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">收款日期：</span>
			          						<span>{{item.Skrq}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">付款单位：</span>
			          						<span>{{item.Fkdw}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">备注：</span>
			          						<span class="bold">{{item.Remark}}</span> 
			          					</div>
			          				</div>
			          				<div class="info">
			          					<div class="flex1">
			          					</div>
			          					<div class="operation" v-if="identity==4&&!item.ShenPiConfirm" @click="financialReceiveCheck.visible=true">
			          						<img class="icon" src="../../assets/img/check.png">
			          						<span class="blue">审核</span>
			          					</div>
			          					<div class="operation" v-else-if="identity==0&&!item.ShenPiConfirm" @click="rebackPayAndReceive(item.Id,1)">
			          						<img class="icon" src="../../assets/img/undo.png">
			          						<span>撤回</span>
			          					</div>
			          				</div> 
			          			</div>
			          			<div class="footer greenBorder" v-if="item.ShenPiConfirm">
			          				<div class="title">
			          					<div class="font16 bold">{{item.ShenPiConfirm.Name}}</div>
		          						<div class="grey8C font14">确认收款</div>
		          						<div class="grey8C font14">{{item.ShenPiConfirm.AddTimeStr}}</div>
			          				</div>
			          				<div class="flex1">
			          					<div>
			          						<span class="grey8C">实收金额：</span>
				          					<span class="red">{{fmoney(item.ShenPiConfirm.ShiShou)}}元</span>
				          				</div>
				          				<div>
			          						<span class="grey8C">收款时间：</span>
				          					<span>{{item.ShenPiConfirm.ShiShouDate}}</span>
				          				</div>
			          				</div>
			          				<div class="info">
			          					<div class="flex1">
			          						<div v-for="img in item.ShenPiConfirm.FileUrls">
			          							<img class="pic" :src="img.Url" @click="previewImg(img.Url)">
			          						</div>
			          					</div> 
			          					<div class="operation" v-if="identity==4" @click="editFinancialReceiveCheck(item.ShenPiConfirm)">
			          						<img class="icon" src="../../assets/img/repair.png">
			          						<span>修改</span>
			          					</div>
			          				</div>
			          			</div>
		          			</div>
		          			<!-- 收款申请end  -->
		          			<!-- 财务发起收款start  -->
		          			<div v-if="item.DataType==4&&(filter==1||filter==2)">
		          				<div class="main greenBorder">
			          				<div class="title">
			          					<div class="font16 bold">{{item.AdminName}}</div>
		          						<div class="grey8C font14">确认收款</div>
		          						<div class="grey8C font14">{{item.AddTimeStr}}</div>
			          				</div>
			          				<div class="flex1">
			          					<div>
			          						<span class="grey8C">收款项目：</span>
			          						<span>{{item.Skxm}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">收款金额：</span>
			          						<span class="red">{{fmoney(item.Skje)}}元</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">收款日期：</span>
			          						<span>{{item.Skrq}}</span> 
			          					</div>
			          					<div>
			          						<span class="grey8C">付款单位：</span>
			          						<span>{{item.Fkdw}}</span> 
			          					</div>
			          				</div>
			          				<div class="info">
			          					<div class="flex1">
			          						<div v-for="img in item.ShenPiConfirm.FileUrls">
			          							<img class="pic" :src="img.Url" @click="previewImg(img.Url)">
			          						</div>
			          					</div> 
			          					<div class="operation" v-if="identity==4" @click="editFinancialReceive(item)">
			          						<img class="icon" src="../../assets/img/repair.png">
			          						<span>修改</span>
			          					</div>
			          				</div> 
			          			</div>
		          			</div>
		          			<!-- 财务发起收款end  -->
	          			</div>
	          		</div>
	          	</div>
	          </el-tab-pane>
	          <el-tab-pane label="文件柜" name="1">
	          	<div class="imgFileList" :style="imgFileListscroll">
	          		<div class="textRight" v-if="identity==1||identity==0" >
		          		<span @click="submitDeleteImg"><i class="el-icon-delete hand">删除</i></span>
		          	</div>
		          	<div class="flexCenter wrap">
						<label>船合同</label>
						<div v-for="(item,index) in shipContractPic.pic" class="relative mgt20">
		                  <img @click="previewImg(item.Original)"  class="previewedImg" :src="item.Thumbnail">
		                  <i v-if="identity==1||identity==0" class="el-icon-success checkImg" :class="item.readyToDelete?'checkedImg':''" @click="item.readyToDelete=!item.readyToDelete" ></i>
		                </div>
						<div class="uploadImg">
			              <div class="logo"><i class="el-icon-plus"></i></div>
			              <s-preview-img class="input" @fileUpload="saveShipContractPic"></s-preview-img>
			            </div>
					</div>
					<div class="flexCenter wrap">
						<label>货合同</label>
						<div v-for="(item,index) in goodsContractPic.pic" class="relative mgt20">
		                  <img @click="previewImg(item.Original)"  class="previewedImg" :src="item.Thumbnail">
		                  <i v-if="identity==1||identity==0" class="el-icon-success checkImg" :class="item.readyToDelete?'checkedImg':''" @click="item.readyToDelete=!item.readyToDelete" ></i>
		                </div>
						<div class="uploadImg">
			              <div class="logo"><i class="el-icon-plus"></i></div>
			              <s-preview-img class="input" @fileUpload="saveGoodsContractPic"></s-preview-img>
			            </div>
					</div>
					<div class="flexCenter wrap">
						<label>收凭证</label>
						<div v-for="(item,index) in receiveVoucherPic.pic" class="relative mgt20">
		                  <img @click="previewImg(item.Original)"  class="previewedImg" :src="item.Thumbnail">
		                </div>
					</div>
					<div class="flexCenter wrap">
						<label>付凭证</label>
						<div v-for="(item,index) in payVoucherPic.pic" class="relative mgt20">
		                  <img @click="previewImg(item.Original)"  class="previewedImg" :src="item.Thumbnail">
		                </div>
					</div>
					<div class="flexCenter wrap">
						<label>运单</label>
						<div v-for="(item,index) in transOrderPic.pic" class="relative mgt20">
		                  <img @click="previewImg(item.Original)"  class="previewedImg" :src="item.Thumbnail">
		                </div>
					</div>
					<div class="flexCenter wrap">
						<label>船舶证书</label>
						<div v-for="(item,index) in shipCertificatePic.pic" class="relative mgt20">
		                  <img @click="previewImg(item.Original)"  class="previewedImg" :src="item.Thumbnail">
		                  <i v-if="identity==1||identity==0" class="el-icon-success checkImg" :class="item.readyToDelete?'checkedImg':''" @click="item.readyToDelete=!item.readyToDelete" ></i>
		                </div>
						<div class="uploadImg">
			              <div class="logo"><i class="el-icon-plus"></i></div>
			              <s-preview-img class="input" @fileUpload="saveShipCertificatePic"></s-preview-img>
			            </div>
					</div>
					<div class="flexCenter wrap">
						<label>补充协议</label>
						<div v-for="(item,index) in otherPic.pic" class="relative mgt20">
		                  <img @click="previewImg(item.Original)"  class="previewedImg" :src="item.Thumbnail">
		                  <i v-if="identity==1||identity==0" class="el-icon-success checkImg" :class="item.readyToDelete?'checkedImg':''" @click="item.readyToDelete=!item.readyToDelete" ></i>
		                </div>
						<div class="uploadImg">
			              <div class="logo"><i class="el-icon-plus"></i></div>
			              <s-preview-img class="input" @fileUpload="saveOtherPic"></s-preview-img>
			            </div>
					</div>
	          	</div>
	          </el-tab-pane>
	        </el-tabs>
	      </template>
	    </s-side-dialog>
	    <el-dialog title="发起收付款" width="650px" :visible.sync="payAndReceive.visible" class="payAndReceive">
		  <div>
		  	<div class="mgb20 flexCenter">
		  		<label class="label textRight">状态</label>
		  		<el-select v-model="payAndReceive.status" class="status" placeholder="状态">
					<el-option label="付款" :value="1"></el-option>
					<el-option label="收款" :value="0"></el-option>
			    </el-select>
		  	</div>
		  	<!-- 付款表单 -->
		  	<el-form ref="payForm" v-if="payAndReceive.status==1" :inline="true" :model="payData"  label-position="right" label-width="80px">
			  	<el-form-item label="付款项目" required>
			  		<el-input v-model="payData.projectName" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="付款日期" required>
			  		<el-date-picker value-format="yyyy-MM-dd" v-model="payData.date" type="date" placeholder="选择日期"></el-date-picker>
			  	</el-form-item>
			  	<el-form-item label="付款金额" required>
			  		<el-input v-model="payData.num" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="开户名称" required>
			  		<el-input v-model="payData.bankName" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="收款账号" required>
			  		<el-input v-model="payData.account" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="开户银行" required>
			  		<el-input v-model="payData.depositBank" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="备注">
			  		<el-input type="textarea" :rows="2"  v-model="payData.tip">
					</el-input>
			  	</el-form-item>
			</el-form>
			<!-- 收款表单 -->
			<el-form ref="receiveForm" v-else :inline="true" :model="receiveData"  label-position="right" label-width="80px">
			  	<el-form-item label="收款项目"  required>
			  		<el-input v-model="receiveData.projectName" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="收款日期" required>
			  		<el-date-picker value-format="yyyy-MM-dd" v-model="receiveData.date" type="date" placeholder="选择日期"></el-date-picker>
			  	</el-form-item>
			  	<el-form-item label="收款金额" required>
			  		<el-input v-model="receiveData.num" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="付款单位"  required>
			  		<el-input v-model="receiveData.company" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="备注">
			  		<el-input type="textarea" :rows="2"  v-model="receiveData.tip">
					</el-input>
			  	</el-form-item>
			</el-form>
		  </div>
		  <span slot="footer">
		    <el-button @click="payAndReceive.visible = false">取 消</el-button>
		    <el-button type="primary" @click="submitPayAndReceive">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog title="录运单" :visible.sync="enterWayBill.visible" class="enterWayBill">
			<div class="flexCenter">
				<div class="flex1">
					<label>装港吨</label>
					<el-input type="number" v-model="enterWayBill.loadTon"></el-input>
				</div>
				<div class="flex1">
					<label>卸港吨</label>
					<el-input type="number" v-model="enterWayBill.unloadTon"></el-input>
				</div>
			</div>
			<div class="flexCenter wrap">
				<label>上传运单</label>
				<div v-for="(item,index) in enterWayBill.pic" class="relative mgt20">
                  <img @click="previewImg(item.imgDataUrl)"  class="previewedImg" :src="item.imgDataUrl">

                  <i class="el-icon-circle-close deleteImg" @click="deleteImg(enterWayBill.pic,index,'enterWayBill')" ></i>
                </div>
				<div class="uploadImg">
	              <div class="logo"><i class="el-icon-plus"></i></div>
	              <s-preview-img class="input" @fileUpload="saveWayBillPic"></s-preview-img>
	            </div>
			</div>
			<span slot="footer">
			    <el-button @click="enterWayBill.visible = false">取 消</el-button>
			    <el-button type="primary" @click="createWayBill">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="审核" width="400px" :visible.sync="check.visible" class="check">
			<div class="center">
				<el-radio v-model="check.status" :label="1">通过</el-radio>
  				<el-radio v-model="check.status" :label="2">不通过</el-radio>
			</div>
			<div class="flexCenter" v-if="check.status==2">
				<label class="mgl20">原因</label>
				<el-input type="textarea" class="textarea" placeholder="请填写"></el-input>
			</div>
			<span slot="footer">
			    <el-button @click="check.visible = false">取 消</el-button>
			    <el-button type="primary" @click="checkApply">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="发起收款" width="650px" :visible.sync="financialReceive.visible" class="financialReceive"><!-- 财务发起确认收款 -->
			<el-form ref="financialReceiveForm"  :inline="true" label-position="right" label-width="80px">
			  	<el-form-item label="收款项目"  required>
			  		<el-input v-model="financialReceive.projectName" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="收款日期" required>
			  		<el-date-picker value-format="yyyy-MM-dd" v-model="financialReceive.date" type="date" placeholder="选择日期"></el-date-picker>
			  	</el-form-item>
			  	<el-form-item label="实收金额" required>
			  		<el-input v-model="financialReceive.num" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="付款单位"  required>
			  		<el-input v-model="financialReceive.company" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="备注">
			  		<el-input type="textarea" :rows="2"  v-model="financialReceive.tip">
					</el-input>
			  	</el-form-item>
			</el-form>
			<div class="flexCenter wrap">
				<label>上传发票</label>
				<div v-for="(item,index) in financialReceive.pic" class="relative mgt20">
                  <img @click="previewImg(item.imgDataUrl)"  class="previewedImg" :src="item.imgDataUrl">

                  <i class="el-icon-circle-close deleteImg" @click="deleteImg(financialReceive.pic,index,'financialReceive')" ></i>
                </div>
				<div class="uploadImg">
	              <div class="logo"><i class="el-icon-plus"></i></div>
	              <s-preview-img class="input" @fileUpload="saveFinancialReceivePic"></s-preview-img>
	            </div>
			</div>
			<span slot="footer">
			    <el-button @click="financialReceive.visible = false">取 消</el-button>
			    <el-button type="primary" @click="submitFinancialReceive">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="发起调整" width="650px" :visible.sync="financialAdjust.visible" class="financialAdjust">
			<div>
				<el-form label-position="left" label-width="80px">
				  	<el-form-item label="状态">
				  		<el-select  v-model="financialAdjust.status" style="width: 100px">
			              <el-option label="收调整" :value="1" ></el-option>
			              <el-option label="付调整" :value="2" ></el-option>
			            </el-select>
				  	</el-form-item>
				  	<el-form-item label="项目" required>
				  		<el-select  v-model="financialAdjust.projectType" style="width: 100px">
			              <el-option label="码头费" :value="1" ></el-option>
			              <el-option label="港口费" :value="2" ></el-option>
			              <el-option label="绑扎费" :value="3" ></el-option>
			              <el-option label="拖轮费" :value="4" ></el-option>
			              <el-option label="其他" :value="5" ></el-option>
			            </el-select>
				  		<el-input v-if="financialAdjust.projectType==5" v-model="financialAdjust.tip" style="width: 180px"></el-input>
				  	</el-form-item>
				  	<el-form-item label="实收金额" required>
				  		<el-input v-model="financialAdjust.num" style="width: 282px"></el-input>
				  		<el-button type="primary" class="mgl20" @click="submitFinancialAdjust">完成</el-button>
				  	</el-form-item>
				</el-form>
				<el-table size="mini" max-height="200" header-cell-class-name="backGrey" :data="financialAdjust.history" style="width: 100%">
			      <el-table-column prop="AddTimeStr" label="时间" width="180"></el-table-column>
			      <el-table-column label="类型">
			      	<template slot-scope="scope">
			      		{{ scope.row.Sp_type==1?"收调整":"付调整" }}
			      	</template>
			      </el-table-column>
			      <el-table-column label="项目">
			      	<template slot-scope="scope">
			      		{{ scope.row.Sp_item==5?scope.row.Remark:(["码头费","港口费","绑扎费","拖轮费"][scope.row.Sp_item]) }}
			      	</template>
			      </el-table-column>
			      <el-table-column prop="Money" label="金额"></el-table-column>
			      <el-table-column label="操作">
			      	<template slot-scope="scope">
				        <el-button
				          size="mini"
				          type="danger"
				          @click="deleteFinancialAdjust(scope.row.Id)">删除</el-button>
				      </template>
			      </el-table-column>
			    </el-table>
			</div>
		</el-dialog>
		<el-dialog title="确认收款" width="650px" :visible.sync="financialReceiveCheck.visible" class="financialReceiveCheck"><!-- 财务确认业务员发起的收款 -->
			<el-form ref="financialReceiveForm"  :inline="true" label-position="right" label-width="80px">
			  	<el-form-item label="实收金额" required>
			  		<el-input v-model="financialReceiveCheck.num" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="收款日期"  required>
			  		<el-date-picker value-format="yyyy-MM-dd" v-model="financialReceiveCheck.time"   type="date" placeholder="选择日期"></el-date-picker>
			  	</el-form-item>
			</el-form>
			<div class="flexCenter wrap">
				<label>上传发票</label>
				<div v-for="(item,index) in financialReceiveCheck.pic" class="relative mgt20">
                  <img @click="previewImg(item.imgDataUrl)"  class="previewedImg" :src="item.imgDataUrl">
                  <i class="el-icon-circle-close deleteImg" @click="deleteImg(financialReceiveCheck.pic,index,'financialReceiveCheck')" ></i>
                </div>
				<div class="uploadImg">
	              <div class="logo"><i class="el-icon-plus"></i></div>
	              <s-preview-img class="input" @fileUpload="saveFinancialReceiveCheckPic"></s-preview-img>
	            </div>
			</div>
			<span slot="footer">
			    <el-button @click="financialReceiveCheck.visible = false">取 消</el-button>
			    <el-button type="primary" @click="submitFinancialReceiveCheck">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="确认付款" width="650px" :visible.sync="financialPayCheck.visible" class="financialPayCheck">
			<el-form ref="financialReceiveForm"  :inline="true" label-position="right" label-width="80px">
			  	<el-form-item label="实付金额" required>
			  		<el-input v-model="financialPayCheck.num" ></el-input>
			  	</el-form-item>
			  	<el-form-item label="付款日期"  required>
			  		<el-date-picker value-format="yyyy-MM-dd" v-model="financialPayCheck.time"  type="date" placeholder="选择日期"></el-date-picker>
			  	</el-form-item>
			</el-form>
			<div class="flexCenter wrap">
				<label>上传发票</label>
				<div v-for="(item,index) in financialPayCheck.pic" class="relative mgt20">
                  <img @click="previewImg(item.imgDataUrl)"  class="previewedImg" :src="item.imgDataUrl">
                  <i class="el-icon-circle-close deleteImg" @click="deleteImg(financialPayCheck.pic,index,'financialPayCheck')" ></i>
                </div>
				<div class="uploadImg">
	              <div class="logo"><i class="el-icon-plus"></i></div>
	              <s-preview-img class="input" @fileUpload="saveFinancialPayCheckPic"></s-preview-img>
	            </div>
			</div>
			<span slot="footer">
			    <el-button @click="financialPayCheck.visible = false">取 消</el-button>
			    <el-button type="primary" @click="submitFinancialPayCheck">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="打印付款申请单" width="90%" :visible.sync="print.visible" class="print">
			<div class="center">付款申请单</div>
			<div>申请日期：2019-03-29</div>
			<table  border="1" cellspacing="0" cellpadding="0" >
				<tr>
					<td class="textRight">提单号：</td>
					<td>{{orderId}}</td>
					<td class="textRight">船名：</td>
					<td>{{orderDetail.ShipName}}</td>
				</tr>
				<tr>
					<td class="textRight">客户：</td>
					<td>卓航物流 </td>
					<td class="textRight">货名：</td>
					<td>1</td>
				</tr>
				<tr>
					<td class="textRight">付款项目：</td>
					<td>2</td>
					<td class="textRight">收款单位：</td>
					<td>1</td>
				</tr>
				<tr>
					<td class="textRight">收款账号：</td>
					<td>2</td>
					<td class="textRight">开户银行：</td>
					<td>1</td>
				</tr>
				<tr>
					<td class="textRight">付款金额：</td>
					<td>2</td>
					<td class="textRight">付款金额（大写）：</td>
					<td>{{ moneyBig(1651210.56) }}</td>
				</tr>
				<tr>
					<td class="textRight">备注：</td>
					<td colspan="3">2</td>
				</tr>
			</table>
			<div class="flex">
				<div class="flex1">申请人：{{}}</div>
				<div class="flex1">审核人：{{}}</div>
				<div class="flex1">审批人：{{}}</div>
				<div class="flex1">经办人：{{}}</div>
				<div class="flex1">付款日期：{{}}</div>
			</div>
			<span slot="footer">
			    <el-button type="primary" @click="print.visible = false">打印</el-button>
			</span>
		</el-dialog>
		<div class="previewImg" @click="previewImgData.visible=false" v-if="previewImgData.visible"><img :src="previewImgData.url"></div>
	</div>
</template>
<script>
import common from "../../assets/common.js"
import sideDialog from '@/components/common/side-dialog'
import previewImg from '@/components/common/uploadPreviewImg'
export default{
  name: 'operatorComponent',
  components: {
    's-side-dialog': sideDialog,
    's-preview-img': previewImg,
  },
  data () {
    return {
    	identity:0,//0业务员 1叶玲（业务员+主管） 2主管  3财务 4出纳
    	activeTab:"0",
    	curItem:{},
    	status:"1",
    	orderDetail:{},
    	filter:1,
    	payAndReceive:{
    		visible:false,
    		status:1,
    	},
    	payData:{
    		projectName:"",
    		date:"",
    		num:"",
    		bankName:"",
    		account:"",
    		depositBank:"",
    		tip:""
    	},
    	receiveData:{
    		projectName:"",
    		date:"",
    		num:"",
    		company:"",
    		tip:""
    	},
    	enterWayBill:{
    		visible:false,
    		loadTon:"",
    		unloadTon:"",
    		pic:[],
    		removeFileIds:[]
    	},
    	check:{
    		visible:false,
    		status:1,
    	},
    	financialReceive:{
    		visible:false,
    		pic:[],
    		projectName:"",
    		date:"",
    		num:"",
    		company:"",
    		tip:"",
    		removeFileIds:[]
    	},
    	financialAdjust:{
    		visible:false,
    		status:1,
    		projectType:1,
    		tip:"",
    		history:[]
    	},
    	financialReceiveCheck:{
			visible:false,
    		pic:[],
    		time:"",
    		num:"",
    		removeFileIds:[],
    	},
    	financialPayCheck:{
			visible:false,
			time:"",
			num:"",
    		pic:[],
    		removeFileIds:[]
    	},
    	print:{
    		visible:false,
    	},
    	previewImgData:{
    		visible:false,
    		url:""
    	},
    	shipContractPic:{pic:[]},
    	goodsContractPic:{pic:[]},
    	receiveVoucherPic:{pic:[]},
    	payVoucherPic:{pic:[]},
    	transOrderPic:{pic:[]},
    	shipCertificatePic:{pic:[]},
    	otherPic:{pic:[]},
    	scroll:{
    		height:"",
    		overflow:"auto"
    	},
    	imgFileListscroll:{
    		height:"",
    		overflow:"auto"
    	},
    }
  },
  created(){
  	this.scroll.height=window.innerHeight-400+'px';
  	this.imgFileListscroll.height=window.innerHeight-170+'px';
  	this.queryIdentity();
  	this.getOrderDetail();
  	this.queryAjust();
  	this.queryImgFileList();
  },
  props:{
  	visible:{
  		default:false,
  		type:Boolean
  	},
  	orderId:{
  		default:"",
  		type:[String,Number]
  	}
  },
  watch:{
  	orderId:function(newId,oldId){
  		this.getOrderDetail();
  		this.queryAjust();
  		this.queryImgFileList();
  	},
  	"financialAdjust.projectType":function(newType,oldType){
  		if (newType!=5) {
  			this.financialAdjust.tip="";
  		}
  	}
  },
  methods:{
  	getOrderDetail(){
  	  if (!this.orderId) {return;}
  	  const loading = this.$loading({
	      lock: true,
	      text: '加载中',
	  });
  	  this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/QueryBusinessOrderDetail',
        data:{OrderId:this.orderId}
      }).then((response)=>{
        if (response.data.RetCode==0) {
        	this.orderDetail=response.data.RetData;
        	this.status=["正常","归档","退船","纠纷"].indexOf(this.orderDetail.OrderStateStr)+1;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
        loading.close();
      })
  	},
  	queryIdentity(){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/QueryIdentity',
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.identity=response.data.RetData;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      });
    },
    queryAjust(){
    	if (!this.orderId) {return;}
	    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/QuerySKsupplement',
	        data:{OrderId:this.orderId}
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.financialAdjust.history=response.data.RetData;
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	    });
    },
    queryImgFileList(){
    	if (!this.orderId) {return;}
    	const loading = this.$loading({
	      lock: true,
	      text: '加载中',
	  	});
	    this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/QueryRelateFile',
	        data:{OrderId:this.orderId}
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	let retData=response.data.RetData
	        	retData.A1.forEach((x,i) => x.readyToDelete=false);
	        	retData.A2.forEach((x,i) => x.readyToDelete=false);
	        	retData.A6.forEach((x,i) => x.readyToDelete=false);
	        	retData.A7.forEach((x,i) => x.readyToDelete=false);
	        	this.shipContractPic.pic=retData.A1;
	        	this.shipContractPic.BusinessId=retData.ShipContractBusinessId;
	        	this.goodsContractPic.pic=retData.A2;
	        	this.goodsContractPic.BusinessId=retData.GoodsContractBusinessId;
	        	this.receiveVoucherPic.pic=retData.A3;
	        	this.payVoucherPic.pic=retData.A4;
	        	this.transOrderPic.pic=retData.A5;
	        	this.shipCertificatePic.pic=retData.A6;
	        	this.shipCertificatePic.BusinessId=retData.ZhengShuBusinessId;
	        	this.otherPic.pic=retData.A7;
	        	this.otherPic.BusinessId=retData.XieYiBusinessId;
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	        loading.close();
	    })
    },
  	fmoney(num){
  		return common.fmoney(num);
  	},
  	moneyBig(num){
  		return common.moneyBig(num);
  	},
  	changeVisible(){
      this.$emit('update:visible', false);
  	},
  	changeStatus(e){
  		this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/ChangceOrderState',
	        data:{
	        	OrderId:this.orderDetail.OrderId,
	        	OrderState:e
	        }
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	    });
  	},
  	submitPayAndReceive() {
		if(this.payAndReceive.status==1){
			//发起付款
			this.$axios({
		        method: 'post',
		        url: this.$store.commonData.state.url+'Business/Create_Fapply',
		        data:{
		        	OrderId:this.orderDetail.OrderId,
		        	Fkxm: this.payData.projectName,//付款项目
		        	Fkje: this.payData.num,//付款金额
		        	Fkrq: this.payData.date,//付款日期
		        	Bank: this.payData.bankName,//开户银行
		        	B_UserName: this.payData.depositBank,//开户名称
		        	ShouKuanAccount:this.payData.account,
		        	Remark: this.payData.tip,//备注
		        }
		      }).then((response)=>{
		        if (response.data.RetCode==0) {
		        	this.$message({
			            message: response.data.RetMsg,
			            type: 'success'
			        });
		        	this.getOrderDetail();
		        }else{
		          this.$message({
		            message: response.data.RetMsg,
		            type: 'error'
		          });
		        }
		        this.payAndReceive.visible=false;
		     })
		}else{
			//发起收款
			this.$axios({
		        method: 'post',
		        url: this.$store.commonData.state.url+'Business/Create_Sapply',
		        data:{
		        	OrderId:this.orderDetail.OrderId,
					Skxm: this.receiveData.projectName,//收款项目
					Skje: this.receiveData.num,//收款金额
					Skrq: this.receiveData.date,//收款日期
					Fkdw: this.receiveData.company,//付款单位
		        	Remark: this.receiveData.tip,//备注
		        }
		      }).then((response)=>{
		        if (response.data.RetCode==0) {
		        	this.$message({
			            message: response.data.RetMsg,
			            type: 'success'
			        });
			        this.getOrderDetail();
		        }else{
		          this.$message({
		            message: response.data.RetMsg,
		            type: 'error'
		          });
		        }
		        this.payAndReceive.visible=false;
		      })
		}
    },
    rebackPayAndReceive(id,type){
    	this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/RemoveApply',
	        data:{
	        	Id:id,
	        	ApplyType:type//1收款 2付款
	        }
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.getOrderDetail();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	      })
        });
    },
    showWayBill(){
  		this.enterWayBill.visible=true;
  		this.enterWayBill.pic=[];
  		this.enterWayBill.removeFileIds=[];
  		for (var i = this.orderDetail.Datas.length - 1; i >= 0; i--) {
  			if(this.orderDetail.Datas[i].DataType==1){
  				this.enterWayBill.loadTon=this.orderDetail.Datas[i].Zgton;
  				this.enterWayBill.unloadTon=this.orderDetail.Datas[i].Xgton;
  				for(var j of this.orderDetail.Datas[i].FileList)
  				this.enterWayBill.pic.push({
  					id:j.Id,
  					imgDataUrl:j.Url,
  				});
  			}
  		}
  	},
    createWayBill(){
    	let param = new FormData(); //创建form对象  
    	for (var i = this.enterWayBill.pic.length - 1; i >= 0; i--) {
    		if (!this.enterWayBill.pic[i].id) {
				param.append('file', this.enterWayBill.pic[i].file,this.enterWayBill.pic[i].file.name);
    		}
  		}
  		param.append('OrderId',this.orderDetail.OrderId);
  		param.append('Zgton',this.enterWayBill.loadTon);//装港吨
  		param.append('Xgton',this.enterWayBill.unloadTon);//卸港吨吨
  		param.append('RemoveFileIds',this.enterWayBill.removeFileIds.join(","));
    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/Create_ZxtonDetail',
	        headers:{'Content-Type':'multipart/form-data'} ,
	        data:param
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.$message({
		            message: response.data.RetMsg,
		            type: 'success'
		        });
		        this.getOrderDetail();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	        this.enterWayBill.visible = false
	    })    	
    },
    checkApply(){
    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/FapplyCheck',
	        data:{
	        	OrderId:this.orderDetail.OrderId,
	        	FapplyId: this.curItem.Id,
	        	CheckResult: this.check.status,//1通过  2不通过
	        }
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.$message({
		            message: response.data.RetMsg,
		            type: 'success'
		        });
		        this.check.visible=false;
	        	this.getOrderDetail();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	        this.payAndReceive.visible=false;
	    });
    },
    editFinancialPayCheck(item){
    	this.financialPayCheck.num=item.Fukuan;
    	this.financialPayCheck.time=new Date(item.FuKuanDate);
    	this.financialPayCheck.pic=[];
    	this.financialPayCheck.removeFileIds=[];
    	for(var o of item.Files){
    		this.financialPayCheck.pic.push({
    			imgDataUrl:o.Url,
    			id:o.Id
    		})
    	}
    	this.financialPayCheck.visible=true;
    },
    submitFinancialPayCheck(){
    	let param = new FormData(); //创建form对象  
    	for (var i = this.financialPayCheck.pic.length - 1; i >= 0; i--) {
    		if (!this.financialPayCheck.pic[i].id) {
  				param.append('file', this.financialPayCheck.pic[i].file,this.financialPayCheck.pic[i].file.name);
  			}
  		}
  		param.append('OrderId',this.orderDetail.OrderId);
  		param.append('FapplyId',this.curItem.Id);
  		param.append('FuKuan',this.financialPayCheck.num);
  		param.append('FuKuanDate',this.financialPayCheck.time);
  		param.append('RemoveFileIds',this.financialPayCheck.removeFileIds.join(","));
    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/FapplyConfirm',
	        headers:{'Content-Type':'multipart/form-data'} ,
	        data:param
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.$message({
		            message: response.data.RetMsg,
		            type: 'success'
		        });
		        this.financialPayCheck.visible=false;
	        	this.getOrderDetail();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	        this.payAndReceive.visible=false;
	    });
    },
    editFinancialReceiveCheck(item){
    	this.financialReceiveCheck.num=item.ShiShou;
    	this.financialReceiveCheck.time=new Date(item.ShiShouDate);
    	this.financialReceiveCheck.pic=[];
    	this.financialReceiveCheck.removeFileIds=[];
    	for(var o of item.FileUrls){
    		this.financialReceiveCheck.pic.push({
    			imgDataUrl:o.Url,
    			id:o.Id
    		})
    	}
    	this.financialReceiveCheck.visible=true;
    },
    submitFinancialReceiveCheck(){
		let param = new FormData(); //创建form对象  
    	for (var i = this.financialReceiveCheck.pic.length - 1; i >= 0; i--) {
    		if (!this.financialReceiveCheck.pic[i].id) {
  				param.append('file', this.financialReceiveCheck.pic[i].file,this.financialReceiveCheck.pic[i].file.name);
  			}
  		}
  		param.append('OrderId',this.orderDetail.OrderId);
  		param.append('SapplyId',this.curItem.Id);
  		param.append('ShiShou',this.financialReceiveCheck.num);
  		param.append('ShiShouDate',this.financialReceiveCheck.time);
  		param.append('RemoveFileIds',this.financialReceiveCheck.removeFileIds.join(","));
    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/SapplyConfirm',
	        headers:{'Content-Type':'multipart/form-data'} ,
	        data:param
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.$message({
		            message: response.data.RetMsg,
		            type: 'success'
		        });
		        this.financialReceiveCheck.visible=false;
	        	this.getOrderDetail();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	        this.financialReceiveCheck.visible = false
	    });
    },
    openFinancialReceive(){
    	this.financialReceive.visible=true
    	this.curItem={};
    },
    editFinancialReceive(item){
    	this.financialReceive.projectName=item.Skxm;
    	this.financialReceive.num=item.Skje;
    	this.financialReceive.date=item.Skrq;
    	this.financialReceive.company=item.Fkdw;
    	this.financialReceive.tip=item.Remark;
    	this.financialReceive.pic=[];
    	this.financialReceive.removeFileIds=[];
    	for(var o of item.ShenPiConfirm.FileUrls){
    		this.financialReceive.pic.push({
    			imgDataUrl:o.Url,
    			id:o.Id
    		})
    	}
    	this.financialReceive.visible=true;
    },
    submitFinancialReceive(){
    	let param = new FormData(); //创建form对象  
    	for (var i = this.financialReceive.pic.length - 1; i >= 0; i--) {
    		if (!this.financialReceive.pic[i].id) {
  				param.append('file', this.financialReceive.pic[i].file,this.financialReceive.pic[i].file.name);
  			}
  		}
  		param.append('OrderId',this.orderDetail.OrderId);
  		param.append('SapplyId',this.curItem.Id);
  		param.append('Skxm',this.financialReceive.projectName);//收款项目
  		param.append('Skje',this.financialReceive.num);//收款金额
  		param.append('Skrq',this.financialReceive.date);//收款日期
  		param.append('Fkdw',this.financialReceive.company);//付款单位
  		param.append('Remark',this.financialReceive.tip);
  		param.append('RemoveFileIds',this.financialReceive.removeFileIds.join(","));
    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/CaiWu_Create_Sapply',
	        headers:{'Content-Type':'multipart/form-data'} ,
	        data:param
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.$message({
		            message: response.data.RetMsg,
		            type: 'success'
		        });
		        this.financialReceive.visible=false;
	        	this.getOrderDetail();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	    });
	},
    submitFinancialAdjust(){
    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/CreateSKsupplement',
	        data:{
	        	OrderId:this.orderDetail.OrderId,
	        	Sp_type: this.financialAdjust.status,//1收调整 2付调整
	        	Sp_item: this.financialAdjust.projectType,
	        	Remark: this.financialAdjust.tip,
	        	Money:this.financialAdjust.num,
	        }
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.$message({
		            message: response.data.RetMsg,
		            type: 'success'
		        });
	        	this.queryAjust();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	        this.payAndReceive.visible=false;
	    });
    },
    deleteFinancialAdjust(id){
    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/RemoveSKsupplement',
	        data:{
	        	SKsupplementId:id,
	        }
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.queryAjust();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	    })
    },
    saveWayBillPic(e){
      this.enterWayBill.pic=this.enterWayBill.pic.concat(e.imgObjs);
    },
    saveFinancialReceivePic(e){
      this.financialReceive.pic=this.financialReceive.pic.concat(e.imgObjs);
    },
    saveFinancialReceiveCheckPic(e){
      this.financialReceiveCheck.pic=this.financialReceiveCheck.pic.concat(e.imgObjs);
    },
    saveFinancialPayCheckPic(e){
      this.financialPayCheck.pic=this.financialPayCheck.pic.concat(e.imgObjs);
    },
    deleteImg(obj,index,name){
    	let item;
    	if (Array.isArray(obj)) {
        	item=obj.splice(index,1)[0];
      	}
      	if (name) {
      		this[name].removeFileIds.push(item.id);
      	}
    },
    submitDeleteImg(){
    	let deleteArr=[];
    	this.shipContractPic.pic.forEach((x,i) => x.readyToDelete?deleteArr.push(x.Id):"");
    	this.goodsContractPic.pic.forEach((x,i) => x.readyToDelete?deleteArr.push(x.Id):"");
    	this.shipCertificatePic.pic.forEach((x,i) => x.readyToDelete?deleteArr.push(x.Id):"");
    	this.otherPic.pic.forEach((x,i) => x.readyToDelete?deleteArr.push(x.Id):"");
    	this.$axios({
	        method: 'post',
	        data:{OrderFileId:deleteArr.join(",")},
	        url: this.$store.commonData.state.url+'Business/RemoveRelateFile',
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	this.queryImgFileList();
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	    });
    },
    submitImg(param,labe){
    	this.$axios({
	        method: 'post',
	        url: this.$store.commonData.state.url+'Business/UploadRelateFile',
	        headers:{'Content-Type':'multipart/form-data'} ,
	        data:param
	      }).then((response)=>{
	        if (response.data.RetCode==0) {
	        	let retData=response.data.RetData;
	        	retData.forEach((x,i) => x.readyToDelete=false);
	        	this[labe].pic=this[labe].pic.concat(retData)
	        }else{
	          this.$message({
	            message: response.data.RetMsg,
	            type: 'error'
	          });
	        }
	    });
    },
    saveShipContractPic(e){
    	let param = new FormData(); //创建form对象
    	e.imgObjs.forEach((x,i) => param.append('file', x.file,x.name));
  		param.append('OrderId',this.orderDetail.OrderId);
  		param.append('BusinessId',this.shipContractPic.BusinessId);
  		param.append('BusinessType',1);
    	this.submitImg(param,"shipContractPic");
    },
    saveGoodsContractPic(e){
      	let param = new FormData(); //创建form对象
    	e.imgObjs.forEach((x,i) => param.append('file', x.file,x.name));
  		param.append('OrderId',this.orderDetail.OrderId);
  		param.append('BusinessId',this.goodsContractPic.BusinessId);
  		param.append('BusinessType',2);
    	this.submitImg(param,"goodsContractPic");
    },
    saveShipCertificatePic(e){
      	let param = new FormData(); //创建form对象
    	e.imgObjs.forEach((x,i) => param.append('file', x.file,x.name));
  		param.append('OrderId',this.orderDetail.OrderId);
  		param.append('BusinessId',this.shipCertificatePic.BusinessId);
  		param.append('BusinessType',2);
    	this.submitImg(param,"shipCertificatePic");
    },
    saveOtherPic(e){
      	let param = new FormData(); //创建form对象
    	e.imgObjs.forEach((x,i) => param.append('file', x.file,x.name));
  		param.append('OrderId',this.orderDetail.OrderId);
  		param.append('BusinessId',this.otherPic.BusinessId);
  		param.append('BusinessType',2);
    	this.submitImg(param,"otherPic");
    },
    previewImg(imgDataUrl){
    	this.previewImgData.visible=true;
    	this.previewImgData.url=imgDataUrl;
    },
    naviToEditOrder(){
    	common.openNewPage(this,`/main/order/createNewOrder/${this.orderId}`);
    }
  }
}
</script>


<style scoped lang="less">
@import "../../assets/common.less";
/deep/ .el-tabs--border-card>.el-tabs__content{
	padding:0;
}
/deep/.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #dcdfe6;
}

.sideDrawer{
  .icon{
    width: 40px;
    font-size: 10px;
    text-align:center;
    .hand;
    img{
      width: 25px;
      height: 25px;
    }
  }
}
.title{
	height: 45px;
}
.moneyTable{
	width:100%;
	margin-top: 10px;
	.font16;
	td{
		text-align: center;
		padding: 5px;
	}
	tr:nth-child(odd){
		background: #F2F2F2;
	}
	tr:nth-child(even){
		font-weight:bold;
	}
	tr:nth-child(2){
		color: @green;
	}
	tr:nth-child(4){
		color: @red;
	}
}
.line{
	padding:10px 15px;
}
.itemList{
	background: #F2F2F2;
	padding:15px;
	.font16;
	.item+.item{
		margin-top:15px;
	}
	.main,.footer{
		.flexCenter;
		background:white;
		padding:10px 15px;
		border-left:4px solid white;
		border-radius:4px;
		.title{
			width: 220px;
		}
		.info{
			.font14;
			.flexCenter;
			width: 210px; 
			.operation{
				.flexCenter;
				.hand;
			}
			.pic{
				width: 95px;
				height: 55px;
			}
			.icon{
				width: 15px;
				height: 15px;
				font-size: 16px;
				margin-right: 2px;
			}
			.step{
				color: #CCC;
				display: flex;
				align-items:flex-end;
				.stepLineWapper{
					position:relative;
					top: -20px;
					margin-right: 10px;
					.stepLine{
						width: 1px;
						background-color:#CCC;
						height: 26px;
						margin: auto;
					}
				}
				.name{
					font-size: 16px;
				}
				.description{
					margin-bottom: 10px;
				}
				&:first-child{
				    .stepLine{
						display: none
					}
				}
			}
			
		}
	}
	.footer{
		border-top: 1px solid rgb(204,204,204);
	}
	.greenBorder{
		border-left:4px solid @green;
	}
	.redBorder{
		border-left:4px solid @red;
	}
}
.filter{
	margin-top: 10px;
	/deep/ .el-radio__input{
		display: none;
	}
	/deep/ .el-radio+.el-radio{
		margin-left: 5px;
	}
}
.payAndReceive{
	/deep/ .el-textarea{
		width: 498px
	}
	/deep/ .el-date-editor.el-input{
		width: 202px;
	}
	.label{
		width: 60px;
		padding-right: 20px;
	}
	.status{
		width: 80px
	}
}
.enterWayBill{
	label{
		width: 80px;
		display: inline-block;
	}
	/deep/ input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button{
		-webkit-appearance:none;
	}
	/deep/ .el-input{
		width: 150px;
	}
	.wrap{
		flex-wrap:wrap;
	}
}
.check{
	.textarea{
		text-align: left;
		margin-top: 20px;
		width: 250px;
		margin-left: 20px;
	}
}
.financialReceive,.financialReceiveCheck,.financialPayCheck{
	label{
		width: 80px;
		padding-right: 20px;
		display: inline-block;
		box-sizing:border-box;
		text-align: right;
	}
	/deep/ .el-textarea{
		width: 498px
	}
	.wrap{
		flex-wrap:wrap;
	}
}
.imgFileList{
	padding:10px;
	label{
		width: 80px;
		padding:50px 0;
		padding-right: 20px;
		display: inline-block;
		box-sizing:border-box;
		text-align: right;
	}
	.wrap{
		flex-wrap:wrap;
	}
	.checkImg{
		position: absolute;
		top: -10px;
		right: 10px;
		color: #CCC;
		font-size: 20px;
		background-color:white;
	}
	.checkedImg{
		color: @green;
	}
}
.previewedImg{
	width: 100px;
	height: 100px;
	margin-right:20px;
}
.deleteImg{
  position: absolute;
  top: -10px;
  right: 10px;
  color: red;
  font-size:20px;
}
.uploadImg{
  width: 100px;
  height: 100px;
  position: relative;
  display: inline-block;
  text-align:center;
  margin-top: 20px;
  .logo{
	  width: 100px;
	  height: 100px;
	  line-height: 100px;
	  border:1px dashed #ccc;
	  box-sizing: border-box;
	  .el-icon-plus{
	  	font-size: 50px;
	  	vertical-align: middle;
	  }
	}
  
  & .input{
    position: absolute;
    width: 100%;
    height: 100%;
    display: inline-block;
    left: 0;
    top:0;
    opacity: 0;
  }
}
.print{
	table{
		width: 100%;
		border-collapse: collapse;
		td{
			padding:2px 10px;
		}
	}
}
.previewImg{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55,55,55,.6);
  height: 100%;
  z-index: 2007;
  display: flex;
  align-items: center;
  justify-content:space-around;
  img{
  	max-width: 100%;
  	max-height: 100%;
  }
}
</style>