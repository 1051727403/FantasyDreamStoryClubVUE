<template>
  <div class="jsmind">
<!-- 右上角菜单 -->
    <div class="toolbar">
      <ul class="toolbar-list">
        <li class="item">
          <span
            size="16"
            class="percent"
            style="font-size: 14px; color: rgb(29, 29, 31)"
            @click="zoom.value = 100"
            >{{ zoom.value }}%
          </span>
          <div class="scale-slide">
            <ul>
              <li class="normal-item" title="缩小" @click="zoomOut">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.98 11.95l2.91 2.9c.15.15.15.38 0 .53l-.51.51a.37.37 0 01-.52 0L11.95 13a7.32 7.32 0 111.03-1.03zm-5.66 1.22a5.85 5.85 0 100-11.7 5.85 5.85 0 000 11.7zM4.76 6.6h5.12c.2 0 .37.16.37.36v.73c0 .2-.17.37-.37.37H4.76a.37.37 0 01-.37-.37v-.73c0-.2.16-.36.37-.36z"
                    fill="#2B2F36"
                    fill-rule="nonzero"
                  ></path>
                </svg>
              </li>

              <li class="slider">
                <el-slider
                  v-model="zoom.value"
                  :show-tooltip="false"
                  :min="zoom.min"
                  :max="zoom.max"
                ></el-slider>
              </li>

              <li class="normal-item" title="画布放大" @click="zoomIn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.98 11.95l2.91 2.9c.15.15.15.38 0 .53l-.51.51a.37.37 0 01-.52 0L11.95 13a7.32 7.32 0 111.03-1.03zm-6.4-5.36V4.76c0-.2.17-.37.37-.37h.73c.2 0 .37.16.37.37v1.83h1.83c.2 0 .37.16.37.36v.73c0 .2-.17.37-.37.37H8.05v1.83c0 .2-.16.37-.37.37h-.73a.37.37 0 01-.36-.37V8.05H4.76a.37.37 0 01-.37-.37v-.73c0-.2.16-.36.37-.36h1.83zm.74 6.58a5.85 5.85 0 100-11.7 5.85 5.85 0 000 11.7z"
                    fill="#2B2F36"
                    fill-rule="nonzero"
                  ></path>
                </svg>
              </li>
            </ul>
          </div>
        </li>

        <div
          class="reset item normal-item"
          title="定位到中心主题"
          @click="reset"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.77 0h3.46c.21 0 .38.17.38.38v.77c0 .22-.17.39-.38.39h-2.7v2.7c0 .2-.16.38-.38.38H.38A.38.38 0 010 4.23V.77C0 .34.34 0 .77 0zm14.45 16h-3.46a.38.38 0 01-.38-.39v-.76c0-.22.17-.39.38-.39h2.7v-2.7c0-.2.17-.38.38-.38h.77c.21 0 .38.18.38.39v3.46c0 .43-.34.77-.77.77zM0 15.23v-3.46c0-.21.17-.39.38-.39h.77c.22 0 .39.18.39.39v2.7h2.69c.21 0 .38.16.38.38v.77c0 .2-.17.38-.38.38H.77a.77.77 0 01-.77-.77zM16 .78v3.46c0 .21-.17.38-.38.38h-.77a.38.38 0 01-.39-.38v-2.7h-2.69a.38.38 0 01-.38-.38V.4c0-.2.17-.38.38-.38h3.46c.43 0 .77.34.77.77zm-8 9.99a2.77 2.77 0 110-5.54 2.77 2.77 0 010 5.54z"
              fill="#2B2F36"
              fill-rule="nonzero"
            ></path>
          </svg>
        </div>
      </ul>
    </div>

<!--    顶部菜单栏-->
    <div class="top-bar">
      <svg @click="GoBackPage" t="1687590289426" style="cursor: pointer;height: 35px;width: 35px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1622" width="200" height="200"><path d="M728 212.182v-82.183a8 8 0 0 0-13.327-5.968L306.69 488.138c-0.9 0.803-1.754 1.657-2.558 2.557-11.772 13.178-10.626 33.4 2.558 45.167l407.984 364.107A8 8 0 0 0 728 894.001v-82.183a16 16 0 0 0-5.346-11.937L400.082 512l322.572-287.88A16 16 0 0 0 728 212.181z" fill="#fefac1" p-id="1623"></path></svg>
      <div class="story_name"><span>{{story_name}}</span></div>
    </div>



      <!--    树形布局-->
    <div class="jsmind_layout animate__animated animate__fadeInRight" >
      <div
        id="jsmind_container"
        ref="container"
        @click="nodeClick"
        @contextmenu.prevent.stop="nodeClick"
      >
      </div>
    </div>

    <!-- 点击按钮侧边栏详细信息菜单 start-->
    <transition name="sideBar">
      <div class="right_slider_bar"  v-if="showSideBar">
          <!--      上半-->
          <div class="sideBarTop">
            <div class="backIcon"@click="closeSideBar" >
              <svg  style="cursor: pointer;width: 25px;height: 25px;" t="1687598692787" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10553" width="200" height="200"><path d="M428.31644444 679.92462223l76.91377778-19.11466667-30.49244445-25.03111111a145.89724445 145.89724445 0 0 0-224.22186666-184.51342222l-7.96444444-6.58773333-195.44746667 329.95555555 298.74631111-74.25137778c2.50311111 0.13653333 5.02897778 0.19342222 7.56622223 0.19342223a145.18044445 145.18044445 0 0 0 74.8999111-20.65066667z" fill="#1792E5" p-id="10554"></path><path d="M1011.83715556 511.21493333c7.82791111-6.62186667 12.62933333-17.44213333 12.62933333-28.8768a38.05866667 38.05866667 0 0 0-12.02631112-27.67075555L608.81351111 93.7528889c-6.61048889-5.41582222-14.4384-9.02257778-23.46097777-9.02257779-20.48 0-36.69333333 16.83911111-36.69333334 37.888v159.41404445c-308.57671111 51.72337778-526.336 286.32177778-547.38488889 587.69635555 1.20604445 12.62933333 11.37777778 22.85795555 23.46097778 22.85795556a24.62151111 24.62151111 0 0 0 13.23235555-4.22115556c53.47555555-39.09404445 99.24835555-68.57386667 135.39555556-87.82506666 87.22204445-49.92568889 222.57208889-89.62275555 374.74986667-105.87022222v147.97937777c0 21.06026667 16.24746667 37.89937778 36.7047111 37.89937778 8.41955555 0 16.23608889-3.60675555 22.85795557-8.41955555l114.91555555-102.8664889a35.98791111 35.98791111 0 0 0 10.74062222-33.1207111v-0.59164445c-6.01884445-24.66702222-35.48728889-34.89564445-54.73848889-18.05653333l-52.9408 46.33031111V614.67306667l-40.89173333 3.00373333c-150.99448889 11.37777778-347.69351111 52.9408-474.61262222 129.3312-11.37777778 7.22488889-25.27004445-4.8128-21.0488889-17.44213333 70.97457778-204.51555555 255.64728889-348.88817778 502.89777779-378.95964444l33.67822221-4.20977778V200.81777778l320.62577779 281.52035555L769.42222222 637.53102223c-9.6256 8.41955555-13.23235555 21.61777778-10.24 34.28124444v0.6144c6.61048889 23.4496 34.88426667 32.47217778 53.53244445 16.23608889z m0 0" fill="#424242" p-id="10555"></path></svg>
            </div>
            <div class="sideBarTopItem" @click="jumpToUserShow(selectNodeInfo.data.authorInfo.id)" style="cursor: pointer"><img style="width: 70px;height: 70px;  border-radius: 50%;" :src="selectNodeInfo.data.authorInfo?selectNodeInfo.data.authorInfo.avatarUrl:'https://img2.baidu.com/it/u=2064684749,2471246240&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=282'" alt="45"></div>
            <div class="sideBarTopItem" style="margin-top: 20px;">
              <span style="color: #7f7ffc;font-size: 18px;text-shadow: 2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff; ">{{selectNodeInfo.data.authorInfo?selectNodeInfo.data.authorInfo.nickname:'游客'}}</span>
              <span class="label">作者</span>
            </div>
            <div class="sideBarTopItem" style="font-size: 14px;color:#fb9cad;margin-top: 15px; ">
              {{selectNodeInfo.data.authorInfo?selectNodeInfo.data.authorInfo.totalLike:0}}
              <svg t="1687761923860" style="width: 18px;height: 18px;margin-left: 8px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3569" width="200" height="200"><path d="M911.786667 493.312c-40.789333 208.896-254.933333 355.626667-345.088 409.045333a107.434667 107.434667 0 0 1-109.397334 0c-90.197333-53.418667-304.341333-200.106667-345.088-409.045333-17.024-87.338667 6.144-179.925333 61.994667-247.765333C225.322667 183.466667 296.362667 149.333333 374.314667 149.333333c48.981333 0 96.298667 12.416 137.685333 36.010667a277.461333 277.461333 0 0 1 137.728-36.010667c77.909333 0 148.949333 34.133333 200.106667 96.213334 55.765333 67.84 78.933333 160.426667 61.909333 247.765333z" fill="#FF3D3F" p-id="3570"></path><path d="M849.792 245.546667a297.984 297.984 0 0 1 61.013333 128.256L411.221333 873.429333c-48.213333-32.128-109.482667-78.549333-164.522666-137.386666L790.912 192c21.632 14.421333 41.386667 32.384 58.88 53.589333z" fill="#FF5052" p-id="3571"></path><path d="M649.728 149.333333c51.285333 0 99.584 14.805333 141.226667 42.624L246.741333 736.128c-48.725333-52.053333-92.544-113.749333-118.058666-183.722667l372.821333-372.736c3.541333 1.834667 6.997333 3.712 10.453333 5.674667a277.461333 277.461333 0 0 1 137.728-36.010667z" fill="#FF6365" p-id="3572"></path><path d="M374.272 149.333333c44.970667 0 88.448 10.410667 127.274667 30.336l-372.778667 372.778667a391.253333 391.253333 0 0 1-16.554667-59.136c-17.024-87.338667 6.144-179.925333 61.994667-247.765333C225.322667 183.466667 296.362667 149.333333 374.314667 149.333333z" fill="#FF8A8B" p-id="3573"></path></svg>
            </div>

            <!-- 点赞和收藏-->
            <div class="likeAndCollection">
              <div class="checkLike"@click="pressLike"style="cursor: pointer">
                <svg  class="likeIcon"  v-if="selectNodeInfo.data.isLike" t="1687875250824"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292" width="200" height="200"><path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" fill="#F44336" p-id="2293"></path></svg>
                <svg  class="likeIcon"  v-if="!selectNodeInfo.data.isLike" t="1687875263018"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2447" width="200" height="200"><path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" fill="#ffffff" p-id="2448" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path></svg>
                <div style="margin-left: 5px;color: #ff0000;
                text-shadow: 1px 1px 0px #ffa3ae, -1px -1px 0px #ffa3ae, 1px -1px 0px #ffa3ae, -1px 1px 0px #ffa3ae; /* 添加白色描边 */">
                  {{selectNodeInfo.data.totalLike}}
                </div>
              </div>

              <div class="collect"@click="pressCollect" style="cursor: pointer">
                <i class="collectIcon"  :class="[selectNodeInfo.data.isCollected?'el-icon-star-on':'el-icon-star-off']"></i>
              </div>
            </div>

            <div class="backToFragment" @click="backToFragment" style="cursor: pointer">返回上一幕</div>
            <!-- 下一章节选择 start-->
            <div class="nextFragment">
              <div class="nextFragmentPrompt" >选择下一幕:</div>
              <div class="chooseFragment"style="cursor: pointer">
                <div class="eachFragment" v-for="child in selectNodeInfo.children" @click="chooseFragment(child)">{{child.topic}}</div>
                <div v-if="selectNodeInfo.children.length==0" style="font-size:14px;color:gray">已经到底啦！</div>
              </div>
            </div>
            <!-- 下一章节选择 end-->
            <!-- 评论区组件 start-->
            <div style="margin-top: 20px;font-size: 18px;color: #000000;">评论区&nbsp;({{selectNodeInfo.data.totalComment}})</div>
            <article-comment v-bind:comments="selectNodeInfo.data.comments"
                             :fragment-id="selectNodeInfo.id=='root'?selectNodeInfo.data.rootId:selectNodeInfo.id"
                              @updateTotalComment="updateTotalComment"
                              @reloadComment="reloadComment"></article-comment>
            <div style="padding-bottom: 80px;"></div>
            <!-- 评论区组件 end-->
          </div>
    </div>
    </transition>
    <!-- 点击按钮侧边栏详细信息菜单 end-->
    <!--      底部-->
    <transition name="sideBar">
      <div class="sideBarBottom" v-if="showSideBar">
        <el-button @click="addChild" style="border-radius: 8px;background-color: #00c752;color: white;margin-right: 20px;" v-if="selectNodeInfo.data.allowRelay==1">片段接龙</el-button>
        <el-button @click="addChild" style="border-radius: 8px;background-color: #00c752;color: white;margin-right: 20px;" v-if="selectNodeInfo.data.allowRelay!=1 && user && selectNodeInfo.data.authorInfo && selectNodeInfo.data.authorInfo.id==user.id">片段接龙</el-button>
        <el-button @click="updateFragment" style="border-radius: 8px;background-color: #23abff;color: white;margin-right: 20px;" v-if="user && selectNodeInfo.data.authorInfo && selectNodeInfo.data.authorInfo.id==user.id">修改片段</el-button>
        <el-button @click="delCard"style="border-radius: 8px;background-color: #cc3d01;color: white; " v-if="user && selectNodeInfo.data.authorInfo && selectNodeInfo.data.authorInfo.id==user.id">删除片段</el-button>
      </div>
    </transition>
    <!-- 片段内容-->
    <transition name="fragment">
      <div class="fragmentContainer" v-if="showFragmentContent">
        <div class="cover">
          <div class="fragmentTop">
            <div class="allowRelay" v-if="selectNodeInfo.data.allowRelay==1" >允许接龙</div>
            <div class="notAllowRelay" v-if="selectNodeInfo.data.allowRelay==0" >不允许他人接龙</div>
            <div class="common-flex" style="width: 90%;"><span class="fragmentTopic">{{selectNodeInfo.topic}}</span></div>
            <svg @click="closeFragment" t="1687692218899" style="cursor: pointer;height: 25px;width: 25px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9883" width="200" height="200"><path d="M232.9 928.7c-34.8 0-69.6-13.2-96-39.7-53-53-53-139.1 0-192.1L463.8 370c10.3-10.3 27.1-10.3 37.5 0 10.3 10.3 10.3 27.1 0 37.5l-327 326.9c-32.3 32.3-32.3 84.9 0 117.2s84.9 32.3 117.2 0L850 293.1c32.3-32.3 32.3-84.9 0-117.2s-84.9-32.3-117.2 0L648.6 260c-10.3 10.3-27.1 10.3-37.5 0-10.3-10.3-10.3-27.1 0-37.5l84.1-84.1c53-53 139.1-53 192.1 0s53 139.1 0 192.1L328.9 889c-26.5 26.5-61.3 39.7-96 39.7z m0 0" fill="#2197EF" p-id="9884"></path><path d="M868.7 870.3c-42.7 42.7-112 42.7-154.7 0L155.6 311.8c-42.7-42.7-42.7-111.9 0-154.6 42.7-42.7 111.9-42.7 154.6 0l558.5 558.5c42.7 42.7 42.7 111.9 0 154.6z m0 0" fill="#CEE8FA" p-id="9885"></path><path d="M791.3 928.8c-36.3 0-70.4-14.1-96-39.8L136.8 330.5c-53-53-53-139.1 0-192.1 25.7-25.7 59.8-39.8 96-39.8 36.3 0 70.4 14.1 96 39.8l558.5 558.5c25.7 25.7 39.8 59.8 39.8 96 0 36.3-14.1 70.4-39.8 96-25.6 25.8-59.7 39.9-96 39.9zM232.9 151.6c-22.1 0-42.9 8.6-58.6 24.3-32.3 32.3-32.3 84.9 0 117.2l558.5 558.5c15.6 15.7 36.5 24.3 58.6 24.3s42.9-8.6 58.6-24.3c15.6-15.6 24.3-36.5 24.3-58.6s-8.6-42.9-24.3-58.6L291.5 175.9c-15.7-15.6-36.5-24.3-58.6-24.3z m0 0" fill="#2197EF" p-id="9886"></path></svg>
          </div>
          <div class="fragmentContent" >{{selectNodeInfo.data.content}}</div>
        </div>
      </div>
    </transition>
    <!--接龙弹窗 start-->
    <el-dialog
        :title="'片段接龙'"
        :visible.sync="dialogVisible"
        width="600px"
        @closed="form = {}"
        :destroy-on-close="true"
        :lock-scroll="false"
        :append-to-body="true"
    >
      <el-form label-width="80px" class="form-con">
        <el-form-item label="片段标题">
          <el-input
              type=""
              v-model="createNodeInfo.topic"
              class="ele-width"
              maxLength="30"
              placeholder="请输入片段标题，30字以内"
          ></el-input>
        </el-form-item>
        <el-form-item label="片段内容">
          <el-input
              type="textarea"
              :rows="10"
              v-model="createNodeInfo.content"
              class="ele-width"
              placeholder="请输入片段内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否允许他人接龙" label-width="200">
          <el-radio-group v-model="createNodeInfo.allowRelay" value="1">
            <el-radio-button :label="1">是</el-radio-button>
            <el-radio-button :label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="right mr-10">
          <el-button
              type="primary"
              class="common-btn"
              @click="saveNode"
              size="medium"
          >确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--接龙弹窗 end-->
    <!--修改片段弹窗 start-->
    <el-dialog
        :title="'片段接龙'"
        :visible.sync="updateVisible"
        width="600px"
        @closed="form = {}"
        :destroy-on-close="true"
        :lock-scroll="false"
        :append-to-body="true"
    >
      <el-form label-width="80px" class="form-con">
        <el-form-item label="片段标题">
          <el-input
              type=""
              v-model="updateNodeInfo.topic"
              class="ele-width"
              maxLength="30"
              placeholder="请输入片段标题，30字以内"
          ></el-input>
        </el-form-item>
        <el-form-item label="片段内容">
          <el-input
              type="textarea"
              :rows="10"
              v-model="updateNodeInfo.content"
              class="ele-width"
              placeholder="请输入片段内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否允许他人接龙" label-width="200">
          <el-radio-group v-model="updateNodeInfo.allowRelay" value="1">
            <el-radio-button :label="1">是</el-radio-button>
            <el-radio-button :label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="right mr-10">
          <el-button
              type="primary"
              class="common-btn"
              @click="updateNode"
              size="medium"
          >确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--修改片段弹窗 end-->
  </div>
</template>

<script>

import '../../public/jsmind/style/jsmind.css'
import jsMind from '../../public/jsmind/js/jsmind.js'
import "animate.css"
import ArticleComment from "@/components/ArticleComment";
require('../../public/jsmind/js/jsmind.draggable.js')
require('../../public/jsmind/js/jsmind.screenshot.js')


export default {
  components: {
    ArticleComment
  },
  watch: {
    'zoom.value' (val) {
      const zoom = val / 100
      this.jm.view.setZoom(zoom)
    },
    selectTypes (v) {
      this.loopTreeData(this.mind.data.children, (item) => {
        if (v.length) {
          if (v.includes(item.type)) {
            this.jm.set_node_color(item.id, this.bgMap[item.type].original, '#fff')
          } else {
            this.jm.set_node_color(item.id, this.bgMap[item.type].transparent, '#fff')
          }
        } else {
          this.jm.set_node_color(item.id, this.bgMap[item.type].transparent, '#fff')
        }
      })
    }
  },
  computed: {
    pathColor () {
      return function (type) {
        return this.structure.active === type ? this.structure.pathActiveColor : this.structure.pathOrginalColor
      }
    },
    rectColor () {
      return function (type) {
        return this.structure.active === type ? this.structure.rectActiveColor : this.structure.rectOrginalColor
      }
    }
  },
  data () {
    return {
      mind: {
        meta: {
          name: '思维导图',
        },
        format: 'node_tree',
        data:{}
        // data: {
        //   id: 'root',
        //   topic: '序幕',
        //   authorInfo:{
        //     nickname:'小明',
        //     avatarUrl:'https://img2.baidu.com/it/u=2064684749,2471246240&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=282',
        //     totalLike:12345
        //   },
        //   comments: [
        //     {
        //       name: 'Lana Del Rey',
        //       id: 19870621,
        //       headImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        //       comment: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
        //       time: '2019年9月16日 18:43',
        //       inputShow: false,
        //       reply: [
        //         {
        //           from: 'Taylor Swift',
        //           fromId: 19891221,
        //           fromHeadImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
        //           to: 'Lana Del Rey',
        //           toId: 19870621,
        //           comment: '我很喜欢你的新专辑！！',
        //           time: '2019年9月16日 18:43',
        //           inputShow: false
        //         },
        //         {
        //           from: 'Ariana Grande',
        //           fromId: 1123,
        //           fromHeadImg: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
        //           to: 'Lana Del Rey',
        //           toId: 19870621,
        //           comment: '别忘记宣传我们的合作单曲啊',
        //           time: '2019年9月16日 18:43',
        //           inputShow: false
        //
        //         }
        //       ]
        //     },
        //     {
        //       name: 'Taylor Swift',
        //       id: 19891221,
        //       headImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
        //       comment: '我发行了我的新专辑Lover',
        //       time: '2019年9月16日 18:43',
        //       inputShow: false,
        //       reply: [
        //         {
        //           from: 'Lana Del Rey',
        //           fromId: 19870621,
        //           fromHeadImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        //           to: 'Taylor Swift',
        //           toId: 19891221,
        //           comment: '新专辑和speak now 一样棒！',
        //           time: '2019年9月16日 18:43',
        //           inputShow: false
        //
        //         }
        //       ]
        //     },
        //     {
        //       name: 'Norman Fucking Rockwell',
        //       id: 20190830,
        //       headImg: 'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
        //       comment: 'Plz buy Norman Fucking Rockwell on everywhere',
        //       time: '2019年9月16日 18:43',
        //       inputShow: false,
        //       reply: []
        //     },
        //   ],
        //   content:"Wahn en sorl vealivasgon levy vonley\n" +
        //       "夜深了 小镇静谧而安详\n" +
        //       "Sedd delyn o passidy sevely\n" +
        //       "睡着了 像做了一个甜美的梦\n" +
        //       "Kluu vamo shevys dlesphon levy vonley\n" +
        //       "寂然啊 这个被施了魔法的小镇\n" +
        //       "Oul levmon seravo rystonray\n" +
        //       "女孩啊 我将一直守护着你\n" +
        //       "Du dududu Du dududu\n" +
        //       "Du dududu Du dududu\n" +
        //       "Dudu laav\n" +
        //       "Dudu 你的微笑\n" +
        //       "Du dududu Du dududu\n" +
        //       "Du dududu Du dududu\n" +
        //       "Sevely ahhs\n" +
        //       "一场梦啊\n" +
        //       "Du dududu Du dududu\n" +
        //       "Du dududu Du dududu\n" +
        //       "Dudu laav\n" +
        //       "Dudu 你的微笑\n" +
        //       "Du dududu Du dududu\n" +
        //       "Du dududu Du dududu\n" +
        //       "Relsama houwy\n" +
        //       "重新开始吧\n"+
        //       "Wahn en sorl vealivasgon levy vonley\n" +
        //           "夜深了 小镇静谧而安详\n" +
        //       "Sedd delyn o passidy sevely\n" +
        //       "睡着了 像做了一个甜美的梦\n" +
        //       "Kluu vamo shevys dlesphon levy vonley\n" +
        //       "寂然啊 这个被施了魔法的小镇\n" +
        //       "Oul levmon seravo rystonray\n" +
        //       "女孩啊 我将一直守护着你\n" +
        //       "Du dududu Du dududu\n" +
        //       "Du dududu Du dududu\n" +
        //       "Dudu laav\n" +
        //       "Dudu 你的微笑\n" +
        //       "Du dududu Du dududu\n" +
        //       "Du dududu Du dududu\n" +
        //       "Sevely ahhs\n" +
        //       "一场梦啊\n" +
        //       "Du dududu Du dududu\n" +
        //       "Du dududu Du dududu\n" +
        //       "Dudu laav\n" +
        //       "Dudu 你的微笑\n" +
        //       "Du dududu Du dududu\n" +
        //       "Du dududu Du dududu\n" +
        //       "Relsama houwy\n" +
        //       "重新开始吧",
        //   children: [
        //     {
        //       id: 1, // [必选] ID, 所有节点的ID不应有重复，否则ID重复的结节将被忽略
        //       topic: 'Easy', // [必选] 节点上显示的内容
        //       direction: 'right', // [可选] 节点的方向，此数据仅在第一层节点上有效，目前仅支持 left 和 right 两种，默认为 right
        //       authorInfo:{
        //         nickname:'小小',
        //         avatarUrl:'https://img2.baidu.com/it/u=2064684749,2471246240&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=282',
        //         totalLike:11451145
        //       },
        //       comments:[
        //         {
        //           name: 'Lana Del Rey',
        //           id: 19870621,
        //           headImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        //           comment: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
        //           time: '2019年9月16日 18:43',
        //           inputShow: false,
        //           reply: [
        //             {
        //               from: 'Taylor Swift',
        //               fromId: 19891221,
        //               fromHeadImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
        //               to: 'Lana Del Rey',
        //               toId: 19870621,
        //               comment: '我很喜欢你的新专辑！！',
        //               time: '2019年9月16日 18:43',
        //               inputShow: false
        //             }
        //           ]
        //         }
        //       ],
        //       content:"恩爱王师傅的无穷大无穷大科维奇接地网群d\n殴ID叫哦我",
        //       children: [
        //         { id: 'easy1', topic: 'Easy to show' ,
        //           children: [
        //             { id: 'test1', topic: 'test11111111111111111111111111111111111111111111111111111111111111111111' }
        //           ]
        //         },
        //         { id: 'easy2', topic: 'Easy to edit' },
        //         { id: 'easy3', topic: 'Easy to store' },
        //         { id: 'easy44', topic: 'Easy to 1' },
        //       ]
        //     },
        //     {
        //       id: 'open',
        //       topic: 'Open Source',
        //       direction: 'right',
        //       expanded: true,
        //       children: [
        //         { id: 'open1', topic: 'on GitHub' },
        //         { id: 'open2', topic: 'BSD License' }
        //       ]
        //     },
        //     {
        //       id: 'powerful',
        //       topic: 'Powerful',
        //       direction: 'right',
        //       children: [
        //         { id: 'powerful1', topic: 'Base on Javascript'},
        //         { id: 'powerful2', topic: 'Base on HTML5' },
        //         { id: 'powerful3', topic: 'Depends on you' }
        //       ]
        //     },
        //     {
        //       id: 'other',
        //       topic: 'test node',
        //       direction: 'right',
        //       children: [
        //         { id: 'other1', topic: "I'm from local variable"},
        //         { id: 'other2', topic: 'I can do everything'}
        //       ]
        //     },
        //     { id: 'easy444', topic: 'Easy to 2' },
        //     { id: 'easy4444', topic: 'Easy to 3' },
        //     { id: 'easy44444', topic: 'Easy to 4' },
        //     { id: 'easy444444', topic: 'Easy to 5' },
        //   ]
        // }
      },
      options: {
        container: 'jsmind_container', // [必选] 容器的ID
        editable: true, // [可选] 是否启用编辑
        theme: '', // [可选] 主题
        view: {
          engine: 'canvas', // 思维导图各节点之间线条的绘制引擎
          hmargin: 120, // 思维导图距容器外框的最小水平距离
          vmargin: 50, // 思维导图距容器外框的最小垂直距离
          line_width: 2, // 思维导图线条的粗细
          line_color: 'rgba(255,255,255,0.2)' // 思维导图线条的颜色
        },
        layout: {
          hspace: 80, // 节点之间的水平间距
          vspace: 30, // 节点之间的垂直间距
          pspace: 20 // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        shortcut: { // 禁用快捷键
          enable: false
        }
      },
      zoom: {
        value: 100  , // 层级大小
        min: 10, // 最小放大倍数%
        max: 400 // 最大放大倍数%
      },
      bgMap: {
        1: {
          original: 'rgb(100, 201, 53)',
          transparent: 'rgb(100, 201, 53, 0.2)'
        },
        2: {
          original: 'rgb(78,181,255)',
          transparent: 'rgb(43, 118, 239,0.2)'
        },
        3: {
          original: 'rgb(255,130,29)',
          transparent: 'rgba(255,41,41,0.2)'
        },
      },
      structure: {
        active: 'right',
        pathOrginalColor: '#2B2F36',
        pathActiveColor: '#3370FF',
        rectOrginalColor: '#C3C6CB',
        rectActiveColor: '#BACEFD'
      },
      //故事id
      storyId:1,
      //用户信息
      user:null,
      //是否已登录
      isLogined:false,
      story_name:'永远的二十四岁(遠天、とある忘れ物)',
      //片段内容显示控制
      showFragmentContent:false,
      //新增子节点填写信息窗口显示控制
      dialogVisible: false,
      //修改节点信息窗口控制
      updateVisible:false,
      // 选中节点信息
      selectNodeInfo: {
        id: null,
        Name: ''
      },
      //接龙新建节点信息
      createNodeInfo:{
        topic: '',
        content:'',
        allowRelay:1
      },
      //接龙修改片段信息
      updateNodeInfo:{
        topic: '',
        content:'',
        allowRelay:1
      },
      // 保存修改之前的信息
      tempNodeInfo: null,
      // 是否显示右侧侧边栏
      showSideBar: false,
      //滚动条管理
      hasScrollbar: false,
      typeQueue: new Set(['1', '2']), // 选中types Set
      selectTypes: ['1', '2'] // 选中types Array
    }
  },
  created() {
    let storyId=this.$route.query["storyId"];
    this.storyId=storyId;
    this.loadAllFragment(storyId);
    let user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
    console.log("user:",user)
    if(user==null){
      //未登录
      return false;
    }else{
      //已登录
      this.isLogined=true
      this.user=user
      console.log("user:",this.user)
      return true;
    }
  },
  methods: {
    //跳转到个人展示页面
    jumpToUserShow(userId){
      console.log(userId)
      window.open(this.$router.resolve("/app/usershow?userid="+userId).href,'_blank')
    },
    //重新加载所有评论
    reloadComment(){
      this.loadauthorInfoAndComment();
    },
    //修改评论
    updateTotalComment(x){
      this.selectNodeInfo.data.totalComment=this.selectNodeInfo.data.totalComment+x;
    },
    //根据片段名定位到对应页面
    jumpToFragment(fragmentId){
      console.log("jumpToFragment:",fragmentId)
      if (fragmentId!=null) {

        this.selectNodeInfo = this.jm.get_node(fragmentId)
        const nodeObj = this.jm.get_root()
        if(fragmentId==nodeObj.data.rootId){
          this.selectNodeInfo=nodeObj
        }
        this.jm.select_node(this.selectNodeInfo)
        console.log("selectNodeInfo:",this.selectNodeInfo)
        this.loadauthorInfoAndComment()
        this.jm.set_node_color(this.selectNodeInfo.id, this.selectNodeInfo.data['background-color'], '#500d41')
        this.showFragmentContent=true;
        this.showSideBar=true;
      }


    },
    //验证是否登陆
    checkIsLogined(){
      let user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
      console.log("user:",user)
      if(user==null){
        //未登录
        this.$notify({
          title: '请登录后再进行操作！',
          duration:1500
        });
        return false;
      }else{
        //已登录
        this.isLogined=true
        return true;
      }
    },
    //点赞
    pressLike(){
      //登录验证
      if(!this.checkIsLogined())return;

      let nodeid
      if (this.selectNodeInfo.id=='root')nodeid=this.selectNodeInfo.data.rootId
      else nodeid=this.selectNodeInfo.id
      console.log("点赞")
      this.request.get("/fragment/changeLike?userId="+this.user.id+"&fragmentId="+nodeid+"&beLike="+!this.selectNodeInfo.data.isLike).then(res=>{
        if (res.code=="200") {
          if (this.selectNodeInfo.data.isLike == false) {
            this.selectNodeInfo.data.authorInfo.totalLike = this.selectNodeInfo.data.authorInfo.totalLike + 1
          } else {
            this.selectNodeInfo.data.authorInfo.totalLike = this.selectNodeInfo.data.authorInfo.totalLike - 1
          }
          let nodeId = this.selectNodeInfo.id
          let nodeTopic = this.selectNodeInfo.topic
          let isLike = !this.selectNodeInfo.data.isLike
          let isCollected = this.selectNodeInfo.data.isCollected
          this.jm.update_node(nodeId, nodeTopic, isLike, isCollected)
          if (this.selectNodeInfo.data.isLike!=0){
            this.$notify({
              title: '点赞成功！',
              type:"success",
              duration:1500
            });
          }else{
            this.$notify({
              title: '取消点赞！',
              type:"success",
              duration:1500
            });
          }
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    //收藏片段
    pressCollect(){
      //登录验证
      if(!this.checkIsLogined())return;
      let nodeid
      if (this.selectNodeInfo.id=='root')nodeid=this.selectNodeInfo.data.rootId
      else nodeid=this.selectNodeInfo.id
      console.log("收藏")
      this.request.get("/fragment/changeCollection?userId="+this.user.id+"&fragmentId="+nodeid+"&beCollection="+!this.selectNodeInfo.data.isCollected).then(res=>{
        if (res.code=="200") {
          if (this.selectNodeInfo.data.isCollected == false) {
            this.selectNodeInfo.data.authorInfo.totalCollection = this.selectNodeInfo.data.authorInfo.totalCollection + 1
          } else {
            this.selectNodeInfo.data.authorInfo.totalCollection = this.selectNodeInfo.data.authorInfo.totalCollection - 1
          }
          let nodeId = this.selectNodeInfo.id
          let nodeTopic = this.selectNodeInfo.topic
          let isLike = this.selectNodeInfo.data.isLike
          let isCollected =!this.selectNodeInfo.data.isCollected
          this.jm.update_node(nodeId, nodeTopic, isLike, isCollected)
          if (this.selectNodeInfo.data.isCollected!=0){
            this.$notify({
              title: '收藏成功！',
              type:"success",
              duration:1500
            });
          }else{
            this.$notify({
              title: '取消收藏！',
              type:"success",
              duration:1500
            });
          }
        }else{
          this.$message.error(res.msg)
        }
      })

    },
    //返回上一个父片段
    backToFragment(){
      if(this.selectNodeInfo.parent==null){
        this.$notify({
          title: '已经到头啦！',
          duration:1500
        });
      }else {
        this.selectNodeInfo = this.selectNodeInfo.parent
        this.loadauthorInfoAndComment()
        this.jm.set_node_color(this.selectNodeInfo.id, this.selectNodeInfo.data['background-color'], '#500d41')
      }
    },
    chooseFragment(child){
      // console.log("点击下一幕",child)
      this.selectNodeInfo=child
      this.loadauthorInfoAndComment()
      this.jm.set_node_color(this.selectNodeInfo.id, this.selectNodeInfo.data['background-color'], '#500d41')
    },
    //根据传入故事id参数load页面内容
    loadAllFragment(storyID){
      this.request.get("/fragment/loadAllFragment?storyId="+storyID).then(res=> {
        console.log("返回的故事数据:",res.data.data)
        // res.data={
        //   "id": "root",
        //   "rootId": 1,
        //   "topic": "序幕",
        //   "authorInfo": {
        //     "nickname": null,
        //     "avatarUrl": null,
        //     "totalLike": 0
        //   },
        //   "isLike": 0,
        //   "isCollected": 0,
        //   "totalLike": 0,
        //   "totalCollection": 0,
        //   "totalComment": 0,
        //   "comments": [],
        //   "content": "Wahn en sorl vealivasgon levy vonley\r\n夜深了 小镇静谧而安详\r\nSedd delyn o passidy sevely\r\n睡着了 像做了一个甜美的梦\r\nKluu vamo shevys dlesphon levy vonley\r\n寂然啊 这个被施了魔法的小镇\r\nOul levmon seravo rystonray\r\n女孩啊 我将一直守护着你\r\nDu dududu Du dududu\r\nDu dududu Du dududu\r\nDudu laav\r\nDudu 你的微笑\r\nDu dududu Du dududu\r\nDu dududu Du dududu\r\nSevely ahhs\r\n一场梦啊\r\nDu dududu Du dududu\r\nDu dududu Du dududu\r\nDudu laav\r\nDudu 你的微笑\r\nDu dududu Du dududu\r\nDu dududu Du dududu\r\nRelsama houwy\r\n重新开始吧\r\nWahn en sorl vealivasgon levy vonley\r\n夜深了 小镇静谧而安详\r\nSedd delyn o passidy sevely\r\n睡着了 像做了一个甜美的梦\r\nKluu vamo shevys dlesphon levy vonley\r\n寂然啊 这个被施了魔法的小镇\r\nOul levmon seravo rystonray\r\n女孩啊 我将一直守护着你\r\nDu dududu Du dududu\r\nDu dududu Du dududu\r\nDudu laav\r\nDudu 你的微笑\r\nDu dududu Du dududu\r\nDu dududu Du dududu\r\nSevely ahhs\r\n一场梦啊\r\nDu dududu Du dududu\r\nDu dududu Du dududu\r\nDudu laav\r\nDudu 你的微笑\r\nDu dududu Du dududu\r\nDu dududu Du dududu\r\nRelsama houwy\r\n重新开始吧",
        //   "children": [
        //     {
        //       "id": 3,
        //       "topic": "第一幕",
        //       "authorInfo": {
        //         "nickname": null,
        //         "avatarUrl": null,
        //         "totalLike": 0
        //       },
        //       "isLike": 0,
        //       "isCollected": 0,
        //       "totalLike": 0,
        //       "totalCollection": 0,
        //       "totalComment": 0,
        //       "comments": [],
        //       "content": "111111111",
        //       "children": [
        //         {
        //           "id": 4,
        //           "topic": "第二幕",
        //           "authorInfo": {
        //             "nickname": null,
        //             "avatarUrl": null,
        //             "totalLike": 0
        //           },
        //           "isLike": 0,
        //           "isCollected": 0,
        //           "totalLike": 0,
        //           "totalCollection": 0,
        //           "totalComment": 0,
        //           "comments": [],
        //           "content": "222222222",
        //           "children": [
        //             {
        //               "id": 6,
        //               "topic": "第三幕",
        //               "authorInfo": {
        //                 "nickname": null,
        //                 "avatarUrl": null,
        //                 "totalLike": 0
        //               },
        //               "isLike": 0,
        //               "isCollected": 0,
        //               "totalLike": 0,
        //               "totalCollection": 0,
        //               "totalComment": 0,
        //               "comments": [],
        //               "content": "3333333",
        //               "children": []
        //             }
        //           ]
        //         },
        //         {
        //           "id": 5,
        //           "topic": "第二幕plus",
        //           "authorInfo": {
        //             "nickname": null,
        //             "avatarUrl": null,
        //             "totalLike": 0
        //           },
        //           "isLike": 0,
        //           "isCollected": 0,
        //           "totalLike": 0,
        //           "totalCollection": 0,
        //           "totalComment": 0,
        //           "comments": [],
        //           "content": "212122121",
        //           "children": []
        //         }
        //       ]
        //     }
        //   ]
        // }
        if(res.code=='200'){
          this.mind.data= res.data.data;
          this.story_name=res.data.storyName
          //创建布局
          this.jm = jsMind.show(this.options, this.mind)
          this.editor = this.jm.view.e_editor
          this.init()
          this.mouseWheel()
          this.mouseDrag()
          //跳转到节点
          let fragmentId=this.$route.query["fragmentId"];
          this.jumpToFragment(fragmentId)

        }else{
          this.$message.error(res.msg)
        }
      })
    },
    //返回上一页面
    GoBackPage(){
      window.location.replace("/APP/StoryInfo/?storyid="+this.storyId)
      // window.location.reload(); // 刷新页面
      // this.$router.go(0)
    },
    // 重置视图
    reset () {
      document.querySelector('.root').scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    },

    // 缩小
    zoomOut () {
      this.jm.view.zoomOut()
      this.zoom.value = parseInt(this.jm.view.actualZoom * 100)
    },
    // 放大
    zoomIn () {
      this.jm.view.zoomIn()
      this.zoom.value = parseInt(this.jm.view.actualZoom * 100)
    },

    // 循环树结构
    loopTreeData (list, callback) {
      (function doOneFloor (list) {
        if (Array.isArray(list)) {
          for (let i = 0; i < list.length; i++) {
            const item = list[i]
            callback(item, i)
            if (item.children && item.children.length > 0) {
              doOneFloor(item.children)
            }
          }
        }
      })(list)
    },

    // 设置背景颜色
    setColor () {
      this.jm.set_node_color(this.mind.data.id, this.bgMap[1].original, '#fff')
      this.loopTreeData(this.mind.data.children, (item) => {
        // console.log(item)
        if(item.allowRelay==1) {
          this.jm.set_node_color(item.id, this.bgMap[2].original, '#fff')
        }else{
          this.jm.set_node_color(item.id, this.bgMap[3].original, '#fff')
        }
      })
    },


    // 初始化配置
    init () {
      this.jm.view.minZoom = 0.1
      this.jm.view.maxZoom = 5
      this.jm.expand_all()
      this.setColor()

      // 重写编辑完成事件
      this.jm.view.edit_node_end = () => {
        const node = this.jm.view.get_editing_node()
        const viewData = node._data.view
        const element = viewData.element
        element.style.zIndex = 'auto'
        if (node.topic === this.editor.value) {
          this.jm.update_node(node.id, node.topic)
          return
        }
        node.topic = this.editor.value
        if (!node.topic) {
          this.$message.info('请输入卡片标题')
        }
        this.jm.update_node(node.id, node.topic)

        // TODO 调接口
      }

    },
    //加载作者和评论区信息
    loadauthorInfoAndComment(){
      let fragmentId=-1;
      if(this.selectNodeInfo.id=='root')fragmentId=this.selectNodeInfo.data.rootId
      else fragmentId=this.selectNodeInfo.id;
      console.log(fragmentId)
      let userId=0;
      if (this.user!=null)userId=this.user.id
      this.request.get("/fragment/loadauthorInfoAndComment?fragmentId="+fragmentId+"&userId="+userId).then(res=> {
        if(res.code=='200'){
          this.selectNodeInfo.data.authorInfo=res.data.authorInfo
          this.selectNodeInfo.data.comments=res.data.comments
          this.selectNodeInfo.data.isLike=res.data.isLike
          this.selectNodeInfo.data.isCollected=res.data.isCollected
          this.selectNodeInfo.data.totalComment=res.data.totalComment
        }else{
          this.$message.error(res.msg)
        }

      })
    },
    // 获取选中标签的 ID
    get_selected_nodeid () {
      //若重复选中
      const selectedNode = this.jm.get_selected_node()
      if (this.selectNodeInfo===selectedNode && selectedNode!=null){
        this.showFragmentContent=!this.showFragmentContent
        //取消选中
        this.jm.select_clear()
        console.log("重复选中同一node")
        //return null
      }else {
        this.selectNodeInfo = selectedNode
      }
      //若点击空白部分
      console.log("选中node的为：",selectedNode)
      if (selectedNode) {
        this.showSideBar=true
        this.showFragmentContent=true
        //加载作者和评论区信息
        this.loadauthorInfoAndComment()
        return selectedNode.id
      } else {
        this.showSideBar=false
        this.showFragmentContent=false
        return null
      }
    },
    //更新节点信息
    updateNode(){
      if (!this.updateNodeInfo.topic) {
        this.$message.info('请输入片段标题')
        return
      }
      if (!this.updateNodeInfo.content) {
        this.$message.info('请输入片段内容')
        return
      }
      console.log("输入的接龙节点topic为：",this.updateNodeInfo.topic)
      // 添加接龙
      // TODO 调接口
      let id
      if(this.selectNodeInfo.id=="root")id=this.selectNodeInfo.data.rootId;
      else id=this.selectNodeInfo.id;
      let fragmentData={
        fragmentId:id,
        fragmentName:this.updateNodeInfo.topic,
        content:this.updateNodeInfo.content,
        allowRelay:this.updateNodeInfo.allowRelay
      }
      this.request.post("/fragment/updateFragment",fragmentData).then(res=>{
        console.log("res:",res)
        if(res.code=="200") {
          console.log("更新节点成功")
          this.$message.success("更新节点成功！")
          // location.reload();
          let nodedata={
            allowRelay:res.data.allowRelay,
            authorInfo:null,
            comments:[],
            content:res.data.content,
            isCollected:0,
            isLike:0,
            totalLike:res.data.totalLike,
            totalCollection:res.data.totalCollection,
            totalComment:res.data.totalComment
          }
          this.jm.update_node(res.data.id,res.data.fragmentName,0,0,nodedata)
          this.jm.set_node_color(res.data.id, res.data.allowRelay?this.bgMap[2].original:this.bgMap[3].original, '#fff')
        }else{
          this.$message.error(res.msg);
        }

      })
      this.updateVisible = false
      this.showSideBar = false
      this.showFragmentContent = false

    },
    // 保存节点添加片段
    saveNode () {
      if (!this.createNodeInfo.topic) {
        this.$message.info('请输入片段标题')
        return
      }
      if (!this.createNodeInfo.content) {
        this.$message.info('请输入片段内容')
        return
      }
      console.log("输入的接龙节点topic为：",this.createNodeInfo.topic)
      // 添加接龙
      // TODO 调接口
      let id
      if(this.selectNodeInfo.id=="root")id=this.selectNodeInfo.data.rootId;
      else id=this.selectNodeInfo.id;
      let fragmentData={
        userId:this.user.id,
        storyId:this.storyId,
        parentId:id,
        fragmentName:this.createNodeInfo.topic,
        content:this.createNodeInfo.content,
        allowRelay:this.createNodeInfo.allowRelay
      }
      this.request.post("/fragment/addFragment",fragmentData).then(res=>{
        console.log("res:",res)
        if(res.code=="200") {
          console.log("添加节点成功")
          this.$message.success("添加节点成功！")
          // location.reload();
          let nodedata={
            allowRelay:res.data.allowRelay,
            authorInfo:null,
            comments:[],
            content:res.data.content,
            isCollected:0,
            isLike:0,
            totalLike:0,
            totalCollection:0,
            totalComment:0
          }
          this.jm.add_node(this.selectNodeInfo,res.data.id,res.data.fragmentName,nodedata)
          this.jm.set_node_color(res.data.id, res.data.allowRelay?this.bgMap[2].original:this.bgMap[3].original, '#fff')
        }else{
          this.$message.error(res.msg);
        }

      })
      this.dialogVisible = false
      this.showSideBar = false
      this.showFragmentContent = false
    },
    // 单击重置选中背景颜色
    nodeClick () {
      //通过id寻找
      const selectedId = this.get_selected_nodeid()
      if (!selectedId) return
      const nodeObj = this.jm.get_node(selectedId)
      this.jm.set_node_color(selectedId, nodeObj.data['background-color'], '#500d41')
    },
    //修改片段
    updateFragment(){
      if (!this.checkIsLogined())return;
      console.log("当前选中的节点：",this.selectNodeInfo)
      this.updateVisible = true
      this.updateNodeInfo={
        topic: this.selectNodeInfo.topic,
        content:this.selectNodeInfo.data.content,
        allowRelay:this.selectNodeInfo.data.allowRelay
      }
    },
    // 点击接龙按钮插入子级
    addChild () {
      if (!this.checkIsLogined())return;
      console.log("当前选中的节点：",this.selectNodeInfo)
      this.dialogVisible = true
      this.createNodeInfo={
        topic: '',
        content:'',
        allowRelay:1
      }
    },

    // 删除节点
    delCard () {
      if (!this.checkIsLogined())return;
      if(this.selectNodeInfo.children.length!=0){
        //已有接龙则不允许删除片段
        this.$notify({
          title: '提示',
          duration:1500,
          type:"warning",
          message: '存在后续接龙，不可删除！'
        });
        return;
      }
      if (this.user.id!=this.selectNodeInfo.data.authorInfo.id){
          this.$notify({
            title: '非作者！不可删除！',
            duration:1500
          });
      }
      if (this.selectNodeInfo.id=='root'){
        this.$notify({
          title: '根节点！不可删除！若想删除则可通过删除故事实现',
          duration:1500
        });
      }
      this.$confirm('确认删除该片段?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO

        this.request.delete('/fragment/deleteFragment?fragmentId='+this.selectNodeInfo.id).then(res=>{
          if(res.code=='200'){
            this.jm.remove_node(this.selectNodeInfo.id)
            this.selectNodeInfo=null
            this.showSideBar = false
            this.showFragmentContent=false
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    // 鼠标滚轮放大缩小
    mouseWheel () {
      if (document.addEventListener) {
        document.addEventListener('domMouseScroll', this.scrollFunc, false)
      }
      this.$refs.container.onmousewheel = this.scrollFunc
    },
    // 滚轮缩放
    scrollFunc (e) {
      e = e || window.event
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
          this.zoomIn()
        } else {
          this.zoomOut()
        }
      } else if (e.detail) {
        if (e.detail > 0) {
          this.zoomIn()
        } else {
          this.zoomOut()
        }
      }
      e.preventDefault()
      this.jm.resize()
    },
    // 鼠标拖拽
    mouseDrag () {
      // 里层
      const el = document.querySelector('.jsmind-inner')
      // 选中节点
      let selected

      el.onmousedown = (ev) => {
        // 选中节点
        selected = this.jm.get_selected_node()
        // 标识 是否拖拽节点 避免冲突
        this.dragNodeFlag = !!selected

        const disX = ev.clientX
        const disY = ev.clientY
        const originalScrollLeft = el.scrollLeft
        const originalScrollTop = el.scrollTop
        const originalScrollBehavior = el.style['scroll-behavior']
        const originalPointerEvents = el.style['pointer-events']
        // auto: 默认值，表示滚动框立即滚动到指定位置。
        el.style['scroll-behavior'] = 'auto'
        // 鼠标移动事件是监听的整个document，这样可以使鼠标能够在元素外部移动的时候也能实现拖动
        document.onmousemove = (ev) => {
          if (this.dragNodeFlag) return
          this.drag = false
          ev.preventDefault()
          // 计算拖拽的偏移距离
          const distanceX = ev.clientX - disX
          const distanceY = ev.clientY - disY

          el.scrollTo(originalScrollLeft - distanceX, originalScrollTop - distanceY)

          // 在鼠标拖动的时候将点击事件屏蔽掉
          el.style['pointer-events'] = 'none'
          el.style.cursor = 'grabbing'
        }
        document.onmouseup = () => {
          if (!this.dragNodeFlag) {
            el.style['scroll-behavior'] = originalScrollBehavior
            el.style['pointer-events'] = originalPointerEvents
            el.style.cursor = 'grab'
          }
          document.onmousemove = document.onmouseup = null
        }
      }
    },
    //右侧边栏关闭
    closeSideBar(){
      this.showSideBar=false
      this.showFragmentContent=false
    },
    closeFragment(){
      this.showFragmentContent=false;
    }




  },
  //挂载
  mounted () {


  },
  beforeDestroy () {
    document.removeEventListener('domMouseScroll', this.scrollFunc, false)
  },

}
</script>

<style lang="less">
@import '@/assets/css/style.less';
</style>

