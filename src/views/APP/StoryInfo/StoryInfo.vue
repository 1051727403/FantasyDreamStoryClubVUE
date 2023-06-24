<template>
  <div>
    <el-card class="box-card">
      <h1 class="book-title" title="世界规则">世界规则</h1>
      <div class="book-cover">
        <a href="" data-lightbox="cover" data-title="世界规则">
          <img src="" alt="世界规则">
        </a>
      </div>
      <div class="book-cats clearfix">
        <a href="">幻想</a>
        <a href="">恋爱</a>
        <a href="">治愈</a>
      </div>
      <div class="book-data">
        <span>29万</span>
        <span class="hint">字数</span>
        <span>
          <i class="line"></i>
          466.6万
        </span>
        <span class="hint">热度</span>
        <span>
          <i class="line"></i>
          1006
        </span>
        <span class="hint">收藏</span>
        <span style="font-size: 14px;color: #999">
          <i class="line"></i>
          连载中
        </span>

      </div>
    </el-card>
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StoryInfo.vue",
  created() {

  },
  data(){
    return {
      plate: "",
      func: "",
    }
  },
}
</script>

<style scoped>

</style>
