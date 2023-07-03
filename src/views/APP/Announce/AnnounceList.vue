<template>
  <div class="vsc-initialized" cz-shortcut-listen="true">
    <div class="wrapper">
      <div class="content container">
        <div class="row">
          <div class="articles-content">
            <h4 class="title"><div class="icon-dot"></div>公告列表</h4>

            <div class="article-list">
              <div class="media" v-for="(item, index) in announcements" :key="index">
                <div class="media-left">
                  <a :href="'/APP/Announce/?id=' + item.announceId">
                    <el-image
                        style="width: 240px; height: 135px; overflow: hidden"
                        fit="cover"
                        class="lazy"
                        alt=""
                        :src="item.coverUrl"
                        lazy></el-image>
                  </a>
                </div>

                <div class="media-body">
                  <h4 class="media-heading"><a :href="'/APP/Announce/?id=' + item.announceId">{{item.title}}</a></h4>
                  <p class="text-muted">
                    {{item.content}}
                  </p>
                </div>
              </div>
            </div>

            <el-pagination
                @current-change="pageSkip"
                background
                hide-on-single-page
                layout="prev, pager, next"
                style="text-align: center;"
                :page-size="10"
                :total="this.announceNum">
            </el-pagination>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/home.less";
export default {
  name: "AnnounceList",
  created() {
    this.$emit("generateTab", this.plate)
    this.load();
  },
  data(){
    return {
      plate: '公告列表',

      announcements: [],
      announceNum: 0,
      page: 1,
    }
  },
  methods:{
    load() {
      const page = this.$route.query.page;
      console.log('page:', page);
      if (page) this.page = parseInt(page);

      this.request.get("announce/allAnnounce", {
        params: {
          page: this.page,
        }
      }).then(res=>{
        console.log(res);
        this.announcements = res.data;
      })

      this.request.get('announce/announceNum').then(res=>{
        console.log(res);
        this.announceNum = res.data;
      })
    },
    pageSkip(page) {
      this.page = page;
      this.$router.push({ path: '/APP/AnnounceList/', query: { page: this.page } });
      this.$nextTick(() => {
        Location.reload(0);
      });
    },
  },
}
</script>

<style scoped>

</style>
