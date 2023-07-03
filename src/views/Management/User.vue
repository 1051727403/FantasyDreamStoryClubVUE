<template>
  <div>
    <div style="margin:10px 0;display: flex;flex-direction: row;justify-content:flex-end;">
      <div class="search_box">
        <el-input style="width: 400px" placeholder="请输入用户名、电话号码、校区等进行模糊查询" v-model="search" >
          <i slot="suffix" class="el-icon-close" @click="clearAndLoad"style="margin-top: 10px"></i>
        </el-input>

        <el-button class="ml-5"type="primary" @click="load">搜索</el-button>
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
          @confirm="delBash"
      >
        <el-button type="danger" style="font-size: 12px;" slot="reference">批量删除<i class="el-icon-remove-outline" style="margin-left:5px;"> </i></el-button>
      </el-popconfirm>
      <el-upload action="http://localhost:9090/user/import" style="display: inline-block"
                 :show-file-list="false" accept="xlsx" :on-success="importSuccess":on-error="importFail" :headers="headersObj">
        <el-button type="primary" style="font-size: 12px; margin-left: 10px;">导入<i class="el-icon-bottom"style="margin-left:5px;"> </i></el-button>
      </el-upload>
      <el-button class="ml-5" type="primary" style="font-size: 12px; " @click="exp">导出<i class="el-icon-top"style="margin-left:5px;"> </i></el-button>
    </div>
    <!--顶部搜索筛选等操作 end-->
    <!--表格主体 start-->
    <el-table :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'newid', order: 'descending'}"
              @selection-change="handleSelectionChange"
              :header-cell-style="tableHeaderColor">
      <el-table-column type="selection" width="55" ></el-table-column>
      <el-table-column prop="newid" label="id"  width="80"></el-table-column>
      <el-table-column prop="username" label="用户名(学号)"  width="120"></el-table-column>
      <el-table-column prop="password" label="密码"  width="120"></el-table-column>
      <el-table-column prop="nickname" label="昵称"  width="100"></el-table-column>
<!--      <el-table-column prop="email" label="邮箱" sortable width="180"></el-table-column>-->
      <el-table-column prop="phone" label="电话号码"  width="150"></el-table-column>
      <el-table-column prop="campus" label="校区"width="120"></el-table-column>
      <el-table-column prop="area" label="片区"width="140"></el-table-column>
      <el-table-column prop="building" label="楼幢号"width="100"></el-table-column>
      <el-table-column prop="dormitory" label="宿舍号"width="100"></el-table-column>

      <el-table-column label="操作" >
        <template v-slot="scope" >
          <el-button type="success" @click.native.prevent="modifyUser(scope.$index)">编辑 <i class="el-icon-edit"></i></el-button>
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
    <!--表格主体 end-->
    <!--分页 end-->
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
    <!--分页 end-->
    <!--嵌套表单 start-->
    <el-dialog :title="dialogFormName" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="校区"prop="campus">
          <el-input v-model="form.campus" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="片区"prop="area">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="楼幢号"prop="building">
          <el-input v-model="form.building" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号"prop="dormitory">
          <el-input v-model="form.dormitory" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
    <!--嵌套表单 end-->
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      //设置页签
      plate:"系统管理",
      func:"用户管理",
      tableData: [],
      count:0,
      pageNum:1,
      pageSize:5,
      search:"",
      multipleSelection:[],
      dialogFormVisible:false,
      form:{
        username:"",
        password:"",
        nickname:"",
        phone:"",
        campus:"",
        area:"",
        building:"",
        dormitory:""
      },
      dialogFormName:"",
      headersObj:{
        token:JSON.parse(localStorage.getItem("user")).token
      },
      rules:{
        username:[
          {register:true,message:"用户名不可为空",trigger:"blur"},
          {min:3,max:15,message: "长度在 3 到 15 之间" ,trigger:"blur"},
        ],
        password:[
          {register:true,message:"密码不可为空",trigger:"blur"},
          {min:3,max:15,message: "长度在 3 到 15 之间" ,trigger:"blur"}
        ],
        nickname:[
          {register:true,message:"昵称不可为空",trigger:"blur"},
          {min:3,max:15,message: "长度在 3 到 15 之间" ,trigger:"blur"}
        ],
        phone: [
          {register:true,message:"联系电话不可为空",trigger:"blur"},
          {min:11,max:13,message: "长度在 11 到 13 之间",trigger:"blur"}
        ],
        building: [
          {register:true,message:"楼号不可为空",trigger:"blur"},
        ],
        dormitory: [
          {register:true,message:"寝室号不可为空",trigger:"blur"},
        ]
      }
    }
  },
  created() {
    //请求分页查询表格数据
    this.load();
    this.$emit("generateTab",this.plate,this.func)
  },
  methods:{
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #e0f6fe;color: #303133;font-weight: 600;font-size:12px;'
      }
    },
    load() {
      //axios方式http://localhost:9090前缀写在了request.js文件中，可省略
      this.request.get("user/page",{
        params: {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          search:this.search,         //根据姓名、昵称、邮箱、地址、手机号五个方面模糊查询
        }
      }).then(res=>{
        console.log(res)
        this.tableData = res.records;
        this.count = res.total;
        //逆序编号
        for(let i=0;i<this.pageSize;i++){
          this.tableData[i].newid=this.count-this.pageSize*(this.pageNum-1)-i;
        }
      })
      // fetch("http://localhost:9090/user/page?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize+"&search="+this.search)
      //     .then(res => res.json()).then(res => {
      //   console.log(res);
      //   this.tableData = res.records;
      //   this.count = res.total;
      // })
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
    //点击新增用户弹窗
    addUser(){
      this.form={
          username:"",
          password:"",
          nickname:"",
          phone:"",
          campus:"",
          area:"",
          building:"",
          dormitory:""
      }
      console.log(this.from)
      this.dialogFormName="【新增用户】"
      this.dialogFormVisible=true;
    },
    //点击确认保存或更新用户信息
    saveUser(){
      console.log(this.form.username)
      if(this.form.username==""||this.form.password==""||this.form.nickname==""||
      this.form.phone==""||this.form.campus==""||this.form.area==""||this.form.building==""||this.form.dormitory==""){
        this.$message.error("用户信息不能为空！")
        console.log("用户信息不能为空！")
        return false
      }
      //校验账号和密码长度以及电话号码
      if(this.form.username.length<3||this.form.username.length>15){
        this.$message.error("用户名长度应在3-15范围内！")
        console.log("用户名长度应在3-15范围内！")
        return false
      }
      if(this.form.password.length<3||this.form.password.length>15){
        this.$message.error("密码长度应在3-15范围内！")
        console.log("密码长度应在3-15范围内！")
        return false
      }
      if(this.form.phone.length<11||this.form.phone.length>13){
        this.$message.error("电话号码长度应在11-13范围内！")
        console.log("电话号码长度应在3-15范围内！")
        return false
      }
      if(/^1[3456789]\d{9}$/.test(this.form.phone) == false){
        this.$message.warning("手机号码格式错误，请输入正确的电话号码!");
        return false;
      }

        this.dialogFormVisible = false;
        this.request.post("/user", this.form).then(res => {
          console.log(res)
          if (res.code == "200") {
            this.$message.success("保存成功！");
            this.load();
          } else {
            this.$message.error(res.msg);
          }
        })
    },
    //用户点击取消
    cancel(){
      this.dialogFormVisible=false;
      this.load();
    },
    //点击编辑用户
    modifyUser(idx){
      //console.log("tableData:",this.tableData);
      //console.log("index:"+idx)
      //console.log("row:"+res)
      this.dialogFormName="【编辑用户】"
      let res=this.tableData[idx];
      this.dialogFormVisible=true;
      delete res.newid;
      this.form=res;
    },
    //点击删除用户
    del(idx){
      let id=this.tableData[idx].id;
      this.request.delete("/user/"+id).then(res=>{
        console.log(res)
        if(res){
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

<style>
.el-menu {
  height: 100%;
  border-right-width: 0;
}
.pagination,.search_box{
  padding: 10px 0px;
}
</style>