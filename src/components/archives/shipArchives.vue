<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      <span>首页>海南和宇运贸有限公司>海旗</span>
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="clearfix mgt20">
      <span>
        <span>编号：</span>
        <span>S2018032801</span>
        <span class="mgl20">建档时间</span>
        <span>2018.03.28 10:55</span>
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
        <span>船舶档案基本信息</span>
        <i class="fr mgr10 fa fa-edit"></i>
        <i class="fr mgr10 fa fa-save"></i>
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
            <td>海旗</td>
            <td class="green">已认证<i class="fr el-icon-success"></i></td>
            <td>haiqi</td>
            <td>2007</td>
            <td>洋浦</td>
            <td>货船</td>
            <td>BFDP</td>
            <td>414042000</td>
            <td>147/21</td>
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
            <td>19.7</td>
            <td>7020</td>
            <td>2</td>
            <td>16017</td>
            <td>10214</td>
            <td>5719</td>
            <td>5.5</td>
            <td>3.2</td>
            <td>12节</td>
          </tr>
        </tbody>
        <thead>
          <th colspan="3">适载流向</th>
          <th colspan="3">适载货物</th>
          <th colspan="3">加油地点</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td colspan="3">南进江、沿海-不限</td>
            <td colspan="3">钢材、煤炭、纸浆、石灰石、PTA</td>
            <td colspan="3">舟山;石岛</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="center mgt20">
      <div class="cardPanel" @click="toShipHistoryTrack">
        <div class="header">航次记录</div>
        <div class="content">325</div>
      </div>
      <div class="cardPanel" @click="toShipSubscriber">
        <div class="header">被订阅</div>
        <div class="content">325</div>
      </div>
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
    <div class="relatedPerson mgt20">
      <div class="tableName">
        <span>关联人员</span>
        <i class="fr mgr10 fa fa-plus"></i>
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
          <tr class="bold" @click="toPersonArchives">
            <td>小张</td>
            <td>18308949061</td>
            <td>业务经理</td>
            <td>煤炭、码头协调</td>
            <td class="green">已认证<i class="fr el-icon-success"></i></td>
            <td>
              <span>定船</span>
              <i class="mgr10 fr fa fa-save"></i>
              <i class="mgr10 fr fa fa-edit"></i>
            </td>
            <td class="center"><i class="mgr10 fa fa-trash-o"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'shipArchives',
  components: {
    's-reload-btn': reloadBtn,
  },
  created(){
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"海旗1",
      isActive:true
    })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    toPersonArchives(){
      let personId=456;
      this.$router.push({ path: `/main/archives/personArchives/${personId}` })
    },
    toShipHistoryTrack(){
      let shipId=8033;
      this.$router.push({ path: `/main/archives/shipRelated/historyTrack/${shipId}` })
    },
    toShipSubscriber(){
      let shipId=8033;
      this.$router.push({ path: `/main/archives/shipRelated/subscriber/${shipId}` })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
