<template>
  <div class="root-page-container">
    <div class="mhy-main-page mhy-account-center">
      <div class="mhy-layout">
        <!--顶部头像栏-->
        <div class="mhy-container mhy-account-center-header" style="background-color: rgba(255,255,255,0.7);">
          <div class="mhy-avatar mhy-account-center-header__avatar mhy-avatar__xxl">
            <el-upload
                class="useravatar"
                action="http://localhost:9090/upload/image"
                :show-file-list="false"
                :on-success="handleUserAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                name="photo">
              <img :src="userinfo.avatarUrl" class="mhy-avatar__img">
            </el-upload>
          </div>
          <div class="mhy-account-center-user">
            <div class="mhy-account-center-user__header">
              <div class="mhy-account-center-user__title">
                <span class="mhy-account-center-user__name">{{ userinfo.username }}</span>
              </div>
              <div class="mhy-account-center-header__buttons">
                <div class="mhy-button mhy-account-center-header__edit mhy-button-outlined mhy-button-md">
                  <button class="mhy-button__button" @click="userdialogVisible = true">编辑</button>
                </div>
                <!---->
              </div>
            </div>
            <div class="mhy-account-center-user__audit">
              <span class="mhy-account-center-user__uid">{{ userinfo.nickname }}</span>
              <!---->
            </div>

            <div class="mhy-account-center-header__data">
              <div class="mhy-account-center-header__data-item">
                <a class="mhy-router-link mhy-account-center-header__data-num mhy-account-center-header__data-link">{{userinfo.totalLike}}</a>
                <div class="mhy-account-center-header__data-label">总点赞</div>
              </div>
            </div>
          </div>
        </div>
        <!--左侧菜单栏-->
        <div class="mhy-container mhy-side-menu mhy-account-center__menu">
          <header class="mhy-side-menu__header">个人中心</header>
          <ul class="mhy-side-menu__list">
            <li v-for="(item,index) in menus" :key="index" @click="selMenu(item)">
              <a :class="'mhy-router-link mhy-side-menu__item '+ (activeIndex === item.path?'nuxt-link-active':'')">
                <i :class="item.icon" style="font-size: 18px;margin-right: 10px;"></i>
                <span>{{item.name}}</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- 右侧内容-->
        <div class="mhy-container mhy-account-center-content">
          <router-view></router-view>
        </div>

      </div>
    </div>
    <div class="left-bar">
      <a href="#" class="createStory" @click="storydialogVisible=true">
        <i class="el-icon-notebook-1"></i>
        <span>投稿故事</span>
      </a>
    </div>
    <el-dialog title="修改资料" :visible.sync="userdialogVisible" width="50%">
      <el-form :model="userinfo" :rules="userRules" ref="form">
        <el-form-item label="用户名" label-width=120 prop="username">
          <el-input v-model="userinfo.username" autocomplete="off"></el-input>
        </el-form-item >
        <el-form-item label="昵称" label-width=120 prop="nickname">
          <el-input v-model="userinfo.nickname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="投稿故事" :visible.sync="storydialogVisible" width="50%">
      <el-form :model="form" :rules="storyRules" ref="form">
        <el-form-item label="故事名" label-width=120 prop="storyName">
          <el-input v-model="form.storyName" autocomplete="off"></el-input>
        </el-form-item >
        <el-form-item label="封面" label-width=120 >
          <el-upload
              class="avatar-uploader"
              action="http://localhost:9090/upload/image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="photo">
            <img v-if="form.coverUrl" :src="form.coverUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" label-width=120 >
          <el-select
              v-model="form.tags"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择">
            <el-option
                v-for="item in tags"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" label-width=120 prop="introduce">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序幕名称" label-width=120 prop="fragmentName">
          <el-input v-model="form.fragmentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序幕内容" label-width=120 prop="fragmentContent">
          <el-input v-model="form.fragmentContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否接龙" label-width=120 >
            <el-switch
                v-model="allowRelay"
                active-text="可以接龙"
                inactive-text="不可接龙">
            </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="storydialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createStory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      userdialogVisible:false,
      storydialogVisible:false,
      userinfo:{},
      form:{
        storyName:"",
        coverUrl:"",
        tags:"",
        introduce:"",
        fragmentName:"",
        fragmentContent:"",
      },
      activeIndex: '/PersonalSpace',
      menus: [
        {name:'我的收藏',path:'/PersonalSpace/myCollect',icon:'el-icon-folder-opened'},
        {name:'我的故事',path:'/PersonalSpace/myStory',icon:'el-icon-s-management'},
        {name:'我的片段',path:'/PersonalSpace/myFragment',icon:'el-icon-document'},
      ],
      tags:[
        {
          value:1,
          label:"幻想"},
        {
          value:2,
          label:"恋爱"},
      ],
      storyRules:{
        storyName:[{required:true,message:'请输入故事名称' ,trigger:'blur'}],
        introduce:[{required:true,message:'请输入故事介绍' ,trigger:'blur'}],
        fragmentName:[{required:true,message:'请输入首幕名称' ,trigger:'blur'}],
        fragmentContent:[{required:true,message:'请输入首幕内容' ,trigger:'blur'}]
      },

      allowRelay:false,
      userRules:{
        username:[{required:true,message:'请输用户名' ,trigger:'blur'}],
        nickname:[{required:true,message:'请输入昵称' ,trigger:'blur'}],
      }
    };
  },
  created() {
    if(localStorage.getItem("user")){
      this.loc = JSON.parse(localStorage.getItem("user"))
    }
    else{
      this.$router.push('/login')
    }
    this.request.post("/user/checktoken?userid="+this.loc.id+"&token="+this.loc.token).then(res=>{
      if(res.code==='200'&&res.data==='success'){

      }
      else {
        console.log('fal')
        //this.$router.push('/APP/index')
      }
    })
  },
  mounted() {
    // let that = this;
    // setInterval(function(){//定位当前菜单
    //   that.activeIndex = that.$router.currentRoute.path;
    //   console.log(that.activeIndex)
    // },300);
    this.userid=this.loc.id
    //请求作者信息
    this.request.get("/user/getUserInfo?userid="+this.userid).then(res=>{
      if(res.code==='200'){
        this.userinfo=res.data
        console.log(this.userinfo)
      }
      else{
        this.$message.error("error"+res.msg)
      }
    })
  },
  methods: {
    selMenu(item){
      this.activeIndex = item.path;
      this.$router.push({path: item.path});
    },
    saveUser(){
      this.userdialogVisible = false
      this.request.post("/user/saveUser?userid="+this.userid+"&userName="+this.userinfo.username
          +"&NickName="+this.userinfo.nickname).then(res=>{
        if(res.code==="200"){
          this.$message.success("修改用户名成功")
        }
        else{
          this.$message.success("修改用户名失败")
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
              this.request.post("/fragment/addRootFragment",
                  {
                    "userId":this.userid,
                    "storyId":res.data,
                    "parentId":0,
                    "fragmentName":this.form.fragmentName,
                    "content":this.form.fragmentContent,
                    "allowRelay":this.allowRelay?1:0
                  }).then(res=>{
                if(res.code==="200"){
                  this.$message.success("上传成功")
                }
                else{
                  this.$message.success("上传失败")
                }
              })
            }
            else {
              this.$message.success("上传失败")
            }
          })
        }
        else{
          console.log("error submit!");
          return false;
        }
      })
    },
  }
};
</script>

<style scoped>
.root-page-container {
  background: url(https://img2.baidu.com/it/u=3039460187,60719744&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=400) no-repeat 0 0;
  background-size: 100%;
  height: 300px;
}
.mhy-main-page {
  padding-top: 60px;
  position: relative;

}
.mhy-layout {
  width: 1000px;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
.mhy-layout {
  zoom: 1;
}
.mhy-account-center-header {
  padding: 20px 50px 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 20px;
}
.mhy-container {
  background-color: #fff;
  border-radius: 4px;
}
.mhy-account-center-header__avatar {
  margin-right: 24px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.mhy-avatar__xxl {
  width: 120px;
  height: 120px;
}
.mhy-avatar {
  display: inline-block;
  position: relative;
}
.mhy-avatar__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}
.mhy-avatar__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}
img {
  border-style: none;
}
.mhy-account-center-user {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 100%;
}
.mhy-account-center-user__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.mhy-account-center-user__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-account-center-user__name {
  font-size: 16px;
  line-height: 21px;
  font-weight: 600;
}
.mhy-account-center-user__level.mhy-img-icon {
  margin-left: 10px;
  height: 16px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.mhy-account-center-user__level--self {
  cursor: pointer;
}
.mhy-img-icon {
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
.mhy-account-center-header__buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.mhy-button.mhy-button-md.mhy-button-outlined {
  line-height: 32px;
}
.mhy-button.mhy-button-md {
  width: 86px;
  height: 34px;
  line-height: 34px;
}
.mhy-button {
  display: inline-block;
  cursor: pointer;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.mhy-button-outlined .mhy-button__button {
  background-color: #fff;
  color: #00b2ff;
  border: 1px solid #00c3ff;
  border-radius: 4px;
  -webkit-transition-duration: .2s;
  -o-transition-duration: .2s;
  transition-duration: .2s;
  -webkit-transition-property: border-color,color;
  -o-transition-property: border-color,color;
  transition-property: border-color,color;
}
.mhy-button__button {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  font-size: inherit;
  color: inherit;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  border-radius: 0;
  font-weight: inherit;
  line-height: inherit;
}
input, button, textarea {
  color: inherit;
  font: inherit;
}
.mhy-account-center-user__audit {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-account-center-user__uid {
  font-size: 12px;
  color: #ccc;
}
a {
  text-decoration: none;
}

.mhy-account-center-user__certification span, .mhy-account-center-user__intro span {
  margin-top: 2px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  line-height: 1;
}
p {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}

.mhy-account-center-user__certification .ip-icon, .mhy-account-center-user__intro .ip-icon {
  color: #76bfe3;
  font-size: 16px;
  margin-right: 8px;
}

.icon-ip:before {
  content: "";
}
.mhy-account-center-header__data {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-top: 19px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-item-align: center;
  align-self: center;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin-top: 20px;
  border-top: 1px solid #f0f0f0;
}
.mhy-account-center-header__data-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-right: 40px;
}
.mhy-account-center-header__data-link {
  cursor: pointer;
}
.mhy-account-center-header__data-num {
  color: #333;
  font-size: 20px;
}
.mhy-account-center-header__data-label {
  margin-left: 10px;
  color: #ccc;
}
.mhy-account-center-header__data-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-right: 40px;
}
.mhy-account-center-header__data-link {
  cursor: pointer;
}
.mhy-account-center-header__data-num {
  color: #333;
  font-size: 20px;
}
.mhy-account-center-header__data-label {
  margin-left: 10px;
  color: #ccc;
}
.mhy-account-center-header__data-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-right: 40px;
}
.mhy-account-center-header__data-num {
  color: #333;
  font-size: 20px;
}
.mhy-account-center-header__data-label {
  margin-left: 10px;
  color: #ccc;
}

/*左侧菜单栏*/
.mhy-side-menu {
  width: 280px;
  float: left;
}
.mhy-container {
  background-color: #fff;
  border-radius: 4px;
}
.mhy-side-menu__header {
  width: 100%;
  padding: 0 30px;
  line-height: 50px;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
}
.mhy-side-menu__list {
  padding: 0 30px 10px;
}
ol, ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul, li {
  list-style: none;
}
.mhy-account-center__menu li:nth-of-type(3), .mhy-account-center__menu li:nth-of-type(5) {
  border-bottom: 1px solid #f0f0f0;
}
.mhy-side-menu .nuxt-link-active {
  color: #00c3ff;
}
.mhy-side-menu__item {
  padding: 0 20px;
  line-height: 50px;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
}
.mhy-side-menu .nuxt-link-active .mhy-icon {
  color: #00c3ff;
}
.mhy-side-menu__item .mhy-icon {
  width: 18px;
  font-size: 18px;
  vertical-align: top;
  display: inline-block;
  color: #d9d9d9;
  margin-right: 15px;
}
.mhy-icon {
  font-size: inherit;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-wodefatie:before {
  content: "";
}

/*右侧内容*/
.mhy-account-center-content {
  width: 700px;
  float: right;
}
 .left-bar {
  position: fixed;
  top: 280px;
  left: 100px;
  width: 120px;
  height: 60px;
  background-color: #00A1D6;
  border-radius: 10px;
  font-size: 18px;
}
.left-bar .createStory {
  position: relative;
  float: left;
  color: white;
  margin-top: 15px;
  margin-left: 10px;
  border-bottom: 2px solid white;
  width: 100px;
  text-decoration: none;
  text-align: center;
}
</style>