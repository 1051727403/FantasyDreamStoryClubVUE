<template>
  <div class="mhy-container mhy-account-center-content">
    <div class="mhy-account-center-content-container mhy-account-center-collection">
      <div class="mhy-account-center__subheader">
        <span>故事收藏</span>
      </div>
      <div class="mhy-account-center-content-container__list">
        <div class="mhy-collection-card mhy-account-center-collection-card" v-for="(item,_) in books">
          <a :href=item.link class="mhy-router-link mhy-collection-card__link">
            <div class="mhy-collection-card__cover">
                <img :src=item.coverUrl>
            </div>
          </a>
          <div class="mhy-collection-card__info">
            <a class="mhy-router-link mhy-collection-card__link" target="_blank">
              <p class="mhy-collection-card__name">{{item.storyName}}</p>
            </a>
            <div class="mhy-collection-card__stats">
              <span>总点赞{{item.totalLike}}</span>
              <span>总评论{{item.totalComment}}</span>
              <span>总收藏{{item.totalCollection}}</span>
            </div>
          </div>
          <!---->
        </div>

        <div class="mhy-container__footer">
          <div class="mhy-loadmore mhy-loadmore-scroll">
            <div class="mhy-loadmore__nomore">没有更多数据了</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books:[],
      loc:{},
    };
  },
  created() {
    if(localStorage.getItem("user")){
      this.loc = JSON.parse(localStorage.getItem("user"))
    }
    else{
      this.$router.push('/login')
    }
    this.mycollect()
  },
  mounted() {

  },
  methods: {
    mycollect(){
      this.request.get("/story/usersCollectStories?userid="+this.loc.id).then(res=>{
        if(res.code==='200'){
          this.books=res.data
          //console.log(this.books)
          for (var re of this.books) {
            re.link="/APP/storyinfo?storyid="+re.storyId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    },
  }
};
</script>

<style scoped>
.mhy-account-center-content {
  width: 700px;
  float: right;
}
.mhy-container {
  background-color: #fff;
  border-radius: 4px;
}
p{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}
.mhy-account-center__subheader {
  padding: 0 30px;
  line-height: 50px;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}


input, button, textarea {
  color: inherit;
  font: inherit;
}
.mhy-account-center-collection-card {
  padding: 15px 40px 15px 30px;
}
.mhy-collection-card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-collection-card__link {
  color: #333;
}
a {
  text-decoration: none;
}
.mhy-collection-card__cover {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #ebebeb;
}
.mhy-collection-card__cover img{
  position: center;
  display: block;
  width: 112px;
  height: 180px;
}
.mhy-collection-card__info {
  display: inline-block;
  margin-left: 20px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  overflow: hidden;
}
.mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mhy-collection-card__link {
  color: #333;
}
.mhy-collection-card__name {
  position: relative;
  line-height: 1;
  height: 20px;
}
.mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mhy-collection-card__stats {
  color: #ccc;
  font-size: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-collection-card__stats span {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mhy-collection-card__stats span:not(:first-child)::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 6px;
}
.mhy-container__footer {
  height: 70px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-top: 1px solid #ebebeb;
}
</style>