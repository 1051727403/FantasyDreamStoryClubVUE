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

        <div class="slide-recommend">
          <el-carousel trigger="click" id="carousel-banner" class="carousel slide">
            <el-carousel-item v-for="item in activity_recommendation" :key="item" class="carousel-inner">
              <a :href="item.link" class="item active" target="_blank">
                <img class="lazy" :data-original="original_cover" :src="item.coverUrl">
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>

<!--        <div class="slide-recommend">
          <div id="carousel-banner" class="carousel slide" data-ride="carousel">

            &lt;!&ndash; Indicators &ndash;&gt;
            <ol class="carousel-indicators">
              <li data-target="#carousel-banner" data-slide-to="0" class="active"></li>
              <li data-target="#carousel-banner" data-slide-to="1" class=""></li>
              <li data-target="#carousel-banner" data-slide-to="2" class=""></li>
              <li data-target="#carousel-banner" data-slide-to="3" class=""></li>
              <li data-target="#carousel-banner" data-slide-to="4" class=""></li>
              <li data-target="#carousel-banner" data-slide-to="5" class=""></li>
            </ol>

            &lt;!&ndash; Wrapper for slides &ndash;&gt;
            <div class="carousel-inner" role="listbox">
              <a href="https://www.linovel.net/article/1239.html" class="item active" target="_blank">
                <img class="lazy" data-original="https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1ad5ad6eddc451da29f30946b6fd5266d0163211.jpg" src="https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1ad5ad6eddc451da29f30946b6fd5266d0163211.jpg">
&lt;!&ndash;                <div class="carousel-caption">
                  <img class="lazy" data-original="https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1ad5ad6eddc451da29f30946b6fd5266d0163211.jpg" src="" style="left: 0px; opacity: 1;">
                  <img class="lazy" data-original="" src="https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1ad5ad6eddc451da29f30946b6fd5266d0163211.jpg" style="left: 0px; opacity: 1;">
                </div>&ndash;&gt;
              </a>
              <a href="https://www.linovel.net/article/detail?id=1236" class="item" target="_blank">
                <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1119852_604cc7fd08b28413baf8432a7403ec14.jpg" src="https://rin.linovel.net/v3_recommend/1119852_604cc7fd08b28413baf8432a7403ec14.jpg" style="display: block;">
                <div class="carousel-caption item-banner">
                  <img class="lazy" data-original="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" style="left: 0px; opacity: 1;">
                  <img class="lazy" data-original="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" style="left: 0px; opacity: 1;">
                </div>
              </a>
              <a href="https://www.linovel.net/book/122429.html" class="item" target="_blank">
                <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1119852_e390eae52f9539cf93b3dd637d42c13b.jpg" src="https://rin.linovel.net/v3_recommend/1119852_e390eae52f9539cf93b3dd637d42c13b.jpg" style="display: block; width: auto; height: 360px;">
                <div class="carousel-caption item-banner">
                  <img class="lazy" data-original="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" style="left: 0px; opacity: 1;">
                  <img class="lazy" data-original="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" style="left: 0px; opacity: 1;">
                </div>
              </a>
              <a href="https://www.linovel.net/article/detail?id=1217" class="item" target="_blank">
                <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1218075_54af67e1e07ba0dd47378bf98573cb58.jpg" src="https://rin.linovel.net/v3_recommend/1218075_54af67e1e07ba0dd47378bf98573cb58.jpg" style="display: block; width: auto; height: 360px;">
                <div class="carousel-caption item-banner">
                  <img class="lazy" data-original="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" style="left: 0px; opacity: 1;">
                  <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1218075_54af67e1e07ba0dd47378bf98573cb58.jpg" src="https://rin.linovel.net/v3_recommend/1218075_54af67e1e07ba0dd47378bf98573cb58.jpg" style="display: block; opacity: 1; width: auto; height: 360px; left: 0px;">
                </div>
              </a>
              <a href="https://www.linovel.net/article/detail?id=1215" class="item" target="_blank">
                <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1218075_c8945e1398633e6666c113a4d41ec576.jpg" src="https://rin.linovel.net/v3_recommend/1218075_c8945e1398633e6666c113a4d41ec576.jpg" style="display: block; width: auto; height: 360px;">
                <div class="carousel-caption item-banner">
                  <img class="lazy" data-original="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" style="left: 0px; opacity: 1;">
                  <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1218075_c8945e1398633e6666c113a4d41ec576.jpg" src="https://rin.linovel.net/v3_recommend/1218075_c8945e1398633e6666c113a4d41ec576.jpg" style="display: block; opacity: 1; width: auto; height: 360px; left: 0px;">
                </div>
              </a>
              <a href="https://www.linovel.net/article/detail?id=819" class="item" target="_blank">
                <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1130871_60a77e33230aa5cde3cea8ce6e79711d.png" src="https://rin.linovel.net/v3_recommend/1130871_60a77e33230aa5cde3cea8ce6e79711d.png" style="display: block; width: auto; height: 360px;">
                <div class="carousel-caption item-banner">
                  <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1130871_69cd004543713d3a9ec2e1ce430799d8.png" src="https://rin.linovel.net/v3_recommend/1130871_69cd004543713d3a9ec2e1ce430799d8.png" style="display: block; opacity: 1; width: auto; height: 360px; top: 0px; left: 0px; z-index: 2;">
                  <img class="lazy" data-original="https://rin.linovel.net/v3_recommend/1130871_299c99b84e317f366d586cf491e41a19.png" src="https://rin.linovel.net/v3_recommend/1130871_299c99b84e317f366d586cf491e41a19.png" style="display: block; opacity: 1; width: auto; height: 360px; bottom: 0px; left: 0px; z-index: 1;">
                </div>
              </a>
            </div>

            &lt;!&ndash; Controls &ndash;&gt;
            <a class="left carousel-control" href="#carousel-banner" role="button" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left left-banner" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#carousel-banner" role="button" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right right-banner" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>-->

        <div class="user-center">
          <div class="rules-notice">
            <div class="rules-list">
              <a href="/page/signRule" target="_blank">
                <i class="signing-welfare"></i>
                <p>公告</p>
              </a>
            </div>
            <div class="notice-title">
              <span class="notice-icon"></span>
              <a href="/article/list?cat=2" target="_blank">全部</a>
            </div>

            <div class="notice-content">
<!--              <div class="work-list clearfix">
                <ul>
                  <li>
                    <a href="/book/115053.html" target="_blank" class="book-item-inner">
                      <div class="cover">
                        <div class="img-loading">
                          <img data-original="https://ts1.cn.mm.bing.net/th/id/R-C.57a05fcafaec1212e5c393ace0e5d957?rik=jx4FMa4HXHknqg&riu=http%3a%2f%2fpic.rmb.bdstatic.com%2f57a05fcafaec1212e5c393ace0e5d957.jpeg&ehk=OG3yy6GRS8Jj9ODlMArjrlPxOb4z2%2fV5vyYoWRWZpcM%3d&risl=&pid=ImgRaw&r=0" alt="" src="https://ts1.cn.mm.bing.net/th/id/R-C.57a05fcafaec1212e5c393ace0e5d957?rik=jx4FMa4HXHknqg&riu=http%3a%2f%2fpic.rmb.bdstatic.com%2f57a05fcafaec1212e5c393ace0e5d957.jpeg&ehk=OG3yy6GRS8Jj9ODlMArjrlPxOb4z2%2fV5vyYoWRWZpcM%3d&risl=&pid=ImgRaw&r=0" class="lazy">
                        </div>
                        <div class="mask">
                          <div class="mask-avatar">
                            <img data-original="https://avatar.linovel.net/1090/1090400_1554478952.jpg!min140jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy">
                          </div>
                          <div class="mask-author"> 月之咲夜空/著 </div>
                          <div class="mask-detail">
                            <p>字数 : 18.6万</p>
                            <p>热度 : 333.9万</p>
                          </div>
                        </div>
                      </div>
                      <div class="book-item-name"> 祖师爷今天也依旧是一条咸鱼 </div>
                    </a>
                  </li>
                  <li>
                    <a href="/book/106381.html" target="_blank" class="book-item-inner"><div class="cover"><div class="img-loading"><img data-original="https://rin.linovel.net/cover/106381_2bf19aaa268a443db60389fc31a9feac.jpg!min300jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask"><div class="mask-avatar"><img data-original="https://avatar.linovel.net/1052/1052957_1572959540.jpg!min140jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask-author"> 德川家康的鱼/著 </div><div class="mask-detail"><p>字数 : 79.6万</p><p>热度 : 399.8万</p></div></div></div><div class="book-item-name"> 一部充满烂梗且通俗易懂（存疑）的转生冒险喜剧 </div></a></li><li><a href="/book/117288.html" target="_blank" class="book-item-inner"><div class="cover"><div class="img-loading"><img data-original="https://rin.linovel.net/cover/20200609/117288_0_d747f48ff5c88863bb0994dd786c8cc8.jpg!min300jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask"><div class="mask-avatar"><img data-original="https://avatar.linovel.net/1143/1143337_1585577109.jpg!min140jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask-author"> 蒟蒻の秋竹同学/著 </div><div class="mask-detail"><p>字数 : 8万</p><p>热度 : 60.9万</p></div></div></div><div class="book-item-name"> 名为青春的美食研究社 </div></a></li><li><a href="/book/114774.html" target="_blank" class="book-item-inner"><div class="cover"><div class="img-loading"><img data-original="https://rin.linovel.net/cover/20201104/114774_0_c9542484e0f5743f0a27e74a4a741277.jpg!min300jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask"><div class="mask-avatar"><img data-original="https://avatar.linovel.net/1184/1184187_1587814193.jpg!min140jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask-author"> Aaaaaaaapi/著 </div><div class="mask-detail"><p>字数 : 40.4万</p><p>热度 : 169.5万</p></div></div></div><div class="book-item-name"> 不良穿越——在异世界也依旧我行我素 </div></a></li><li><a href="/book/116479.html" target="_blank" class="book-item-inner"><div class="cover"><div class="img-loading"><img data-original="https://rin.linovel.net/cover/20210622/116479_0_1ca93f61100eeffe0b61767cffd7efdc.jpg!min300jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask"><div class="mask-avatar"><img data-original="https://avatar.linovel.net/1053/1053999_1645542004.jpg!min140jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask-author"> 叶声雪痕/著 </div><div class="mask-detail"><p>字数 : 49.4万</p><p>热度 : 570.1万</p></div></div></div><div class="book-item-name"> 春秋战国第一毒士又要被迫行善？ </div></a></li><li><a href="/book/114929.html" target="_blank" class="book-item-inner"><div class="cover"><div class="img-loading"><img data-original="https://rin.linovel.net/cover/20201225/114929_0_b5b667d1fccbb85b7cb03b52a5935361.jpg!min300jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask"><div class="mask-avatar"><img data-original="https://avatar.linovel.net/1185/1185042_1582543340.jpg!min140jpg" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" class="lazy"></div><div class="mask-author"> 琉璃喵/著 </div><div class="mask-detail"><p>字数 : 19.3万</p><p>热度 : 170.8万</p></div></div></div><div class="book-item-name"> 山海一锅 </div></a></li></ul></div>-->
<!--              <div class="new-notice">
                <a href="/article/765.html" target="_blank">
                  <div class="new-info">
                    <div class="new-title">
                      轻之文库第四回轻小说新人赏短篇入围作品公布                                        </div>
                    <div class="new-detail">
                      轻之文库编辑部 / 06-15                                        </div>
                  </div>
                </a>
              </div>
              <div class="new-notice">
                <a href="/article/764.html" target="_blank">
                  <div class="new-info">
                    <div class="new-title">
                      轻之文库第四回轻小说新人赏中篇入围作品公布                                        </div>
                    <div class="new-detail">
                      轻之文库编辑部 / 06-15                                        </div>
                  </div>
                </a>
              </div>-->
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
                <a :href="item.link" class="book-item-inner" target="_blank" >
                  <div class="cover">
                    <div class="img-loading">
                      <el-image
                          style="width: 100%; height: 100%"
                          fit="cover"
                          class="lazy"
                          :data-original="original_cover"
                          alt=""
                          :src="item.coverUrl"></el-image>
                    </div>
                    <div class="mask">

                      <!--                      <div class="article-item-infos flex fs-sm text-gray">
                                              <div class="flex-1">
                                                <el-image src="vue/src/assets/liked.png"></el-image>
                                                <span>180817</span>
                                              </div>
                                              <div class="flex-1">

                                                <span>1799</span>
                                              </div>
                                            </div>-->

                      <div class="mask-detail">
                        <p>点赞 : {{item.totalLike}}</p>
                        <p>收藏 : {{item.totalCollection}}</p>
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
              排行榜
            </div>
          </div>
          <div class="update-list">
            <a href="/book/124362.html" class="bookup-card" target="_blank">
              <div class="book-name">
                结晶争夺战                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                机械王者                            </span>
              </div>
            </a>
            <a href="/book/124359.html" class="bookup-card" target="_blank">
              <div class="book-name">
                在异世界也要重新磨砺爪牙                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                Fistof                            </span>
              </div>
            </a>
            <a href="/book/124356.html" class="bookup-card" target="_blank">
              <div class="book-name">
                灵魂与世界的栖息地：处在维莉耶的我                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                厄叶文                            </span>
              </div>
            </a>
            <a href="/book/124355.html" class="bookup-card" target="_blank">
              <div class="book-name">
                奇幻大陆                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                蓝萌雨1                            </span>
              </div>
            </a>
            <a href="/book/124347.html" class="bookup-card" target="_blank">
              <div class="book-name">
                非你莫属之飞妮沫舒                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                贝壳里笔记                            </span>
              </div>
            </a>
            <a href="/book/124346.html" class="bookup-card" target="_blank">
              <div class="book-name">
                星空下的链接（游侠篇）                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                星空下的萤火虫                            </span>
              </div>
            </a>
            <a href="/book/124342.html" class="bookup-card" target="_blank">
              <div class="book-name">
                我的基友居然真的变成了美少女                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                永恒的呆毛                            </span>
              </div>
            </a>
            <a href="/book/124340.html" class="bookup-card" target="_blank">
              <div class="book-name">
                魔法少女的忧郁                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                剑馨W                            </span>
              </div>
            </a>
            <a href="/book/124338.html" class="bookup-card" target="_blank">
              <div class="book-name">
                不想『谈』的故事                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                小城Yaa                            </span>
              </div>
            </a>
            <a href="/book/124337.html" class="bookup-card" target="_blank">
              <div class="book-name">
                《此夜，翠星正美》                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                MinorityMajor                            </span>
              </div>
            </a>
            <a href="/book/124335.html" class="bookup-card" target="_blank">
              <div class="book-name">
                转生恶役贵族~异世界求生记                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                沧天一弥                            </span>
              </div>
            </a>
            <a href="/book/124334.html" class="bookup-card" target="_blank">
              <div class="book-name">
                废材魔法师                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                ph_ed0638b6305abdf1                            </span>
              </div>
            </a>
            <a href="/book/124332.html" class="bookup-card" target="_blank">
              <div class="book-name">
                星历:4026                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                Shimakaze1942                            </span>
              </div>
            </a>
            <a href="/book/124330.html" class="bookup-card" target="_blank">
              <div class="book-name">
                黑城                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                风间黎                            </span>
              </div>
            </a>
            <a href="/book/124329.html" class="bookup-card" target="_blank">
              <div class="book-name">
                新黎明                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                硫磺社                            </span>
              </div>
            </a>
            <a href="/book/124328.html" class="bookup-card" target="_blank">
              <div class="book-name">
                300英雄的起源                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                阿呆debu                            </span>
              </div>
            </a>
            <a href="/book/124327.html" class="bookup-card" target="_blank">
              <div class="book-name">
                身为恶魔的她竟然拯救了浑浑噩噩的我                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                黯淡的背影                            </span>
              </div>
            </a>
            <a href="/book/124326.html" class="bookup-card" target="_blank">
              <div class="book-name">
                传媒：震惊！堂堂人族人皇，真实身份竟是血族萝莉                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                qq_634e31ac00c4e                            </span>
              </div>
            </a>
            <a href="/book/124324.html" class="bookup-card" target="_blank">
              <div class="book-name">
                致闯入我青春的你                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                しいなゆき                            </span>
              </div>
            </a>
            <a href="/book/124322.html" class="bookup-card" target="_blank">
              <div class="book-name">
                星游记：同人文                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                林林凡林林凡                            </span>
              </div>
            </a>
            <a href="/book/124319.html" class="bookup-card" target="_blank">
              <div class="book-name">
                四季如苏                            </div>
              <div class="book-detail">
                            <span class="book-author">
                                儚野0-0                            </span>
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
    }
  },
  methods:{
    load() {
      this.request.get("story/recommendStory").then(res=>{
        console.log(res)
        this.personal_recommendation = res.data;
      })

      this.request.get("story/activityRecommend").then(res=>{
        console.log(res)
        this.activity_recommendation = res.data;
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