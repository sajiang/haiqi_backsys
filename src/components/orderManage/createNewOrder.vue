<template>
  <div class="hello">
    <div class="contracts">
      <div class="goodsContract">
        <div class="flex">
          <div class="flex1">
            <span>货业务</span>
            <el-select size="mini" v-model="goodsData.Hyewu" @change="completeGoodsYewu" value-key="Id" style="width:100px">
              <el-option v-for="item in operatorList" :label="item.UserName" :value="item" :key="item.Id"></el-option>
            </el-select>
          </div>
          <div>
             <el-button type="info" size="mini" plain>下载</el-button>
             <el-button type="primary" size="mini" @click="makeShipGoodsTheSame('GoodsToShip')">同步</el-button>
          </div>
        </div>
        <table class="titleLine mgt10" cellspacing="0" cellpadding="0" >
          <tr>
            <td class="title" rowspan="3">航次租船合同</td>
            <td class="placeholder"></td></td>
          </tr>
          <tr>
            <td class="note">本合同一式二份，传真件具有同等法律效力。有关承租人与出租人之间的权利、义务和责任界限，适用于《代理租船合同》及运价，规费的有关规定。</td>
          </tr>
          <tr>
            <td  class="placeholder"></td></td>
          </tr>
        </table>
        <table class="companyLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td rowspan="5" class="leftLine nameLabel borderBottomNone">承租人</td>
            <td class="nameLabel col2">全称</td>
            <td class="flex borderNone">
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="goodsData.A_Name" filterable remote placeholder="请输入关键词"
                :remote-method="queryCompanyFullName" @change="completeGoodsACompanyInfo">
                <el-option v-for="(item,index) in queryCompanyList" 
                  :key="index"
                  :label="item.CompanyName"
                  :value="item">
                  <div>{{item.CompanyName}}</div>
                  <div class="subInfo">户名：{{item.HuMing}}</div>
                  <div class="subInfo">开户行：{{item.KaiHuHang}}</div>
                </el-option>
              </el-select>
            </td>
            <td rowspan="5" class="leftLine nameLabel borderBottomNone">出租人</td>
            <td class="nameLabel col2">全称</td>
            <td class="flex borderNone">
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="goodsData.B_Name" filterable remote placeholder="请输入关键词"
                :remote-method="queryCompanyFullName" @change="completeGoodsBCompanyInfo" >
                <el-option v-for="(item, index) in queryCompanyList"
                  :key="index"
                  :label="item.CompanyName"
                  :value="item">
                  <div>
                    <div>{{item.CompanyName}}</div>
                    <div class="subInfo">户名：{{item.HuMing}}</div>
                    <div class="subInfo">开户行：{{item.KaiHuHang}}</div>
                  </div>
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel">传真</td>
            <td><div class="flex"><input type="" v-model="goodsData.A_Fax"></div></td>
            <td class="nameLabel">传真</td>
            <td><div class="flex"><input type="" v-model="goodsData.B_Fax"></div></td>
          </tr>
          <tr>
            <td class="nameLabel">户名</td>
            <td><div class="flex"><input type="" v-model="goodsData.A_UserName"></div></td>
            <td class="nameLabel">户名</td>
            <td><div class="flex"><input type="" v-model="goodsData.B_UserName"></div></td>
          </tr>
          <tr>
            <td class="nameLabel">开户行</td>
            <td><div class="flex"><input type="" v-model="goodsData.A_Bank"></div></td>
            <td class="nameLabel">开户行</td>
            <td><div class="flex"><input type="" v-model="goodsData.B_Bank"></div></td>
          </tr>
          <tr>
            <td class="nameLabel borderBottomNone">银行账号</td>
            <td><div class="flex"><input type="" v-model="goodsData.A_Account"></div></td>
            <td class="nameLabel">银行账号</td>
            <td><div class="flex"><input type="" v-model="goodsData.B_Account"></div></td>
          </tr>
        </table>
        <table class="shipLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td class="nameLabel col1">船名</td>
            <td class="col2">
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="goodsData.ShipName" filterable remote placeholder="请输入关键词"
                :remote-method="queryShipFullName" @change="completeGoodsShipInfo">
                <el-option v-for="(item,index) in queryShipList" 
                  :key="index"
                  :label="item.cnShipName"
                  :value="item">
                  <div>{{item.cnShipName}}</div>
                </el-option>
              </el-select>
            </td>
            <td class="col3 nameLabel">载货吨</td>
            <td class="col4"><div class="flex"><input type="" v-model="goodsData.LoadTon"></div></td>
            <td class="nameLabel col4">船长/船宽</td>
            <td><div class="flex"><input type="" v-model="goodsData.ShipLength">/<input type="" v-model="goodsData.ShipWith"></div></td>
          </tr>
           <tr>
            <td class="nameLabel col1">总吨/净吨</td>
            <td class="col2"><div class="flex"><input type="" v-model="goodsData.Tonnage">/<input type="" v-model="goodsData.Net_ton"></div></td>
            <td class="col3 nameLabel">舱口数</td>
            <td class="col4"><div class="flex"><input type="" v-model="goodsData.Hatch_Num"></div></td>
            <td class="nameLabel col4">满载吃水</td>
            <td><div class="flex"><input type="" v-model="goodsData.Load_Draught"></div></td>
          </tr>
           <tr>
            <td class="nameLabel col1">合同号</td>
            <td class="col2"><div class="flex"><input type="" v-model="goodsData.OrderId"></div></td>
            <td class="col3 nameLabel">货名</td>
            <td class="col4"><div class="flex"><input type="" v-model="goodsData.GoodsName"></div></td>
            <td class="nameLabel col4">包装</td>
            <td><div class="flex"><input type="" v-model="goodsData.PackStyle"></div></td>
          </tr>
        </table>
        <table class="otherInfoLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td class="nameLabel col1">起运港</td>
            <td class="col2">
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="goodsData.StartPortName" filterable remote placeholder="请输入关键词"
                :remote-method="queryPortFullName">
                <el-option v-for="(item,index) in queryPortList" 
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </td>
            <td class="nameLabel col3">预计受载期限</td>
            <td class="col4">
              <el-date-picker value-format="yyyy-MM-dd" class="loadDateLimit" size="mini" :clearable="false" v-model="goodsData.LoadDate" type="date" placeholder="选择日期"></el-date-picker>
              ±<input class="smallNum" type="number" name="" v-model="goodsData.LoadDate_OffSet">天
            </td>
            <td class="nameLabel col5">装船期限</td>
            <td ><input class="midNum" type="number" name="" v-model="goodsData.DateOfShipment">天</td>
            <td class="nameLabel col7">滞期费</td>
            <td class="col8 ">
              <input  class="midNum" type="number" name="" v-model="goodsData.Demurrage">
              <el-select class="demurrage" size="mini" v-model="goodsData.Demurrage_Unit" placeholder="请选择">
                <el-option label="元/天" :value="1"></el-option>
                <el-option label="元/吨/天" :value="2"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel">到达港</td>
            <td>
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="goodsData.EndPortName" filterable remote placeholder="请输入关键词"
                :remote-method="queryPortFullName">
                <el-option v-for="(item,index) in queryPortList" 
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </td>
            <td class="nameLabel">运到期限</td>
            <td><input type="number" name="" v-model="goodsData.To_limit"></td>
            <td class="nameLabel">卸船期限</td>
            <td ><input class="midNum" type="number" name="" v-model="goodsData.Discharging">天</td>
            <td class="nameLabel">运价</td>
            <td class="col8 ">
              <input  class="midNum" type="number" name="" v-model="goodsData.Fare">
              <el-select class="fare" size="mini" v-model="goodsData.Fare_Unit" placeholder="请选择">
                <el-option label="元" :value="1"></el-option>
                <el-option label="元/吨" :value="2"></el-option>
              </el-select><!-- 
               --><el-select class="fare" size="mini" v-model="goodsData.IsIncludeTax" placeholder="请选择">
                <el-option label="含税" :value="2"></el-option>
                <el-option label="不含税" :value="1"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel">运费</td>
            <td colspan="3">{{goodsData.FareStr}}{{goodsData.Fare_Unit==1?"":"/吨"}}{{goodsData.IsIncludeTax==1?"不含税":"含税"}}</td>
            <td class="nameLabel" colspan="2">运费结算方式</td>
            <td colspan="2">
              <el-select  size="mini" v-model="goodsData.ClearingStr" placeholder="请选择">
                <el-option label="现金" value="现金"></el-option>
                <el-option label="电汇" value="电汇"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel detailLabel">特约事项和违约责任</td>
            <td colspan="7">
              <div class="detail" contenteditable="true"  ref="goodsDetail">
                <div>1、本合同为单航次运输合同。合同签订后，承租人当天付定金xx万元（出租人收到定金合同生效），滞期费与运费余款应在船抵达卸货港卸货前付清。若船货落空，各赔偿总运费的30%（不可抗力因素除外）。承租人未按期支付相关费用，出租人有权不靠泊卸货以及有权对承租人所托运的货物进行变卖，以冲抵运费和其他出租人的合理费用，由此引起的船舶滞期和货物损失及造成对第三方的侵权责任，均由承租人负责，并按所欠费用金额每日5‰计算滞纳金。</div>
                <div>2、承租人应负责装卸两港的集疏港工作，若船在装货港锚地后48小时内还没有装货计划，承租人必须在当天开始一天一付合同所定滞期费作为滞期保证金，否则出租人有权没收定金并视为货物落空。</div>
                <div>3、船舶装卸时间自船舶抵达装卸货港锚地后起算至装卸货完毕时止，装卸时间两港合并计算使用，因港口封航等恶劣天气影响以及其他不可抗力导致不能正常作业的承租人和出租人各承担一半。装卸时间超过约定装卸期限即视为滞期，一旦滞期，永远滞期。装卸时间以航海日志为准。</div>
                <div>4、货物实行封舱交接，货损货差与船方无关。装货前承租人如需对船舱是否适载进行验舱，必须在船舶靠泊后立即进行验舱，一旦开始装货即视为船舶适载。</div>
                <div>5、因天气原因、机械故障和人力不可抗力因素及上一港卸货延误造成船舶未按规定日期抵港，船期顺延。</div>
                <div>6、航线原则上不得更改，如承租人临时要求更改航线或增加多港装、卸货时，必须经出租人重新签约书面认定，否则视承租人违约。承租人应在装卸两港各安排一个安全泊位进行装、卸货，中途不移泊，若需移泊事先应征得出租人同意，移泊所需拖轮与引水费及因此发生的一切相关费用均由承租人负担。</div>
                <div>7、运费结算最低起算吨按xx吨计算，如实际装货数量超过约定数量，则按实际数量计算。如因船方原因装货不足约定数量，则按实际数量计算。</div>
                <div>8、货物数量和质量由发货方自行负责。装卸两港费用双方各负其责。港建费由承租人承担。承租方货物、出租方船舶双方各自办理保险手续，责任自负。</div>
                <div>9、合同执行过程中如发生纠纷，本着友好原则协商解决，若协商不成由海口海事法院裁决。</div>
                <div>10、本合同经双方盖章、出租人收到定金起生效（传真件具有相同法律效力），手改无效。该航次货物交接完毕运费及其他费用结算清楚后，该航次合同自然终止。</div>
              </div>
            </td>
          </tr>
        </table>
        <table class="sealLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td>
              <div class="seal">承租人签章：</div>
              <div class="textRight">
                <el-date-picker value-format="yyyy-MM-dd" size="mini" :clearable="false" v-model="goodsData.A_SignatureDate" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </td>
            <td>
              <div class="seal">出租人签章：</div>
              <div class="textRight">
                <el-date-picker value-format="yyyy-MM-dd" size="mini" :clearable="false" v-model="goodsData.B_SignatureDate" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="shipContract">
        <div class="flex">
          <div class="flex1">
            <span>船业务</span>
            <el-select size="mini" v-model="shipData.Cyewu" @change="completeShipYewu" value-key="Id" style="width:100px">
              <el-option v-for="item in operatorList" :label="item.UserName" :value="item" :key="item.Id"></el-option>
            </el-select>
          </div>
          <div>
             <el-button type="info" size="mini" plain>下载</el-button>
             <el-button type="primary" size="mini" @click="makeShipGoodsTheSame('ShipToGoods')">同步</el-button>
             <el-button type="success" size="mini" @click="saveContract">保存</el-button>
          </div>
        </div>
        <table class="titleLine mgt10" cellspacing="0" cellpadding="0" >
          <tr>
            <td class="title" rowspan="3">航次租船合同</td>
            <td class="placeholder"></td></td>
          </tr>
          <tr>
            <td class="note">本合同一式二份，传真件具有同等法律效力。有关承租人与出租人之间的权利、义务和责任界限，适用于《代理租船合同》及运价，规费的有关规定。</td>
          </tr>
          <tr>
            <td  class="placeholder"></td></td>
          </tr>
        </table>
        <table class="companyLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td rowspan="5" class="leftLine nameLabel borderBottomNone">承租人</td>
            <td class="nameLabel col2">全称</td>
            <td class="flex borderNone">
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="shipData.A_Name" filterable remote placeholder="请输入关键词"
                :remote-method="queryCompanyFullName" @change="completeShipACompanyInfo">
                <el-option v-for="(item,index) in queryCompanyList" 
                  :key="index"
                  :label="item.CompanyName"
                  :value="item">
                  <div>{{item.CompanyName}}</div>
                  <div class="subInfo">户名：{{item.HuMing}}</div>
                  <div class="subInfo">开户行：{{item.KaiHuHang}}</div>
                </el-option>
              </el-select>
            </td>
            <td rowspan="5" class="leftLine nameLabel borderBottomNone">出租人</td>
            <td class="nameLabel col2">全称</td>
            <td class="flex borderNone">
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="shipData.B_Name" filterable remote placeholder="请输入关键词"
                :remote-method="queryCompanyFullName" @change="completeShipBCompanyInfo" >
                <el-option v-for="(item, index) in queryCompanyList"
                  :key="index"
                  :label="item.CompanyName"
                  :value="item">
                  <div>
                    <div>{{item.CompanyName}}</div>
                    <div class="subInfo">户名：{{item.HuMing}}</div>
                    <div class="subInfo">开户行：{{item.KaiHuHang}}</div>
                  </div>
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel">传真</td>
            <td><div class="flex"><input type="" v-model="shipData.A_Fax"></div></td>
            <td class="nameLabel">传真</td>
            <td><div class="flex"><input type="" v-model="shipData.B_Fax"></div></td>
          </tr>
          <tr>
            <td class="nameLabel">户名</td>
            <td><div class="flex"><input type="" v-model="shipData.A_UserName"></div></td>
            <td class="nameLabel">户名</td>
            <td><div class="flex"><input type="" v-model="shipData.B_UserName"></div></td>
          </tr>
          <tr>
            <td class="nameLabel">开户行</td>
            <td><div class="flex"><input type="" v-model="shipData.A_Bank"></div></td>
            <td class="nameLabel">开户行</td>
            <td><div class="flex"><input type="" v-model="shipData.B_Bank"></div></td>
          </tr>
          <tr>
            <td class="nameLabel borderBottomNone">银行账号</td>
            <td><div class="flex"><input type="" v-model="shipData.A_Account"></div></td>
            <td class="nameLabel">银行账号</td>
            <td><div class="flex"><input type="" v-model="shipData.B_Account"></div></td>
          </tr>
        </table>
        <table class="shipLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td class="nameLabel col1">船名</td>
            <td class="col2">
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="shipData.ShipName" filterable remote placeholder="请输入关键词"
                :remote-method="queryShipFullName" @change="completeShipShipInfo">
                <el-option v-for="(item,index) in queryShipList" 
                  :key="index"
                  :label="item.cnShipName"
                  :value="item">
                  <div>{{item.cnShipName}}</div>
                </el-option>
              </el-select>
            </td>
            <td class="col3 nameLabel">载货吨</td>
            <td class="col4"><div class="flex"><input type="" v-model="shipData.LoadTon"></div></td>
            <td class="nameLabel col4">船长/船宽</td>
            <td><div class="flex"><input type="" v-model="shipData.ShipLength">/<input type="" v-model="shipData.ShipWith"></div></td>
          </tr>
           <tr>
            <td class="nameLabel col1">总吨/净吨</td>
            <td class="col2"><div class="flex"><input type="" v-model="shipData.Tonnage">/<input type="" v-model="shipData.Net_ton"></div></td>
            <td class="col3 nameLabel">舱口数</td>
            <td class="col4"><div class="flex"><input type="" v-model="shipData.Hatch_Num"></div></td>
            <td class="nameLabel col4">满载吃水</td>
            <td><div class="flex"><input type="" v-model="shipData.Load_Draught"></div></td>
          </tr>
           <tr>
            <td class="nameLabel col1">合同号</td>
            <td class="col2"><div class="flex"><input type="" v-model="shipData.OrderId"></div></td>
            <td class="col3 nameLabel">货名</td>
            <td class="col4"><div class="flex"><input type="" v-model="shipData.GoodsName"></div></td>
            <td class="nameLabel col4">包装</td>
            <td><div class="flex"><input type="" v-model="shipData.PackStyle"></div></td>
          </tr>
        </table>
        <table class="otherInfoLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td class="nameLabel col1">起运港</td>
            <td class="col2">
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="shipData.StartPortName" filterable remote placeholder="请输入关键词"
                :remote-method="queryPortFullName">
                <el-option v-for="(item,index) in queryPortList" 
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </td>
            <td class="nameLabel col3">预计受载期限</td>
            <td class="col4">
              <el-date-picker value-format="yyyy-MM-dd" class="loadDateLimit" size="mini" :clearable="false" v-model="shipData.LoadDate" type="date" placeholder="选择日期"></el-date-picker>
              ±<input class="smallNum" type="number" name="" v-model="shipData.LoadDate_OffSet">天
            </td>
            <td class="nameLabel col5">装船期限</td>
            <td ><input class="midNum" type="number" name="" v-model="shipData.DateOfShipment">天</td>
            <td class="nameLabel col7">滞期费</td>
            <td class="col8 ">
              <input  class="midNum" type="number" name="" v-model="shipData.Demurrage">
              <el-select class="demurrage" size="mini" v-model="shipData.Demurrage_Unit" placeholder="请选择">
                <el-option label="元/天" :value="1"></el-option>
                <el-option label="元/吨/天" :value="2"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel">到达港</td>
            <td>
              <el-select size="mini" class="flex1" :loading="selectLoading" allow-create value-key="index"
                v-model="shipData.EndPortName" filterable remote placeholder="请输入关键词"
                :remote-method="queryPortFullName">
                <el-option v-for="(item,index) in queryPortList" 
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </td>
            <td class="nameLabel">运到期限</td>
            <td><input type="number" name="" v-model="shipData.To_limit"></td>
            <td class="nameLabel">卸船期限</td>
            <td ><input class="midNum" type="number" name="" v-model="shipData.Discharging">天</td>
            <td class="nameLabel">运价</td>
            <td class="col8 ">
              <input  class="midNum" type="number" name="" v-model="shipData.Fare">
              <el-select class="fare" size="mini" v-model="shipData.Fare_Unit" placeholder="请选择">
                <el-option label="元" :value="1"></el-option>
                <el-option label="元/吨" :value="2"></el-option>
              </el-select><!-- 
               --><el-select class="fare" size="mini" v-model="shipData.IsIncludeTax" placeholder="请选择">
                <el-option label="含税" :value="2"></el-option>
                <el-option label="不含税" :value="1"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel">运费</td>
            <td colspan="3">{{shipData.FareStr}}{{shipData.Fare_Unit==1?"":"/吨"}}{{shipData.IsIncludeTax==1?"不含税":"含税"}}</td>
            <td class="nameLabel" colspan="2">运费结算方式</td>
            <td colspan="2">
              <el-select  size="mini" v-model="shipData.ClearingStr" placeholder="请选择">
                <el-option label="现金" value="现金"></el-option>
                <el-option label="电汇" value="电汇"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel detailLabel">特约事项和违约责任</td>
            <td colspan="7">
              <div class="detail" contenteditable="true"  ref="shipDetail">
                <div>1、本合同为单航次运输合同。合同签订后，承租人当天付定金xx万元（出租人收到定金合同生效），滞期费与运费余款应在船抵达卸货港卸货前付清。若船货落空，各赔偿总运费的30%（不可抗力因素除外）。承租人未按期支付相关费用，出租人有权不靠泊卸货以及有权对承租人所托运的货物进行变卖，以冲抵运费和其他出租人的合理费用，由此引起的船舶滞期和货物损失及造成对第三方的侵权责任，均由承租人负责，并按所欠费用金额每日5‰计算滞纳金。</div>
                <div>2、承租人应负责装卸两港的集疏港工作，若船在装货港锚地后48小时内还没有装货计划，承租人必须在当天开始一天一付合同所定滞期费作为滞期保证金，否则出租人有权没收定金并视为货物落空。</div>
                <div>3、船舶装卸时间自船舶抵达装卸货港锚地后起算至装卸货完毕时止，装卸时间两港合并计算使用，因港口封航等恶劣天气影响以及其他不可抗力导致不能正常作业的承租人和出租人各承担一半。装卸时间超过约定装卸期限即视为滞期，一旦滞期，永远滞期。装卸时间以航海日志为准。</div>
                <div>4、货物实行封舱交接，货损货差与船方无关。装货前承租人如需对船舱是否适载进行验舱，必须在船舶靠泊后立即进行验舱，一旦开始装货即视为船舶适载。</div>
                <div>5、因天气原因、机械故障和人力不可抗力因素及上一港卸货延误造成船舶未按规定日期抵港，船期顺延。</div>
                <div>6、航线原则上不得更改，如承租人临时要求更改航线或增加多港装、卸货时，必须经出租人重新签约书面认定，否则视承租人违约。承租人应在装卸两港各安排一个安全泊位进行装、卸货，中途不移泊，若需移泊事先应征得出租人同意，移泊所需拖轮与引水费及因此发生的一切相关费用均由承租人负担。</div>
                <div>7、运费结算最低起算吨按xx吨计算，如实际装货数量超过约定数量，则按实际数量计算。如因船方原因装货不足约定数量，则按实际数量计算。</div>
                <div>8、货物数量和质量由发货方自行负责。装卸两港费用双方各负其责。港建费由承租人承担。承租方货物、出租方船舶双方各自办理保险手续，责任自负。</div>
                <div>9、合同执行过程中如发生纠纷，本着友好原则协商解决，若协商不成由海口海事法院裁决。</div>
                <div>10、本合同经双方盖章、出租人收到定金起生效（传真件具有相同法律效力），手改无效。该航次货物交接完毕运费及其他费用结算清楚后，该航次合同自然终止。</div>
              </div>
            </td>
          </tr>
        </table>
        <table class="sealLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td>
              <div class="seal">承租人签章：</div>
              <div class="textRight">
                <el-date-picker value-format="yyyy-MM-dd" size="mini" :clearable="false" v-model="shipData.A_SignatureDate" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </td>
            <td>
              <div class="seal">出租人签章：</div>
              <div class="textRight">
                <el-date-picker value-format="yyyy-MM-dd" size="mini" :clearable="false" v-model="shipData.B_SignatureDate" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../assets/common.js"
export default {
  name: 'createNewOrder',
  data () {
    return {
      queryCompanyList:[],
      queryShipList:[],
      queryPortList:[],
      selectLoading:false,
      goodsData:{
        "OrderId": "",
        "A_Name": "",
        "A_Fax": "",
        "A_UserName": "",
        "A_Bank": "",
        "A_Account": "",
        "B_Name": "",
        "B_Fax": "",
        "B_UserName": "",
        "B_Bank": "",
        "B_Account": "",
        "ShipName": "",
        "LoadTon": "",
        "ShipLength": "",
        "ShipWith": "",
        "Tonnage": "",
        "Net_ton": "",
        "Hatch_Num": "",
        "Load_Draught": "",
        "Contract_Num": "",
        "GoodsName": "",
        "PackStyle": "",
        "StartPortName": "",
        "EndPortName": "",
        "LoadDate": "",
        "LoadDate_OffSet": "",
        "DateOfShipment": "",
        "Demurrage": "",
        "Demurrage_Unit": 1,
        "To_limit": "",
        "Discharging": "",
        "Fare": "",
        "Fare_Unit": 1,
        "FareStr": "",
        "IsIncludeTax": 1,
        "ClearingStr": "",
        "Down_Palyment": "",
        "LowestLon": "",
        "ConTractDetail": "",
        "A_SignatureDate": "",
        "B_SignatureDate": "",
        "Hyewu": "",
        "HyewuId": ""
      },
      shipData:{
        "OrderId": "",
        "A_Name": "",
        "A_Fax": "",
        "A_UserName": "",
        "A_Bank": "",
        "A_Account": "",
        "B_Name": "",
        "B_Fax": "",
        "B_UserName": "",
        "B_Bank": "",
        "B_Account": "",
        "ShipName": "",
        "LoadTon": "",
        "ShipLength": "",
        "ShipWith": "",
        "Tonnage": "",
        "Net_ton": "",
        "Hatch_Num": "",
        "Load_Draught": "",
        "Contract_Num": "",
        "GoodsName": "",
        "PackStyle": "",
        "StartPortName": "",
        "EndPortName": "",
        "LoadDate": "",
        "LoadDate_OffSet": "",
        "DateOfShipment": "",
        "Demurrage": "",
        "Demurrage_Unit": 1,
        "To_limit": "",
        "Discharging": "",
        "Fare": "",
        "Fare_Unit": 1,
        "FareStr": "",
        "IsIncludeTax": 1,
        "ClearingStr": "",
        "Down_Palyment": "",
        "LowestLon": "",
        "ConTractDetail": "",
        "A_SignatureDate": "",
        "B_SignatureDate": "",
        "Cyewu": "",
        "CyewuId": ""
      },
      test:"",
      same:{
        loadDateLimit:""
      },
      operatorList:[]
    }
  },
  watch: {
    "goodsData.Fare": function (newVal, oldVal) {
      this.goodsData.FareStr = common.moneyBig(newVal);
    },
    "shipData.Fare": function (newVal, oldVal) {
      this.shipData.FareStr = common.moneyBig(newVal);
    }
  },
  created(){
    if (this.$route.params.id) {
      this.$store.tabs.commit('assignNewTab', {
        path:this.$route.path,
        name:"编辑订单",
        isActive:true
      });
    }else{
      this.$store.tabs.commit('assignNewTab', {
        path:this.$route.path,
        name:"新建订单",
        isActive:true
      });
    }
    this.getOperatorList();
  },
  methods:{
    getOperatorList(){
      this.$axios({
        method: 'post',
        url: this.$store.commonData.state.url+'Business/QueryStaff',
        
      }).then((response)=>{
        if (response.data.RetCode==0) {
          this.operatorList=response.data.RetData;
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
    },
    queryCompanyFullName(query){
      if (query !== '') {
        this.selectLoading = true;
        this.$axios.post(this.$store.commonData.state.url+"Business/MapCompanyName",
        {KeyWord:query}
        ).then( (response)=>{
          this.selectLoading = false;
          if (response.data.RetCode==0) {
            this.queryCompanyList=[];
            response.data.RetData.forEach((item,index)=>{
              item.index=index;
              this.queryCompanyList.push(item);
            })
          }else{
            this.$message({
              message: response.data.RetMsg,
              type: 'error'
            });
          }
        })
      }
    },
    queryShipFullName(query){
      if (query !== '') {
        this.selectLoading = true;
        this.$axios.post(this.$store.commonData.state.url+"Business/MapShipName",
          {KeyWord:query}
        ).then( (response)=>{
          this.selectLoading = false;
          if (response.data.RetCode==0) {
            this.queryShipList=[];
            response.data.RetData.forEach((item,index)=>{
              item.index=index;
              this.queryShipList.push(item);
            })
          }else{
            this.$message({
              message: response.data.RetMsg,
              type: 'error'
            });
          }
        })
      }
    },
    queryPortFullName(query){
      if (query !== '') {
        this.selectLoading = true;
        this.$axios.post(this.$store.commonData.state.url+"Business/MapPortName",
          {PortName:query}
        ).then( (response)=>{
          this.selectLoading = false;
          if (response.data.RetCode==0) {
            this.queryPortList=response.data.RetData;
          }else{
            this.$message({
              message: response.data.RetMsg,
              type: 'error'
            });
          }
        })
      }
    },
    completeGoodsShipInfo(item){
      this.goodsData.ShipName=item.cnShipName;
      this.goodsData.LoadTon=item.loadTon;
      this.goodsData.ShipLength=item.shipLong;
      this.goodsData.ShipWith=item.shipWidth;
      this.goodsData.Tonnage=item.totalTon;
      this.goodsData.Net_ton=item.emptyTon;
      this.goodsData.Hatch_Num=item.hatchNum;
      this.goodsData.Load_Draught=item.loadDraft;
    },
    completeShipShipInfo(item){
      this.shipData.ShipName=item.cnShipName;
      this.shipData.LoadTon=item.loadTon;
      this.shipData.ShipLength=item.shipLong;
      this.shipData.ShipWith=item.shipWidth;
      this.shipData.Tonnage=item.totalTon;
      this.shipData.Net_ton=item.emptyTon;
      this.shipData.Hatch_Num=item.hatchNum;
      this.shipData.Load_Draught=item.loadDraft;
    },
    completeGoodsACompanyInfo(item){
      this.goodsData.A_Name=item.CompanyName;
      this.goodsData.A_Fax=item.Fax;
      this.goodsData.A_UserName=item.HuMing;
      this.goodsData.A_Account=item.KaHao;
      this.goodsData.A_Bank=item.KaiHuHang;
    },
    completeGoodsBCompanyInfo(item){
      this.goodsData.B_Name=item.CompanyName;
      this.goodsData.B_Fax=item.Fax;
      this.goodsData.B_UserName=item.HuMing;
      this.goodsData.B_Account=item.KaHao;
      this.goodsData.B_Bank=item.KaiHuHang;
    },
    completeShipACompanyInfo(item){
      this.shipData.A_Name=item.CompanyName;
      this.shipData.A_Fax=item.Fax;
      this.shipData.A_UserName=item.HuMing;
      this.shipData.A_Account=item.KaHao;
      this.shipData.A_Bank=item.KaiHuHang;
    },
    completeShipBCompanyInfo(item){
      this.shipData.B_Name=item.CompanyName;
      this.shipData.B_Fax=item.Fax;
      this.shipData.B_UserName=item.HuMing;
      this.shipData.B_Account=item.KaHao;
      this.shipData.B_Bank=item.KaiHuHang;
    },
    completeGoodsYewu(item){
      this.goodsData.Hyewu=item.UserName;
      this.goodsData.HyewuId=item.Id;
    },
    completeShipYewu(item){
      this.shipData.Cyewu=item.UserName;
      this.shipData.CyewuId=item.Id;
    },
    makeShipGoodsTheSame(type){
      let to="",from="";
      if (type=="GoodsToShip") {
        to="shipData";
        from="goodsData";
      }else{
        to="goodsData";
        from="shipData";
      }
      this[to].OrderId=this[from].OrderId;
      this[to].A_Name=this[from].B_Name;
      this[to].B_Name=this[from].A_Name;
      this[to].A_Fax=this[from].B_Fax;
      this[to].B_Fax=this[from].A_Fax;
      this[to].A_UserName=this[from].B_UserName;
      this[to].B_UserName=this[from].A_UserName;
      this[to].A_Bank=this[from].B_Bank;
      this[to].B_Bank=this[from].A_Bank;
      this[to].A_Account=this[from].B_Account;
      this[to].B_Account=this[from].A_Account;
      this[to].ShipName=this[from].ShipName;
      this[to].ShipLength=this[from].ShipLength;
      this[to].ShipWith=this[from].ShipWith;
      this[to].Tonnage=this[from].Tonnage;
      this[to].LoadTon=this[from].LoadTon;
      this[to].Net_ton=this[from].Net_ton;
      this[to].Hatch_Num=this[from].Hatch_Num;
      this[to].Load_Draught=this[from].Load_Draught;
      this[to].Contract_Num=this[from].Contract_Num;
      this[to].GoodsName=this[from].GoodsName;
      this[to].PackStyle=this[from].PackStyle;
      this[to].StartPortName=this[from].StartPortName;
      this[to].EndPortName=this[from].EndPortName;
      this[to].LoadDate=this[from].LoadDate;
      this[to].LoadDate_OffSet=this[from].LoadDate_OffSet;
      this[to].To_limit=this[from].To_limit;
    },
    saveContract(){
      this.goodsData.ConTractDetail=this.$refs.goodsDetail.innerHTML.replace(/<div data-\S*">/g,"<div>");
      this.shipData.ConTractDetail=this.$refs.shipDetail.innerHTML.replace(/<div data-\S*">/g,"<div>");
      this.$axios({
        method: 'post',
        data:{
          ShipParms:this.shipData,
          GoodsParms:this.goodsData
        },
        url: this.$store.commonData.state.url+'Business/CreateContract',
        
      }).then((response)=>{
        if (response.data.RetCode==0) {
          common.openNewPage(this,"/main/orderManage/vipOrderList")
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      });
    },
    underLine(){
      console.log(2)
      document.execCommand('underline', false, null);
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.flex{
  align-items:center;
}
.borderBottomNone{
  border-bottom:none;
}

input{
  outline: none;
  border:none;
}
.el-select-dropdown__item{
  height: auto;
  .subInfo{
    font-size:12px;
    line-height: 12px;
  }
}

.contracts{
  font-size: 13px;
  overflow-x: auto;
  white-space: nowrap;
}
.goodsContract{
  width: 660px;
  display: inline-block;
  white-space: normal;
  margin-right:25px;
  .nameLabel{
    background: #CFE2EB;
  }
}
.shipContract{
  display: inline-block;
  width: 660px;
  white-space: normal;
  .nameLabel{
    background: #F3E3CC;
  }
  .titleLine{
    background:#FDE8CB;
  }
}
.table{
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
.titleLine{
  width: 100%;
  background:#D2EAF5;
  border:1px solid black;
  border-bottom:none;
  border-collapse: collapse;
  .title{
    font-size: 32px;
    width: 50%;
    padding-left: 20px;
  }
  .placeholder{
    height: 25px;
  }
  .note{
    background:white;
    border-left:1px solid black;
    border-top:1px solid black;
    border-bottom:1px solid black;
    padding:5px 10px;
  }
}
.companyLine{
  .table;
  .col2{
    width: 90px;
  }
  .tdInput{
    width: 50px;
  }
  input{
    flex:1;
    padding:2px 0;
    box-sizing:border-box;
  }
  .leftLine{
    width: 26px;
    padding:3px;
    box-sizing: border-box;
  }
}
.shipLine{
  .table;
  .col1{
    width: 116px;
  }
  .col2{
    width: 158px;
  }
  .col3{
    width: 78px;
  }
  .col4{
    width: 90px;
  }
  input{
    flex:1;
    width: 50px;
    padding:2px 0;
    box-sizing:border-box;
  }
}
.otherInfoLine{
  .table;
  .col1{
    width: 50px;
  }
  .col2{
    width: 120px;
  }
  .col4{
    width: 121px;
  }
  .col3,.col5,.col7{
    width: 60px;
  }
  .col8{
    width: 121px;
  }
  .detailLabel{
    padding:13px;
    box-sizing:border-box;
  }
  .loadDateLimit{
    width: 75px;
  }
  input{
    flex:1;
    width: 50px;
    height: 100%;
    padding:2px 0;
    box-sizing:border-box;
  }
  .smallNum{
    width: 20px;
  }
  .midNum{
    width: 35px;
  }
  .demurrage{
    width: 80px;
  }
  .fare{
    width: 40px;
    /deep/ .el-input__suffix-inner{
      display: none;
    }
  }
  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0;
  }
  /deep/ .el-input__inner {
    padding:0 !important;
  }
  /deep/ .el-icon-date:before{
    content:none;
  }
  .detail{
    text-align: left;
    padding:10px;
  }
}
.sealLine{
  .table;
  border-top:none;
  td{
    padding:10px;
  }
  .seal{
    text-align: left;
    height: 30px;
    box-sizing:border-box;
  }
}
</style>
