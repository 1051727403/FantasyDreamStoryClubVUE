<template>
  <el-menu :default-openeds="[]" style="min-height: 100%;overflow-x:hidden" :style="{width:200+'px'}"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           router>
    <div style="height: 60px;line-height: 60px;text-align: center;display: flex;justify-content: center;align-items: center;flex-direction: row">
      <img src="https://img-blog.csdnimg.cn/dbc2eaa294194339a3b1d509e6739306.png#pic_center" style="height: 45px;" alt="">
      <b style="color: #51b1d5;margin-left: 15px;" >
        <span style="color:#3fccfc;font-weight: bolder">管理中心</span>
      </b>
    </div>
    <el-menu-item index="Index"  >
      <i class="el-icon-s-home"></i><span>主页</span>
    </el-menu-item>
    <el-menu-item index="User"  >
      <i class="el-icon-folder"></i><span>用户管理</span>
    </el-menu-item>
    <el-submenu  text-color="#fff"
                active-text-color="#ffd04b"
                 index="1">
      <template #title>
        <i class="el-icon-edit"></i>
        <span >创作管理</span>
      </template>
      <el-menu-item index="Story">
        <i class="el-icon-collection"></i>
        <span>故事管理</span>
      </el-menu-item>
      <el-menu-item index="Fragment">
        <i class="el-icon-s-order"></i>
        <span>片段管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu  text-color="#fff"
                 active-text-color="#ffd04b"
                  index="2">
      <template #title>
        <i class="el-icon-edit"></i>
        <span >首页管理</span>
      </template>
      <el-menu-item index="Announcement">
        <i class="el-icon-collection"></i>
        <span>公告管理</span>
      </el-menu-item>
      <el-menu-item index="Activity">
        <i class="el-icon-s-order"></i>
        <span>活动管理</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="Comment">
      <i class="el-icon-chat-line-square"></i><span>评论管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    sideWidth:String
  }
}
</script>

<style scoped>

</style>
