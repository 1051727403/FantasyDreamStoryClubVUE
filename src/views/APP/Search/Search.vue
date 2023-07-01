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
                <li class="special" v-for="(tag, index) in allTags" :key="'tag_' + index">
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

            <div class="rank-book" v-for="(book, index) in allBooks" :key="'story_' + index">
              <div class="book-draw">
                <div class="book-cover">
                  <a :href="storySkip(book.storyId)" target="_blank">
                    <el-image
                        style="width: 100%; height: 100%"
                        fit="cover"
                        class="lazy"
                        alt=""
                        :src="book.coverUrl"
                        lazy></el-image>
                  </a>
                </div>
                <div class="book-box">
                  <div class="book-box-mask"></div>
                  <div class="book-info">
                    <a :href="storySkip(book.storyId)" target="_blank" class="book-name">
                      {{book.storyName}}</a>
                    <div class="book-tags">
                      <a class="book-tag" href="/cat/1.html" target="_blank" v-for="(tag, index) in book.tags" :key="'book_tag_' + index">
                        {{tag.tagName}}</a>
                    </div>
                    <div class="book-intro">
                      {{book.introduce}}</div>
                    <div class="book-extra">
                      {{book.updateTime}} 丨 {{book.createTime}}</div>
                  </div>
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
      page: 1,
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
      const page = this.$route.query.page;
      console.log('sort:', sort);
      console.log('tag:', tag);
      console.log('tag:', page);

      if (sort) this.sortTag = sort;
      if (tag) this.typeTag = parseInt(tag);
      if (page) this.page = parseInt(page);

      this.request.get("search/allTags").then(res=>{
        console.log(res);
        this.allTags = res.data;
      })

      this.request.get('search/search', {
          params: {
            tag: this.typeTag,
            sort: this.sortTag,
            page: this.page
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
      return '/APP/Search/?tag=' + this.typeTag + '&sort=' + sort + '&page=' + this.page;
    },
    tagSearch(tag) {
      return '/APP/Search/?tag=' + tag + '&sort=' + this.sortTag  + '&page=' + this.page;
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