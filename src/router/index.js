import Vue from 'vue'
import VueRouter from 'vue-router'
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
      },

      {
        path:'StoryInfo',
        name:'AppStoryInfo',
        component:()=>import('../views/APP/StoryInfo/StoryInfo.vue'),
      },
      {
        path:'Search',
        name:'Search',
        component:()=>import('../views/APP/Search/Search.vue'),
      },
      {
        path: 'UserShow',
        name: "ShowUser",
        component:()=>import("@/views/APP/PersonalSpace/ShowUser.vue"),
      }
    ]
  },
  {
    path:'/App/StoryRelay',
    name:'AppStoryRelay',
    component:()=>import('../views/APP/StoryRelay/StoryRelay.vue'),
  },
  {
    path:'/App/test',
    name:'Apptest',
    component:()=>import('../views/APP/StoryRelay/test.vue'),
  },
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
          {
            path: '/PersonalSpace/myFragment',
            name:'我的片段',
            component:()=>import('../views/APP/PersonalSpace/MyFragment.vue')
          }
        ]
      }
    ]
  },

  //后台管理页面
  {
    path: "/Manage",name:"管理端",component:()=>import('../views/Management/ManageHome.vue'),
    redirect: '/home',
    children:[
      {
        path:'Index',
        name:'主页',
        component:()=>import('../views/Management/Index/Index.vue'),
      }, {
        path:'User',
        name:'用户管理',
        component:()=>import('../views/Management/UserManagement/User.vue'),
      },
      {
        path:'Comment',
        name:'评论管理',
        component:()=>import('../views/Management/CommentManagement/Comment.vue'),
      },
      {
        path:'Story',
        name:'故事管理',
        component:()=>import('../views/Management/StoryAndFragmentManagement/Story.vue'),
      },
      {
        path:'Fragment',
        name:'片段管理',
        component:()=>import('../views/Management/StoryAndFragmentManagement/Fragment.vue'),
      },
      {
        path:'Announcement',
        name:'公告管理',
        component:()=>import('../views/Management/AnnouncementManagement/Announcement.vue'),
      },
      {
        path:'Activity',
        name:'活动管理',
        component:()=>import('../views/Management/AnnouncementManagement/Activity.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // 恢复之前的滚动位置
    } else {
      return { x: 0, y: 0 }; // 设置滚动条位置为顶部
    }
  },
})
export default router
