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
    path:'/APP/Index',
    name:'Index',
    component:()=>import('../views/APP/Index/Index.vue'),
    meta: { requiresAuth: false } // 设置需要认证的权限为 false,即无需登录即可访问
  },
  {
    path:'/APP/StoryRelay',
    name:'StoryRelay',
    component:()=>import('../views/APP/StoryRelay/StoryRelay.vue'),
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
