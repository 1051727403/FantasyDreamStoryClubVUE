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
                <li class="special" v-for="(tag, index) in allTags" :key="index">
                  <a rel="nofollow" :href="tagSearch(tag.tagId)" :class="tagChooseClass(tag.tagId)">
                    {{tag.tagName}}</a>
                </li>

              </ul>

              <el-tag
                  v-if="showTag"
                  :key="keyWord"
                  closable
                  :disable-transitions="false"
                  @close="tagClose">
                {{keyWord}}
              </el-tag>
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
      <div class="cat-container" style="margin-top: 75px;">
        <div class="rank-content">
          <div class="rank-book-list">

            <div class="rank-book" v-for="(book, index) in allBooks" :key="index">
              <div class="book-draw">
                <div class="book-cover-data">
                  <div class="book-cover">
                    <a class="img-loading" :href="storySkip(book.storyId)" target="_blank">
                      <el-image
                          style="width: 100%; height: 100%"
                          fit="cover"
                          class="lazy"
                          alt=""
                          :src="book.coverUrl"
                          lazy></el-image>
                    </a>
                  </div>

                  <div class="book-cover-bottom">
                    <div class="book-cover-bottom-data">
                      <span class="icon1"></span>
                      <p>{{book.totalLike}}</p>
                    </div>
                    <div class="book-cover-bottom-data">
                      <span class="icon2"></span>
                      <p>{{book.totalCollection}}</p>
                    </div>
                  </div>

                </div>

                <div class="book-box">
                  <div class="book-box-mask"></div>
                  <div class="book-info">
                    <a :href="storySkip(book.storyId)" target="_blank" class="book-name">
                      {{book.storyName}}</a>

                    <div class="book-tags">
                      <div v-for="(tag, index) in book.tags" :key="index">
                        <a rel="nofollow" class="book-tag" :href="tagSearch(tag.tagId)">
                          {{tag.tagName}}</a>
                      </div>

                    </div>
                    <div class="book-intro">
                      {{book.introduce}}</div>
                    <div class="book-extra">
                      更新时间 {{book.updateTime}} 丨 创建时间 {{book.createTime}}</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <el-pagination
              @current-change="pageSkip"
              background
              hide-on-single-page
              layout="prev, pager, next"
              style="text-align: center;"
              :page-size="15"
              :total="this.storyNum">
          </el-pagination>

        </div>
      </div>
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
      keyWord: '',
      sortTag: 'date',
      typeTag: -1,
      page: 1,
      storyNum: 0,
      showTag: false,
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
      const keyWord = this.$route.query.keyWord;
      const sort = this.$route.query.sort;
      const tag = this.$route.query.tag;
      const page = this.$route.query.page;
      console.log('keywords:', keyWord);
      console.log('sort:', sort);
      console.log('tag:', tag);
      console.log('page:', page);

      if (sort) this.sortTag = sort;
      if (tag) this.typeTag = parseInt(tag);
      if (page) this.page = parseInt(page);
      if (keyWord) { this.keyWord = keyWord; this.showTag = true; }

      this.request.get("search/allTags").then(res=>{
        console.log(res);
        this.allTags = res.data;
      })

      this.loadStories();
    },
    loadStories() {
      this.request.get('search/search', {
        params: {
          tag: this.typeTag,
          sort: this.sortTag,
          page: this.page,
          keyWord: this.keyWord
        }
      }).then(res=>{
        console.log(res);
        this.allBooks = res.data;
      })

      this.request.get('search/storyNum', {
        params: {
          tag: this.typeTag,
          keyWord: this.keyWord
        }
      }).then(res=>{
        console.log(res);
        this.storyNum = res.data;
      })
    },
    handleScroll() {
      const currentScrollPos = window.scrollY;
      this.menuVisible = this.prevScrollPos > currentScrollPos;
      this.prevScrollPos = currentScrollPos;
    },
    tagClose() {
      this.showTag = false;
      this.keyWord = '';
      this.$router.push({ path: '/APP/Search/' });
      this.$nextTick(() => {
        location.reload()
      });
    },
    sortSearch(sort) {
      String
      let route;
      route = '/APP/Search/?sort=' + sort;
      if (this.typeTag !== -1) route += '&tag=' + this.typeTag;
      if (this.keyWord !== '') route += '&keyWord=' + this.keyWord;
      return route;
    },
    tagSearch(tag) {
      String
      let route;
      route = '/APP/Search/?tag=' + tag;
      if (this.sortTag !== "date") route += '&sort=' + this.sortTag;
      if (this.keyWord !== '') route += '&keyWord=' + this.keyWord;
      return route;
    },
    pageSkip(page) {
      this.page = page;
      this.$router.push({ path: '/APP/Search/', query: { tag: this.typeTag, sort: this.sortTag, keyWord: this.keyWord, page: this.page } });
      this.$nextTick(() => {
        this.loadStories();
      });
    },
    storySkip(storyId) {
      return "/APP/StoryInfo/?storyId=" + storyId;
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