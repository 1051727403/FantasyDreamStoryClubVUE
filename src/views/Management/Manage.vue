<template>
    <el-container style="min-height: 100vh;">

      <el-aside width="sideWidth+'px'" style="background-color: rgb(238, 241, 246);min-height: 100%;box-shadow: 2px 0 6px rgb(0 21 41/35%);">
        <Aside :isCollapse="isCollapse" :sideWidth="sideWidth"/>
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px solid #ccc;">
          <Header :collapseBthClass="collapseBthClass" :collapse="collapse"/>
        </el-header>

        <el-main>
          <!--页签-->
          <Tab :plate="plate" :func="func"></Tab>
          <!--该页面的子路由会在router-view中展示 -->
          <router-view @generateTab="generateTab"/>
        </el-main>

      </el-container>
    </el-container>
</template>




<script>

// @ is an alias to /src
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Tab from "@/components/Tab";
export default {
  name: 'HomeView',
  data() {
    return {
      collapseBthClass:'el-icon-s-fold',
      isCollapse:false,           //true收缩，false不收缩
      sideWidth:'200',
      plate:"",
      func:""
    }
  },
  components: {
    Aside,
    Header,
    Tab
  },
  methods:{
    //封装请求数据方法
    //点击收缩按钮true收缩，false不收缩
    collapse(){
      this.isCollapse=!this.isCollapse;
      this.sideWidth=(this.isCollapse?'64':'200');
      this.collapseBthClass=(this.isCollapse?'el-icon-s-unfold':'el-icon-s-fold')
    },
    //生成页签
    generateTab(plate,func){
      console.log("generateTab触发")
      this.plate=plate
      this.func=func
    }
  }
}
</script>
