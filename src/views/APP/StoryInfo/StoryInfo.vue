<template>
  <div class="book-wrapper">
    <div class="background"></div>
    <div class="detail-layout">
      <div class="detail">
        <div class="meta-info">
          <h1 class="book-title">{{storyinfo.storyName}}</h1>
          <div class="book-cover">
              <img :src="storyinfo.coverUrl" alt="">
          </div>
          <div class="book-cats" id="cats">
          </div>
          <br>
          <div class="book-data">
            <span class="date">{{storyinfo.totalLike}}</span>
            <span class="hint">点赞数</span>
            <span class="date">{{storyinfo.totalComment}}</span>
            <span class="hint">总评数</span>
            <span class="date">{{storyinfo.totalCollection}}</span>
            <span class="hint">收藏量</span>
          </div>
          <div class="book-controls">
            <div class="primary">
              <el-button type="success" plain @click="gotoStory(storyinfo.Link)">
                  开始阅读
              </el-button>
              <el-button plain @click="collect" id="collectBtn" >收藏</el-button>
            </div>
          </div>
        </div>
        <div class="introduction">
          <div class="section">
            <div class="section-title">简介</div>
            <div class="introduction-text">
              {{storyinfo.introduce}}
            </div>
          </div>
        </div>
        <div class="comment">
          <div style="margin-top: 20px;font-size: 18px;color: #707070;">评论区&nbsp;({{totalComment}})</div>
          <story-comment v-bind:comments="comments"
                           :story-id="storyId"
                           @updateTotalComment="updateTotalComment"
                           @reloadComment="reloadComment"></story-comment>
          <div style="padding-bottom: 80px;"></div>
        </div>
      </div>
      <div class="sidebar">
        <div class="author-frame">
          <div class="novelist">
            <a :href="editorinfo.link" style="text-decoration: none;color: black;">
            <div  class="avatar">
              <img :src="editorinfo.avatarUrl" alt="">
            </div>
            <div class="name" style="height: 40px">
              {{editorinfo.username}}
              <div style="color: #999;font-size: 10px;text-align: center;">{{editorinfo.nickname}}</div>
            </div>
            </a>
            <div class="userinfo">
                总点赞数：{{editorinfo.totalLike}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>你已收藏,是否取消收藏</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="uncollect">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>

import StoryComment from "@/components/StoryComment";

export default {
  name: "StoryInfo.vue",
  components: {
    StoryComment
  },
  data(){
    return {
      plate: "",
      func: "",
      dialogVisible:false,
      storyid:0,
      storyinfo:{},
      editorinfo:{},
      astyle:"margin-left: 4px;"+
          "margin-right: 10px;" +
          "border: 1px solid #ddd!important;" +
          "border-radius: 12px;" +
          "display: block;" +
          "float: left;" +
          "height: 25px;" +
          "line-height: 24px;" +
          "padding: 0 13px;" +
          "font-size: 12px;" +
          "color: #333;" +
          "text-decoration: none;" +
          "background-color: transparent;",
      storyId:1,
      comments:[],
      totalComment:0,
      checkCollect:false,
    }
  },
  created() {
    this.storyid=this.$route.query["storyId"]
    this.storyId=this.$route.query["storyId"]
    this.request.get("/story/getStoryInfo?storyId="+this.storyid).then(res=>{
      if(res.code==='200'){
        this.storyinfo=res.data
        this.storyinfo.Link = "/App/storyRelay?storyId="+this.storyid
        //console.log(res.data)
        //作者信息
        this.request.get("/user/getUserInfo?userId="+this.storyinfo.userId).then(res=>{
          if(res.code==='200'){
            this.editorinfo=res.data
            this.editorinfo.link="/app/usershow?userId="+this.editorinfo.id
            //console.log(this.editorinfo)
          }
          else{
            this.$message.error("error"+res.msg)
          }
        })
        //生成标签
        this.request.get("/story/getStoryTag?storyId="+this.storyid).then(res=>{
          if(res.code==="200"){
            var tags = res.data
            var parent=document.getElementById("cats")
            //console.log(tags)
            for (const tag of tags) {
              var a = document.createElement("a")
              a.style=this.astyle
              a.innerText=tag
              parent.append(a)
            }
          }
          else{
            this.$message.error("error"+res.msg)
          }
        })
        //请求收藏
        if(localStorage.getItem("user")){
          this.request.get("/story/checkCollect?userId="+JSON.parse(localStorage.getItem("user")).id+"&storyId="+this.storyid).then(res=>{
            if(res.code==="200"){
              console.log(this.storyinfo.userId)
              console.log(this.storyid)
              console.log("收藏")
              console.log(res)
              this.checkCollect = res.data
              this.checkedCollect()
            }
            else{
              this.$message.error("标签错误")
            }
          })
        }

        this.checkedCollect()
        this.loadStoryComment(this.storyId)
      }
      else{
        this.$message.error("error"+res.msg)
      }
    })
  },
  methods:{
    //加载故事评论区
    loadStoryComment(storyId){
      this.request.get("/storyComment/loadStoryComment?storyId="+storyId).then(res=> {
        if (res.code == '200') {
          this.comments = res.data.comments
          this.totalComment=res.data.totalComment
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateTotalComment(x){
      this.totalComment=this.totalComment+x;
    },
    reloadComment() {
      this.loadStoryComment(this.storyId);
    },
    collect(){
      if(localStorage.getItem("user")){
        var userid =  JSON.parse(localStorage.getItem("user")).id;
        this.request.post("/story/collectStory?userId="+userid+"&storyId="+this.storyid).then(res=>{
          if(res.code==="200"){
            this.$message.success("收藏成功")
            this.checkCollect = true
            this.checkedCollect()
          }
          else{
            this.dialogVisible = true
          }
        })
      }
      else{
        this.$notify({
          title:"请登录后尝试",
          duration:1500
        })
        //this.$router.push('/login')
      }
    },
    uncollect(){
      this.dialogVisible = false
      var userid =  JSON.parse(localStorage.getItem("user")).id;
      this.request.post("/story/uncollectStory?userId="+userid+"&storyId="+this.storyid).then(res=>{
        //console.log(res)
        if(res.code==="200"&& res.data===true){
          this.$message.success("取消收藏成功")
          this.checkCollect = false
          this.checkedCollect()
        }
        else{
          this.$message.error("出错")
        }
      })

    },
    gotoStory(Link){
      this.$router.push(Link)
      // const routeData = this.$router.resolve({
      //   path: Link,
      // })
      // window.open(routeData.href,"_blank")
    },
    checkedCollect(){
        let collectBtn =document.getElementById("collectBtn")
        if(this.checkCollect){
          collectBtn.innerText
          collectBtn.innerText="已收藏"
          collectBtn.style="background-color:#fec73d;color:white;"
        }
        else{
          collectBtn.innerText="收藏"
          collectBtn.style=""
        }
    }
  }
}
</script>


<style scoped>
body{
  overflow:auto !important;
}
.book-wrapper{
  padding-top: 200px;
  background: #f6f7f8;
  padding-bottom: 60px;
  margin: 0 auto;
}
.book-wrapper .background{
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  height: 690px;
  overflow: hidden;
  text-align: center;
  margin-bottom: 0!important;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(https://gd-hbimg.huaban.com/4bf9ac9aa6230b02ab227c20c22b8390bce842c9551d3-uiLtjM_fw658webp) ;
}
.book-wrapper .detail-layout{
  position: relative;
  width: 940px;
  margin: 0 auto;
}
.book-wrapper .detail-layout .detail {
  position: relative;
  width: 808px;
  min-height: 1030px;
  background: #fff;
  box-shadow: 0 2px 4px 0 #e7e7e7;
  border-radius: 4px;
}
.book-wrapper .detail-layout .detail .meta-info{
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
  width: 160px;
  height: 251px;
  border: 1px solid #e7e7e7;
}
.book-wrapper .detail-layout .detail .meta-info .book-cover img{
  width: 160px;
  height: 251px;
}
.book-wrapper .detail-layout .detail .meta-info .book-cats{
  margin-top: 12px;
  box-sizing: border-box;
}
.book-wrapper .detail-layout .detail .meta-info .book-data{
  margin-top: 10px;
  font-size: 17px;
  color: #333;
  text-align: left;
}
.book-wrapper .detail-layout .detail .meta-info .book-data data{
  display: inline-block;
  width: 30px;
  position: relative;
  text-align: left;
}
.book-wrapper .detail-layout .detail .meta-info .book-data .hint{
  font-size: 12px;
  padding-right: 12px;
  padding-left: 5px;
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
.book-wrapper .detail-layout .detail .introduction .section .introduction-text{
  font-size: 14px;
  color: #777;
  line-height: 27px;
  text-align: left;
  position: relative;

}
.book-wrapper .detail-layout .detail .comment{
  display: block;
  padding: 40px 40px;
  border-bottom: 1px solid #eee;
}
.book-wrapper .detail-layout .detail .section-title{
  font-weight: 500;
  height: 21px;
  line-height: 20px;
  font-size: 15px;
  color: #333;
  text-align: left;
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


</style>
