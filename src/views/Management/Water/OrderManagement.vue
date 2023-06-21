<!--订单管理页面-->
<template>
<div>
  <div style="margin:10px 0;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
    <el-dropdown size="small" split-button type="primary"  @command="handleSelectOrder" trigger="click">
      {{selectKind}}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="全部">全部</el-dropdown-item>
        <el-dropdown-item command="今日订单">今日订单</el-dropdown-item>
        <el-dropdown-item command="已完成">已完成</el-dropdown-item>
        <el-dropdown-item command="未完成">未完成</el-dropdown-item>
      </el-dropdown-menu>
      <!--筛选的内容放这里-->
    </el-dropdown>
    <div class="search_box">
      <el-input style="width: 400px" placeholder="请输入用户名、商品名、购买时间、校区等进行模糊查询" v-model="search" >
        <i slot="suffix" class="el-icon-close" @click="clearAndLoad"style="margin-top: 10px"></i>
      </el-input>

      <el-button class="ml-5"type="primary" @click="load">搜索</el-button>
    </div>
  </div >
  <div class="modify" style="margin: 10px 0;">

    <el-popconfirm
        confirm-button-text='确定'
        cancel-button-text='我再想想'
        icon="el-icon-info"
        icon-color="green"
        title="确定要全部已完成吗？"
        @confirm="changeStatusBash"
    >
      <el-button type="success" style="font-size: 12px;" slot="reference">批量已完成<i class="el-icon-circle-plus-outline" style="margin-left:5px;"> </i></el-button>
    </el-popconfirm>


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
    <el-upload :action="importUrl" :headers="headersObj" style="display: inline-block" :show-file-list="false" accept="xlsx" :on-success="importSuccess" :on-error="importFail">
      <el-button type="primary" style="font-size: 12px; margin-left: 10px;">导入<i class="el-icon-bottom"style="margin-left:5px;"> </i></el-button>
    </el-upload>
    <el-button class="ml-5" type="primary" style="font-size: 12px; " @click="exp">导出<i class="el-icon-top"style="margin-left:5px;"> </i></el-button>
  </div>
  <!--顶部搜索筛选等操作 end-->
  <!--表格主体 start-->
  <el-table :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            @selection-change="handleSelectionChange"
            :header-cell-style="tableHeaderColor">
<!--    日期和订单状态前端处理-->
    <el-table-column type="selection" width="55" ></el-table-column>
    <el-table-column label="购水日期"  width="100">
      <template v-slot="scope">
        <div v-html="scope.row.orderBuyTime" style="white-space: pre-wrap;line-height: 30px;"></div>
      </template>
    </el-table-column>
    <el-table-column prop="orderUsername" label="用户名（学号）"  width="120"></el-table-column>
    <el-table-column  label="商品名称" width="140">
      <template v-slot="scope">
        <div v-html="scope.row.orderCommodityName" style="white-space: pre-wrap;line-height: 30px;"></div>
      </template>
    </el-table-column>
    <el-table-column prop="orderCommodityNumber" label="商品数量"width="90">
      <template v-slot="scope">
        <div v-html="scope.row.orderCommodityNumber" style="white-space: pre-wrap;line-height: 30px;"></div>
      </template>
    </el-table-column>
    <el-table-column prop="orderPrice" label="总金额(¥)"width="100"></el-table-column>
    <el-table-column prop="orderCampus" label="校区"width="90"></el-table-column>
    <el-table-column prop="orderArea" label="片区"width="120"></el-table-column>
    <el-table-column prop="orderBuilding" label="楼幢号"width="80"></el-table-column>
    <el-table-column prop="orderDormitory" label="宿舍号"width="80"></el-table-column>
    <el-table-column prop="orderStatus" label="订单状态"width="100"></el-table-column>



    <el-table-column label="操作" >
      <template v-slot="scope" >
        <el-button type="success" @click.native.prevent="modifyOrder(scope.$index)">编辑 <i class="el-icon-edit"></i></el-button>
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
  <el-dialog title="【编辑订单】" :visible.sync="dialogFormVisible" top="5vh" width="700px">
    <el-form label-width="120px">
      <el-form-item label="日期">
        <el-input v-model="form.orderBuyTime" :disabled="true" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="用户名（学号）">
        <el-input v-model="form.orderUsername" :disabled="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.orderCommodityName" :disabled="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="form.orderCommodityNumber" :disabled="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="总金额">
        <el-input v-model="form.orderPrice" :disabled="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="校区">
      <el-select v-model="campus" >
        <el-option
            v-for="item in selectCampus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="校区">
        <el-select v-model="area" >
          <el-option
              v-for="item in selectArea"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼幢号">
        <el-input v-model="building" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="宿舍号">
        <el-input v-model="dormitory"  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <div>
          <el-radio-group v-model="form.orderIsComplete">
            <el-radio-button :label="0">未完成</el-radio-button>
            <el-radio-button :label="1">已完成</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="saveOrder">确 定</el-button>
    </div>
  </el-dialog>
  <!--嵌套表单 end-->
</div>
</template>


<script>


export default {
  name: "WaterOrderManagement",
  data() {
    return {
      //页签
      plate: "订水管理",
      func: "订单管理",

      tableData: [],
      count: 0,
      pageNum: 1,
      pageSize: 5,
      search: "",
      multipleSelection: [],
      dialogFormVisible: false,
      form: {},
      //筛选下拉框，包含全部0、今日订单1、已完成2、未完成3
      selectKind: "筛选",
      selectCode: 0,    //初始为0全部,
      importUrl: "http://localhost:9090/water/order/import",
      headersObj: {
        token: JSON.parse(localStorage.getItem("user")).token
      },
      //地址 start
      selectCampus: [{
        value: '宝山校区',
        label: '宝山校区'
      }, {
        value: '延长校区',
        label: '延长校区'
      }, {
        value: '嘉定校区',
        label: '嘉定校区'
      }, {
        value: '新闸路小区',
        label: '新闸路小区'
      }, {
        value: '东京校区',
        label: '东京校区'
      }],
      selectArea: [{
        value: '校内',
        label: '校内'
      }, {
        value: '南区',
        label: '南区'
      }, {
        value: '研究生公寓',
        label: '研究生公寓'
      }, {
        value: '新世纪大学生村',
        label: '新世纪大学生村'
      }],
      campus:"",
      area:"",
      building:"",
      dormitory: "",

    }



  },
  created() {
    this.load()
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
      console.log("selectCode"+this.selectCode)
      this.request.get("/water/order/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&search="
          +this.search+"&selectCode="+this.selectCode+"&username=").then(res=>{
        //console.log(res)
        if(res.code=="200") {
          this.tableData = res.data.records;
          this.count = res.data.total;
          for (let i = 0; i < Math.min(this.pageSize,this.count); i++) {
            this.tableData[i].orderStatus = (this.tableData[i].orderIsComplete? "已完成" : "未完成");
            this.tableData[i].orderCommodityName=this.tableData[i].orderCommodityName.replace(/,/g,"<br/>");
            this.tableData[i].orderCommodityNumber=this.tableData[i].orderCommodityNumber.replace(/,/g,"<br/>");
          }
          console.log(this.tableData)
        }else{
          this.$message.error(res.msg);
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
    //筛选
    handleSelectOrder(selectKind){
      if(selectKind=="全部")this.selectCode=0
      else if(selectKind=="今日订单")this.selectCode=1
      else if(selectKind=="已完成")this.selectCode=2
      else if(selectKind=="未完成")this.selectCode=3
      this.selectKind=selectKind;
      console.log("selectCode="+this.selectCode)
      this.load();
    },
    //点击确认更新订单信息
    saveOrder(){
      this.dialogFormVisible=false;
      let waterOrder=this.form;
      //console.log("waterOrder:"+JSON.stringify(waterOrder))
      //去除多余信息
      delete waterOrder.orderStatus
      //将名称和数量格式更改
      waterOrder.orderCommodityName=waterOrder.orderCommodityName.replace(/<br\/>/g,",")
      waterOrder.orderCommodityNumber=waterOrder.orderCommodityNumber.replace(/<br\/>/g,",")
      //更改campus等地址信息
      waterOrder.orderCampus=this.campus
      waterOrder.orderArea=this.area
      waterOrder.orderBuilding=this.building
      waterOrder.orderDormitory=this.dormitory
      // console.log(waterOrder.orderCommodityName)
      // console.log("waterOrder:"+JSON.stringify(waterOrder))
      this.request.post("/water/order/save",waterOrder).then(res=>{
        console.log(res)
        if(res){
          this.$message.success("保存成功！");
          this.load();
          this.form.orderCampus=waterOrder.orderCampus;
          this.form.orderArea=waterOrder.orderArea;
          this.form.orderBuilding=waterOrder.orderBuilding;
          this.form.orderDormitory=waterOrder.orderDormitory;
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
    //点击编辑订单
    modifyOrder(idx){
      let res=this.tableData[idx];
      this.dialogFormVisible=true;
      this.form=res;
      //将地址填入
      this.campus=res.orderCampus
      this.area=res.orderArea;
      this.building=res.orderBuilding;
      this.dormitory=res.orderDormitory;
    },
    //批量已完成
    changeStatusBash(){
      console.log("点击批量已完成按钮")
      let ids=this.multipleSelection.map(v=>v.orderId)
      console.log(ids)
      this.request.post("/water/order/changeStatusBash",ids).then(res=>{
        console.log(res)
        if(res){
          this.$message.success("订单状态改变成功！");
          this.load();
        }else{
          this.$message.error("订单状态改变失败！");
        }
      })
    },
    //点击删除订单
    del(idx){
      let id=this.tableData[idx].orderId;
      this.request.delete("/water/order/delById",{
        params:{
          id:id
        }
      }).then(res=>{
        console.log(res)
        if(res.code=="200"){
          this.$message.success("删除成功！");
          this.load();
        }else{
          this.$message.error("删除失败！");
        }
      })
    },
    //批量选择用户
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection = val;
    },
    //点击批量删除按钮
    delBash(){
      console.log("点击批量删除按钮")
      let ids=this.multipleSelection.map(v=>v.orderId)
      console.log(ids)
      this.request.post("/water/order/delBashById",ids).then(res=>{
        console.log(res)
        if(res){
          this.$message.success("删除成功！");
          this.load();
        }else{
          this.$message.error("删除失败！");
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
          console.log(token)
          this.$message("无token信息，请重新登录！")
          return false
        }
      }
      //导出不拦截，在前端请求时，另外请求一个没有任何用处的token方法，达到校验的目的
      this.request.post("/water/order/token").then(res=> {
        console.log("res:" + res);
        if (res.code === '401') {
          return false
        } else {
          window.open("http://localhost:9090/water/order/export")
          return true
        }
      })

    },
    //导入成功
    importSuccess(){
      this.request.post("/water/order/token").then(res=> {
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
    //导入失败
    importFail(){
      this.$message.error("导入失败！");
      this.load();
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
.el-table .cell {
  white-space: pre-wrap;
}
.el-dialog .el-input{
  width: 500px;
}
</style>