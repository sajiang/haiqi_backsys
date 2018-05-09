import Vue from 'vue';
import Vuex from 'vuex';
import router from "../router"

Vue.use(Vuex)

const tabs = new Vuex.Store({
    state:{
    	tabs:[
		    /*{
		    	path:"/main/archives/searchArchives",
		    	name:"档案搜索"
		    }*/
		],
		newTab:{
			path:"",
		    name:""
		}
    },
    mutations: {
	  assignNewTab (state, tabObj) {
	    state.newTab = tabObj;
	    let isHasOpened=false;
		for(let i=0;i<state.tabs.length;i++){
			state.tabs[i].isActive=false;
			if (state.tabs[i].path==state.newTab.path) {
				state.tabs[i].isActive=true;
				//可能存在更新名字的情况
				state.tabs[i].name=state.newTab.name;
				isHasOpened=true;
			}
		}
		if (isHasOpened) {
			return;
		}else{
			if (state.newTab.path&&state.newTab.name) {
				state.tabs.push(state.newTab);
			}
		}
	  },
	  removeTab(state,tabObj){
	  	//只剩一个还要关闭的话就跳到桌面
	  	if (state.tabs.length==1) {
	  		if (!(router.currentRoute.fullPath=="/main/welcome")) {
		  		state.tabs=[];
		  		router.push({ path: "/main/welcome" });
	  		}
	  	}
	  	else{
	  		for(let i=0;i<state.tabs.length;i++){
				if (state.tabs[i].path==tabObj.path) {
					let delItem=state.tabs.splice(i,1);
					if (delItem[0].isActive) {
						router.push({ path: state.tabs[0].path });
					}
				}
			}
	  	}
	  	
	  }
	}
});
const commonData=new Vuex.Store({
    state:{
    	token:"",
    	url:"http://192.168.0.230:99/api/",
    	authPathArr:[],
    },
    mutations: {
	  updateToken(state,newToken){
	  	state.token = newToken;
	  },
	  updateAuthPathArr(state,pathArr){
	  	state.authPathArr=pathArr;
	  }
	}
})
export default {
	tabs,
	commonData
}