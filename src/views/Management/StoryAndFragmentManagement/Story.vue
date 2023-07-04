<template>
  <div>
    <div style="margin:10px 0;display: flex;flex-direction: row;justify-content:flex-end;">
      <div class="search_box">
        <el-input style="width: 400px" placeholder="请输入故事名、介绍" v-model="search" >
          <i slot="suffix" class="el-icon-close" @click="clearAndLoad"style="margin-top: 10px"></i>
        </el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      </div>
    </div>

    <div class="modify" style="margin: 10px 0;">
      <el-button type="primary" style="font-size: 12px; " @click="addStory">新增 <i class="el-icon-circle-plus-outline"style="margin-left:5px;"> </i></el-button>
    </div>
    <!--顶部搜索筛选等操作 end-->
    <!--表格主体 start-->
    <el-table :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'id', order: 'descending'}"
              :header-cell-style="tableHeaderColor">
      <el-table-column prop="id" label="id"  width="80"></el-table-column>
      <el-table-column prop="storyName" label="故事名"  width="120"></el-table-column>
      <el-table-column prop="coverUrl" label="故事封面"  width="120">
        <template v-slot="scope" >
          <img :src="tableData[scope.$index].coverUrl" height="80px" width="50px">
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="作者ID"  width="120"></el-table-column>
      <el-table-column prop="introduce" label="介绍"  width="120"></el-table-column>
      <el-table-column prop="totalLike" label="总喜欢数"  width="120"></el-table-column>
      <el-table-column prop="totalComment" label="总评论数"  width="120"></el-table-column>
      <el-table-column prop="totalCollection" label="总收藏数"  width="120"></el-table-column>
      <el-table-column label="操作" >
        <template v-slot="scope" >
          <el-button type="success" @click.native.prevent="modifyStory(scope.$index)">编辑<i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="确定要删除吗？"
              @confirm="del(scope.$index)">
            <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>
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
      <el-form label-width="100px" :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="故事名" prop="username">
          <el-input v-model="form.storyName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="封面url" prop="coverUrl">
          <el-input v-model="form.coverUrl" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.dialogFormVisible=false;">取 消</el-button>
        <el-button type="primary" @click="saveStory">确 定</el-button>
      </div>
    </el-dialog>
    <!--    &lt;!&ndash;嵌套表单 end&ndash;&gt;-->
  </div>
</template>

<script>
export default {
  name: "Story",
  data(){
    return {
      plate: "",
      func: "",
      tags:[
        {
          tagId:1,
          tagName:"幻想"},
        {
          tagId:2,
          tagName:"恋爱"},
      ],
      tableData: [],
      form:{
        storyName:"",
        totalLike:0,
        totalCollection:0,
        totalComment:0,
        tags:[],
        userId:"",
        storyId:"",
        coverUrl:"",
      },
      dialogFormName:"",
      dialogFormVisible:false,
      rules:{
        username:[
          {register:true,message:"用户名不可为空",trigger:"blur"},
        ],
        nickname:[
          {register:true,message:"昵称不可为空",trigger:"blur"},
        ],
        avatarUrl:[
          {register:true,message:"头像不可为空",trigger:"blur"},
          //{min:3,max:15,message: "长度在 3 到 15 之间" ,trigger:"blur"}
        ],
      },
      pageNum:1,
      pageSize:5,
      count:0,
      search:""
    }
  } ,
  created() {
    this.$emit("generateTab",this.plate,this.func)
    //标签信息
    this.request.get("/tag/getTags").then(res=>{
      if(res.code==="200"){
        this.tags = res.data
      }
      else{
        this.$message.error("标签失败")
      }
    })
    this.load()
  },
  methods :{
    //load
    load(){
      this.request.get("/admin/storyPage",{
        params: {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          search:this.search,         //根据故事名、介绍模糊查询
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
    //点击编辑故事
    modifyStory(idx){
      //console.log("tableData:",this.tableData);
      //console.log("index:"+idx)
      //console.log("row:"+res)
      this.dialogFormName="【编辑故事】"
      this.dialogFormVisible=true;
      this.form=this.tableData[idx];
    },
    //点击删除故事
    del(idx){
      let id=this.tableData[idx].id;
      console.log(id)
      this.request.post("/admin/deleteStory?storyId="+id).then(res=>{
        if(res.code === "200"){
          this.$message.success("删除成功！");
          this.load();
        }else{
          this.$message.error("删除失败！");
        }
      })
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
    //保存故事
    saveStory(){
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          this.form.userId = JSON.parse(localStorage.getItem("user")).id
          console.log(this.form)
          this.request.post("/story/saveStory",this.form).then(res=>{
            console.log(res)
            this.storydialogVisible=false
            if(res.code==="200"){
              this.$message.success("上传成功")
            }
            else {
              this.$message.error("上传失败")
            }
          })
        }
        else{
          this.$message.warning("请补充表格")
          //console.log("error submit!");
          return false;
        }
      })
      this.dialogFormVisible=false;
    },
    //点击新增故事弹窗
    addStory(){
      this.form={
        username:"",
        nickname:"",
        avatarUrl:"",
      }
      console.log(this.from)
      this.dialogFormName="【新增故事】"
      this.dialogFormVisible=true;
    },
  }
}
</script>

<style scoped>

</style>
