<template>
  <div class="mhy-container mhy-account-center-content">
    <div class="mhy-account-center-content-container mhy-account-center-collection">
      <div class="mhy-account-center__subheader">
        <span>我的创作的片段</span>
      </div>
      <div class="mhy-account-center-content-container__list">
        <div class="mhy-collection-card mhy-account-center-collection-card" v-for="(item,_) in fragments">
          <a :href=item.link class="mhy-router-link mhy-collection-card__link">
            <div class="mhy-collection-card__info">
              <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                <p class="mhy-collection-card__name">{{item.storyName}}</p>
              </a>
              <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                <p class="mhy-collection-card__fragmentName">{{item.fragName}}</p>
              </a>
              <a class="mhy-router-link mhy-collection-card__link" target="_blank">
                <p class="mhy-collection-card__fragmentContent">{{ item.content }}</p>
              </a>
              <div class="mhy-collection-card__stats">
                <span>点赞：{{item.totalLike}}</span>
                <span>评论：{{item.totalComment}}</span>
                <span>收藏：{{item.totalCollection}}</span>
              </div>
            </div>
          </a>
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
  name: "FragmentCollect",
  data() {
    return {
      fragments:[],
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
    this.fragmentCollect()
  },
  methods:{
    fragmentCollect(){
      this.request.get("/fragment/getCollectFrag?userId="+this.loc.id).then(res=>{
        if(res.code==='200'){
          this.fragments=res.data
          for (var re of this.fragments) {
            //console.log(re)
            re.link="/APP/storyrelay?storyId="+re.storyId+"&fragmentId="+re.fragmentId
          }
        }
        else{
          this.$message.error("error"+res.msg)
        }
      })
    },
  }
}
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
  padding: 8px 40px 8px 30px;
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
  width: 100%;
  color: #333;
}
a {
  text-decoration: none;
}
.mhy-collection-card__cover img{
  position: center;
  display: block;
  width: 70px;
  height: 90px;
}
.mhy-collection-card__info {
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  background-color: #f7fbff;
  display: inline-block;
  margin-left: 8px;
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
  font-size: 16px;

}
.mhy-collection-card__fragmentName {
  position: relative;
  line-height: 2;
  margin-top: 5px;
  font-size: 14px;
  color: #5c97ff;

}
.mhy-collection-card__fragmentContent {
  position: relative;
  line-height: 4px;
  font-size: 12px;
  margin-top: 5px;
  height: 20px;
  color: gray;
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
  font-size: 12px;
  color: #ccc;
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