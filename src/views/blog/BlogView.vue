<template>
  <div style="background-color: #e9ecef">
    <sui-container align="left">
      <sui-grid>


        <sui-grid-column :width="12">
          <sui-grid-row style="background-color: white; border-radius: .28571429rem; padding: 15px">
            <div ref="headerinfo" id="hhh" style="margin: 10px">
              <sui-header is="h1">{{articles.title}}</sui-header>
              <sui-header-content style="margin: 5px">
                <div style="margin-top: 10px; margin-bottom: 10px">
                  <router-link
                    :to="{name: 'UserDetail', params: { username: articles.username }}">
                    <sui-header size="small" align="">
                      <sui-image :src="articles.avatar ? articles.avatar: defaultAvatar" avatar/>
                      <sui-header-content>
                        {{articles.username}}
                      </sui-header-content>

                    </sui-header>
                  </router-link>
                </div>

                <span v-if="articles.tags !== undefined  && articles.tags.length!==0"
                      style="margin-right: 10px">
                          <sui-label size="mini"
                                     v-for="tag in articles.tags"
                                     :key="tag">{{tag}}</sui-label>

            </span>
                <span style="margin-right: 10px">发布于：{{articles.created_at | changeTime}}</span>
                <span>{{ readTime }}</span>
              </sui-header-content>
            </div>


            <mavon-editor

              v-model="articles.content"
              :subfield="false"
              :boxShadow="false"
              defaultOpen="preview"
              :toolbarsFlag="false"
              :style="{border: 'none',height: this.currentHeight+'px', 'z-index': 10}"
              code-style="agate"
              preview-background="white"
              :box-shadow="false"


            />
          </sui-grid-row>

        </sui-grid-column>

        <sui-grid-column :width="4">
          <sui-grid-row style="padding-bottom: 14px">


            <sui-card style="box-shadow: none">


              <sui-card-content>
                <sui-card-header>Elliot Fu</sui-card-header>
                <sui-card-meta>Friend</sui-card-meta>
                <sui-card-description
                >Elliot Fu is a film-maker from New York.
                </sui-card-description
                >
              </sui-card-content>

            </sui-card>
          </sui-grid-row>

          <sui-grid-row style="padding-top: 14px; padding-bottom: 14px">


            <sui-card style="box-shadow: none">
              <sui-card-content>
                <sui-card-header>Elliot Fu</sui-card-header>
                <sui-card-meta>Friend</sui-card-meta>
                <sui-card-description
                >Elliot Fu is a film-maker from New York.
                </sui-card-description
                >
              </sui-card-content>

            </sui-card>
          </sui-grid-row>


        </sui-grid-column>

      </sui-grid>


    </sui-container>

  </div>
</template>

<script>
  import {ACCOUNT} from "@/store/types"
  import {mapState} from "vuex"
  var timeago = require('timeago.js');

  export default {
    name: "BlogView",
    data() {
      return {
        articles: {
          content: '',
          avatar: ''
        },
        md_toc: '',
        currentHeight: document.body.clientHeight - 250,
        userInfo: {},

      }

    },


    methods: {
      async getBlogData() {

        this.$loading.show()
        this.$api.blog.getArticle(this.$route.params.id).then(res => {
          this.articles = res.data
          document.title = res.data.title
          // this.$api.getUser(res.data)
          this.$loading.hide()
        })

      }
    },

    created() {
      // this.$nextTick(() => {
      // });

      this.getBlogData()

    },
    mounted() {

      window.onresize = () => {
        return (() => {
          this.currentHeight = document.body.clientHeight - 220
        })();
      }

    },
    filters: {
      changeTime(val) {
        let time = new Date(val); //先将接收到的json格式的日期数据转换成可用的js对象日期
        return timeago.format(time, 'zh_CN'); //转换成类似于几天前的格式
      },
    },
    computed: {
      ...mapState('account', {defaultAvatar: ACCOUNT.DEFAULT_AVATAR,}),
      readTime() {

        let $_time = parseInt(this.articles.content.length / 300)
        if ($_time >= 1) {
          return "预计阅读 " + $_time + " 分钟"
        } else {
          return "预计阅读小于 1 分钟"

        }
      }
    },

  }
</script>

<style scoped lang="scss">


</style>
