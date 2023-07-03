<template>
  <div>
    <el-container style="min-height: 100vh">
      <el-aside width="sideWidth+'px'" style="background-color: rgb(10,16,26);min-height: 100%;box-shadow: 2px 0 6px rgb(0 21 41/35%);">
        <Aside :isCollapse='isCollapse' :sideWidth="sideWidth"/>
      </el-aside>
      <el-main style="padding: 0">
        <router-view/>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";

export default {
  name: "Home.vue",
  components:{
    Aside,
  },
  created() {
    this.$emit("generateTab",this.plate,this.func)
  },
  data(){
    return {
      plate: "",
      func: "",
      collapseBthClass:'el-icon-s-fold',
      isCollapse:false,
      sideWidth:"200px"
    }
  }
}
</script>

<style scoped>

</style>
