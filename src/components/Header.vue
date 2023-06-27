<template>
  <div style="display: flex;text-align: left; font-size: 15px;line-height: 12px; height: 20px">
      <el-input class="input-with-select" placeholder="请输入内容" v-model="input1"  >
        <el-button slot="append" icon="el-icon-search"  @click="gotowhat"></el-button>
      </el-input>
      <ul class="the-right" >
        <li id="llogin"><a href="/login" >登录</a><span>|</span></li>
        <li id="lregister"><a href="/register" >注册</a><span>|</span></li>
        <li><a href="#">反馈留言</a></li>
      </ul>
      <el-dropdown style="cursor: pointer;margin-top: 10px;margin-left: 20px;" id="avatar">
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;" >
          <img :src="user.avatarUrl"
               alt=""
               style="width: 32px;margin-right: 10px;
                border-radius: 40%;">
          <span>{{user.nickname}}</span>
          <i class="el-icon-arrow-down" style="margin-right: 5px;"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <span style="text-decoration: none" @click="userInfo"><el-dropdown-item>个人信息 </el-dropdown-item></span>
          <span style="text-decoration: none" @click="logout"><el-dropdown-item>退出 </el-dropdown-item></span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

</template>

<script>


import user from "@/views/Management/User.vue";

export default {
  name: "Header",
  props: {
    collapseBthClass:String,
    collapse:function(){}
  },
  data(){
    return{
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      input1:""
    }
  },
  created() {


  },
  mounted() {
    var t1 = document.getElementById("llogin");
    var t2 = document.getElementById("lregister");
    var t3 = document.getElementById("avatar");
    console.log(this.user)
    if(this.user.nickname!=null){
      t1.style.display='none'
      t2.style.display='none'
      t3.style.display='block'
      var tem = JSON.parse(localStorage.getItem("user"))
      tem.nickname="45"
      tem.avatarUrl="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F5b342386-43ce-4ab5-bf30-c1bb7e2d85d8%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690453682&t=8b6630dbd32cead9dfe82e5adfe86031"
      localStorage.setItem("user",JSON.stringify(tem));
    }
    else{
      t1.style.display='block'
      t2.style.display='block'
      t3.style.display='none'
    }
  },



  methods:{
    //退出跳转同时清楚localstorage中的数据
    logout(){
        this.$router.push("/login");
        localStorage.removeItem("user");
        this.$message.success("退出成功！");
    },
    userInfo(){
      console.log("this.$route.path:",this.$route.path)
      let nowUrl=this.$route.path
      if(nowUrl[1]=='M') {
        this.$router.push("/Manage/userInfo")
      }else{
        this.$router.push("/App/PersonalSpace")
      }
    },
    gotowhat(){
      console.log("搜索"+this.input1)
      this.$router.push("/app/storyinfo");
      this.input1=""
    }
  },

}
</script>

<style scoped>

.input-with-select{
  width: 300px;
  margin: 10px auto;
  float:left;
}
.the-right{
  display: block!important;
  float: right;
  margin-top: 20px;
}
.the-right li{
  list-style: none;
  float:left;
  margin-left: 27px ;
}
.the-right li a{
  text-decoration: none;
  color: #b0b0b0;
}
.the-right li span{
  color: #424242;
}
</style>