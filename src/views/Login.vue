<template>
  <div class="login-wrapper" style="margin-top: 0;padding: 0">
    <div style="opacity:0.95;margin: 200px auto;background-color: #fff;width: 390px;height: 350px;padding: 20px;border-radius: 10px;
    box-shadow: gray 4px 4px 10px">
      <img src="../assets/image/logo.png" style="height: 70px;cursor: pointer;" @click="jumpToIndex">
      <div  @click="jumpToIndex" style="cursor:pointer;margin: 10px 0;text-align:center;font-weight: bold;font-size: 24px; letter-spacing: 1px; color: #ff7d30;text-shadow: -1px -1px 0 #fffbe5, 1px -1px 0 #fffbe5, -1px 1px 0 #fffbe5, 1px 1px 0 #fffbe5;"><b>绮梦故事会</b></div>
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
          <el-button type="warning" size="small" autocomplete="off" style="width: 170px" @click="passworddialogVisible = true">修改密码</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog title="修改密码" :visible.sync="passworddialogVisible" width="50%">
      <el-form :model="passwordInfo" :rules="passwordRules" ref="passwordInfoForm">
        <el-form-item label="用户名" label-width=120 prop="userName">
          <el-input v-model="passwordInfo.userName" autocomplete="off"></el-input>
        </el-form-item >
        <el-form-item label="旧密码" label-width=120 prop="oldPassword">
          <el-input v-model="passwordInfo.oldPassword" autocomplete="off" show-password></el-input>
        </el-form-item >
        <el-form-item label="新密码" label-width=120 prop="newPassword">
          <el-input v-model="passwordInfo.newPassword" autocomplete="off" show-password></el-input>
        </el-form-item >
        <el-form-item label="验证密码" label-width=120 prop="newPasswordAg">
          <el-input v-model="passwordInfo.newPasswordAg" autocomplete="off" show-password></el-input>
        </el-form-item >
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passworddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savepassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Md5 from 'js-md5'
export default {
  name: "Login",
  data(){
    return{
      passworddialogVisible:false,
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
      },
      passwordRules:{
        userName:[
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        oldPassword:[
          {required: true, message: '请输入原密码', trigger: 'blur'}
        ],
        newPassword:[
          {required: true, message: '请输入新密码', trigger: 'blur'}
        ],
        newPasswordAg:[
          {required: true, message: '请输入验证密码', trigger: 'blur'}
        ],
      },
      passwordInfo:{
        userName:"",
        oldPassword:"",
        newPassword:"",
        newPasswordAg:""
      },

    }
  },
  methods:{
    //点击logo跳转主页
    jumpToIndex(){
      window.location.replace("/APP/Index")
    },
    //登录
    login(){
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          var str = Md5(this.user.password)
          //alert('登陆中!');
          this.request.post("/user/login?username="+this.user.username+"&password="+str).then(res=>{
            if(res.code==='200'){
              //将用户信息存储到浏览器中
              console.log(res.data)
              localStorage.setItem("user",JSON.stringify(res.data.data));
              if(res.data.is_admin=="1") this.$router.push("/Manage/Index");
              else this.$router.push("/APP/Index")
              this.$message.success("登录成功！")
            }else{
              this.$message.error("error"+res.msg)
            }
          })
        } else {
          this.$message.error("请按表格填写")
          return false;
        }
      });
    },
    //注册
    reg(){
      this.$router.push("/register");
    },
    //修改密码
    savepassword(){
      this.$refs["passwordInfoForm"].validate((valid) => {
        if(valid){
            this.passworddialogVisible = false;
            if(this.passwordInfo.newPassword!=this.passwordInfo.newPasswordAg){
              this.$message.warning("新密码和验证密码不同，请重试！")
            }
            else{
              this.passwordInfo.oldPassword = Md5(this.passwordInfo.oldPassword)
              this.passwordInfo.newPassword = Md5(this.passwordInfo.newPassword)
              this.request.post("/user/changePassword?userName="+this.passwordInfo.userName+"&oldPassword="+this.passwordInfo.oldPassword+
                  "&newPassword="+this.passwordInfo.newPassword).then(res=>{
                if(res.code==="200"){
                  this.$message("密码修改成功")

                }
                else{
                  this.$message("密码修改错误")
                  this.passwordInfo = {}
                }
              })
            }
        }else {
          this.$message.warning('用户名密码填写有误!')
          return false;
        }

      })
    }

  }
}
</script>

<style scoped>
.login-wrapper{
  height: 100vh;
  background: url('https://pic4.zhimg.com/v2-666eb28ba8e686a26ae7295cd6a2a47a_r.jpg');
  background-size: 100% 100%;
  overflow: hidden;
}


/*linear-gradient(to bottom right,#FC466B,#3F5EFB);*/


</style>