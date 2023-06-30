<template>
  <div class="no-wrapper">

    <a href="" target="_blank" class="hidden-xs" style="display:block; height: 200px; position: absolute; top: 0; left: 0; right: 0;"></a>

    <div class="menu-fixed show">
      <div class="container">
        <div :class="menuClass" v-show="menuVisible" transition="menu-transition">
          <div class="box-search">

            <div class="search-condition">
              <div class="condition-type">分类：</div>
              <ul>
                <li class="special">
                  <a rel="nofollow" :href="tagSearch(-1)" :class="tagChooseClass(-1)">
                    全部</a>
                </li>
                <li class="special" v-for="tag in allTags" :key="tag">
                  <a rel="nofollow" :href="tagSearch(tag.tagId)" :class="tagChooseClass(tag.tagId)">
                    {{tag.tagName}}</a>
                </li>
              </ul>
            </div>

            <div class="search-condition">
              <div class="condition-type">排序：</div>
              <ul>
                <li>
                  <a rel="nofollow" :href="sortSearch('date')" :class="sortChooseClass('date')">
                    最新</a>
                </li>
                <li>
                  <a rel="nofollow" :href="sortSearch('liked')" :class="sortChooseClass('liked')">
                    最多点赞</a>
                </li>
                <li>
                  <a rel="nofollow" :href="sortSearch('collection')" :class="sortChooseClass('collection')">
                    最多收藏</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="cat-container" style="margin-top: 90px;">
        <div class="cat-header"></div>
        <div class="rank-content">
          <div class="rank-book-list">

            <div class="rank-book" v-for="book in allBooks" :key="book">
              <div class="book-draw">
                <div class="book-cover">
                  <img :src="book.coverUrl" alt="">
                </div>
                <div class="book-box">
                  <div class="book-box-mask"></div>
                  <div class="book-info">
                    <a :href="storySkip(book.storyId)" target="_blank" class="book-name">
                      {{book.storyName}}</a>
                    <div class="book-tags">
                      <a class="book-tag" href="/cat/1.html" target="_blank" v-for="tag in book.tags" :key="tag">
                        {{tag.tagName}}</a>
                    </div>
                    <div class="book-intro">
                      {{book.introduce}}</div>
                    <div class="book-extra">
                      {{book.updateTime}} 丨 {{book.createTime}}</div>
                  </div>
                </div>
              </div>

              <div class="rank-book-mask">
                <a href="/book/100818.html" target="_blank" class="book-mask-left">
                  <div class="vol-name">
                    第14卷					</div>
                  <div class="vol-intro">
                    艾卡等人即刻前往中部海域寻找唤醒薇汐的唯一希望——世界树。在那里，艾卡回忆起了被遗忘的童年时光，以及与她的初次相遇。
                    与此同时，世界树的魔力以不完整的状态被激活，世界的根基剧烈动摇。					</div>
                </a>

                <div class="book-mask-line"></div>

                <div class="book-mask-right">
                  <ul class="vol-chapter">
                    <li>
                      <a href="/book/100818/106886.html" target="_blank">
                        <p>第三章 星落（8）</p>
                      </a>
                    </li>
                    <li>
                      <a href="/book/100818/86084.html" target="_blank">
                        <p>终章 樱开一度亦是樱</p>
                      </a>
                    </li>
                    <li>
                      <a href="/book/100818/106889.html" target="_blank">
                        <p>终章 樱开一度亦是樱（2）</p>
                      </a>
                    </li>
                    <li>
                      <a href="/book/100818/96615.html" target="_blank">
                        <p>后记</p>
                      </a>
                    </li>
                    <li>
                      <a href="/book/100818/228633.html" target="_blank">
                        <div class="new-vol"></div>
                        <p>漫画版人设图（轻之文库ver.）</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <nav style="text-align: center;">
            <ul class="pagination">
              <li class="disabled">
                <a href="javascript:;">上一页</a>
              </li>


              <li class="active">
                <a href="/cat/-1.html?page=1">1</a>
              </li>
              <li class="">
                <a href="/cat/-1.html?page=2">2</a>
              </li>
              <li class="">
                <a href="/cat/-1.html?page=3">3</a>
              </li>
              <li class="">
                <a href="/cat/-1.html?page=4">4</a>
              </li>
              <li class="">
                <a href="/cat/-1.html?page=5">5</a>
              </li>

              <li class="dot"><a style="color: #999;">...</a></li>
              <li><a href="/cat/-1.html?page=725">725</a></li>

              <li class="">
                <a href="/cat/-1.html?page=2">下一页</a>
              </li>
            </ul>
          </nav>

        </div>	</div>
    </div>

  </div>
</template>


<script>
import "@/assets/css/search.less";
import {all} from "axios";
export default {
  name: "Search",
  created() {
    this.$emit("generateTab", this.plate)
    this.load();
  },
  data() {
    return {
      plate: '首页',

      prevScrollPos: 0,
      menuVisible: true,
      allTags: [],
      allBooks: [],
      sortTag: 'date',
      typeTag: -1,
    }
  },
  computed: {
    menuClass() {
      return {
        'inner-menu': true,
        'inner-menu-fixed': true,
        'menu-hidden': !this.menuVisible
      };
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    load() {
      const sort = this.$route.query.sort;
      const tag = this.$route.query.tag;
      console.log('sort:', sort);
      console.log('tag:', tag);

      if (sort) this.sortTag = sort;
      if (tag) this.typeTag = parseInt(tag);

      console.log('sortTag:', this.sortTag);
      console.log('typeTag:', this.typeTag);

      this.request.get("search/allTags").then(res=>{
        console.log(res);
        this.allTags = res.data;
      })

      this.request.get('search/search', {
          params: {
            tag: this.typeTag,
            sort: this.sortTag,
          }
        }).then(res=>{
        console.log(res);
        this.allBooks = res.data;
      })
    },
    handleScroll() {
      const currentScrollPos = window.scrollY;
      this.menuVisible = this.prevScrollPos > currentScrollPos;
      this.prevScrollPos = currentScrollPos;
    },
    sortSearch(sort) {
      return '/APP/Search/?tag=' + this.typeTag + '&sort=' + sort;
    },
    tagSearch(tag) {
      return '/APP/Search/?tag=' + tag + '&sort=' + this.sortTag;
    },
    storySkip(storyId) {
      return "/APP/StoryInfo/?storyid=" + storyId;
    },
    tagChooseClass(data) {
      if (data === this.typeTag) return "choose";
      return "";
    },
    sortChooseClass(data) {
      if (data === this.sortTag) return "choose";
      return "";
    }
  }
}
</script>

<style scoped>

</style>