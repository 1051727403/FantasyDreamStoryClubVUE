<template>
  <div id="root">
    <div class="header__banner">
      <picture class="v-img banner-img">
        <img src="https://pic4.zhimg.com/v2-666eb28ba8e686a26ae7295cd6a2a47a_r.jpg" style="background-size: cover; width: 100%;" alt="" loading="eager" onload="" width="3840" data-resolution-width="4800">
      </picture>
    </div>

    <div class="menu-fixed">
      <div class="container">
        <div class="inner-menu inner-menu-fixed">
          <div class="left-menu">
            <ul class="clearfix">
              <li>
                <a href="/cat/-1.html" target="_blank">
                  <span class="icon"></span>
                  轻小说列表
                  <i class="line"></i>
                </a>
              </li>
              <li>
                <a href="/list/top" target="_blank">
                  <span class="icon"></span>
                  排行榜
                  <i class="line"></i>
                </a>
              </li>
              <li>
                <a href="/article/list?cat=3" target="_blank">
                  <span class="icon"></span>
                  新闻资讯
                  <i class="line"></i>
                </a>
              </li>
              <li>
                <a href=" /activity/list" target="_blank">
                  <span class="icon"></span>
                  活动中心
                </a>
              </li>
            </ul>
          </div>
          <div class="right-menu">
            <ul class="clearfix">
              <li>
                <a href="/article/list" target="_blank">
                  <span class="icon"></span>
                  专栏
                </a>
              </li>
              <li>
                <a href="/omake#illustration?type=-1" target="_blank">
                  <span class="icon"></span>
                  特典
                </a>
              </li>
              <li>
                <a href="https://support.qq.com/products/35496" rel="nofollow" target="_blank">
                  <span class="icon"></span>
                  反馈
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-fixed">
      <span class="linovel-girl-icon"></span>
      <ul>
        <li>
          <a href="#">编辑强推</a>
        </li>
        <li>
          <a href="#">文库佳作</a>
        </li>
        <li>
          <a href="#">轻库专栏</a>
        </li>
        <li>
          <a href="#">热门应援</a>
        </li>
        <li>
          <a href="#">勤更推荐</a>
        </li>
        <li>
          <a href="#">排行榜</a>
        </li>
        <li>
          <a href="#">最近应援</a>
        </li>
      </ul>
      <span class="roll-top">
          <a href="#"></a>
      </span>
      <span class="qr-code">
          <a href="//app.linovel.net/" target="_blank"></a>
      </span>
    </div>

    <div class="menu">
      <div class="container">
        <div class="inner-menu ">
          <div class="left-menu">
            <ul class="clearfix">
              <li>
                <a href="/cat/-1.html" target="_blank">
                  <span class="icon"></span>
                  全部
                  <i class="line"></i>
                </a>
              </li>
              <li>
                <a href="/list/top" target="_blank">
                  <span class="icon"></span>
                  公告
                  <i class="line"></i>
                </a>
              </li>
              <li>
                <a href="/article/list?cat=3" target="_blank">
                  <span class="icon"></span>
                  故事会
                  <i class="line"></i>
                </a>
              </li>
              <li>
                <a href="/APP/StoryRelay" target="_blank">
                  <span class="icon"></span>
                  接龙页面
                  <i class="line"></i>
                </a>
              </li>
              <li>
                <a href="/APP/test" target="_blank">
                  <span class="icon"></span>
                  测试页面
                  <i class="line"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="right-menu">
            <ul class="clearfix">
              <li>
                <a href="/article/list" target="_blank">
                  <span class="icon"></span>
                  专栏
                </a>
              </li>
              <li>
                <a href="/omake#illustration?type=-1" target="_blank">
                  <span class="icon"></span>
                  特典
                </a>
              </li>
              <li>
                <a href="https://support.qq.com/products/35496" rel="nofollow" target="_blank">
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

        <div class="slide-recommend" style="height: 100%;">
          <el-carousel trigger="click" id="carousel-banner" class="carousel slide" style="height: 100%;">
            <el-carousel-item v-for="item in activity_recommendation" :key="item" class="carousel-inner">
              <a :href="storySkip(item.storyId)" class="item active" target="_blank">
                <img class="lazy" :data-original="original_cover" :src="item.coverUrl">
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="user-center">
          <div class="rules-notice">

            <div class="rules-list">
              <a href="/page/signRule" target="_blank">
                <p>公告</p>
              </a>

              <div class="notice-content">
                <div class="new-notice">
                  <a href="/article/765.html" target="_blank">
                    <div class="new-info">
                      <div class="new-title">
                        轻之文库第四回轻小说新人赏短篇入围作品公布                                        </div>
                      <div class="new-detail" style="width: 50px; text-align: right">
                        06-15                                        </div>
                    </div>
                  </a>
                </div>
                <div class="new-notice">
                  <a href="/article/765.html" target="_blank">
                    <div class="new-info">
                      <div class="new-title">
                        轻之文库第四回轻小说新人赏短篇入围作品公布                                        </div>
                      <div class="new-detail" style="width: 50px; text-align: right">
                        06-15                                        </div>
                    </div>
                  </a>
                </div>
                <div class="new-notice">
                  <a href="/article/765.html" target="_blank">
                    <div class="new-info">
                      <div class="new-title">
                        轻之文库第四回轻小说新人赏短篇入围作品公布                                        </div>
                      <div class="new-detail" style="width: 50px; text-align: right">
                        06-15                                        </div>
                    </div>
                  </a>
                </div>
                <div class="new-notice">
                  <a href="/article/765.html" target="_blank">
                    <div class="new-info">
                      <div class="new-title">
                        轻之文库第四回轻小说新人赏短篇入围作品公布                                        </div>
                      <div class="new-detail" style="width: 50px; text-align: right">
                        06-15                                        </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- 编辑强推 -->
    <div class="strength-recommend slide-thing">
      <div class="container clearfix">
        <div class="new-l-side">
          <div class="headline">
            <i class="headline-icon">推荐</i>
          </div>

          <div class="work-list clearfix">
            <ul>
              <li v-for="item in personal_recommendation" :key="item" span="4">
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
            <i class="update-headline-icon"></i>
            <div class="update-headline-text">
              最近更新
            </div>
          </div>

          <div class="update-list" v-for="item in latest_recommendation" :key="item">
            <a :href="storySkip(item.storyId)" class="book-card" target="_blank">
              <div class="book-name">{{item.storyName}}</div>
              <div class="book-detail">
                <span class="update-time">{{item.deltaTime}}</span>
              </div>
            </a>

<!--            <a href="/book/124359.html" class="book-card" target="_blank">
              <div class="book-name">
                在异世界也要重新磨砺爪牙                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                Fistof                            </span>
              </div>
            </a>
            <a href="/book/124356.html" class="book-card" target="_blank">
              <div class="book-name">
                灵魂与世界的栖息地：处在维莉耶的我                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                厄叶文                            </span>
              </div>
            </a>
            <a href="/book/124355.html" class="book-card" target="_blank">
              <div class="book-name">
                奇幻大陆                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                蓝萌雨1                            </span>
              </div>
            </a>
            <a href="/book/124347.html" class="book-card" target="_blank">
              <div class="book-name">
                非你莫属之飞妮沫舒                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                贝壳里笔记                            </span>
              </div>
            </a>
            <a href="/book/124346.html" class="book-card" target="_blank">
              <div class="book-name">
                星空下的链接（游侠篇）                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                星空下的萤火虫                            </span>
              </div>
            </a>
            <a href="/book/124342.html" class="book-card" target="_blank">
              <div class="book-name">
                我的基友居然真的变成了美少女                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                永恒的呆毛                            </span>
              </div>
            </a>
            <a href="/book/124340.html" class="book-card" target="_blank">
              <div class="book-name">
                魔法少女的忧郁                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                剑馨W                            </span>
              </div>
            </a>
            <a href="/book/124338.html" class="book-card" target="_blank">
              <div class="book-name">
                不想『谈』的故事                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                小城Yaa                            </span>
              </div>
            </a>
            <a href="/book/124337.html" class="book-card" target="_blank">
              <div class="book-name">
                《此夜，翠星正美》                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                MinorityMajor                            </span>
              </div>
            </a>
            <a href="/book/124335.html" class="book-card" target="_blank">
              <div class="book-name">
                转生恶役贵族~异世界求生记                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                沧天一弥                            </span>
              </div>
            </a>
            <a href="/book/124334.html" class="book-card" target="_blank">
              <div class="book-name">
                废材魔法师                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                ph_ed0638b6305abdf1                            </span>
              </div>
            </a>
            <a href="/book/124332.html" class="book-card" target="_blank">
              <div class="book-name">
                星历:4026                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                Shimakaze1942                            </span>
              </div>
            </a>
            <a href="/book/124330.html" class="book-card" target="_blank">
              <div class="book-name">
                黑城                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                风间黎                            </span>
              </div>
            </a>
            <a href="/book/124329.html" class="book-card" target="_blank">
              <div class="book-name">
                新黎明                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                硫磺社                            </span>
              </div>
            </a>
            <a href="/book/124328.html" class="book-card" target="_blank">
              <div class="book-name">
                300英雄的起源                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                阿呆debu                            </span>
              </div>
            </a>
            <a href="/book/124327.html" class="book-card" target="_blank">
              <div class="book-name">
                身为恶魔的她竟然拯救了浑浑噩噩的我                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                黯淡的背影                            </span>
              </div>
            </a>
            <a href="/book/124326.html" class="book-card" target="_blank">
              <div class="book-name">
                传媒：震惊！堂堂人族人皇，真实身份竟是血族萝莉                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                qq_634e31ac00c4e                            </span>
              </div>
            </a>
            <a href="/book/124324.html" class="book-card" target="_blank">
              <div class="book-name">
                致闯入我青春的你                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                しいなゆき                            </span>
              </div>
            </a>
            <a href="/book/124322.html" class="book-card" target="_blank">
              <div class="book-name">
                星游记：同人文                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                林林凡林林凡                            </span>
              </div>
            </a>
            <a href="/book/124319.html" class="book-card" target="_blank">
              <div class="book-name">
                四季如苏                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                儚野0-0                            </span>
              </div>
            </a>-->
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
    }
  },
  methods:{
    load() {
      this.request.get("story/recommendStory").then(res=>{
        console.log(res)
        this.personal_recommendation = res.data;
      })

      this.request.get("story/slideShow").then(res=>{
        console.log(res)
        this.activity_recommendation = res.data;
      })

      this.request.get("story/latestStory").then(res=>{
        console.log(res)
        this.latest_recommendation = res.data;
      })
    },
    storySkip(storyId) {
      return "StoryInfo/?storyid=" + storyId;
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