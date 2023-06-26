<template>
  <div>
    <el-container style="min-height: 100vh">
        <el-header style="border-bottom: 1px solid #eee;height: 50px">
          <Header :collapseBthClass="collapseBthClass" :collapse="collapse"/>
        </el-header>
        <el-main style="padding: 0">
          <router-view/>
        </el-main>
    </el-container>
  </div>

</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "AppHome",
  data(){
    return {
      plate: "",
      func: "",
      collapseBthClass:'el-icon-s-fold',
      isCollapse:false
    }
  },
  components:{
    Header,
  },
  methods:{
    collapse(){
      this.isCollapse=!this.isCollapse;
      this.sideWidth=(this.isCollapse?'64':'200');
      this.collapseBthClass=(this.isCollapse?'el-icon-s-unfold':'el-icon-s-fold')
    },
  }
}
</script>

<style scoped>

</style>