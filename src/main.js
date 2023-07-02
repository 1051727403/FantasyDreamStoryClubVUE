import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";
import Vue from 'vue';
import App from './App.vue';
import router from './router'; // 导入Vue Router实例

function isLoggedIn() {
  // 根据实际的身份验证逻辑，返回用户是否已经登录的布尔值
  // 例如，可以检查本地存储或会话存储中的令牌来判断用户是否已经登录
  // 返回 true 或 false


  return false;
}

router.beforeEach((to, from, next) => {
  // 在此处添加路由导航守卫逻辑
  const requiresAuth = to.meta.requiresAuth; // 获取路由的权限要求
  console.log("获取权限需求：",requiresAuth)
  if (requiresAuth && !isLoggedIn()) {
    // 如果需要认证且用户未登录，则重定向到登录页面
    next('/login');
    console.log("需要登录，重定向到登录页面")
  } else {
    // 其他情况，放行路由
    next();
    console.log("无需登录，直接放行")
  }
});
// 解决bug：页面/路由跳转后，滚动条消失，页面无法滚动
router.afterEach((to, from, next) => {
  document.querySelector("body").setAttribute("style", "overflow: auto !important;")
});
Vue.config.productionTip = false

Vue.use(ElementUI,{size:"small"});

Vue.prototype.request=request
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
