<template>
  <div class="book-wrapper">
    <div class="background"></div>
    <div class="detail-layout">
      <div class="detail">
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
              <el-button type="success" plain>开始阅读</el-button>
              <el-button plain>收藏</el-button>
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
        <div class="comment">
          <div class="section">互动</div>
          <div class="comments-wrp">

          </div>
        </div>
      </div>
      <div class="sidebar">
        <div class="author-frame">
          <div class="novelist">
            <div class="avatar">
              <img src="https://img2.baidu.com/it/u=2064684749,2471246240&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=282" alt="45">
            </div>
            <div class="name" style="height: 40px">
              <a href="#">那个</a>
              <div style="color: #999;font-size: 10px;text-align: center;">谁谁</div>
            </div>
            <div class="userinfo">
                总关注数：150
            </div>

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
  width: 940px;
  margin: 0 auto;
}
.book-wrapper .detail-layout .detail {
  position: relative;
  width: 808px;
  min-height: 1730px;
  background: #fff;
  box-shadow: 0 2px 4px 0 #e7e7e7;
  border-radius: 4px;
}
.book-wrapper .detail-layout .detail  .meta-info{
  min-height: 265px;
  position: relative;
  padding-top: 25px;
  padding-left: 198px;
  padding-bottom: 35px;
}
.book-wrapper .detail-layout .detail .meta-info .book-title{
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
.book-wrapper .detail-layout .detail .meta-info .book-cover{
  position: absolute;
  left: 15px;
  top: 15px;
  width: 167px;
  height: 251px;
  border: 1px solid #e7e7e7;
}
.book-wrapper .detail-layout .detail .meta-info .book-cats{
  margin-top: 12px;
  box-sizing: border-box;
}
.book-wrapper .detail-layout .detail .meta-info .book-cats a{
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
.book-wrapper .detail-layout .detail .meta-info .book-cats a+a {
  margin-left: 15px;
}
.book-wrapper .detail-layout .detail .meta-info .book-data{
  margin-top: 10px;
  font-size: 17px;
  color: #333;
  text-align: left;
}
.book-wrapper .detail-layout .detail .meta-info .book-data span{
  display: inline-block;
  position: relative;
  text-align: left;
}
.book-wrapper .detail-layout .detail .meta-info .book-data .hint{
  font-size: 12px;
  padding-right: 12px;
  color: #aaa;
  text-align: left;
  vertical-align: bottom;
}
.book-wrapper .detail-layout .detail .meta-info .book-controls{
  position: absolute;
  bottom: 0;
  left: 198px;
  right: 25px;
}
.book-wrapper .detail-layout .detail .meta-info .book-controls .primary a{
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
.book-wrapper .detail-layout .detail .introduction{
  display: block;
  padding: 40px 40px;
  border-bottom: 1px solid #eee;
}
.book-wrapper .detail-layout .detail .introduction .section{
  padding: 22px 0;
}
.book-wrapper .detail-layout .detail .section-title{
  font-weight: 500;
  height: 21px;
  line-height: 20px;
  font-size: 15px;
  color: #333;
  text-align: left;
}
.book-wrapper .detail-layout .detail .introduction .section .introduction-text{
  font-size: 14px;
  color: #777;
  line-height: 27px;
  text-align: left;
  position: relative;

}

.book-wrapper .detail-layout .sidebar {
  right: 0;
  top: 20px;
  position: absolute;
  width: 100px;
}
.book-wrapper .detail-layout .sidebar .author-frame{
  position: relative;
  background: #fff;
  box-shadow: 0 2px 4px 0 #e7e7e7;
  border-radius: 4px;
  width: 200px;
}
.book-wrapper .detail-layout .sidebar .author-frame .novelist{
  width: 180px;
  margin: 0 auto;
  padding-bottom: 15px;
  position: relative;
  padding-top: 84px;
}
.book-wrapper .detail-layout .sidebar .author-frame .novelist .avatar{
  width: 60px;
  height: 60px;
  position: absolute;
  left: 60px;
  top: 25px;
  overflow: hidden;
  border-radius: 50%;
}
.book-wrapper .detail-layout .sidebar .author-frame .novelist .avatar img{
  width: 100%;
  height: 100%;
  display: block;
  vertical-align: middle;
  border: 0;
}
.book-wrapper .detail-layout .sidebar .author-frame .name{
  display: block;
  text-align: center;
  font-weight: 700;
  height: 21px;
  line-height: 21px;
  font-size: 15px;
  margin: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.book-wrapper .detail-layout .sidebar .author-frame .name a{
  color: #333;
  text-decoration: none;
  background-color: transparent;
}
.book-wrapper .detail-layout .sidebar .author-frame .userinfo{
  display: block;
  text-align: center;
  font-size: 15px;
  margin: 20px;

}

.book-wrapper .detail-layout .detail .comment{
  display: block;
  padding: 40px 40px;
  border-bottom: 1px solid #eee;
}
</style>
