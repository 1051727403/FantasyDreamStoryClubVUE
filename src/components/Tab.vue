<template>
<div>
  <!--页签-->
  <el-breadcrumb separator-class="el-icon-arrow-right" >
    <el-breadcrumb-item :to="{ path: '/Manage/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-show="!check(plate)">{{ plate }}</el-breadcrumb-item>
    <el-breadcrumb-item v-show="!check(func)">{{ func }}</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
export default {
  name: "tab",
  props:{
    plate:String,
    func:String
  },
  methods: {
    check(x) {
      if (x === undefined || x === '' || x === null) return true;
      return false;
    }
  }
}
</script>

<style scoped>

</style>
