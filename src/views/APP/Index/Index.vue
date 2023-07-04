<template>
  <div id="root">
    <div class="header__banner">
      <picture class="v-img banner-img">
        <img src="https://pic4.zhimg.com/v2-666eb28ba8e686a26ae7295cd6a2a47a_r.jpg" style="background-size: cover; width: 100%;" alt="" loading="eager" onload="" width="3840" data-resolution-width="4800">
      </picture>
    </div>

    <div class="menu">
      <div class="container">
        <div class="inner-menu ">
          <div class="left-menu">
            <ul class="clearfix">
              <li>
                <a href="/APP/Search" target="_blank">
                  <span class="icon"></span>
                  故事列表
                  <i class="line"></i>
                </a>
              </li>
              <li>
                <a href="/APP/AnnounceList" target="_blank">
                  <span class="icon"></span>
                  公告
                  <i class="line"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="right-menu">
            <ul class="clearfix">
              <li>
                <a href="" rel="nofollow" target="_blank">
                  <span class="icon"></span>
                  反馈
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="index-banner">
      <div class="container" style="display: flex;">

        <div class="slide-recommend" style="height: 100%; box-shadow: 0 3px 12px 0 hsla(0, 0%, 60%, 0.44);">
          <el-carousel trigger="click" id="carousel-banner" class="carousel slide" style="height: 100%;">
            <el-carousel-item v-for="(item, index) in activity_recommendation" :key="index" class="carousel-inner">
              <a :href="'/APP/Announce/?id=' + item.announceId" class="item active" target="_blank">
                <img class="lazy" :data-original="original_cover" :src="item.coverUrl">
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="user-center">
          <div class="rules-notice">

            <div class="rules-list">
              <a href="/APP/AnnounceList" target="_blank">
                <p>公告</p>
              </a>

              <div class="notice-content">
                <div class="new-notice" v-for="(item, index) in announcements" :key="index">
                  <a :href="'/APP/Announce/?id=' + item.announceId" target="_blank">
                    <div class="new-info">
                      <div class="new-title">
                        {{item.title}}</div>
                      <div class="new-detail" style="width: 100px; text-align: right">
                        {{item.updateTime}}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
          <div class="button-container">

          </div>
        </div>

      </div>
    </div>

    <div class="strength-recommend slide-thing">
      <div class="container clearfix">
        <div class="hot-container">
          <a href="/APP/Search/?sort=liked" class="headline" target="_blank">
            <i class="headline-icon">热门</i>
          </a>

          <div class="work-list clearfix">
            <ul>
              <li v-for="(item, index) in hot_recommendation" :key="index" span="4">
                <a :href="storySkip(item.storyId)" class="book-item-inner" target="_blank" >
                  <div class="cover">
                    <div class="img-loading">
                      <el-image
                          style="width: 100%; height: 100%"
                          fit="cover"
                          class="lazy"
                          alt=""
                          :data-original="original_cover"
                          :src="item.coverUrl"
                          lazy></el-image>
                    </div>
                    <div class="mask">
                      <div class="mask-detail">
                        <span class="icon1"></span>
                        <p>{{item.totalLike}}</p>
                        <span class="icon2"></span>
                        <p>{{item.totalCollection}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="book-item-name" >{{item.storyName}}</div>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <!-- 编辑强推 -->
    <div class="strength-recommend slide-thing">
      <div class="container clearfix">
        <div class="new-l-side">
          <div class="headline">
            <div class="headline-left">
              <i class="headline-icon">推荐</i>
            </div>
            <button type="button" class="btn-vol btn-boutique" @click="reflesh"></button>
          </div>

          <div class="work-list clearfix">
            <ul>
              <li v-for="(item, index) in personal_recommendation" :key="index" span="4">
                <a :href="storySkip(item.storyId)" class="book-item-inner" target="_blank" >
                  <div class="cover">
                    <div class="img-loading">
                      <el-image
                          style="width: 100%; height: 100%"
                          fit="cover"
                          class="lazy"
                          alt=""
                          :data-original="original_cover"
                          :src="item.coverUrl"
                          lazy></el-image>
                    </div>
                    <div class="mask">
                      <div class="mask-detail">
                        <span class="icon1"></span>
                        <p>{{item.totalLike}}</p>
                        <span class="icon2"></span>
                        <p>{{item.totalCollection}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="book-item-name" >{{item.storyName}}</div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="new-r-side">
          <div class="update-headline">
            <a href="/APP/Search/?sort=date" class="headline" target="_blank">
              <i class="headline-icon" style="padding-left: 15px">最近更新</i>
            </a>
          </div>

          <div class="update-list" v-for="(item, index) in latest_recommendation" :key="index">
            <a :href="storySkip(item.storyId)" class="book-card" target="_blank">
              <div class="book-name">{{item.storyName}}</div>
              <div class="book-detail">
                <span class="update-time">{{item.deltaTime}}</span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "index.vue",
  created() {
    this.$emit("generateTab", this.plate)
    this.load();
  },
  data(){
    return {
      plate: '首页',

      original_cover: 'https://pic.vjshi.com/2017-08-22/25cade84a2fc335da9f9bfa2a9e013b4/00004.jpg?x-oss-process=style/watermark',
      activity_recommendation: [
        {
          coverUrl: "https://gd-hbimg.huaban.com/aef85c328a77b669806bb66add5f7c86402192cd192aec-BAv5SV_fw1200",
          link: "",
        },
        {
          coverUrl: "https://gd-hbimg.huaban.com/aef85c328a77b669806bb66add5f7c86402192cd192aec-BAv5SV_fw1200",
          link: "",
        }
      ],
      personal_recommendation: [],
      latest_recommendation: [],
      hot_recommendation: [],
      announcements: [],
    }
  },
  methods:{
    load() {
      this.reflesh()

      this.request.get("announce/slideShow").then(res=>{
        console.log(res)
        this.activity_recommendation = res.data;
      })

      this.request.get("announce/twoAnnounce").then(res=>{
        console.log(res)
        this.announcements = res.data;
      })

      this.request.get("story/latestStory").then(res=>{
        console.log(res)
        this.latest_recommendation = res.data;
      })

      this.request.get("story/hotStory").then(res=>{
        console.log(res)
        this.hot_recommendation = res.data;
      })
    },
    storySkip(storyId) {
      return "/APP/StoryInfo/?storyid=" + storyId;
    },
    reflesh() {
      this.request.get("story/recommendStory").then(res=>{
        console.log(res)
        this.personal_recommendation = res.data;
      })
    },
    jumpToStoryRelay(){
      this.$router.push("/APP/StoryRelay")
    },
    jumpToTest(){
      this.$router.push("/APP/test")
    }


  }
}
</script>

<style lang="less">
@import '@/assets/css/home.less';
</style>