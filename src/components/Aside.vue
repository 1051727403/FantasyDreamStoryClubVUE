<template>
  <el-menu :default-openeds="[]"style="min-height: 100%;overflow-x: hidden;":style="{width:sideWidth+'px'}"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px;line-height: 60px;text-align: center;display: flex;justify-content: center;align-items: center;flex-direction: row">
      <img src="https://img-blog.csdnimg.cn/dbc2eaa294194339a3b1d509e6739306.png#pic_center" style="height: 45px;"></img>
      <b style="color: #7cd9fa;margin-left: 15px;"v-show="!isCollapse">后勤管理系统</b>
    </div>
    <el-menu-item index="/Manage/home">
      <i class="el-icon-s-home"></i>
      <template slot="title">
        <span>主页</span>
      </template>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span>电费管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Manage/Electricity/PaymentManagement">缴费管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-coffee-cup"></i>
        <span>订水管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Manage/Water/OrderManagement">订单管理</el-menu-item>
        <el-menu-item index="/Manage/Water/CommodityManagement">商品管理</el-menu-item>
        <el-menu-item index="/Manage/Water/StatisticalChart">统计图表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item index="/Manage/Announcement">
      <i class="el-icon-pie-chart"></i>
      <template slot="title">
        <span>公告声明</span>
      </template>
    </el-menu-item>


    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Manage/userInfo"><i class="el-icon-s-custom"></i> 个人信息</el-menu-item>
        <el-menu-item index="/Manage/user"><i class="el-icon-s-custom"></i> 用户管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    sideWidth:String
  }
}
</script>

<style scoped>

</style>
