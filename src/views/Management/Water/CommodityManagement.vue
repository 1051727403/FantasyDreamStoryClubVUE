<template>
  <div>
    <!--顶部搜索筛选等操作 start-->
    <div style="margin:10px 0;display: flex;flex-direction: row;justify-content:flex-end;">
      <div class="search_box">
        <el-input style="width: 400px" placeholder="请输入商品名、价格或供货商名称进行模糊查询" v-model="search" >
          <i slot="suffix" class="el-icon-close" @click="clearAndLoad"style="margin-top: 10px"></i>
        </el-input>
        <el-button class="ml-5"type="primary" @click="load">搜索</el-button>
      </div>
    </div >

    <div class="modify" style="margin: 10px 0;">
      <el-button type="primary" style="font-size: 12px; " @click="addCommodity">新增 <i class="el-icon-circle-plus-outline"style="margin-left:5px;"> </i></el-button>
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
      <el-upload :action="importUrl" style="display: inline-block"
                 :show-file-list="false" accept="xlsx" :on-success="importSuccess":on-error="importError" :headers="headersObj">
        <el-button type="primary" style="font-size: 12px; margin-left: 10px;">导入<i class="el-icon-bottom"style="margin-left:5px;"> </i></el-button>
      </el-upload>
      <el-button class="ml-5" type="primary" style="font-size: 12px; " @click="exp">导出<i class="el-icon-top"style="margin-left:5px;"> </i></el-button>
    </div>
    <!--顶部搜索筛选等操作 end-->
    <!--表格主体 start-->
    <el-table :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'commodityId', order: 'descending'}"
              @selection-change="handleSelectionChange"
              :header-cell-style="tableHeaderColor" >
      <el-table-column type="selection" width="55" ></el-table-column>
      <el-table-column prop="commodityId" label="id"  width="100"></el-table-column>
      <el-table-column prop="commodityName" label="商品名称"  width="140"></el-table-column>
      <el-table-column prop="commodityPrice" label="商品价格(¥)"  width="150"></el-table-column>
      <el-table-column prop="commoditySupplier" label="商品供应商"width="120"></el-table-column>
      <el-table-column label="商品图片">
        <template v-slot="scope">
          <img :src="scope.row.commodityAvatar" style="height: 50px"/>
        </template>
      </el-table-column>
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
      <el-form label-width="100px">
        <el-form-item label="商品名称">
          <el-input v-model="form.commodityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.commodityPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品供应商">
          <el-input v-model="form.commoditySupplier" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-input v-model="form.commodityAvatar" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveCommodity">确 定</el-button>
      </div>
    </el-dialog>
    <!--嵌套表单 end-->
  </div>
</template>


<script>

export default {
  name: "CommodityManagement",
  data(){
    return{
      plate:"订水管理",
      func:"商品管理",

      tableData: [],
      count:0,
      pageNum:1,
      pageSize:5,
      search:"",
      multipleSelection:[],
      dialogFormVisible:false,
      form:{},
      dialogFormName:"",
      headersObj:{
        token:JSON.parse(localStorage.getItem("user")).token
      },
      importUrl:"http://localhost:9090/water/commodity/import",
    }
  },
  created() {
    this.$emit("generateTab",this.plate,this.func)
    this.load();
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
      this.request.get("/water/commodity/page",{
        params: {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          search:this.search,         //根据姓名、昵称、邮箱、地址、手机号五个方面模糊查询
        }
      }).then(res=>{
        console.log("[load]"+res.code+res.msg)
        this.tableData = res.data.data;
        this.count = res.data.count;
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
    //点击新增商品弹窗
    addCommodity(){
      this.dialogFormName="【新增商品】"
      this.form={}
      this.dialogFormVisible=true;
    },
    //点击确认保存或更新商品信息
    saveCommodity(){
      if(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(this.form.commodityPrice)==false
      &&/^[1-9]\d*$/.test(this.form.commodityPrice)==false){
        this.$message.error("请输入正确的商品价格！")
        return false;
      }
      if(this.form.commodityName==""||this.form.commodityName==null){
        this.$message.error("请输入商品名称")
        return false;
      }
      if(this.form.commoditySupplier==""||this.form.commoditySupplier==null){
        this.$message.error("请输入供货商")
        return false;
      }
      this.dialogFormVisible=false;
      this.request.post("/water/commodity/addCommodity",this.form).then(res=>{
        console.log(res)
        if(res.code=="200"){
          this.$message.success("保存成功！");
          this.load();
        }else{
          this.$message.error("保存失败！");
        }
      })
    },
    //用户点击取消
    cancel(){
      this.dialogFormVisible=false;
      this.load();
    },
    //点击编辑商品
    modifyUser(idx){
      let res=this.tableData[idx];
      this.dialogFormVisible=true;
      this.form=res;
    },
    //点击删除商品 假删除
    del(idx){
      let id=this.tableData[idx].commodityId;
      console.log(id);
      this.request.delete("/water/commodity/delCommodity?id="+id).then(res=>{
        console.log(res)
        if(res.code=="200"){
          this.$message.success("删除成功！");
          this.load();
        }else{
          this.$message.error(res.msg,"删除失败!");
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
      let ids=this.multipleSelection.map(v=>v.commodityId)
      console.log(ids)
      this.request.post("/water/commodity/delBashCommodity",ids).then(res=>{
        console.log(res.code)
        if(res.code=="200"){
          this.$message.success("删除成功！");
          this.load();
        }else{
          this.$message.error(res.msg+"删除失败！");
        }
      })
    },
    //导出
    exp(){
      //无用户信息（token）则代表当前为非法登录，不能够使用导出接口
      let user=localStorage.getItem("user")
      //console.log(user)
      if (user==null){
        this.$message("无用户信息，请重新登录！")
        return false
      }else{
        var token=JSON.parse(user).token
        if(token==null){
          this.$message("无token信息，请重新登录！")
          return false
        }
      }
      //导出不拦截，在前端请求时，另外请求一个没有任何用处的token方法，达到校验的目的
      this.request.post("/water/commodity/token").then(res=> {
        console.log("res:" + res);
        if (res.code === '401') {
          return false
        } else {
          window.open("http://localhost:9090/water/commodity/export")
          return true
        }
      })

    },
    //导入
    //导入成功
    importSuccess(){
      this.request.post("/water/commodity/token").then(res=> {
        console.log("res:" + res);
        if (res.code === '401') {
          this.$message.error("导入失败！");
          this.load();
        } else {
          this.$message.success("导入成功！");
          this.load();
        }
      })
    },
    importError(){
      this.$message.error("导入失败！")
      this.load();
    }
  }
}
</script>

<style scoped>

</style>