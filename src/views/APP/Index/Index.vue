<template>
  <div class="wrapper">
    <div>这是主页！</div>
    <el-button type="primary"size="small" autocomplete="off" style="width: 150px" @click="jumpToStoryRelay">跳转到接龙页面</el-button>
    <el-button type="primary"size="small" autocomplete="off" style="width: 150px" @click="jumpToTest">跳转到测试页面</el-button>




  </div>
</template>

<script>
export default {
  name: "index.vue",
  created() {

  },
  data(){
    return {



    }
  },
  methods:{

    jumpToStoryRelay(){
      this.$router.push("/APP/StoryRelay")
    },
    jumpToTest(){
      this.$router.push("/APP/test")
    }


  }
}
</script>

<style scoped>

</style>
