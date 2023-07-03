<template>
  <div id="app">
<!--    <DataSearch/>-->
      <!--  通过key设置页面刷新 规矩
          $route.fullPath 得到路由(包含带?的参数)
      :key="$route.fullPath" 如果路由改变就刷新
               -->
      <!--            <router-view :key="$route.fullPath"></router-view>-->
      <router-view ></router-view>
  </div>
</template>


<style>
</style>