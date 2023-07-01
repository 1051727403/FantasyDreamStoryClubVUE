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
        path:'StoryInfo',
        name:'AppStoryInfo',
        component:()=>import('../views/APP/StoryInfo/StoryInfo.vue'),
        meta: { requiresAuth: false } // 设置需要认证的权限为 false,即无需登录即可访问
      },
      {
        path:'Search',
        name:'Search',
        component:()=>import('../views/APP/Search/Search.vue'),
        meta: { requiresAuth: false } // 设置需要认证的权限为 false,即无需登录即可访问
      },
      {
        path: 'UserShow',
        name: "ShowUser",
        component:()=>import("@/views/APP/PersonalSpace/ShowUser.vue"),
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
  {
    path:'/PersonalSpace',
    component:()=>import('../views/APP/AppHome.vue'),
    redirect:'/PersonalSpace/myCollect',
    children:[{
        path: 'myCollect',
        name:'个人中心',
        component:()=>import('../views/APP/PersonalSpace/PersonalCenter.vue'),
        redirect:'/PersonalSpace/myCollect',
        children:[
          {
            path:'/PersonalSpace/myCollect',
            name: '我的收藏',
            component:()=>import('../views/APP/PersonalSpace/MyCollect.vue')
          },
          {
            path:'/PersonalSpace/myStory',
            name: '我的故事',
            component:()=>import('../views/APP/PersonalSpace/MyStory.vue')
          },
        ]
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
