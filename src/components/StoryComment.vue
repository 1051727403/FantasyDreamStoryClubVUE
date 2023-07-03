<template>
  <div>
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
      <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
      <div class="reply-info">
        <div

            tabindex="0"
            contenteditable="true"
            id="replyInput"
            spellcheck="false"
            placeholder="输入评论..."
            class="reply-input"
            @focus="showReplyBtn"
            @input="onDivInput($event)"
        >
        </div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button class="reply-btn" size="small" @click="sendComment" type="primary">发表评论</el-button>
      </div>
    </div>
    <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
      <div style="display: flex;justify-content: space-between;align-items: center; width: 100%;">
        <div @click="jumpToUserShow(item.userId)">
          <el-avatar class="header-img"  :size="40" :src="item.headImg" style="cursor: pointer"></el-avatar>
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center; width: 95%;">
          <div class="author-info">
            <span class="author-name">{{item.name}}</span>
            <span class="author-time">{{item.time  | formatDate}} </span>
          </div>
          <div class="icon-btn" style="font-size: 14px;">
            <span @click="showReplyInput(i,item.name,item.id)"><i class="iconfont el-icon-s-comment">&nbsp;回复</i></span>
          </div>
        </div>
      </div>

      <div class="talk-box">
        <p>
          <span class="reply">{{item.comment}}</span>
        </p>
      </div>
      <!-- 删除按钮-->
      <div v-if="myId==item.userId" class="deleteComment" style="padding-right:18px" @click="deleteComment(item.id)">
        <button class="deleteButton">删除</button>
      </div>



      <div class="reply-box">
        <div v-for="(reply, j) in item.reply" :key="j" class="author-title" v-show="shouldShowReply(i, j)">
          <div style="display: flex;justify-content: space-between;align-items: center; width: 100%;">
            <div @click="jumpToUserShow(reply.userId)">
              <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg" style="cursor: pointer"></el-avatar>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center; width: 95%;">
              <div class="author-info">
                <span class="author-name">{{reply.from}}</span>
                <span class="author-time">{{reply.time | formatDate}}</span>
              </div>
              <div class="icon-btn"style="font-size: 14px;width: 60px;">
                <span @click="showReplyInput(i,reply.from,reply.fromId)"><i class="iconfont el-icon-s-comment"></i>回复</span>
              </div>
            </div>
          </div>

          <div class="talk-box">
            <p>
              <span>@{{reply.to}}：</span>
              <span class="reply">{{reply.comment}}</span>
            </p>
          </div>
          <!-- 删除按钮-->
          <div v-if="myId==reply.userId" class="deleteComment" @click="deleteComment(reply.fromId)">
            <button class="deleteButton">删除</button>
          </div>


        </div>
      </div>

      <!-- 展开按钮 -->
      <div v-if="shouldShowExpandButton(item.reply)" class="expand-btn" @click="toggleExpand(i)">
        <span v-if="expandReplies[i]">收起</span>
        <span v-else>展开剩余{{ item.reply.length - 2 }}评论</span>
      </div>


      <div v-show="_inputShow(i)" class="my-reply my-comment-reply" ref="replyElement">
        <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
        <div class="reply-info">
          <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..."
               @input="onDivInput($event)" class="reply-input reply-comment-input"></div>
        </div>
        <div class=" reply-btn-box">
          <el-button class="reply-btn" size="small" @click="sendCommentReply(i)" type="primary">发表评论
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<!--https://blog.csdn.net/zLanaDelRey/article/details/100997792-->
<script>
import user from "@/views/Management/User";

const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 只有不是本身 才会响应事件
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }

    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  // update() {
  // },
  // vue 弹出框 下面 响应
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  name: 'StoryComment',
  props:{
    comments: {
      type: Array,
      required:true
    },
    storyId:{
      type:Number,
      required:true
    }
  },
  data() {
    return {
      expandReplies: [], // 用于存储每个 reply-box 的展开/折叠状态的数组
      btnShow: false,
      index: '0',
      replyComment: '',
      myName: '游客',
      myHeader: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
      myId: null,
      to: '',
      toId: -1,
      // comments: [
      //   {
      //     name: 'Lana Del Rey',
      //     id: 19870621,
      //     headImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
      //     comment: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
      //     time: '2019年9月16日 18:43',
      //     inputShow: false,
      //     reply: [
      //       {
      //         from: 'Taylor Swift',
      //         fromId: 19891221,
      //         fromHeadImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
      //         to: 'Lana Del Rey',
      //         toId: 19870621,
      //         comment: '我很喜欢你的新专辑！！',
      //         time: '2019年9月16日 18:43',
      //         inputShow: false
      //       },
      //       {
      //         from: 'Ariana Grande',
      //         fromId: 1123,
      //         fromHeadImg: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
      //         to: 'Lana Del Rey',
      //         toId: 19870621,
      //         comment: '别忘记宣传我们的合作单曲啊',
      //         time: '2019年9月16日 18:43',
      //         inputShow: false
      //
      //       }
      //     ]
      //   },
      //   {
      //     name: 'Taylor Swift',
      //     id: 19891221,
      //     headImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
      //     comment: '我发行了我的新专辑Lover',
      //     time: '2019年9月16日 18:43',
      //     inputShow: false,
      //     reply: [
      //       {
      //         from: 'Lana Del Rey',
      //         fromId: 19870621,
      //         fromHeadImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
      //         to: 'Taylor Swift',
      //         toId: 19891221,
      //         comment: '新专辑和speak now 一样棒！',
      //         time: '2019年9月16日 18:43',
      //         inputShow: false
      //
      //       }
      //     ]
      //   },
      //   {
      //     name: 'Norman Fucking Rockwell',
      //     id: 20190830,
      //     headImg: 'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
      //     comment: 'Plz buy Norman Fucking Rockwell on everywhere',
      //     time: '2019年9月16日 18:43',
      //     inputShow: false,
      //     reply: []
      //   },
      // ]
    }
  },
  directives: {clickoutside},
  filters: {
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}.${month}.${day}`;
    },
  },
  created() {
    var user=JSON.parse(localStorage.getItem("user"))
    if (user) {
      this.myName = user.nickname
      this.myHeader = user.avatarUrl
      this.myId = user.id
    }
  },
  methods: {
    //跳转到个人展示页面
    jumpToUserShow(userId){
      console.log(userId)
      window.open(this.$router.resolve("/app/usershow?userid="+userId).href,'_blank')
    },
    //删除评论
    deleteComment(id){
      // console.log(id)
      this.$confirm('确认删除该评论？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.get("/storyComment/deleteById?id="+id).then(res=>{
          if (res.code=='200'){
            //重新加载评论
            this.$emit("reloadComment");
            this.$notify({
              title: '删除成功！',
              type:"success",
              duration:1500
            });
          }else{
            this.$notify({
              title: '删除失败！',
              type:"error",
              duration:1500
            });
          }
        })
      }).catch(() => {
        this.$notify({
          title: '取消删除！',
          type:"info",
          duration:1500
        });
      });
    },
    shouldShowReply(i, j) {
      return j < 2 || this.expandReplies[i];
    },
    shouldShowExpandButton(reply) {
      return reply.length > 2;
    },
    toggleExpand(i) {
      this.$set(this.expandReplies, i, !this.expandReplies[i]);
    },
    messageTitleClick(num) { // 点击了具体某条消息
      console.log("点击了消息", num);
    },
    //验证是否登陆
    checkIsLogined(){
      let user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
      console.log("user:",user)
      if(user==null){
        //未登录
        this.$notify({
          title: '请登录后再进行操作！',
          duration:1500
        });
        return false;
      }else{
        //已登录
        return true;
      }
    },
    inputFocus() {
      var replyInput = document.getElementById('replyInput');
      replyInput.style.padding = "8px 8px"
      replyInput.style.border = "2px solid blue"
      replyInput.focus()
    },
    showReplyBtn() {
      this.btnShow = true
    },
    hideReplyBtn() {
      let replyInput = document.getElementById('replyInput')
      this.btnShow = false
      replyInput.style.padding = "10px"
      replyInput.style.border = "none"
    },
    showReplyInput(i, name, id) {
      console.log(i,name,id)
      this.comments[this.index].inputShow = false
      this.index = i
      this.comments[i].inputShow = true
      this.to = name
      this.toId = id
      const targetElement = this.$refs.replyElement[i];
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    },
    _inputShow(i) {
      return this.comments[i].inputShow
    },
    //保存评论
    saveComment(userId,storyId,parentId,content,topicId){
      let storyComment={
        userId:userId,
        storyId:storyId,
        parentId:parentId,
        content:content,
        topicId:topicId
      }
      this.request.post("/storyComment/saveComment",storyComment).then(res=>{
        if (res.code=='200'){
          //重新加载评论
          this.$emit("reloadComment");
          this.$notify({
            title: '发表成功！',
            type:"success",
            duration:1500
          });
        }else{
          this.$notify({
            title: res.msg,
            type:"success",
            duration:1500
          });
        }
      })
    },
    sendComment() {
      if(!this.checkIsLogined())return;
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        let a = {}
        let input = document.getElementById('replyInput')
        // 创建一个新的 Date 对象
        var date = new Date();

        // 获取年份、月份、日期、小时和分钟
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();

        // 创建包含时间值的数组
        var timeArray = [year, month, day, hour, minute];
        let time = timeArray;
        a.name = this.myName
        a.comment = this.replyComment
        a.headImg = this.myHeader
        a.time = time
        a.id=this.myId
        a.reply=[]
        this.comments.push(a)
        input.innerHTML = '';
        this.saveComment(this.myId,this.storyId,0,this.replyComment,0);
        // console.log("当前发表的storyId:",this.storyId)
        console.log(this.replyComment)
        console.log(this.comments)
        this.replyComment = ''
      }
    },
    sendCommentReply(i) {
      if(!this.checkIsLogined())return;
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        let a = {}
        // 创建一个新的 Date 对象
        var date = new Date();

        // 获取年份、月份、日期、小时和分钟
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();

        // 创建包含时间值的数组
        var timeArray = [year, month, day, hour, minute];
        let time = timeArray
        a.from = this.myName
        a.to = this.to
        a.fromHeadImg = this.myHeader
        a.comment = this.replyComment
        a.time = time
        a.fromId=this.myId
        a.toId=this.toId
        this.comments[i].reply.push(a)
        console.log(this.to)
        document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
        this.saveComment(this.myId,this.storyId,this.toId,this.replyComment,this.comments[i].topicId);
        // console.log("comment[i]:",this.comments[i])
        console.log(this.replyComment)
        this.replyComment = ''
      }
    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerText;
      // console.log(this.replyComment)
    },
    dateStr(date) {
      //获取js 时间戳
      var time = new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000);
      //存储转换值
      var s;
      if (time < 60 * 10) {//十分钟内
        return '刚刚';
      } else if ((time < 60 * 60) && (time >= 60 * 10)) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if ((time < 60 * 60 * 24 * 30) && (time >= 60 * 60 * 24)) {
        //超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        //超过30天ddd
        // var date = new Date(parseInt(date));
        date = new Date(parseInt(date));
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      }
    }
  },
}
</script>
<style scoped lang="css">
.my-reply {
  margin-top: 20px;
  padding: 10px;
  background-color: #fafbfc;
}

.my-reply .header-img {
  display: inline-block;
  vertical-align: top;
}

.my-reply .reply-info {
  display: inline-block;
  margin-left: 5px;
  margin-top: 10px;
  width: 90%;
}

@media screen and (max-width: 1200px) {
  .my-reply .reply-info {
    width: 80%;
  }
}

.my-reply .reply-info .reply-input {
  min-height: 20px;
  line-height: 22px;
  padding: 10px 10px;
  color: #ccc;
  background-color: #fff;
  border-radius: 5px;
}

.my-reply .reply-info .reply-input:empty:before {
  content: attr(placeholder);
}

.my-reply .reply-info .reply-input:focus:before {
  content: none;
}

.my-reply .reply-info .reply-input:focus {
  padding: 8px 8px;
  border: 2px solid #00f;
  box-shadow: none;
  outline: none;
}

.my-reply .reply-btn-box {
  height: 25px;
  margin: 10px 0;
}

.my-reply .reply-btn-box .reply-btn {
  position: relative;
  float: right;
  margin-right: 15px;
}

.my-comment-reply {
  margin-left: 10px;
}

.my-comment-reply .reply-input {
  width: auto;
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}

.author-title {
  margin-top: 1rem;
  padding: 10px;
}

.author-title .header-img {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 30px;
}

.author-title .author-info {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.author-title .author-info > span {
  display: block;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.author-title .author-info .author-name {
  color: #000;
  font-size: 14px;
  font-weight: bold;
}

.author-title .author-info .author-time {
  font-size: 14px;
}

.author-title .icon-btn {
  width: 70px;
  padding: 0 !important;
  float: right;
}

@media screen and (max-width: 1200px) {
  .author-title .icon-btn {
    width: 20%;
    padding: 7px;
  }
}

.author-title .icon-btn > span {
  cursor: pointer;
}

.author-title .icon-btn .iconfont {
  margin: 0 5px;
}

.author-title .talk-box {
  margin: 10px 10px;
  font-size: 14px;
}

.author-title .talk-box > p {
  margin: 0;
}

.author-title .talk-box .reply {
  font-size: 14px;
  color: #000;
}

.author-title .reply-box {
  margin: 10px 0 0 10px;
  background-color: #fffbf8;
  border-radius: 5px;
}
.expand-btn {
  display: inline-block;
  margin-top: 8px;
  cursor: pointer;
  color: #4471d2;
  font-size: 14px;
  margin-left: 8px;
  transition: color 0.3s ease;
}

.expand-btn:hover {
  color: #830072;
}

.expand-btn span {
  padding-left: 4px;
}
.deleteComment{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 8px;

}

.deleteButton{
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: #ff6f6f;
  border-color: #ff6f6f;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 3px 6px;
}
.deleteButton:hover{
  background-color: #ff0000;
}

</style>
