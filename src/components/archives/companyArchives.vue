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
        <i class="fr mgr10 fa fa-save" @click="saveBaseInfo"></i>
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
            <td :class="baseInfo.data.IsAuthentication?'green':''">{{baseInfo.data.IsAuthentication?"已认证":"未认证"}}<i v-if="baseInfo.data.IsAuthentication" class="fr el-icon-success"></i></td>
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
        <i class="fr mgr10 fa fa-plus"></i>
      </div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover" border="0" cellpadding="0" cellspacing="0">
        <thead>
          <th>户名</th>
          <th>银行账号</th>
          <th>开户行</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr class="bold">
            <td>王XX</td>
            <td>6234156215462135454</td>
            <td>建设银行海南省海口市金茂支行</td>
            <td>
              <i class="mgr10 fa fa-save"></i>
              <i class="mgr10 fa fa-edit"></i>
              <i class="mgr10 fa fa-trash-o"></i>
            </td>
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
  </div>
</template>

<script>
import reloadBtn from '@/components/common/reload-btn'
export default {
  name: 'companyArchives',
  components: {
    's-reload-btn': reloadBtn,
  },
  data () {
    return {
      baseInfo: {
        isEdit:false,
        edit:{
        },
        data:{
        }
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
    saveBaseInfo(){
      
    },
    toShipArchives(){
      let shipId=123;
      this.$router.push({ path: `/main/archives/shipArchives/${shipId}` })
    },
    toPersonArchives(){
      let personId=456;
      this.$router.push({ path: `/main/archives/personArchives/${personId}` })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
