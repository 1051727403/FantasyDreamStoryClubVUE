<template>
  <div class="userInfo" style="margin: 20px 0; " >
    <el-form :model="userinfo" :rules="rules" ref="userinfo" label-position="right" label-width="100px">
      <el-form-item label="昵称"  prop="nickname" >
        <el-input  v-model="userinfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户名(学号)"  >
        <el-input  v-model="userinfo.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input :disabled="true" placeholder="******"></el-input >
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input  v-model="userinfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="校区" prop="campus">
        <el-input  v-model="userinfo.campus"></el-input>
      </el-form-item>
      <el-form-item label="片区" prop="area">
        <el-input  v-model="userinfo.area"></el-input>
      </el-form-item>
      <el-form-item label="楼号" prop="building">
        <el-input  v-model="userinfo.building"></el-input>
      </el-form-item>
      <el-form-item label="寝室号" prop="dormitory">
        <el-input  v-model="userinfo.dormitory"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upinfo('userinfo')">保存</el-button>
        <el-button type="primary" @click="changepassword">忘记密码</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="确认修改" :visible.sync="dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="原密码">
          <el-input style="width: 200px" v-model="oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input style="width: 200px" v-model="newpassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input style="width: 200px" v-model="newpasswordag"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "userinfo",
  data(){
    return {
      plate:"个人",
      func:"信息管理",
      pageNum:1,
      pageSize:1,
      search:"",
      count:0,
      dialogFormVisible:false,
      oldpassword:"1",
      newpassword:"1",
      newpasswordag:"1",
      userinfo: {
        id:0,
        username:"",
        nickname: "11",
        phone: "33",
        email:"44",
        campus: "55",
        area:"66",
        building:"77",
        dormitory:"88",
      },
      rules:{
        nickname:[
          {required:true,message:"昵称不可为空",trigger:"blur"},
          {min:3,max:10,message: "长度在 3 到 10 之间" ,trigger:"blur"}
        ],
        phone: [
          {required:true,message:"联系电话不可为空",trigger:"blur"},
          {min:11,max:13,message: "长度在 11 到 13 之间",trigger:"blur"}
        ],
        campus: [
          {required:true,message:"校区不可为空",trigger:"blur"},
        ],
        area: [
          {required:true,message:"片区不可为空",trigger:"blur"},
        ],
        building: [
          {required:true,message:"楼号不可为空",trigger:"blur"},
        ],
        dormitory: [
          {required:true,message:"寝室号不可为空",trigger:"blur"},
        ]
      }
    }
  },
  created() {
    this.$emit("generateTab",this.plate,this.func)
    this.load()
  },
  methods: {
    load() {
      this.userinfo.username = JSON.parse(localStorage.getItem("user")).username
      this.request.get("user/getUserInfo?username="+this.userinfo.username).then(res => {
        if(res.code=="200"){
          let tab = res.data
          this.userinfo.id = tab.id
          this.userinfo.nickname = tab.nickname
          this.userinfo.phone = tab.phone
          this.userinfo.email = tab.email
          this.userinfo.campus =tab.campus
          this.userinfo.area = tab.area
          this.userinfo.building =tab.building
          this.userinfo.dormitory = tab.dormitory
          this.password="******"
          console.log(tab)
        }
        else{
          this.$message.error("数据失败！");
        }
      })
    },

    //点击确认保存或更新用户信息
    upinfo(formName){
      this.dialogFormVisible=false;
      this.$refs[formName].validate((valid)=>{
        if(valid){
          console.log('success');
          this.request.post("/user/upUserInfo",this.userinfo).then(res=>{
            console.log(res)
            if(res.code=="200"){
              this.$message.success("保存成功！请重新登陆！")
              this.$router.push("/")
            }else{
              this.$message.error("保存失败！");
            }
          })
        }
        else{
          console.log('error');
        }
      })

    },
    confirm(){
      if(this.newpassword.length<3 || this.newpassword.length>16){
        this.$message.error("密码长度应在 3 到 15 之间");
      }
      else if(this.newpassword!=this.newpasswordag){
        this.$message.error("新密码与验证密码不匹配");
      }
      else{
        this.request.post("/user/changepw?username="+this.userinfo.username+"&password="+ this.oldpassword+"&newpassword="
            +this.newpassword).then(res=>{
          if(res.code=="200"){
            this.$message.success("修改成功！请重新登陆！")
            this.$router.push("/")
          } else{
            this.$message.error("原密码错误,修改失败！");
          }

        })
      }
    },
    cancel(){
      this.dialogFormVisible=false
      this.newpassword="";
      this.oldpassword="";
      this.newpasswordag="";
    },
    changepassword(){
      this.dialogFormVisible=true;
      this.newpassword="";
      this.oldpassword="";
      this.newpasswordag="";
    }
  }

}
</script>

<style scoped>
.userInfo .el-input{
  width: 300px;
}
</style>