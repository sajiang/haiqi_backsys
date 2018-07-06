<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import unfined from '@/components/unfined'
import desktop from '@/components/desktop'
import main from '@/components/main'
import login from '@/components/login/login'
import searchArchives from '@/components/archives/searchArchives'
import companyArchives from '@/components/archives/companyArchives'
import shipArchives from '@/components/archives/shipArchives'
import personArchives from '@/components/archives/personArchives'
export default {
  name: 'App',
  created:function(){
  	this.getKey()
  	this.addRoute();
  },
  computed: {
    token(){
      return this.$store.commonData.state.token;
    }
  },
  watch: {
      token(){
        this.addRoute();
      }
  },
  methods:{
  	addRoute(){
  		if (!sessionStorage.getItem("Token")) {return;}
  		let allRouterArr=
  		[
	      	{
				path: 'welcome',
				component: desktop,
	      	},
	        /*****档案管理开始*****/
	      	{
	          path: 'archives/searchArchives',
	          component: searchArchives
	        },
	        {
	          path: 'archives/createNewCompanyArchive',
	          component: resolve => require(['@/components/archives/createNewCompanyArchive'], resolve)
	        },
	        {
	          path: 'archives/createNewShipArchive',
	          component: resolve => require(['@/components/archives/createNewShipArchive'], resolve)
	        },
	        {
	          path: 'archives/createNewPersonArchive',
	          component: resolve => require(['@/components/archives/createNewPersonArchive'], resolve)
	        },
	        {
	          path: 'archives/companyArchives/:companyId',
	          component: companyArchives,
	          meta: { pageId: "companyArchives" }
	        },
	        {
	          path: 'archives/shipArchives/:shipId',
	          component: shipArchives,
	          meta: { pageId: "shipArchives" }
	        },
	        {
	          path: 'archives/personArchives/:personId',
	          component: personArchives,
	          meta: { pageId: "personArchives" }
	        },
	        {
	          path: 'archives/shipRelated/historyTrack/:shipName',
	          component: resolve => require(['@/components/archives/shipRelated/historyTrack'], resolve),
	          meta: { pageId: "historyTrack" }
	        },
	        {
	          path: 'archives/shipRelated/subscriber/:shipName',
	          component: resolve => require(['@/components/archives/shipRelated/subscriber'], resolve),
	          meta: { pageId: "subscriber" }
	        },
	        {
	          path: 'archives/personRelated/returnVisit/:personId',
	          component: resolve => require(['@/components/archives/personRelated/returnVisit'], resolve),
	           meta: { pageId: "returnVisit" }
	        },
	        {
	          path: 'archives/personRelated/goodsAndShipRecord/:personId',
	          component: resolve => require(['@/components/archives/personRelated/goodsAndShipRecord'], resolve),
	          meta: { pageId: "goodsAndShipRecord" }
	        },
	        {
	          path: 'archives/personRelated/followGoodser/:phoneNumber',
	          component: resolve => require(['@/components/archives/personRelated/followGoodser'], resolve),
	          meta: { pageId: "followGoodser" }
	        },
	        {
	          path: 'archives/personRelated/followShip/:phoneNumber',
	          component: resolve => require(['@/components/archives/personRelated/followShip'], resolve),
	          meta: { pageId: "followShip" }
	        },
	        /*****档案管理结束*****/
	        /*****订单管理开始*****/
	        {
	          path: 'insurance/goodsInsuranceList',
	          component: resolve => require(['@/components/insurance/goodsInsuranceList'], resolve)
	        },
	        {
	          path: 'insurance/createNewInsurance',
	          component: resolve => require(['@/components/insurance/createNewInsurance'], resolve)
	        },
	        {
	          path: 'insurance/statement',
	          component: resolve => require(['@/components/insurance/statement'], resolve)
	        },
	        {
	          path: 'insurance/goodsInsuranceDetail/:goodsInsuranceId',
	          component: resolve => require(['@/components/insurance/goodsInsuranceDetail'], resolve),
	          meta: { pageId: "goodsInsuranceDetail" }
	        },
	        /*****订单管理结束*****/
	        /*****用户权限管理开始*****/
	        {
	          path: 'userManage/personnelArchitecture',
	          component: resolve => require(['@/components/userManage/personnelArchitecture'], resolve)
	        },
	        {
	          path: 'userManage/authorizationConfiguration',
	          component: resolve => require(['@/components/userManage/authorizationConfiguration'], resolve)
	        },
	        /*****用户权限管理结束*****/
	        /*****个人设置开始*****/
	        {
	          path: 'personalSetting/modifyPassword',
	          component: resolve => require(['@/components/personalSetting/modifyPassword'], resolve)
	        },
	        /*****个人设置结束*****/
	        /*****栏目管理开始*****/
	        {
	          path: 'columnManage/columnManage',
	          component: resolve => require(['@/components/columnManage/columnManage'], resolve)
	        },
	        /*****栏目管理结束*****/
	        /*****广告配置开始*****/
	        {
	          path: 'adConfiguration/adConfiguration',
	          component: resolve => require(['@/components/adConfiguration/adConfiguration'], resolve)
	        },
	        {
	          path: 'adConfiguration/history/:columnId',
	          meta: { pageId: "adHistory" },
	          component: resolve => require(['@/components/adConfiguration/history'], resolve)
	        },
	        /*****广告配置结束*****/
	        /*****运价表开始*****/
	        {
	          path: 'freight/freight',
	          component: resolve => require(['@/components/freight/freight'], resolve)
	        },
	        {
	          path: 'freight/freightHistory/:TId',
	          meta: { pageId: "freightHistory" },
	          component: resolve => require(['@/components/freight/freightHistory'], resolve)
	        },
	        /*****运价表结束*****/
	    ];
  		this.$axios.get(this.$store.commonData.state.url+`Column/FindColumnsByToken?Token=${sessionStorage.getItem("Token")}`)
	      .then( (response)=>{
	        if (response.data.RetCode==0) {
				let routerObj=[];
				routerObj.push({
					path: '/main',
					name:"desktop",
					redirect: '/main/welcome',
					component: main,
					children: [{
						path: 'welcome',
						component: desktop,
			      	}]
				});
				routerObj.push({
					path: '*',
					name: '404',
					component: unfined
				});
				let pathArr=[];
				let retData=response.data.RetData.Children;
				for (let i = 0; i < retData.length; i++) {
					for(let j =0; j< retData[i].Children.length;j++){
						if (retData[i].Children[j].PageUrl.indexOf("main/")==0) {
							for(let k=0;k<allRouterArr.length;k++){
								if (retData[i].Children[j].PageUrl.substr(5)==allRouterArr[k].path) {
									routerObj[0].children.push(allRouterArr[k]);
									pathArr.push(retData[i].Children[j]);
								}
							}
						}
					}
				}
				this.$store.commonData.commit('updateAuthPathArr', pathArr);
				this.$router.addRoutes(routerObj);
				
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
  	getKey(){
  		if (sessionStorage.getItem("Token")&&sessionStorage.getItem("Token")!=undefined&&sessionStorage.getItem("Token")!="undefined") {
  			this.$axios.defaults.headers.common['Token'] = sessionStorage.getItem("Token");
  		}else{
  			this.$router.push({ path: "/login" })
  		}
  	}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
}
</style>
