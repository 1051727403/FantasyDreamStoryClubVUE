<template>
  <div>
    <div>故事接龙页面</div>


  </div>
</template>

<script>
export default {
  name: "StoryRelay.vue",
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
