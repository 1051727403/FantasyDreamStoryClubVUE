<template>
  <div>
    <div style="margin:0px 0;display: flex;flex-direction: row;justify-content:flex-end;">
      <div class="search_box">
        <el-input style="width: 400px" placeholder="请输入用户名、昵称" v-model="search" >
          <i slot="suffix" class="el-icon-close" @click="clearAndLoad"style="margin-top: 10px"></i>
        </el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      </div>
    </div>

    <div class="modify" style="margin: 10px 0;">
      <el-button type="primary" style="font-size: 12px; " @click="addUser">新增 <i class="el-icon-circle-plus-outline"style="margin-left:5px;"> </i></el-button>
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="确定要删除吗？"
          @confirm="delBash">
        <el-button type="danger" style="font-size: 12px;" slot="reference">批量删除<i class="el-icon-remove-outline" style="margin-left:5px;"> </i></el-button>
      </el-popconfirm>
    </div>
    <!--顶部搜索筛选等操作 end-->
    <!--表格主体 start-->
    <el-table :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'id', order: 'descending'}"
              @selection-change="handleSelectionChange"
              :header-cell-style="tableHeaderColor">
      <el-table-column type="selection" width="55" ></el-table-column>
      <el-table-column prop="id" label="id"  width="80"></el-table-column>

      <el-table-column prop="username" label="用户名"  width="120"></el-table-column>
      <el-table-column prop="nickname" label="昵称"  width="120"></el-table-column>
      <el-table-column prop="password" label="密码"  width="120"></el-table-column>
      <el-table-column prop="coverUrl" label="头像"  width="100">
        <template v-slot="scope" >
          <img :src="tableData[scope.$index].avatarUrl" height="40px">
        </template>
      </el-table-column>
      <el-table-column prop="removed" label="是否注销"  width="120"></el-table-column>
      <el-table-column label="操作" >
        <template v-slot="scope" >
          <el-button type="success" @click.native.prevent="modifyUser(scope.$index)">编辑<i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="确定要删除吗？"
              @confirm="del(scope.$index)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
<!--    &lt;!&ndash;表格主体 end&ndash;&gt;-->
<!--    &lt;!&ndash;分页 end&ndash;&gt;-->
    <div class="pagination" >
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-sizes="[5,8, 10, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
      </el-pagination>
    </div>
<!--    &lt;!&ndash;分页 end&ndash;&gt;-->
<!--    &lt;!&ndash;嵌套表单 start&ndash;&gt;-->
    <el-dialog :title="dialogFormName" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" :rules="userRules" ref="ruleForm" :model="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatarUrl">
          <el-input v-model="form.avatarUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="是否注销" >
          <el-input v-model="form.removed" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false;">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
<!--    &lt;!&ndash;嵌套表单 end&ndash;&gt;-->
  </div>
</template>

<script>
import Md5 from 'js-md5'
export default {
  name: "User",

  data(){
    return {
      plate: "",
      func: "",
      tableData: [],
      form:{
        username:"",
        nickname:"",
        avatarUrl:"",
      },
      dialogFormName:"",
      dialogFormVisible:false,
      userRules:{
        username:[{required:true,message:'用户名不可为空',trigger:'blur'}],
        nickname:[{required:true,message:'昵称不可为空',trigger:'blur'}],
        password:[{required:true,message:'密码不可为空',trigger:'blur'}]
      },
      pageNum:1,
      pageSize:5,
      count:0,
      search:""
    }
  } ,
  created() {
    this.$emit("generateTab",this.plate,this.func)
    this.load()
  },
  methods :{
    //load
    load(){
      this.request.get("/admin/userPage",{
        params: {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          search:this.search,         //根据用户名、昵称模糊查询
        }
      }).then(res=>{
        console.log(res.records)
        this.tableData = res.records;
        this.count = res.total;
      })
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #e0f6fe;color: #303133;font-weight: 600;font-size:12px;'
      }
    },
    //点击编辑用户
    modifyUser(idx){
      //console.log("tableData:",this.tableData);
      //console.log("index:"+idx)
      //console.log("row:"+res)
      this.dialogFormName="【编辑用户】"
      this.dialogFormVisible=true;
      this.form=this.tableData[idx];
    },
    //点击删除用户
    del(idx){
      let id=this.tableData[idx].id;
      console.log(id)
      this.request.post("/admin/deleteUser?userId="+id).then(res=>{
        if(res.code === "200"){
          console.log(res)
          this.$message.success("删除成功！");
          this.load();
        }else{
          this.$message.error("删除失败！");
        }
      })
    },
    //批量删除用户——选择
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection = val;
    },
    //分页
    handleSizeChange(pageSize){
      console.log("pageSize:"+pageSize);
      this.pageSize=pageSize;
      this.load();
    },
    handleCurrentChange(pageNum){
      console.log("pageNum:"+pageNum);
      this.pageNum=pageNum;
      this.load();
    },
    clearAndLoad(){
      this.pageNum=1;
      this.pageSize=5;
      this.search="";
      this.load();
    },
    //保存用户
    saveUser(){
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          this.request.post("/admin/upUserInfo", {
            "id":this.form.id,
            "userName":this.form.username,
            "nickName":this.form.nickname,
            "avatarUrl":this.form.avatarUrl,
            "password":Md5(this.form.password),
            "removed":this.form.removed,
          }).then(res=>{
            this.userdialogVisible = false
            console.log(res)
            if(res.code==="200"&& res.data===true ){
              this.$router.go(0)
              this.$message.success("修改用户成功")
            }
            else{
              this.$router.go(0)
              this.$message.error(res.msg)
            }
          })
          this.dialogFormVisible=false;
        }else{

        }
      })
    },
    //点击新增用户弹窗
    addUser(){
      this.form={
        username:"",
        nickname:"",
        avatarUrl:"",
      }
      console.log(this.from)
      this.dialogFormName="【新增用户】"
      this.dialogFormVisible=true;
    },
    //点击批量删除按钮
    delBash(){
      console.log("点击批量删除按钮")
      let ids=this.multipleSelection.map(v=>v.id)
      console.log(ids)
      this.request.post("/admin/deleteBatchUser",ids).then(res=>{
        console.log(res)
        if(res){
          this.$message.success("删除成功！");
          this.load();
        }else{
          this.$message.error("删除失败！");
        }
      })
    },
}
}
</script>

<style scoped>

</style>
