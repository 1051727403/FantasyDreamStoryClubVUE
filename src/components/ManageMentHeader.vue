<template>
 <div id="nav-bar">
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
export default {
  name: "ManageMentHeader",
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
    var t3 = document.getElementById("avatar");
    if(this.user.nickname!=null){
      t3.style.display='block'
    }
    else{
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
        this.$router.push("/PersonalSpace")
    },

  },
}
</script>

<style scoped>

</style>