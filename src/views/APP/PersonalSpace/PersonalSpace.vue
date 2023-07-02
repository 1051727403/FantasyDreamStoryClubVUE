<template>
  <div class="wrapper">
    <div class="h">
      <div class="background">
        <div class="user-info">
          <el-upload
              class="useravatar"
              action="http://localhost:9090/upload/image"
              :show-file-list="false"
              :on-success="handleUserAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="photo">
            <img :src=userinfo.avatarUrl>
          </el-upload>
          <div class="name">
            <div class="username">{{userinfo.username}}</div>
            <div class="nickname">{{userinfo.nickname}}</div>
          </div>
          <el-button @click="userdialogVisible = true">修改资料</el-button>
          <div class="nav">
            <ul class="nav-menu">
              <li><a href="javascript:;"  @click="mycollect">我的收藏</a></li>
              <li><a href="javascript:;" @click="mystory">我的故事</a></li>
              <li><a href="javascript:;" @click="myfragment">我的片段</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="main-info">

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
    <div class="left-bar">
      <a href="#" class="createStory" @click="storydialogVisible=true">
        <i class="el-icon-notebook-1"></i>
        <span>
          投稿故事
        </span>
      </a>
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
      storydialogVisible:false,
      userdialogVisible:false,
      userid:0,
      userinfo:{},
      books:[],
      fragments:[],
      ok:false,
      loc:{},
      form:{
        storyName:"",
        coverUrl:"",
        introduce:"",
        tags:[],
      },
      firsttitle:"",
      firstcontent:"",
      allowRelay:0,
      tags:[
        {
          value:1,
          label:"幻想"},
        {
          value:2,
          label:"恋爱"},
      ],
      rules:{
        storyName:[{required:true,message:'请输入故事名称' ,trigger:'blur'}],
        introduce:[{required:true,message:'请输入故事介绍' ,trigger:'blur'}],
        fragmentName:[{required:true,message:'请输入首幕名称' ,trigger:'blur'}],
        fragmentContent:[{required:true,message:'请输入首幕内容' ,trigger:'blur'}]
      }
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

    myfragment(){
      this.books=[]
      const t = document.getElementById("titlename");
      t.innerText="我的片段";
      this.request.get("/fragment/getFragInfo?userid="+this.userid).then(res=>{
        if(res.code==='200'){
          this.fragments=res.data

          for (var re of this.fragments) {
            console.log(re)
            re.link="/APP/storyrelay?storyId="+re.storyId+"&fragmentId="+re.fragmentId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    },
    createStory(){
      this.$refs['form'].validate((valid)=>{
        if(valid){
          this.storydialogVisible=false
          console.log(this.form.tag)
          console.log(this.allowRelay)
          this.form.userId = this.userid
          this.request.post("/story/saveStory",this.form).then(res=>{
            console.log(res)
            if(res.code==="200"){
              this.request.post("/fragment/addFragment",
                  {
                    "userId":this.userid,
                    "storyId":res.data,
                    "parentId":0,
                    "fragmentName":this.firsttitle,
                    "content":this.firstcontent,
                    "allowRelay":this.allowRelay?1:0
                  }).then(res=>{
                if(res.code==="200"){
                  console.log("上传成功")
                }
                else{
                  console.log("上传失败2")
                }
              })
            }
            else {
              console.log("上传失败1")
            }
          })
        }
        else{
          console.log("error submit!");
          return false;
        }
      })
    },
    handleAvatarSuccess(res) {
      console.log(res)
      if(res.code === "200"){
        this.form.coverUrl="http://localhost:9090/img/"+res.data
      }else{
        console.log("上传错误")
      }
    },
    handleUserAvatarSuccess(res) {
      console.log(res)
      if(res.code === "200"){
        this.userinfo.avatarUrl="http://localhost:9090/img/"+res.data
        this.request.post("/user/saveAvatar?userid="+this.userid+"&avatarUrl="+this.userinfo.avatarUrl).then(res=>{
          if(res.code==="200"){
            this.$message.success("头像上传成功")
            let x = JSON.parse(localStorage.getItem("user"))
            x.avatarUrl = this.userinfo.avatarUrl
            localStorage.setItem("user",JSON.stringify(x))
          }
          else{
            this.$message.warning("头像上传失败")
          }
        })
      }else{
        console.log("上传错误")
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    saveUser(){
        this.request.post("/user/saveUser?userid="+this.userid+"&userName="+this.userinfo.username
        +"&NickName="+this.userinfo.nickname).then(res=>{
          if(res.code==="200"){
            this.$message.success("修改用户名成功")
          }
          else{
            this.$message.success("修改用户名失败")
          }
        })
    }
  }
}
</script>
<!--<style scoped>-->
<!--.wrapper{-->


<!--}-->
<!--.wrapper .h{-->
<!--  height: 250px;-->
<!--  width: 1283Px;-->
<!--  margin:0 auto;-->
<!--  position: relative;-->
<!--}-->
<!--.wrapper .h .background{-->
<!--  position: relative;-->
<!--  padding-top: 150px;-->
<!--  background-repeat: no-repeat;-->
<!--  background-size: cover;-->


<!--  background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201710%2F18%2F20171018231217_wCAfY.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690807933&t=972cd77efb40cc899c4331f7b1ef4da3);-->
<!--}-->
<!--.wrapper .h .user-info{-->
<!--  margin:0 367px;-->
<!--  float: left;-->
<!--  width: 800px;-->
<!--  position: relative;-->
<!--}-->
<!--.wrapper .h .user-info .useravatar{-->
<!--  position: relative;-->
<!--  top: 140px;-->

<!--}-->
<!--.wrapper .h .user-info .useravatar img{-->
<!--  width: 120px;-->
<!--  height: 120px;-->
<!--  display: block;-->
<!--  border-radius: 40%;-->
<!--}-->
<!--.wrapper .h .user-info .name{-->
<!--  float: left;-->
<!--  position: relative;-->
<!--  left: 150px;-->
<!--  top: 40px;-->

<!--}-->
<!--.wrapper .h .user-info .username{-->
<!--  position: relative;-->
<!--  float: left;-->
<!--  font-size: 24px;-->
<!--}-->
<!--.wrapper .h .user-info .nickname{-->
<!--  position: relative;-->
<!--  float: left;-->
<!--  left: 10px;-->
<!--  top: 10px;-->
<!--  color: #dee0e3;-->
<!--}-->

<!--.wrapper .h .user-info .nav{-->
<!--  position: relative;-->
<!--  left: 30px;-->
<!--  top: 110px;-->
<!--  float: left;-->
<!--}-->
<!--.wrapper .h .user-info .nav .nav-menu{-->
<!--  list-style: none;-->

<!--}-->
<!--.wrapper .h .user-info .nav .nav-menu li{-->
<!--  float: left;-->
<!--  padding-left: 10px;-->
<!--  padding-right: 15px;-->
<!--}-->
<!--.wrapper .h .user-info .nav .nav-menu li a{-->
<!--  text-decoration: none;-->
<!--  color: white;-->
<!--}-->

<!--.wrapper .main-info{-->
<!--  position:relative;-->
<!--  float: left;-->
<!--  margin: 120px 300px;-->
<!--  width: 1000px;-->
<!--  height: 800px;-->
<!--  background-color: beige;-->
<!--  border-radius: 20px;-->

<!--}-->
<!--.wrapper .main-info .book{-->
<!--  margin-left: 15px;;-->
<!--  line-height: 34px;-->
<!--  font-size: 16px;-->
<!--  font-weight: 700;-->
<!--  float: left;-->
<!--  width: 650px;-->
<!--}-->
<!--.wrapper .main-info .fragment {-->
<!--  float: left;-->
<!--  width: 650px;-->

<!--}-->
<!--.wrapper .main-info .fragment ul li{-->
<!--  position: relative;-->
<!--  float: left;-->
<!--  width: 700px;-->
<!--  margin-left: 20px;-->
<!--  border-radius: 10px;-->
<!--  background-color: white;-->
<!--}-->
<!--.wrapper .main-info .fragment ul li .storyName{-->
<!--  font-size: 20px;-->
<!--  font-weight: initial;-->
<!--  width: 500px;-->
<!--  white-space: nowrap;-->
<!--  overflow: hidden;-->
<!--  text-overflow: ellipsis;-->
<!--}-->
<!--.wrapper .main-info .fragment ul li .fragmentName{-->
<!--  position: relative;-->
<!--  float: left;-->
<!--  top: 2px;-->
<!--  width: 700px;-->
<!--  font-size: 22px;-->
<!--  line-height: 30px;-->
<!--  font-weight: bold;-->
<!--  color: black;-->
<!--}-->
<!--.wrapper .main-info .fragment ul li .fragmentContent{-->
<!--  position: relative;-->
<!--  float: left;-->
<!--  font-size: 16px;-->
<!--  color: black;-->
<!--  font-weight: revert;-->
<!--  line-height: 24px;-->
<!--  width: 650px;-->
<!--  white-space: nowrap;-->
<!--  overflow: hidden;-->
<!--  text-overflow: ellipsis;-->
<!--}-->
<!--.wrapper .main-info .fragment li+li{-->
<!--  margin-top: 7px;-->
<!--}-->
<!--.wrapper .main-info .title{-->
<!--  margin-top: 10px;-->
<!--  margin-left: 15px;;-->
<!--  line-height: 34px;-->
<!--  font-size: 18px;-->
<!--  font-weight: 700;-->
<!--  padding-bottom: 5px;-->
<!--  float: left;-->
<!--  width: 620px;-->
<!--}-->
<!--.icon-dot {-->
<!--  width: 14px;-->
<!--  height: 14px;-->
<!--  padding: 3px;-->
<!--  border-radius: 2px;-->
<!--  background-color: #00a786;-->
<!--  margin-right: 5px;-->
<!--  display: inline-block;-->
<!--  position: relative;-->
<!--  top: 1px;-->
<!--}-->

<!--.wrapper .left-bar {-->
<!--  position: fixed;-->
<!--  top: 280px;-->
<!--  left: 100px;-->
<!--  width: 120px;-->
<!--  height: 80px;-->
<!--  background-color: #00A1D6;-->
<!--  border-radius: 10px;-->
<!--  font-size: 18px;-->
<!--}-->
<!--.wrapper .left-bar .createStory {-->
<!--  position: relative;-->
<!--  float: left;-->
<!--  color: white;-->
<!--  margin-top: 25px;-->
<!--  margin-left: 10px;-->
<!--  border-bottom: 2px solid white;-->
<!--  width: 100px;-->
<!--  text-decoration: none;-->
<!--  text-align: center;-->
<!--}-->


<!--.avatar-uploader {-->
<!--  border: 1px dashed #d9d9d9;-->
<!--  border-radius: 6px;-->
<!--  cursor: pointer;-->
<!--  position: relative;-->
<!--  overflow: hidden;-->
<!--  width: 178px;-->
<!--  height: 178px;-->
<!--}-->
<!--.avatar-uploader .el-upload:hover {-->
<!--  border-color: #409EFF;-->
<!--}-->
<!--.avatar-uploader-icon {-->
<!--  font-size: 28px;-->
<!--  color: #8c939d;-->
<!--  width: 178px;-->
<!--  height: 178px;-->
<!--  line-height: 178px;-->
<!--  text-align: center;-->
<!--}-->
<!--.avatar-uploader .avatar {-->
<!--  width: 178px;-->
<!--  height: 178px;-->
<!--  display: block;-->
<!--}-->

<!--</style>-->
