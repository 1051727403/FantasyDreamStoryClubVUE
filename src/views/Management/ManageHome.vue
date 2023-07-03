<template>
  <div>
    <el-container style="min-height: 100vh">
      <el-aside width="sideWidth+'px'" style="background-color: rgb(10,16,26);min-height: 100%;box-shadow: 2px 0 6px rgb(0 21 41/35%);">
        <Aside :isCollapse='isCollapse' :sideWidth="sideWidth"/>
      </el-aside>
      <el-container>
        <el-header style="border-bottom: 1px solid #eee;height: 50px;padding: 0">
          <ManageMentHeader />
        </el-header>
        <el-main style="padding: 0">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import ManageMentHeader from "@/components/ManageMentHeader.vue";
export default {
  name: "Home.vue",
  components:{
    Aside,
    ManageMentHeader,
  },
  created() {
    this.$emit("generateTab",this.plate,this.func)
  },
  data(){
    return {
      plate: "",
      func: "",
      isCollapse:false,
      sideWidth:"200px"
    }
  }
}
</script>

<style scoped>

</style>
