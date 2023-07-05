<template>
  <div class="wrapper">
    <div class="background"></div>
    <div class="user-info">
      <div class="info-left">
        <div class="item">
          <div class="title">
            <i class="icon-dot"></i>
            Ta的故事
          </div>
          <div @click="isOpenStory = !isOpenStory" style="cursor:pointer" class="Fragmentpo">
            <span v-if="!isOpenStory">展开全部</span>
            <span v-else style="color: #1abc9c" >折叠内容</span>
          </div>
          <div class="book" >
            <ul style="list-style: none" id="collect_book" v-for="(item,_) in story" v-show="isOpenStory?true:_<4">
              <li style="float: left;margin-left: 20px;">
                <a :href="item.link"><img :src="item.coverUrl" width="130px" height="195"></a>
                <div style="font-size: 15px;font-weight: normal;text-align: center;">
                  <p style="text-overflow:ellipsis;width:120px;overflow:hidden;white-space:nowrap;">{{item.storyName}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <i class="icon-dot"></i>
            Ta收藏的故事
          </div>
          <div @click="isOpenCollectStory = !isOpenCollectStory" style="cursor:pointer" class="Fragmentpo">
            <span v-if="!isOpenCollectStory">展开全部</span>
            <span v-else style="color: #1abc9c" >折叠内容</span>
          </div>
          <div class="book">
            <ul style="list-style: none" id="collect_book" v-for="(item,_) in collectStory" v-show="isOpenCollectStory?true:_<4">
              <li style="float: left;margin-left: 20px;">
                <a :href="item.link"><img :src="item.coverUrl" width="130px" height="195"></a>
                <div style="font-size: 15px;font-weight: normal;text-align: center;">
                  <p style="text-overflow:ellipsis;width:120px;overflow:hidden;white-space:nowrap;">{{item.storyName}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <i class="icon-dot"></i>
              Ta的片段
          </div>
          <div class="mhy-collection-card mhy-account-center-collection-card" v-for="(item,_) in fragments" v-show="isOpenFragments?true:_<3" >
              <div class="mhy-collection-card__info">
                <a :href=item.link class="mhy-router-link mhy-collection-card__link">
                <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                  <p class="mhy-collection-card__name">{{item.storyName}}</p>
                </a>
                <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                  <p class="mhy-collection-card__fragmentName">{{item.fragName}}</p>
                </a>
                <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                  <p class="mhy-collection-card__fragmentContent">{{ item.content }}</p>
                </a>
                <div class="mhy-collection-card__stats">
                  <span>点赞：{{item.totalLike}}</span>
                  <span>评论：{{item.totalComment}}</span>
                  <span>收藏：{{item.totalCollection}}</span>
                </div></a>
              </div>
            <!---->
          </div>
          <div @click="isOpenFragments = !isOpenFragments" style="cursor:pointer" class="Fragmentpo">
            <span v-if="!isOpenFragments">展开全部</span>
            <span v-else style="color: #1abc9c" >折叠内容</span>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <i class="icon-dot"></i>
            Ta收藏的片段
          </div>
          <div class="mhy-collection-card mhy-account-center-collection-card" v-for="(item,_) in collectFragment " v-show="isOpenCollectFragments?true:_<3">
            <a :href=item.link class="mhy-router-link mhy-collection-card__link">
              <div class="mhy-collection-card__info">
                <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                  <p class="mhy-collection-card__name">{{item.storyName}}</p>
                </a>
                <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                  <p class="mhy-collection-card__fragmentName">{{item.fragName}}</p>
                </a>
                <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                  <p class="mhy-collection-card__fragmentContent">{{ item.content }}</p>
                </a>
                <div class="mhy-collection-card__stats">
                  <span>点赞：{{item.totalLike}}</span>
                  <span>评论：{{item.totalComment}}</span>
                  <span>收藏：{{item.totalCollection}}</span>
                </div>
              </div>
            </a>
            <!---->
          </div>
          <div @click="isOpenCollectFragments = !isOpenCollectFragments" style="cursor:pointer" class="Fragmentpo">
            <span v-if="!isOpenCollectFragments">展开全部</span>
            <span v-else style="color: #1abc9c" >折叠内容</span>
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
      fragments:[],
      story:[],
      collectStory:[],
      collectFragment:[],
      isOpenStory:false,
      isOpenCollectStory:false,
      isOpenFragments:false,
      isOpenCollectFragments:false,
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
    this.Mystory()
    this.MyCollectStory()
    this.MyFragment()
    this.MyCollectFragment()
  },
  methods:{
    MyFragment(){
      this.request.get("/fragment/getUserFrag?userId="+this.userinfo.userid).then(res=>{
        if(res.code==='200'){
          this.fragments=res.data
          for (var re of this.fragments) {
            re.link="/APP/StoryRelay?storyId="+re.storyId+"&fragmentId="+re.fragmentId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    },
    Mystory(){
      //Ta的故事
      this.request.get("/story/usersStories?userId="+this.userinfo.userid).then(res=>{
        if(res.code==='200'){
          this.story=res.data
          for (var re of this.story) {
            //console.log(re)
            re.link="/APP/StoryInfo?storyId="+re.storyId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    },
    MyCollectStory(){
      this.request.get("/story/usersCollectStories?userId="+this.userinfo.userid).then(res=>{
        if(res.code==='200'){
          this.collectStory=res.data
          for (var re of this.collectStory) {
            //console.log(re)
            re.link="/APP/StoryInfo?storyId="+re.storyId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    },
    MyCollectFragment(){
      this.request.get("/fragment/getCollectFrag?userId="+this.userinfo.userid).then(res=>{
        if(res.code==='200'){
          this.collectFragment=res.data
          for (var re of this.fragments) {
            re.link="/APP/storyrelay?storyId="+re.storyId+"&fragmentId="+re.fragmentId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    },

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
  display: flex;
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
  max-height: 275px;
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
p{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}
input, button, textarea {
  color: inherit;
  font: inherit;
}
.mhy-account-center-collection-card {
  margin: 8px 40px 8px 30px;
}
.mhy-collection-card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-collection-card__link {
  width: 100%;
  color: #333;
}
a {
  text-decoration: none;
}
.mhy-collection-card__cover img{
  position: center;
  display: block;
  width: 70px;
  height: 90px;
}
.mhy-collection-card__info {
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  background-color: #f7fbff;
  display: inline-block;
  margin-left: 8px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  overflow: hidden;
}
.mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mhy-collection-card__link {
  color: #333;
}
.mhy-collection-card__name {
  position: relative;
  line-height: 1;
  font-size: 16px;

}
.mhy-collection-card__fragmentName {
  position: relative;
  line-height: 2;
  margin-top: 5px;
  font-size: 14px;
  color: #5c97ff;

}
.mhy-collection-card__fragmentContent {
  position: relative;
  line-height: 4px;
  font-size: 12px;
  margin-top: 5px;
  height: 20px;
  color: gray;
}
.mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mhy-collection-card__stats {
  font-size: 12px;
  color: #ccc;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-collection-card__stats span {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-collection-card__stats span:not(:first-child)::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 6px;
}
.Fragmentpo{
  font-size: 14px;
  color: #618fe8;
}
.Fragmentpo:hover{
  color: #0952dc;
}


</style>