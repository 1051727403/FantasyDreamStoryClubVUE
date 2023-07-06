<template>
  <div>
    <div style="margin:10px 0;display: flex;flex-direction: row;justify-content:flex-end;">
      <div class="search_box">
        <el-input style="width: 400px" placeholder="请输入用户名、昵称" v-model="search" >
          <i slot="suffix" class="el-icon-close" @click="clearAndLoad"style="margin-top: 10px"></i>
        </el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      </div>
    </div>

    <div class="modify" style="margin: 10px 0;">
      <el-button type="primary" style="font-size: 12px; " @click="addAnnounce">新增 <i class="el-icon-circle-plus-outline"style="margin-left:5px;"> </i></el-button>
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
      <el-table-column prop="title" label="标题"  width="120"></el-table-column>
      <el-table-column prop="content" label="内容"  width="180" :formatter="formatContent"></el-table-column>
      <el-table-column prop="coverUrl" label="封面"  width="100">
        <template v-slot="scope" >
          <img :src="tableData[scope.$index].coverUrl" height="40px">
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template v-slot="scope" >
          <el-button type="success" @click.native.prevent="modifyAnnounce(scope.$index)">编辑<i class="el-icon-edit"></i></el-button>
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
      <el-form label-width="100px" :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="coverUrl">
          <el-input v-model="form.coverUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input type="textarea" rows="10" v-model="form.content" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false;">取 消</el-button>
        <el-button type="primary" @click="saveAnnounce">确 定</el-button>
      </div>
    </el-dialog>
    <!--    &lt;!&ndash;嵌套表单 end&ndash;&gt;-->
  </div>
</template>

<script>
export default {
  name: "Announcement",

  data(){
    return {
      plate: "首页管理",
      func: "公告管理",
      tableData: [],
      form:{
        title:"",
        coverUrl:"",
        content:"",
      },
      dialogFormName:"",
      dialogFormVisible:false,
      rules:{
        title:[
          {required:true,message:"标题bu不可为空",trigger:"blur"},
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
    this.load()
  },
  methods :{
    //load
    load(){
      this.request.get("/admin/announcePage",{
        params: {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          search:this.search,         //根据用户名、昵称模糊查询
        }
      }).then(res=>{
        console.log(res)
        this.tableData = res.data;

        this.request.get('admin/announceNum').then(res=>{
          console.log(res);
          this.count = res.data;
        })

      })
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #e0f6fe;color: #303133;font-weight: 600;font-size:12px;'
      }
    },
    //点击编辑公告
    modifyAnnounce(idx){
      this.dialogFormName="【编辑公告】"
      this.dialogFormVisible=true;
      this.form=this.tableData[idx];
    },
    //点击删除公告
    del(idx){
      let id=this.tableData[idx].id;
      console.log(id)
      this.request.post("/admin/deleteAnnoucnce?announceId="+id).then(res=>{
        if(res.code === "200"){
          this.$message.success("删除成功！");
          this.load();
        }else{
          this.$message.error("删除失败！");
        }
      })
    },
    formatContent(row) {
      const maxLength = 10; // 设置最大显示字数
      if (row.content.length > maxLength) {
        return row.content.slice(0, maxLength) + '...'; // 截取文本并添加省略号
      }
      return row.content; // 如果未超过最大字数限制，直接返回原始内容
    },
    //批量删除公告——选择
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
    saveAnnounce(){
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          this.request.post("/admin/upAnnounceInfo", {
            "id":this.form.id,
            "title":this.form.title,
            "coverUrl":this.form.coverUrl,
            "content":this.form.content,
            "isActivity": 0,
          }).then(res=>{
            console.log(res)
            if(res.code==="200" ){
              this.$message.success("修改公告成功")
              location.reload();
            }
            else{
              this.$router.go(0)
              this.$message.error(res.msg)
            }
          })
        }else{

        }
      })
      this.dialogFormVisible=false;
    },
    //点击新增用户弹窗
    addAnnounce(){
      this.form={
        title:"",
        coverUrl:"",
        content:"",
      }
      console.log(this.from)
      this.dialogFormName="【新增公告】"
      this.dialogFormVisible=true;
    },
    //点击批量删除按钮
    delBash(){
      console.log("点击批量删除按钮")
      let ids=this.multipleSelection.map(v=>v.id)
      console.log(ids)
      this.request.post("/admin/deleteBatchAnnounce",ids).then(res=>{
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
