<template>
  <div style="display: flex;text-align: left; font-size: 12px;line-height: 60px;">
    <el-input placeholder="请输入内容" v-model="input1" class="input-with-select" >
      <el-button slot="append" icon="el-icon-search" @click="gotowhat"></el-button>
    </el-input>
    <el-dropdown style="cursor: pointer">
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: center" >
        <img :src="user.avatarUrl?user.avatarUrl:'https://img-blog.csdnimg.cn/20290dd840684512ac61bf09f60e7889.png#pic_center'"
             alt=""
             style="width: 30px;margin-right: 10px;">
        <span>{{user.nickname}}</span><i class="el-icon-arrow-down"style="margin-right: 5px;"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <span style="text-decoration: none" @click="userInfo"><el-dropdown-item>个人信息 </el-dropdown-item></span>
        <span style="text-decoration: none" @click="logout"><el-dropdown-item>退出 </el-dropdown-item></span>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>


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
    }
  },

}
</script>

<style scoped>

</style>