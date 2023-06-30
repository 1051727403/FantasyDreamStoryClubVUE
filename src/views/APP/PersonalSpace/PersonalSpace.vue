<template>
  <div class="wrapper">
    <div class="background"></div>
    <div class="user-info">
      <a class="avatar">
        <img :src=userinfo.avatarUrl>
      </a>
      <div class="name">
        <div class="username">{{userinfo.username}}</div>
        <div class="nickname">{{userinfo.nickname}}</div>
      </div>
      <div class="nav">
      <ul class="nav-menu">
        <li><a href="javascript:;"  @click="mycollect">我的收藏</a></li>
        <li><a href="javascript:;" @click="mystory">我的故事</a></li>
        <li><a href="javascript:;" @click="myfragment">我的片段</a></li>
      </ul>
    </div>
    </div>
    <div class="main-info">
        <div class="title">
          <i class="icon-dot"></i>
          <span id="titlename"></span>
        </div>
        <div class="book">
          <ul style="list-style: none;width: 600px">
            <li style=" float: left;margin-left: 20px;" v-for="(item,_) in books">
              <a :href=item.link>
                <img :src=item.coverUrl width="130" height="195">
              </a>
              <div style="font-size: 15px;font-weight: normal;text-align: center;">
                <p style="text-overflow:ellipsis;width:120px;overflow:hidden;white-space:nowrap;">{{item.storyName}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="fragment">
          <ul  style="list-style: none">
            <li v-for="(item,_) in fragments">
              <div style="height: 22px;margin-top: 10px">
                <i class="el-icon-notebook-2" style="float: left;margin-left: 12px;margin-top: 4px"></i>
                <div style="float: left;margin-left: 6px;line-height: 20px">
                    <span class="storyName">
                      {{item.storyName}}
                    </span>
                </div>
              </div>
              <div style="margin-left: 10px">
                <a :href=item.link style="text-decoration: none">
                    <span class="fragmentName">
                        {{item.fragName}}
                    </span>
                  <span class="fragmentContent">
                     {{ item.content }}
                    </span>
                </a>
              </div>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
export default {
  name: "PersonalSpace.vue",
  components:{
    Aside
  },
  data(){
    return {
      plate: "",
      func: "",
      isCollapse:false,
      sideWidth:'200',
      userid:0,
      userinfo:{},
      books:[],
      fragments:[],
      ok:false,
      loc:{}
    }
  },
  created() {
    if(localStorage.getItem("user")){
      this.loc = JSON.parse(localStorage.getItem("user"))
    }
    else{
      this.$router.push('/login')
    }
    this.userid=this.$route.query["userid"]
    this.request.post("/user/checktoken?userid="+this.userid+"&token="+this.loc.token).then(res=>{
      if(res.code==='200'&&res.data==='success'){

      }
      else {
        console.log('fal')
        this.$router.push('/APP/index')
      }
    })
  },
  mounted() {
    this.userid=this.loc.id
    //请求作者信息
    this.request.get("/user/getUserInfo?userid="+this.userid).then(res=>{
      if(res.code==='200'){
        this.userinfo=res.data
      }
      else{
        this.$message.error("error"+res.msg)
      }
    })
  },
  methods:{
    mycollect(){
      this.fragments=[]
      const t = document.getElementById("titlename");
      t.innerText="我的收藏";
      this.request.get("/story/usersCollectStories?userid="+this.userid).then(res=>{
        if(res.code==='200'){
          this.books=res.data
          for (var re of this.books) {
            re.link="/APP/storyinfo?storyid="+re.storyId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    },
    mystory(){
      this.fragments=[]
      const t = document.getElementById("titlename");
      t.innerText="我的创作"
      this.request.get("/story/usersStories?userid="+this.userid).then(res=>{
        if(res.code==='200'){
          this.books=res.data
          for (var re of this.books) {
            re.link="/APP/storyinfo?storyid="+re.storyId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      });
    },
    myfragment(){
      this.books=[]
      const t = document.getElementById("titlename");
      t.innerText="我的片段";
      this.request.get("/fragment/getFragInfo?userid="+this.userid).then(res=>{
        if(res.code==='200'){
          this.fragments=res.data
          // for (var re of this.fragments) {
          //   re.link="/APP/storyinfo?storyid="+re.storyId
          // }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.wrapper{


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
  margin:0 367px;
  float: left;
  width: 800px;
  position: relative;
}
.wrapper .user-info .avatar{
  position: relative;
  margin-left: 50px;
  top: 140px;
  overflow: hidden;
  border-radius: 50%;
}
.wrapper .user-info .avatar img{
  width: 120px;
  height: 120px;
  display: block;
}
.wrapper .user-info .name{
  float: left;
  position: relative;
  left: 150px;
  top: 40px;

}
.wrapper .user-info .username{
  position: relative;
  float: left;
  font-size: 24px;
}
.wrapper .user-info .nickname{
  position: relative;
  float: left;
  left: 10px;
  top: 10px;
  color: #dee0e3;
}

.wrapper .user-info .nav{
  position: relative;
  left: 30px;
  top: 110px;
  float: left;
}
.wrapper .user-info .nav .nav-menu{
  list-style: none;

}
.wrapper .user-info .nav .nav-menu li{
  float: left;
  padding-left: 10px;
  padding-right: 15px;
}
.wrapper .user-info .nav .nav-menu li a{
  text-decoration: none;
  color: white;
}

.wrapper .main-info{
  position:relative;
  float: left;
  margin: 120px 300px;
  width: 1000px;
  height: 800px;
  background-color: beige;
  border-radius: 20px;

}
.wrapper .main-info .book{
  margin-left: 15px;;
  line-height: 34px;
  font-size: 16px;
  font-weight: 700;
  float: left;
  width: 650px;
}
.wrapper .main-info .fragment {
  float: left;
  width: 650px;

}
.wrapper .main-info .fragment ul li{
  position: relative;
  float: left;
  width: 700px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: white;
}
.wrapper .main-info .fragment ul li .storyName{
  font-size: 20px;
  font-weight: initial;
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wrapper .main-info .fragment ul li .fragmentName{
  position: relative;
  float: left;
  top: 2px;
  width: 700px;
  font-size: 22px;
  line-height: 30px;
  font-weight: bold;
  color: black;
}
.wrapper .main-info .fragment ul li .fragmentContent{
  position: relative;
  float: left;
  font-size: 16px;
  color: black;
  font-weight: revert;
  line-height: 24px;
  width: 650px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wrapper .main-info .fragment li+li{
  margin-top: 7px;
}


.wrapper .main-info .title{
  margin-top: 10px;
  margin-left: 15px;;
  line-height: 34px;
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 5px;
  float: left;
  width: 620px;
}
.icon-dot {
  width: 14px;
  height: 14px;
  padding: 3px;
  border-radius: 2px;
  background-color: #00a786;
  margin-right: 5px;
  display: inline-block;
  position: relative;
  top: 1px;
}
</style>
