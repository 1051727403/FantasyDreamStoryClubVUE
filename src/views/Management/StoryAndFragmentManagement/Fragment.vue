<template>
  <div>
    <div style="margin:0px 0;display: flex;flex-direction: row;justify-content:flex-end;">
      <div class="search_box">
        <el-input style="width: 400px" placeholder="请输入片段" v-model="search" >
          <i slot="suffix" class="el-icon-close" @click="clearAndLoad"style="margin-top: 10px"></i>
        </el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      </div>
    </div>

    <!--顶部搜索筛选等操作 end-->
    <!--表格主体 start-->
    <el-table :data="tableData"
              style="width: 100%;margin-top: 20px;"
              :default-sort = "{prop: 'id', order: 'descending'}"
              @selection-change="handleSelectionChange"
              :header-cell-style="tableHeaderColor">
      <el-table-column prop="id" label="id"  width="80"></el-table-column>
      <el-table-column prop="userId" label="作者ID"  width="120"></el-table-column>
      <el-table-column prop="storyId" label="故事ID"  width="120"></el-table-column>
      <el-table-column prop="parentId" label="父节点ID"  width="120"></el-table-column>
      <el-table-column prop="fragmentName" label="片段名称"  width="100"></el-table-column>
      <el-table-column prop="content" label="片段内容"  width="120" :formatter="formatContent"></el-table-column>
      <el-table-column prop="allowRelay" label="是否允许接龙"  width="100"></el-table-column>
      <el-table-column prop="totalLike" label="总点赞"  width="100"></el-table-column>
      <el-table-column prop="totalCollection" label="总收藏"  width="100"></el-table-column>
      <el-table-column prop="totalComment" label="总评论"  width="100"></el-table-column>
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
      <el-form label-width="100px" :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="作者ID" prop="userId">
          <el-input v-model="form.userId" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="片段名称" prop="fragmentName">
          <el-input v-model="form.fragmentName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="片段内容" prop="content">
          <el-input type="textarea"  :rows="10" v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否允许接龙" prop="allowRelay" >
          <el-radio-group v-model="form.allowRelay" >
            <el-radio-button label=1>是</el-radio-button>
            <el-radio-button label=0>否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.dialogFormVisible=false;">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
    <!--    &lt;!&ndash;嵌套表单 end&ndash;&gt;-->
  </div>
</template>

<script>
export default {
  name: "fragment",
  data(){
    return {
      plate: "创作管理",
      func: "片段管理",
      tableData: [],
      form:{
      },
      dialogFormName:"",
      dialogFormVisible:false,
      rules:{
        userId:[
          {required:true,message:"作者ID不可为空",trigger:"blur"},
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
    formatContent(row) {
      const maxLength = 10; // 设置最大显示字数
      if (row.content.length > maxLength) {
        return row.content.slice(0, maxLength) + '...'; // 截取文本并添加省略号
      }
      return row.content; // 如果未超过最大字数限制，直接返回原始内容
    },
    //load
    load(){
      this.request.get("/admin/fragment/page",{
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
      this.dialogFormName="【编辑片段】"
      this.dialogFormVisible=true;
      this.form=this.tableData[idx];
      // console.log(this.form)
    },
    //点击删除片段
    del(idx){
      let id=this.tableData[idx].id;
      if (this.tableData[idx].parentId==0){
        this.$message.error("根节点，不可删除，若需要删除则可删除故事");
        return
      }
      console.log(id)
      this.request.get("/admin/fragment/deleteFragment?fragmentId="+id).then(res=>{
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
    saveUser(){
        console.log(this.form)
        console.log("valid")
        this.request.post("/admin/fragment/saveFragment", {
          "id":this.form.id,
          "userId":this.form.userId,
          "storyId":this.form.storyId,
          "parentId":this.form.parentId,
          "fragmentName":this.form.fragmentName,
          "content":this.form.content,
          "allowRelay":this.form.allowRelay,
          "totalLike":this.form.totalLike,
          "totalCollection":this.form.totalCollection,
          "totalComment":this.form.totalComment,
        }).then(res=>{
          this.userdialogVisible = false
          if(res.code==="200" ){
            this.$message.success("修改片段成功")
            this.load();
          }
          else{
            this.$message.error(res.msg)
          }
        })
      this.dialogFormVisible=false;
    },
  }
}
</script>

<style scoped>

</style>
