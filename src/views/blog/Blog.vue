<template>
  <div class="blog" v-loading.fullscreen.lock="fullscreenLoading">
    <sui-container align="left">
      <sui-grid class="ui padded horizontally vertically">
        <sui-grid-column :width="12">
          <sui-item-group divided>
            <sui-item v-for="i in blog" :key="i.article_id">


              <sui-item-content>
                <sui-item-header>
                  <router-link :to="{name: 'BlogView', params: { id: i.article_id }}"
                               style="color: #212121"
                  >
                    {{i.title}}
                  </router-link>
                </sui-item-header>

                <sui-item-meta>
                  <!--                  <span>{{i.user}}</span>-->
                  <!--                  <sui-label size="mini" v-for="l in i.tags" :key="l.id" :content="l.name">{{l.name}}</sui-label>-->
                </sui-item-meta>
                <sui-item-description>
                  <p>
                    <router-link :to="{name: 'BlogView', params: { id: i.article_id }}"
                                 style="color: #888"
                    >
                      {{i.abstract | wordLimit}}
                    </router-link>
                    <!--                    {{ i| setAbstract }}-->
                  </p>
                </sui-item-description>
                <sui-item-extra class="ui end floated">


                  <span>{{i.created_at | changeTime}}</span>
                  <span class="ui right floated">阅读数：{{i.click_nums}}</span>
                  <span class="ui  right floated">评论数：{{i.blog_comment | commentNum  }}</span>


                </sui-item-extra>
              </sui-item-content>
              <router-link :to="{name: 'BlogView', params: { id: i.article_id }}"
                           style="color: #888">
                <sui-item-image class="cover-img"
                                :style="{'background-image': 'url('+ i.cover +')',
                                width: '180px',
                                height: '120px',
                                marginLeft: '20px'}"
                                v-if="i.cover" src=""/>
              </router-link>


            </sui-item>


          </sui-item-group>

        </sui-grid-column>
        <sui-grid-column :width="4">

          <sui-card-group>
            <sui-card>
              <sui-card-content>
                <sui-card-header>Elliot Fu</sui-card-header>
                <sui-card-meta>Friend</sui-card-meta>
                <sui-card-description
                >Elliot Fu is a film-maker from New York.
                </sui-card-description
                >
              </sui-card-content>
            </sui-card>

          </sui-card-group>

        </sui-grid-column>
      </sui-grid>
    </sui-container>

  </div>
</template>

<script>
  var timeago = require('timeago.js');

  export default {
    name: 'Blog',

    data() {
      return {
        blog: {},
        defulat_news_img: require('../../assets/images/image.png'),
        fullscreenLoading: false
      }
    },
    methods: {},

    created() {

      this.fullscreenLoading = true
      this.axios.get("/api/blog/").then(response => {

        this.blog = response.data
        this.fullscreenLoading = false;

      })
    },
    // mounted() {
    //   this.fullscreenLoading = true
    //   this.axios.get("/api/news/").then(response => {
    //
    //     this.blog = response.data
    //     this.fullscreenLoading = false;
    //
    //   })
    //
    //
    //
    //
    // },
    filters: {

      changeTime(val) {
        let time = new Date(val); //先将接收到的json格式的日期数据转换成可用的js对象日期
        return timeago.format(time, 'zh_CN'); //转换成类似于几天前的格式
      },
      wordLimit(value, num) {
        const nums = num || '100';
        if (!value) return '';
        if (value.length > nums) {
          return value.slice(0, nums) + '...';
        }
        return value;

      },
      commentNum(value) {
        return value.length
      },
      // setAbstract(value) {
      //   if (value.abstract) {
      //     return value.abstract.substring(0, 100) + "...";
      //   } else {
      //     return value.content.substring(0, 100) + "..."
      //   }
      // }
    },

  }

</script>

<style lang="scss">
  .cover-img {
    width: 180px;
    height: 120px;
    border-radius: 4px;
    float: right;
    margin-left: 30px;
    margin-top: 10px;
    background-size: cover;
    background-position: center
  }
</style>
