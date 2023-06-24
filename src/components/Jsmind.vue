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
      <svg @click="GoBackPage" t="1687590289426" style="height: 35px;width: 35px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1622" width="200" height="200"><path d="M728 212.182v-82.183a8 8 0 0 0-13.327-5.968L306.69 488.138c-0.9 0.803-1.754 1.657-2.558 2.557-11.772 13.178-10.626 33.4 2.558 45.167l407.984 364.107A8 8 0 0 0 728 894.001v-82.183a16 16 0 0 0-5.346-11.937L400.082 512l322.572-287.88A16 16 0 0 0 728 212.181z" fill="#5090F1" p-id="1623"></path></svg>
    </div>

<!--    树形布局-->
      <div class="jsmind_layout animate__animated animate__fadeInRight">
        <div
          id="jsmind_container"
          ref="container"
          @click="nodeClick"
          @contextmenu.prevent.stop="nodeClick"
        >
        </div>
      </div>

    <!-- 点击按钮侧边栏详细信息菜单 -->
    <transition name="sideBar">
    <div class="right_slider_bar"  v-if="showSideBar">
        <!-- 内容 -->
<!--      上半-->
      <div class="sideBarTop">
        <div class="backIcon"@click="closeSideBar">
          <svg  style="width: 25px;height: 25px;" t="1687598692787" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10553" width="200" height="200"><path d="M428.31644444 679.92462223l76.91377778-19.11466667-30.49244445-25.03111111a145.89724445 145.89724445 0 0 0-224.22186666-184.51342222l-7.96444444-6.58773333-195.44746667 329.95555555 298.74631111-74.25137778c2.50311111 0.13653333 5.02897778 0.19342222 7.56622223 0.19342223a145.18044445 145.18044445 0 0 0 74.8999111-20.65066667z" fill="#1792E5" p-id="10554"></path><path d="M1011.83715556 511.21493333c7.82791111-6.62186667 12.62933333-17.44213333 12.62933333-28.8768a38.05866667 38.05866667 0 0 0-12.02631112-27.67075555L608.81351111 93.7528889c-6.61048889-5.41582222-14.4384-9.02257778-23.46097777-9.02257779-20.48 0-36.69333333 16.83911111-36.69333334 37.888v159.41404445c-308.57671111 51.72337778-526.336 286.32177778-547.38488889 587.69635555 1.20604445 12.62933333 11.37777778 22.85795555 23.46097778 22.85795556a24.62151111 24.62151111 0 0 0 13.23235555-4.22115556c53.47555555-39.09404445 99.24835555-68.57386667 135.39555556-87.82506666 87.22204445-49.92568889 222.57208889-89.62275555 374.74986667-105.87022222v147.97937777c0 21.06026667 16.24746667 37.89937778 36.7047111 37.89937778 8.41955555 0 16.23608889-3.60675555 22.85795557-8.41955555l114.91555555-102.8664889a35.98791111 35.98791111 0 0 0 10.74062222-33.1207111v-0.59164445c-6.01884445-24.66702222-35.48728889-34.89564445-54.73848889-18.05653333l-52.9408 46.33031111V614.67306667l-40.89173333 3.00373333c-150.99448889 11.37777778-347.69351111 52.9408-474.61262222 129.3312-11.37777778 7.22488889-25.27004445-4.8128-21.0488889-17.44213333 70.97457778-204.51555555 255.64728889-348.88817778 502.89777779-378.95964444l33.67822221-4.20977778V200.81777778l320.62577779 281.52035555L769.42222222 637.53102223c-9.6256 8.41955555-13.23235555 21.61777778-10.24 34.28124444v0.6144c6.61048889 23.4496 34.88426667 32.47217778 53.53244445 16.23608889z m0 0" fill="#424242" p-id="10555"></path></svg>
        </div>
        <div class="sideTopic">
          主题： {{selectNodeInfo.topic}}
        </div>

      </div>
<!--      底部-->
      <div class="sideBarBottom">
          <el-button @click="addChild" class="Relay">片段接龙</el-button>
          <el-button @click="delCard">删除片段</el-button>
      </div>
    </div>
    </transition>

    <!--右键点击后出现的输入框-->
    <el-dialog
        :title="'插入子级'"
        :visible.sync="dialogVisible"
        width="600px"
        @closed="form = {}"
        :destroy-on-close="true"
        :lock-scroll="false"
        :append-to-body="true"
        v-if="selectNodeInfo"
    >
      <el-form label-width="80px" class="form-con">
        <el-form-item label="卡片标题">
          <el-input
              type="textarea"
              :rows="2"
              v-model="selectNodeInfo.Name"
              class="ele-width"
              maxLength="64"
          ></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="right mr-10">
          <el-button
              type="primary"
              class="common-btn"
              @click="sureEditNode"
              size="medium"
          >确 定</el-button
          >
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import '../../public/jsmind/style/jsmind.css'
import jsMind from '../../public/jsmind/js/jsmind.js'
import "animate.css"
require('../../public/jsmind/js/jsmind.draggable.js')
require('../../public/jsmind/js/jsmind.screenshot.js')


export default {
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
        data: {
          id: 'root',
          topic: 'jsMind',
          children: [
            {
              id: 'easy', // [必选] ID, 所有节点的ID不应有重复，否则ID重复的结节将被忽略
              topic: 'Easy', // [必选] 节点上显示的内容
              direction: 'right', // [可选] 节点的方向，此数据仅在第一层节点上有效，目前仅支持 left 和 right 两种，默认为 right
              expanded: true, // [可选] 该节点是否是展开状态，默认为 true
              children: [
                { id: 'easy1', topic: 'Easy to show' ,
                  children: [
                    { id: 'test1', topic: 'test1' }
                  ]
                },
                { id: 'easy2', topic: 'Easy to edit' },
                { id: 'easy3', topic: 'Easy to store' },
                { id: 'easy4', topic: 'Easy to embed' }
              ]
            },
            {
              id: 'open',
              topic: 'Open Source',
              direction: 'right',
              expanded: true,
              children: [
                { id: 'open1', topic: 'on GitHub' },
                { id: 'open2', topic: 'BSD License' }
              ]
            },
            {
              id: 'powerful',
              topic: 'Powerful',
              direction: 'right',
              children: [
                { id: 'powerful1', topic: 'Base on Javascript'},
                { id: 'powerful2', topic: 'Base on HTML5' },
                { id: 'powerful3', topic: 'Depends on you' }
              ]
            },
            {
              id: 'other',
              topic: 'test node',
              direction: 'right',
              children: [
                { id: 'other1', topic: "I'm from local variable"},
                { id: 'other2', topic: 'I can do everything'}
              ]
            }
          ]
        }
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
          line_color: 'rgba(87, 107, 127,0.5)' // 思维导图线条的颜色
        },
        layout: {
          hspace: 100, // 节点之间的水平间距
          vspace: 20, // 节点之间的垂直间距
          pspace: 20 // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        shortcut: { // 禁用快捷键
          enable: false
        }
      },
      zoom: {
        value: 100, // 层级大小
        min: 10, // 最小层级
        max: 400 // 最大层级
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
      },
      structure: {
        active: 'right',
        pathOrginalColor: '#2B2F36',
        pathActiveColor: '#3370FF',
        rectOrginalColor: '#C3C6CB',
        rectActiveColor: '#BACEFD'
      },
      dialogVisible: false,
      selectNodeInfo: {
        id: null,
        Name: ''
      }, // 选中节点信息
      tempNodeInfo: null, // 保存修改之前的信息
      showSideBar: false, // 是否显示右侧侧边栏
      typeQueue: new Set(['1', '2']), // 选中types Set
      selectTypes: ['1', '2'] // 选中types Array
    }
  },
  methods: {

    //返回上一页面
    GoBackPage(){
      this.$router.push("../")
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
      this.jm.set_node_color('root', this.bgMap[1].original, '#fff')
      this.loopTreeData(this.mind.data.children, (item) => {
        this.jm.set_node_color(item.id, this.bgMap[2].original, '#fff')
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
    // 获取选中标签的 ID
    get_selected_nodeid () {
      const selectedNode = this.jm.get_selected_node()
      this.selectNodeInfo=selectedNode
      console.log("选中node的为：",selectedNode)
      if (selectedNode) {
        this.showSideBar=true
        return selectedNode.id
      } else {
        this.showSideBar=false
        return null
      }
    },

    // 保存节点
    sureEditNode () {
      if (!this.selectNodeInfo.Name) {
        this.$message.info('请输入卡片标题')
        return
      }
        // 添加接龙
        // TODO 调接口

      this.dialogVisible = false
    },

    // 拖拽
    handleDrop (draggingNode, dropNode) {
      // 前一个兄弟节点
      const prevNode = this.jm.find_node_before(dropNode)
      // 获取移动后的node
      const dragForm = {
        modelId: '',
        treeNum: !prevNode ? draggingNode : prevNode.id,
        thisTreeNum: dropNode
      }
      console.log('dragForm', dragForm)

      // TODO 调接口
    },
    // 单击重置选中背景颜色
    nodeClick () {
      //通过id寻找
      const selectedId = this.get_selected_nodeid()
      if (!selectedId) return
      const nodeObj = this.jm.get_node(selectedId)
      this.jm.set_node_color(selectedId, nodeObj.data['background-color'], '#500d41')
    },

    // 插入子级
    addChild () {
      const selectedNode = this.jm.get_selected_node()
      console.log("当前选中的节点：",selectedNode)
      if (selectedNode.data) {
        this.dialogVisible = true
        this.selectNodeInfo = {
          id: selectedNode.data.num,
          Name: ''
        }
      } else {
        this.$message.error('节点不存在！出错！')
      }
    },

    // 删除节点
    delCard () {
      const selectedNode = this.jm.get_selected_node()
      if (selectedNode.data) {
        // TODO
        this.jm.remove_node(selectedNode.id)
        // 获取数据
        console.log(this.jm.get_data('node_tree'))
      } else {
        this.$message.error('请选择卡片')
      }
      this.showSideBar = false
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

    // 导出图片
    screen_shot () {
      // 去除透明度
      this.loopTreeData(this.mind.data.children, (item) => this.jm.set_node_color(item.id, this.bgMap[item.type].original, '#fff'))
      try {
        this.jm.screenshot.shootDownload()
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        this.setColor()
      }, 1000)
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
    }
  },
  mounted () {
    this.jm = jsMind.show(this.options, this.mind)

    // 自定义拖拽完成事件有bug
    // jsMind.draggable.prototype.handleDrag = (srcNode, targetNode, targetDirect) => {
    //   const nextParentId = srcNode.parent.id
    //   this.handleDrop(nextParentId, srcNode.id)
    // }
    this.editor = this.jm.view.e_editor
    this.init()
    this.mouseWheel()
    this.mouseDrag()
  },
  beforeDestroy () {
    document.removeEventListener('domMouseScroll', this.scrollFunc, false)
  },
}
</script>

<style lang="less">
@import '@/assets/css/style.less';
</style>

