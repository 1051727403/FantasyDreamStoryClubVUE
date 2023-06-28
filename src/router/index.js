import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Management/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect:"/APP/Index",
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/Login.vue')
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import('../views/Register.vue')
  },
    //APP页面
  {
    path:'/App',name:'App',component:()=>import('../views/APP/AppHome.vue'),
    redirect: '/home',
    children:[
      {
        path:'Index',
        name:'home',
        component:()=>import('../views/APP/Index/Index.vue'),
        meta: { requiresAuth: false } // 设置需要认证的权限为 false,即无需登录即可访问
      },
      {
        path:'PersonalSpace',
        name:'usercenter',
        component:()=>import('../views/APP/PersonalSpace/PersonalSpace.vue'),
        redirect: '/App/PersonalSpace/PersonalInfo',
        children:[
          {
            path:'PersonalInfo',
            name:'userinfo',
            component:()=>import('../views/APP/PersonalSpace/PersonalInfo.vue'),
          },
          {
            path:'MyCollection',
            name:'usercollection',
            component:()=>import('../views/APP/PersonalSpace/MyCollection.vue'),
          },
          {
            path:'NewStory',
            name:'userstory',
            component:()=>import('../views/APP/PersonalSpace/NewStory.vue'),
          },
          {
            path:'NewFragement',
            name:'userf',
            component:()=>import('../views/APP/PersonalSpace/NewFragement.vue'),
          },
          {
            path:'MyComment',
            name:'userc',
            component:()=>import('../views/APP/PersonalSpace/MyComment.vue'),
          },
        ]
      },
      {
        path:'StoryInfo',
        name:'AppStoryInfo',
        component:()=>import('../views/APP/StoryInfo/StoryInfo.vue'),
        meta: { requiresAuth: false } // 设置需要认证的权限为 false,即无需登录即可访问
      }
    ]
  },
  {
    path:'/App/StoryRelay',
    name:'AppStoryRelay',
    component:()=>import('../views/APP/StoryRelay/StoryRelay.vue'),
    meta: { requiresAuth: false } // 设置需要认证的权限为 false,即无需登录即可访问
  },
  {
    path:'/App/test',
    name:'Apptest',
    component:()=>import('../views/APP/StoryRelay/test.vue'),
    meta: { requiresAuth: false } // 设置需要认证的权限为 false,即无需登录即可访问
  },






    //后台管理页面


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
