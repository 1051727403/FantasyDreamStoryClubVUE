<template>
  <div class="wrapper">
    <div style="margin: 80px auto;background-color: #fff;width: 400px;height: 550px;padding: 20px;border-radius: 10px;">
      <div style="margin: 15px 0;text-align: center;font-size: 24px"><b>注 册</b></div>
      <el-form :rules="rules" :model="user" ref="userForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="请重复输入密码" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-lock" show-password v-model="user.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input placeholder="请重复昵称" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-user-solid" show-password v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-chat-line-round" show-password v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input placeholder="请输入联系电话" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-mobile-phone" show-password v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item prop="invitationCode">
          <el-input placeholder="请输入邀请码" size="medium" style="margin: 2px 0;"prefix-icon="el-icon-office-building" show-password v-model="invitationCode"></el-input>
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
export default {
  name: "Login",
  data(){
    return{
      user:{
        isAdmin:"1"
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
        ],
        phone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'},
        ],
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
          //校验邮箱和电话
          if(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.user.email)==false){
            this.$message.warning("邮箱格式错误，请输入正确的邮箱!");
            return false;
          }
          //校验电话
          if(/^1[3456789]\d{9}$/.test(this.user.phone) == false){
            this.$message.warning("有机号码格式错误，请输入正确的电话号码!");
            return false;
          }
          //校验邀请码
          if(this.invitationCode=="114514"){
            this.request.post("/user/register",this.user).then(res=>{
              console.log("res:"+res);
              if(res.code==='200'){
                console.log(res.data);
                //将用户信息存储到浏览器中
                localStorage.setItem("user",JSON.stringify(res.data));
                this.$router.push("/")
                this.$message.success("注册成功！请重新登录！")
                this.$router.push("/login")
              }else{
                this.$message.error(res.msg)
              }
            })
          }else{
            console.log("邀请码验证失败！");
            this.$message.warning("邀请码有误！请重新填写")
            return false;
          }
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