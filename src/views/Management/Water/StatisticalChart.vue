<!--统计图表页面-->
<template>
  <div>

  </div>
</template>


<script>


export default {
  name: "StatisticalChart",
  data(){
    return{
      plate:"订水管理",
      func:"统计图表"
    }
  },
  created() {
    this.$emit("generateTab",this.plate,this.func)

  },
  methods:{

  }
}
</script>

<style scoped>

</style>