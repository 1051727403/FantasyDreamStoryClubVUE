<template>
  <div>
    <el-container style="min-height: 100vh">
      <el-aside width="sideWidth+'px'" style="height: 677px">
        <Aside />
      </el-aside>
      <el-main style="padding: 0">
        用户信息
      </el-main>
    </el-container>
  </div>


</template>

<script>
import Aside from "@/components/Aside.vue";
export default {
  name: "PersonalSpace.vue",
  created() {

  },
  components:{
    Aside
  },

  data(){
    return {
      plate: "",
      func: "",
      isCollapse:false,
      sideWidth:'200',
    }
  }
}
</script>

<style scoped>

</style>
