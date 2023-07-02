<template>
  <div id="nav-bar">
      <el-input class="input-with-select" placeholder="请输入内容" v-model="input1"  >
        <el-button slot="append" icon="el-icon-search"  @click="gotowhat"></el-button>
      </el-input>
      <ul class="the-right" >
        <li id="llogin"><a href="/login" >登录</a></li>
        <li id="lregister"><a href="/register" >注册</a></li>
        <li><a href="#">反馈留言</a></li>
      </ul>
      <el-dropdown style="cursor: pointer;margin-top: 5px;margin-right: 20px;float: right" id="avatar">
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;" >
          <img :src="user.avatarUrl"
               alt=""
               style="width: 40px;height:40px;margin-right: 10px;
                border-radius: 40%;">
          <span >{{user.nickname}}</span>
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
  mounted() {
    var t1 = document.getElementById("llogin");
    var t2 = document.getElementById("lregister");
    var t3 = document.getElementById("avatar");
    //console.log(this.user)
    if(this.user.nickname!=null){
      t1.style.display='none'
      t2.style.display='none'
      t3.style.display='block'
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
        localStorage.removeItem("user");
        this.$message.success("退出成功！");
        this.$router.push("/login");
    },
    userInfo(){
      console.log("this.$route.path:",this.$route.path)
      let nowUrl=this.$route.path
      if(nowUrl[1]=='M') {
        this.$router.push("/Manage/userInfo")
      }else{
        console.log(this.user)
        this.$router.push("/PersonalSpace")
        //location.reload()
        this.$router.go(1)
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

#nav-bar {
  text-align: left;
  font-size: 15px;
  line-height: 12px;
  height: 50px;
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
}

.input-with-select{
  width: 300px;
  float: left;
  margin-top: 10px;
  margin-left: 450px;;
  margin-right: 450px;;
}
.the-right{
  display: block;
  float: left;
  margin-top: 20px;
}
.the-right li{
  list-style: none;
  float:left;
  margin-left: 25px ;
}
.the-right li a{
  text-decoration: none;
  color: #b0b0b0;
}
.the-right li a:hover{
  color: #00a87e;
}
.the-right li span{
  color: #424242;
}
</style>