<template>
  <div class="hello">
    <div class="contracts">
      <div class="goodsContract">
        <table class="titleLine" cellspacing="0" cellpadding="0" >
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
            <td rowspan="3" class="leftLine nameLabel borderBottomNone">承租人</td>
            <td class="nameLabel col2">全称</td>
            <td><div class="flex"><input type=""></div></td>
            <td rowspan="3" class="leftLine nameLabel borderBottomNone">出租人</td>
            <td class="nameLabel col2">全称</td>
            <td><div class="flex"><input type=""></div></td>
          </tr>
          <tr>
            <td class="nameLabel">传真</td>
            <td><div class="flex"><input type=""></div></td>
            <td class="nameLabel">传真</td>
            <td><div class="flex"><input type=""></div></td>
          </tr>
          <tr>
            <td class="nameLabel borderBottomNone">银行账号</td>
            <td class="borderBottomNone">
              <div class="flex">户名：<input class="tdInput" type=""></div>
              <div class="flex">开户行：<input class="tdInput" type=""></div>
              <div class="flex">账号：<input class="tdInput" type=""></div>
            </td>
            <td class="nameLabel borderBottomNone">银行账号</td>
            <td class="borderBottomNone">
              <div class="flex">户名：<input class="tdInput" type=""></div>
              <div class="flex">开户行：<input class="tdInput"  type=""></div>
              <div class="flex">账号：<input class="tdInput"  type=""></div>
            </td>
          </tr>
        </table>
        <table class="shipLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td class="nameLabel col1">船名</td>
            <td class="col2"><div class="flex"><input type=""></div></td>
            <td class="col3 nameLabel">载货吨</td>
            <td class="col4"><div class="flex"><input type=""></div></td>
            <td class="nameLabel col4">船长/船宽</td>
            <td><div class="flex"><input type="">/<input type=""></div></td>
          </tr>
           <tr>
            <td class="nameLabel col1">总吨/净吨</td>
            <td class="col2"><div class="flex"><input type=""></div></td>
            <td class="col3 nameLabel">舱口数</td>
            <td class="col4"><div class="flex"><input type=""></div></td>
            <td class="nameLabel col4">满载吃水</td>
            <td><div class="flex"><input type=""></div></td>
          </tr>
           <tr>
            <td class="nameLabel col1">合同号</td>
            <td class="col2"><div class="flex"><input type=""></div></td>
            <td class="col3 nameLabel">货名</td>
            <td class="col4"><div class="flex"><input type=""></div></td>
            <td class="nameLabel col4">包装</td>
            <td><div class="flex"><input type=""></div></td>
          </tr>
        </table>
        <table class="otherInfoLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td class="nameLabel col1">起运港</td>
            <td class="col2"></td>
            <td class="nameLabel col3">预计受载期限</td>
            <td class="col4">
              <el-date-picker class="loadDateLimit" size="mini" :clearable="false" v-model="same.loadDateLimit" type="date" placeholder="选择日期"></el-date-picker>
              ±<input class="smallNum" type="number" name="">天
            </td>
            <td class="nameLabel col5">装船期限</td>
            <td ><input class="midNum" type="number" name="">天</td>
            <td class="nameLabel col7">滞期费</td>
            <td class="col8 ">
              <input  class="midNum" type="number" name="">
              <el-select class="demurrage" size="mini" v-model="goodsData.demurrageUnit" placeholder="请选择">
                <el-option label="元/天" :value="0"></el-option>
                <el-option label="元/吨/天" :value="1"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel">到达港</td>
            <td></td>
            <td class="nameLabel">运到期限</td>
            <td></td>
            <td class="nameLabel">卸船期限</td>
            <td ><input class="midNum" type="number" name="">天</td>
            <td class="nameLabel">运价</td>
            <td class="col8 ">
              <input  class="midNum" type="number" name="">
              <el-select class="demurrage" size="mini" v-model="goodsData.freightRate" placeholder="请选择">
                <el-option label="元 含税" :value="0"></el-option>
                <el-option label="元/吨 含税" :value="1"></el-option>
                <el-option label="元 不含税" :value="2"></el-option>
                <el-option label="元/吨 不含税" :value="3"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel">运费</td>
            <td colspan="3"></td>
            <td class="nameLabel" colspan="2">运费结算方式</td>
            <td colspan="2">
              <el-select  size="mini" v-model="goodsData.freightRate" placeholder="请选择">
                <el-option label="现金" :value="0"></el-option>
                <el-option label="电汇" :value="1"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="nameLabel detailLabel">特约事项和违约责任</td>
            <td colspan="7">
              <div class="textRight"><button @click="underLine()">下划线</button></div>
              <div class="detail" contenteditable="true">
                <div>1、本合同为单航次运输合同。合同签订后，承租人当天付定金<u>   贰拾  </u>万元（出租人收到定金合同生效），滞期费与运费余款应在船抵达卸货港卸货前付清。若船货落空，各赔偿总运费的30%（不可抗力因素除外）。承租人未按期支付相关费用，出租人有权不靠泊卸货以及有权对承租人所托运的货物进行变卖，以冲抵运费和其他出租人的合理费用，由此引起的船舶滞期和货物损失及造成对第三方的侵权责任，均由承租人负责，并按所欠费用金额每日5‰计算滞纳金。</div>
                <div>2、承租人应负责装卸两港的集疏港工作，若船在装货港锚地后48小时内还没有装货计划，承租人必须在当天开始一天一付合同所定滞期费作为滞期保证金，否则出租人有权没收定金并视为货物落空。</div>
                <div>3、船舶装卸时间自船舶抵达装卸货港锚地后起算至装卸货完毕时止，装卸时间两港合并计算使用，因港口封航等恶劣天气影响以及其他不可抗力导致不能正常作业的承租人和出租人各承担一半。装卸时间超过约定装卸期限即视为滞期，一旦滞期，永远滞期。装卸时间以航海日志为准。</div>
                <div>4、货物实行封舱交接，货损货差与船方无关。装货前承租人如需对船舱是否适载进行验舱，必须在船舶靠泊后立即进行验舱，一旦开始装货即视为船舶适载。</div>
                <div>5、因天气原因、机械故障和人力不可抗力因素及上一港卸货延误造成船舶未按规定日期抵港，船期顺延。</div>
                <div>6、航线原则上不得更改，如承租人临时要求更改航线或增加多港装、卸货时，必须经出租人重新签约书面认定，否则视承租人违约。承租人应在装卸两港各安排一个安全泊位进行装、卸货，中途不移泊，若需移泊事先应征得出租人同意，移泊所需拖轮与引水费及因此发生的一切相关费用均由承租人负担。</div>
                <div>7、运费结算最低起算吨按<u>&nbsp&nbsp</u>吨计算，如实际装货数量超过约定数量，则按实际数量计算。如因船方原因装货不足约定数量，则按实际数量计算。</div>
                <div>8、货物数量和质量由发货方自行负责。装卸两港费用双方各负其责。港建费由承租人承担。承租方货物、出租方船舶双方各自办理保险手续，责任自负。</div>
                <div>9、合同执行过程中如发生纠纷，本着友好原则协商解决，若协商不成由海口海事法院裁决。</div>
                <div>10、本合同经双方盖章、出租人收到定金起生效（传真件具有相同法律效力），手改无效。该航次货物交接完毕运费及其他费用结算清楚后，该航次合同自然终止。 </div>
              </div>
            </td>
          </tr>
        </table>
        <table class="sealLine" cellspacing="0" cellpadding="0"  border="1">
          <tr>
            <td>
              <div class="seal">承租人签章：</div>
              <div class="textRight">2017年9月14日</div>
            </td>
            <td>
              <div class="seal">出租人签章：</div>
              <div class="textRight">2017年9月14日</div>
            </td>
          </tr>
        </table>
      </div>
      <div class="shipContract"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      goodsData:{
        demurrageUnit:0,
        freightRate:0,
      },
      same:{
        loadDateLimit:""
      }
    }
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"新建订单",
      isActive:true
    });
  },
  methods:{
    underLine(){
      console.log(2)
      document.execCommand('underline', false, null);
    }
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
.contracts{
  font-size: 13px;
}
.goodsContract{
  width: 660px;
  .nameLabel{
    background: #CFE2EB;
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
