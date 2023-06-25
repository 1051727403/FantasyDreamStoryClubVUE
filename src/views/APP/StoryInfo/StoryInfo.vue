<template>
  <div class="book-wrapper">
    <div class="background" >
    </div>
  <div class="detail-layout">
    <div class="meta-info">
      <h1 class="book-title" title="世界规则">世界规则</h1>
      <div class="book-cover">
        <a href="#" data-lightbox="cover" data-title="世界规则">
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
      </div>
    </div>
    <div class="book-sign-wrp">
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </div>
  </div>


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

.book-wrapper{
  padding-top: 230px;
  background: #f6f7f8;
  padding-bottom: 60px;
}
.book-wrapper .background{
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  height: 270px;
  overflow: hidden;
  text-align: center;
  margin-bottom: 0!important;
  background-image: url(https://img0.baidu.com/it/u=2011423991,1386468283&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500);
}

.book-wrapper .detail-layout{
  position: relative;
  width: 1028px;
  margin: 0 auto;
}
.book-wrapper .detail-layout .meta-info{
  min-height: 265px;
  position: relative;
  padding-top: 25px;
  padding-left: 198px;
  padding-bottom: 35px;
}
.book-wrapper .detail-layout .meta-info .book-title{
  font-weight: 700;
  overflow: hidden;
  font-size: 26px;
  color: #333;
  text-align: left;
  display: block;
  margin: 0 160px 0 0;
  word-wrap: break-word;
  max-height: 56px;
}
.book-wrapper .detail-layout .meta-info .book-cover{
  position: absolute;
  left: 15px;
  top: 15px;
  width: 167px;
  height: 251px;
  border: 1px solid #e7e7e7;
}
.book-wrapper .detail-layout .meta-info .book-cats{
  margin-top: 12px;
}
.book-wrapper .detail-layout .meta-info .book-data{
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  text-align: left;
}
</style>
