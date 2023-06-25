<template>
  <div class="book-wrapper">
    <div class="background"></div>
    <div class="detail-layout">
      <div class="meta-info">
        <h1 class="book-title" title="世界规则">世界规则</h1>
        <div class="book-cover">
          <a href="#" data-lightbox="cover" data-title="世界规则">
            <img src="" alt="世界规则">
          </a>
        </div>
        <div class="book-cats">
          <a href="">幻想</a>
          <a href="">恋爱</a>
          <a href="">治愈</a>
          <br>
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
        <div class="book-controls">
          <div class="primary">
            <a href="#" >开始阅读</a>
            <div class="fake-btn">
            <span>收藏</span>
            </div>
          </div>
        </div>
      </div>
      <div class="introduction">
        <div class="section">
         <div class="section-title">简介</div>
          <div class="introduction-text">
            "这里是简介 “
            <br>
            "这里是简介 “
          </div>
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
  margin: 0 auto;

}
.book-wrapper .background{
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  height: 300px;
  overflow: hidden;
  text-align: center;
  margin-bottom: 0!important;
  background-image: url(https://5b0988e595225.cdn.sohucs.com/images/20200323/5d1dc63ffe1c4758be9beb08102b8d52.jpeg);
}

.book-wrapper .detail-layout{
  position: relative;
  width: 980px;
  margin: 0 auto;
  background-color: white;
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
  box-sizing: border-box;
}
.book-wrapper .detail-layout .meta-info .book-cats a{
  border: 1px solid #ddd;
  border-radius: 12px;
  display: block;
  float: left;
  height: 25px;
  line-height: 24px;
  padding: 0 13px;
  font-size: 12px;
  color: #333;
  text-decoration: none;
  background-color: transparent;
}
.book-wrapper .detail-layout .meta-info .book-cats a+a {
  margin-left: 15px;
}
.book-wrapper .detail-layout .meta-info .book-data{
  margin-top: 10px;
  font-size: 17px;
  color: #333;
  text-align: left;
}
.book-wrapper .detail-layout .meta-info .book-data span{
  display: inline-block;
  position: relative;
  text-align: left;
}
.book-wrapper .detail-layout .meta-info .book-data .hint{
  font-size: 12px;
  padding-right: 12px;
  color: #aaa;
  text-align: left;
  vertical-align: bottom;
}
.book-wrapper .detail-layout .meta-info .book-controls{
  position: absolute;
  bottom: 0;
  left: 198px;
  right: 25px;
}
.book-wrapper .detail-layout .meta-info .book-controls .primary a{
  padding: 0;
  float: left;
  font-weight: 700;
  width: 90px;
  height: 35px;
  line-height: 34px;
  text-align: center;
  font-size: 14px;
  border-color: #008e72;
  color: #fff;
  background-color: #00a786;
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  border-radius: 2px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;

}
.book-wrapper .detail-layout .meta-info .book-controls .primary .fake-btn{
  margin-left: 12px;
  float: left;
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
  touch-action: manipulation;
}
.book-wrapper .detail-layout .meta-info .book-controls .primary .fake-btn span{
  float: left;
  text-align: center;
  font-size: 14px;
  padding: 0;
  width: 70px;
  height: 35px;
  line-height: 34px;
  color: #00a786;
  background-color: #fff;
  border-color: #00a786;

}

.book-wrapper .detail-layout .introduction{
  display: block;
  padding: 0 40px 40px;
}
.book-wrapper .detail-layout .introduction .section{
  padding: 22px 0;
}
.book-wrapper .detail-layout .introduction .section .section-title{
  font-weight: 500;
  height: 21px;
  line-height: 20px;
  font-size: 15px;
  color: #333;
  text-align: left;
}
.book-wrapper .detail-layout .introduction .section .introduction-text{
  font-size: 14px;
  color: #777;
  line-height: 27px;
  text-align: left;
  position: relative;
}
</style>
