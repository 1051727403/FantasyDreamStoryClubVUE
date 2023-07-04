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
          <div class="book" style="margin-bottom: 10px">
            <ul style="list-style: none" id="my_book" >
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <i class="icon-dot"></i>
            Ta的收藏
          </div>
          <div class="book">
            <ul style="list-style: none" id="collect_book" >
            </ul>
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
      userinfo:{},
    }
  },
  created() {
    //console.log(456)
    this.userinfo.userid=this.$route.query["userId"]
    //请求作者信息
    this.request.get("/user/getUserInfo?userId="+this.userinfo.userid).then(res=>{
      if(res.code==='200'){
        this.userinfo=res.data
      }
      else{
        this.$message.error("error"+res.msg)
      }
    })
    //Ta的创作
    this.request.get("/story/usersStoriesWithFragment?userId="+this.userinfo.userid).then(res=>{
      if(res.code==='200'){
        this.showbook(res.data,"my_book")
      }
      else{
        this.$message.error("error"+res.msg)
      }
    })
    //Ta的收藏
    this.request.get("/story/usersCollectStories?userId="+this.userinfo.userid).then(res=>{
      if(res.code==='200'){
        this.showbook(res.data,"collect_book")
      }
      else{
        this.$message.error("error"+res.msg)
      }
    })
  }
  ,
  methods:{
    showbook(books,books_element_id){
      var bookselement =document.getElementById(books_element_id)
      for (const book of books) {
        var tli= document.createElement("li")
        var ta = document.createElement("a")
        var tmg= document.createElement('img')
        tmg.src=book.coverUrl
        tmg.width=130
        tmg.height=195
        ta.appendChild(tmg)
        ta.href="/APP/storyinfo?storyId="+book.storyId
        tli.appendChild(ta)
        var tdiv = document.createElement("div")
        tdiv.style=
            "  font-size: 15px;" +
            "  font-weight: normal;"+
            "  text-align: center;"
        var tp = document.createElement("p")
        tp.style= " text-overflow:ellipsis;" +
            "  width:120px;"+
            " overflow:hidden;" +
            " white-space:nowrap;"
        tp.innerText=book.storyName
        tdiv.appendChild(tp)
        tli.appendChild(tdiv)
        tli.style=
            " float: left;\n" +
            " margin-left: 20px;"
        bookselement.append(tli)
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
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  height: 700px;
  overflow: hidden;
  text-align: center;
  margin-bottom: 0!important;
  background:url(https://gd-hbimg.huaban.com/de44f21c61515fa72b337d7a2633f3f4f53530b64cde2-zRsd0o_fw658webp)  no-repeat;
  background-size: 100% 100%;
}
.wrapper .user-info{
  margin: 200px 250px;
}
.wrapper .user-info .info-left{
  position:relative;
  float: left;
  background-color: beige;
  border-radius: 10px;
  width: 700px;
}
.wrapper .user-info .info-left .item{
  margin-top: 10px;
  margin-left: 15px;;
  line-height: 34px;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 5px;
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


.wrapper .user-info .info-right{
  position:relative;
  background: white;
  border-radius: 10px;
  float: left;
  margin-left: 25px;
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