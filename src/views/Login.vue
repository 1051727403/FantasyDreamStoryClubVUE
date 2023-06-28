<template>
  <div class="login-wrapper" style="margin-top: 0;padding: 0">
    <div style="opacity:0.98;margin: 200px auto;background-color: #fff;width: 390px;height: 350px;padding: 20px;border-radius: 10px;
    box-shadow: gray 4px 4px 10px">
      <img src="https://www.shu.edu.cn/images/logoft.svg" style="height: 45px;"></img>
      <div style="margin: 20px 0;text-align: center;font-size: 24px;color: #153b7f"><b>绮梦故事会</b></div>
      <el-form :rules="rules" :model="user" ref="userForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" size="medium" style="margin: 10px 0;"prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0;"prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
        <div style="margin: 10px 0;display: flex;justify-content: space-around;">
          <el-button type="primary" size="small" autocomplete="off" style="width: 170px" @click="login">登录</el-button>
          <el-button type="warning" size="small" autocomplete="off" style="width: 170px" @click="reg">注册</el-button>
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
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    //登录
    login(){
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          var str = Md5(this.user.password)
          console.log(str)
          //alert('登陆中!');
          this.request.post("/user/login?username="+this.user.username+"&password="+str).then(res=>{
            console.log("res:"+res);
            if(res.code==='200'){
              //console.log(res.data);
              //将用户信息存储到浏览器中
              console.log(res.data)
              localStorage.setItem("user",JSON.stringify(res.data.data));

              if(res.data.is_admin=="1") this.$router.push("/Manage/home");
              else this.$router.push("/APP/Index")
              this.$message.success("登录成功！")
            }else{
              this.$message.error("error"+res.msg)
            }
          })
        } else {
          console.log('用户名密码填写有误!');
          return false;
        }
      });
    },
    //注册
    reg(){
      this.$router.push("/register");
    },
    //表单验证

  }
}
</script>

<style scoped>
.login-wrapper{
  height: 100vh;
  background: url('https://www.shu.edu.cn/2022banner/20230226-2.jpg');
  background-size: 100% 100%;
  overflow: hidden;
}


/*linear-gradient(to bottom right,#FC466B,#3F5EFB);*/


</style>