<template>
  <div class="wrapper">
    <div class="background"></div>
    <div class="user-info">
      <div class="info-left">
        <div class="item">
          <div class="title">
            <i class="icon-dot"></i>
            Ta的创作
          </div>
          <div class="book">
            <ul style="list-style: none">
              <li >
                <a href="#" class="book-item-inner">
                  <img src="#" width="130" height="195">
                </a>
                <div class="caption">
                  <p class="booktitle">书名</p>
                </div>
              </li>
              <li >
                <a href="#" class="book-item-inner">
                  <img src="#" width="130" height="195">
                </a>
                <div class="caption">
                  <p class="booktitle">书名</p>
                </div>
              </li>
              <li >
                <a href="#" class="book-item-inner">
                  <img src="#" width="130" height="195">
                </a>
                <div class="caption">
                    书名
                </div>
              </li>
              <li >
                <a href="#" class="book-item-inner">
                  <img src="#" width="130" height="195">
                </a>
                <div class="caption">
                  <p class="booktitle">书名</p>
                </div>
              </li>
              <li >
                <a href="#" class="book-item-inner">
                  <img src="#" width="130" height="195">
                </a>
                <div class="caption">
                  <p class="booktitle">书名</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <i class="icon-dot"></i>
            Ta的收藏
          </div>
          <div class="book">

          </div>
        </div>
      </div>
      <div class="info-right">
          <div class="avatar">
            <img :src="userinfo.avatarUrl" alt="">
          </div>
          <div class="name" style="height: 40px">
            <a href="#">{{userinfo.username}}</a>
            <div style="color: #999;font-size: 10px;text-align: center;">{{userinfo.nickname}}</div>
          </div>
          <div class="userinfo">总点赞数：{{userinfo.totalLike}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowUser",
  data(){
    return{
      userinfo:{
        username:45,
        nickname:"nick",
        totalLike:520
      }
    }
  }
}
</script>

<style scoped>
.wrapper{
  height: 800px;
  background: #f6f7f8;
}
.wrapper .background{
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
.wrapper .user-info{
  margin: 200px 250px;
}
.wrapper .user-info .info-left{
  position:relative;
  float: left;
  background-color: beige;
  width: 700px;
}
.wrapper .user-info .info-left .item{
  margin-top: 10px;
  margin-left: 20px;;
  line-height: 34px;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 10px;
  float: left;
  width: 620px;
}
.wrapper .user-info .info-left .item .title{
  margin-bottom: 15px;
}
.icon-dot {
  width: 14px;
  height: 14px;
  padding: 3px;
  border-radius: 2px;
  background-color: #00a786;
  margin-right: 2px;
  display: inline-block;
}
.wrapper .user-info .info-left .item .book ul li{
  float: left;
  padding-left: 20px;
}
.wrapper .user-info .info-left .item .book ul li .caption{
  text-align: center;
  font-size: 15px;
  font-weight: normal;
}


.wrapper .user-info .info-right{
  position:relative;
  background: white;
  float: left;
  width: 300px;
}
.wrapper .user-info .info-right .avatar{
  width: 80px;
  height: 80px;
  position: relative;
  margin-left: 50px;
  left: 60px;
  top: 25px;
  overflow: hidden;
  border-radius: 50%;
}
.wrapper .user-info .info-right .avatar img{
  width: 100%;
  height: 100%;
  display: block;
  vertical-align: middle;
  border: 0;
}
.wrapper .user-info .info-right .name{
  display: block;
  text-align: center;
  font-weight: 700;
  height: 21px;
  line-height: 21px;
  font-size: 15px;
  margin-top: 35px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.wrapper .user-info .info-right .name a{
  color: #333;
  text-decoration: none;
  background-color: transparent;
}
.wrapper .user-info .info-right .userinfo{
  display: block;
  text-align: center;
  font-size: 15px;
  margin: 20px;
}
</style>