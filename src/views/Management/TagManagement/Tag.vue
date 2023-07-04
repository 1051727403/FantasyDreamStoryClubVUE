<template>
  <div>
    <div style="margin:10px 0;display: flex;flex-direction: row;justify-content:flex-end;">
      <div class="search_box">
        <el-input style="width: 400px" placeholder="请输入名称" v-model="search" >
          <i slot="suffix" class="el-icon-close" @click="clearAndLoad"style="margin-top: 10px"></i>
        </el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      </div>
    </div>

    <div class="modify" style="margin: 10px 0;">
      <el-button type="primary" style="font-size: 12px; " @click="addTag">新增 <i class="el-icon-circle-plus-outline"style="margin-left:5px;"> </i></el-button>
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
      <el-table-column prop="tagName" label="标签名"  width="120"></el-table-column>

      <el-table-column label="操作" >
        <template v-slot="scope" >
          <el-button type="success" @click.native.prevent="modifyTag(scope.$index)">编辑<i class="el-icon-edit"></i></el-button>
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
      <el-form label-width="100px" :rules="tagRules" ref="ruleForm" :model="form">
        <el-form-item label="标签名" prop="tagName">
          <el-input v-model="form.tagName" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false;">取 消</el-button>
        <el-button type="primary" @click="saveTag">确 定</el-button>
      </div>
    </el-dialog>
    <!--    &lt;!&ndash;嵌套表单 end&ndash;&gt;-->
  </div>
</template>

<script>
export default {
  name: "Tag",
  data(){
    return {
      plate: "",
      func: "",
      tableData: [],
      form:{
        tagName:"",
      },
      dialogFormName:"",
      dialogFormVisible:false,
      tagRules:{
        tagName:[
          {required:true,message:"标签名不可为空",trigger:"blur"},
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
    this.load()
  },
  methods :{
    //load
    load(){
      this.request.get("/admin/tagPage",{
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
    //点击编辑标签
    modifyTag(idx){
      //console.log("tableData:",this.tableData);
      //console.log("index:"+idx)
      //console.log("row:"+res)
      this.dialogFormName="【编辑标签】"
      this.dialogFormVisible=true;
      this.form=this.tableData[idx];
    },
    //点击删除标签
    del(idx){
      let id=this.tableData[idx].id;
      this.request.post("/admin/deleteTag?tagId="+id).then(res=>{
        if(res.code === "200"){
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
    saveTag(){
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          this.request.post("/admin/addTag", {
            "id":this.form.id,
            "tagName":this.form.tagName,
          }).then(res=>{
            this.userdialogVisible = false
            console.log(res)
            if(res.code==="200" && res.data===true ){
              this.$router.go(0)
              this.$message.success("修改标签成功")
            }
            else{
              this.$message.error("标签名重复")
            }
          })
          this.dialogFormVisible=false;
        }
      })

    },
    //点击新增用户弹窗
    addTag(){
      this.form={
        tagName:"",
      }
      this.form = {}
      console.log(this.from)
      this.dialogFormName="【新增标签】"
      this.dialogFormVisible=true;
    },
    //点击批量删除按钮
    delBash(){
      console.log("点击批量删除按钮")
      let ids=this.multipleSelection.map(v=>v.id)
      console.log(ids)
      this.request.post("/admin/deleteBatchTag",ids).then(res=>{
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
