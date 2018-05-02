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
  methods:{
  	addRoute(){
  		this.$router.addRoutes([{
	      path: '/main',
	      name:"desktop",
	      redirect: '/main/welcome',
	      component: main,
	      children: [
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
	          component: shipArchives
	        },
	        {
	          path: 'archives/personArchives/:personId',
	          component: personArchives
	        },
	        {
	          path: 'archives/shipRelated/historyTrack/:shipId',
	          component: resolve => require(['@/components/archives/shipRelated/historyTrack'], resolve)
	        },
	        {
	          path: 'archives/shipRelated/subscriber/:shipId',
	          component: resolve => require(['@/components/archives/shipRelated/subscriber'], resolve)
	        },
	        {
	          path: 'archives/personRelated/returnVisit/:personId',
	          component: resolve => require(['@/components/archives/personRelated/returnVisit'], resolve)
	        },
	        {
	          path: 'archives/personRelated/goodsAndShipRecord/:personId',
	          component: resolve => require(['@/components/archives/personRelated/goodsAndShipRecord'], resolve)
	        },
	        {
	          path: 'archives/personRelated/followGoodser/:personId',
	          component: resolve => require(['@/components/archives/personRelated/followGoodser'], resolve)
	        },
	        {
	          path: 'archives/personRelated/followShip/:personId',
	          component: resolve => require(['@/components/archives/personRelated/followShip'], resolve)
	        },
	        /*****档案管理结束*****/
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
	      ]
	    },
	    {
	      path: '*',
	      name: '404',
	      component: unfined
	    }])
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
