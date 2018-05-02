import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import unfined from '@/components/unfined'
import desktop from '@/components/desktop'
import main from '@/components/main'
import login from '@/components/login/login'
import searchArchives from '@/components/archives/searchArchives'
import companyArchives from '@/components/archives/companyArchives'
import shipArchives from '@/components/archives/shipArchives'
import personArchives from '@/components/archives/personArchives'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {  
      path: '/login',
      name: 'login',
      component:login
    },
    
  ]
})