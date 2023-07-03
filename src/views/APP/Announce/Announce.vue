<template>

  <div id="app">
    <div class="article-detail">

      <div class="article-breadcrumb">
        <a href="//www.bilibili.com/read/home?from=articleDetail" target="_self" class="breadcrumb-name">公告</a>
        <span class="slash">/</span>
        <!----><!----><!----><!---->
        <span class="breadcrumb-name breadcrumb-title">{{title}}</span>
      </div>

      <div class="article-container">
        <div class="article-cover-container">
          <el-image
              style="width: 100%; height: 100%; padding: 10px 75px; max-height: 1000px"
              fit="cover"
              class="lazy"
              alt=""
              :src="coverUrl"
              lazy></el-image>
        </div>

        <div class="article-container__content">
          <div class="title-container">
            <h1 class="title">{{title}}</h1><!---->
            <div class="article-read-panel" data-v-1d1eb212="">
              <div class="article-read-info" data-v-1d1eb212=""><!---->
                <span class="publish-text" data-v-1d1eb212="">{{createTime}}</span>
              </div><!---->
            </div>
          </div>
          <div class="title-line"></div>
          <div id="article-content" class="article-content">
            <div id="read-article-holder" class="normal-article-holder read-article-holder">
              <p>{{content}}</p>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import '@/assets/css/announce.less';
export default {
  name: "announce.vue",
  created() {
    this.$emit("generateTab", this.plate)
    this.load();
  },
  data(){
    return {
      plate: '公告',

      id: 0,
      title: '标题',
      content: '正文',
      createTime: '2000-1-1',
      coverUrl: '',
    }
  },
  methods:{
    load() {
      this.id = this.$route.query.id;
      console.log('id:', this.id);

      this.request.get("announce/announce", {
        params: {
          id: this.id
        },
      }).then(res=>{
        console.log(res);
        this.title = res.data.title;
        this.content = res.data.content;
        this.createTime = res.data.createTime;
        this.coverUrl = res.data.coverUrl;
      })
    },

  }
}
</script>

<style scoped>

</style>