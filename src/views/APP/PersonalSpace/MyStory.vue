<template>
  <div class="mhy-container mhy-account-center-content">
    <div class="mhy-account-center-content-container mhy-account-center-story">
      <div class="mhy-account-center__subheader">
        <span>我创作的故事</span>
      </div>
      <div class="mhy-account-center-content-container__list">
        <div class="mhy-story-card mhy-account-center-story-card" v-for="(item,_) in books">
          <a :href=item.link class="mhy-router-link mhy-story-card__link">
            <div class="mhy-story-card__cover">
              <img :src=item.coverUrl>
            </div>
          </a>
          <div class="mhy-story-card__info">
            <a class="mhy-router-link mhy-story-card__link" target="_blank">
              <p class="mhy-story-card__name">{{item.storyName}}</p>
            </a>
            <div class="mhy-story-card__stats">
              <span>总点赞{{item.totalLike}}</span>
              <span>总评论{{item.totalComment}}</span>
              <span>总收藏{{item.totalCollection}}</span>
            </div>
          </div>
          <div style="display: flex;justify-content: space-around;flex-direction: column;align-items: center; color: white">
            <el-button type="success" round @click="edit(_)">编辑故事</el-button>
            <el-button type="danger" round @click="deleteStory(item.storyId)"style="margin-left: 0px;margin-top: 40px;">删除故事</el-button>
          </div>
        </div>
        <div class="mhy-container__footer">
          <div class="mhy-loadmore mhy-loadmore-scroll">
            <div class="mhy-loadmore__nomore">没有更多数据了</div>
          </div>
        </div>

      </div>
    </div>
    <el-dialog title="修改故事" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="故事名" prop="storyName">
          <el-input v-model="form.storyName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="点击修改封面" label-width=120 >
          <el-upload
              class="avatar-uploader"
              action="http://localhost:9090/upload/image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="photo">
            <img v-if="form.coverUrl" :src="form.coverUrl" height="180px" width="110px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false;">取 消</el-button>
        <el-button type="primary" @click="saveStory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible:false,
      form:{},
      rules:{
        storyName:[
          {required:true,message:"故事名不可为空",trigger:"blur"},
        ],
        introduce:[
          {required:true,message:"介绍不可为空",trigger:"blur"},
        ],
      },
      books:[],
      loc:{},
    };
  },
  created() {
    if(localStorage.getItem("user")){
      this.loc = JSON.parse(localStorage.getItem("user"))
    }
    else{
      this.$router.push('/login')
    }
    this.myStory()
  },
  methods: {
    myStory(){
      this.request.get("/story/usersStories?userId="+this.loc.id).then(res=>{
        if(res.code==='200'){
          this.books=res.data
          console.log(this.books)
          for (var re of this.books) {
            re.link="/APP/storyinfo?storyId="+re.storyId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      });
    },
    deleteStory(storyId){
      console.log(storyId)
      this.request.post("/story/deleteStory?storyId="+storyId+"&userId="+this.loc.id+"&token="+this.loc.token).then(res=>{
        if(res.code==="200"){
          this.$message.success("删除成功")
          this.$router.go(0)
          console.log(res.msg)
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
    edit(idx){
      var story = this.books[idx]
      this.form = story;
      this.dialogFormVisible = true;
    },
    //保存故事
    saveStory(){
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          this.form.userId = JSON.parse(localStorage.getItem("user")).id
          console.log(this.form)
          this.form.id= this.form.storyId
          this.request.post("/story/saveStory",this.form).then(res=>{
            console.log(res)
            this.storydialogVisible=false
            if(res.code==="200"){
              //this.$router.go(0)
              this.$message.success("上传成功")
            }
            else {
              this.$message.error("上传失败")
            }
          })
          this.dialogFormVisible=false;
        }
        else{
          this.$message.warning("请补充表格")
          //console.log("error submit!");
          return false;
        }
      })

    },
    handleAvatarSuccess(res) {
      //console.log(res)
      if(res.code === "200"){
        this.form.coverUrl="http://localhost:9090/img/"+res.data
      }else{
        this.$message.error("上传错误")
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
  }
};
</script>

<style scoped>
.mhy-account-center-content {
  width: 700px;
  float: right;
}
.mhy-container {
  background-color: #fff;
  border-radius: 4px;
}
p{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}
.mhy-account-center__subheader {
  padding: 0 30px;
  line-height: 50px;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}


input, button, textarea {
  color: inherit;
  font: inherit;
}
.mhy-account-center-story-card {
  padding: 15px 40px 15px 30px;
}
.mhy-story-card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-story-card__link {
  color: #333;
}
a {
  text-decoration: none;
}
.mhy-story-card__cover {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #ebebeb;
}
.mhy-story-card__cover img{
  position: center;
  display: block;
  width: 112px;
  height: 180px;
}
.mhy-story-card__info {
  display: inline-block;
  margin-left: 20px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  overflow: hidden;
}
.mhy-story-card__name, .mhy-story-card__info .mhy-story-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mhy-story-card__link {
  color: #333;
}
.mhy-story-card__name {
  position: relative;
  line-height: 1;
  height: 20px;
}
.mhy-story-card__name, .mhy-story-card__info .mhy-story-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mhy-story-card__name, .mhy-story-card__info .mhy-story-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mhy-story-card__stats {
  color: #ccc;
  font-size: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-story-card__stats span {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-story-card__stats span:not(:first-child)::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 6px;
}
.mhy-container__footer {
  height: 70px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-top: 1px solid #ebebeb;
}
</style>