<template>
  <div>这是管理评论</div>
</template>

<script>
export default {
  name: "Home.vue",
  created() {
    this.$emit("generateTab",this.plate,this.func)
  },
  data(){
    return {
      plate: "",
      func: "",
    }
  }
}
</script>

<style scoped>

</style>
