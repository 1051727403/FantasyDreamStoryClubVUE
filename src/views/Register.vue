<template>
  <div class="wrapper">
    <div style="margin: 150px auto;background-color: #fff;width: 400px;height: 380px;padding: 20px;border-radius: 10px;">
      <div style="margin: 15px 0;text-align: center;font-size: 24px"><b>注 册</b></div>
      <el-form :rules="rules" :model="user" ref="userForm">
        <el-form-item prop="userName">
          <el-input placeholder="请输入账号" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-user" v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item prop="nickName">
          <el-input placeholder="请输入昵称" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-user-solid" v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="确认密码" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-lock" show-password v-model="user.confirmPassword"></el-input>
        </el-form-item>
        <div style="margin-top: 25px;display: flex;justify-content: space-around;">
          <el-button type="primary"size="small" autocomplete="off" style="width: 150px" @click="reg">确定注册</el-button>
          <el-button type="warning"size="small" autocomplete="off" style="width: 150px" @click="backLogin">返回登录页面</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Md5 from 'js-md5'
export default {
  name: "Login",
  data(){
    return{
      user:{},
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
        ]
      },
      invitationCode:"",
    }
  },
  methods:{
    //进行注册
    reg(){
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          //校验
          if(this.user.password!==this.user.confirmPassword) {
            this.$message.warning("两次输入的密码不一致！");
            return false;
          }
          console.log("user: ",this.user)
          this.user.password = Md5(this.user.password)
          this.user.avatarUrl = "#"
          this.request.post("/user/upUserInfo",this.user).then(res=>{{
            if(res.code==="200"){
              this.$message.success("注册成功")
              this.user = {}
              this.$router.push("/login")
            }
            else{
              this.user = {}
              console.log(res)
              this.$message.error("注册失败,已有用户名")
            }
          }})
        } else {
          console.log('注册信息填写有误!');
          return false;
        }
      });
    },
    //返回登录页面
    backLogin(){
      this.$router.push("/login");
    }

  }
}
</script>

<style scoped>
  .wrapper{
    height: 100vh;
    background-image: linear-gradient(to bottom right,#74ebd5,#abb6e5);
    overflow: hidden;
  }



</style>