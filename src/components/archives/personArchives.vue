<template>
<div id="companyArchives" class="wraper">
    <div class="clearfix grey8C">
      <span>首页>海南和宇运贸有限公司>小张</span>
      <s-reload-btn class="fr"></s-reload-btn>
    </div>
    <div class="clearfix mgt20">
      <span>
        <span>编号：</span>
        <span>P2018032801</span>
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
        <span>用户个人资料</span>
        <i class="fr mgr10 fa fa-edit"></i>
        <i class="fr mgr10 fa fa-save"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>姓名</th>
          <th>昵称</th>
          <th>个人认证</th>
          <th>绑定电话</th>
          <th>联系电话</th>
          <th>传真</th>
          <th>中文拼音</th>
          <th>性别</th>
          <th>生日</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td>小张</td>
            <td>fsaf</td>
            <td class="green">已认证<i class="fr el-icon-success"></i></td>
            <td>15917626952</td>
            <td>15917626952</td>
            <td>0898-666666</td>
            <td>xiaozhang</td>
            <td>男</td>
            <td>1988-05-08</td>
          </tr>
        </tbody>
        <thead>
          <th colspan="2">邮箱</th>
          <th colspan="2">身份证</th>
          <th colspan="2">身份证地址</th>
        </thead>
        <tbody >
          <tr class="bold">
            <td colspan="2">123456@qq.com</td>
            <td colspan="2">4008285555555555555</td>
            <td colspan="2">海南省海口市龙华区…………</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="center mgt20">
      <div class="cardPanel">
        <div class="header">订单成交记录</div>
        <div class="content">10</div>
      </div>
      <div class="cardPanel" @click="toPersonReturnVisit">
        <div class="header">客户回访记录</div>
        <div class="content">15</div>
      </div>
      <div class="cardPanel" @click="toPersonGoodsAndShipRecord">
        <div class="header">船期/货盘记录</div>
        <div class="content">105/35</div>
      </div>
      <div class="cardPanel" @click="toPersonFollowGoodser">
        <div class="header">关注/被关注</div>
        <div class="content">105/35</div>
      </div>
      <div class="cardPanel" @click="toPersonFollowShip">
        <div class="header">船队</div>
        <div class="content">12</div>
      </div>
    </div>
    <div class="bankInfo mgt20 mgb20">
      <div class="tableName">
        <span>银行账户</span>
        <i class="fr mgr10 fa fa-plus"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead  class="grey8C">
          <th>户名</th>
          <th>银行账号</th>
          <th>开户行</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold">
            <td>张XX</td>
            <td>623456136315464321</td>
            <td>建设银行海南省海口市金贸支行</td>
            <td>
              <i class="mgr10 fr fa fa-save"></i>
              <i class="mgr10 fr fa fa-edit"></i>
              <i class="mgr10 fa fa-trash-o"></i>
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
        <i class="fr mgr10 fa fa-plus"></i>
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
          <tr class="bold" @click="toShipArchives">
            <td>海旗</td>
            <td>16500</td>
            <td>147/21</td>
            <td>8.0</td>
            <td>货船</td>
            <td class="green">已认证<i class="fr el-icon-success"></i></td>
            <td>
              <span>船东</span>
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
  name: 'companyArchives',
  components: {
    's-reload-btn': reloadBtn,
  },
  created(){
  },
  activated(){
    this.$store.tabs.commit('assignNewTab', {
      path:this.$route.path,
      name:"小张",
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
</style>
