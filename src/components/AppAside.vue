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
      <b style="color: #7cd9fa;margin-left: 15px;"v-show="!isCollapse">订水缴电系统</b>
    </div>
    <el-menu-item index="/App/home">
      <i class="el-icon-s-home"></i><span>主页</span>
      <template slot="title">
      </template>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span>电费</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/App/Electric/ElectricPay">缴费</el-menu-item>
        <el-menu-item index="/App/Electric/HistoryOrder">历史账单</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-coffee-cup"></i>
        <span>订水</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/App/Water/OrderWater">订水</el-menu-item>
        <el-menu-item index="/App/Water/HistoryOrder">购物记录</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/App/Announcement">
      <i class="el-icon-pie-chart"></i><span>公告</span>
      <template slot="title">
      </template>
    </el-menu-item>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>个人</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/App/info">信息管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "AppAside",
  props: {
    isCollapse: Boolean,
    sideWidth:String
  }
}
</script>
