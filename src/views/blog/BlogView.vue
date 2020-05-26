<template>
  <div style="background-color: #e9ecef">
    <sui-container align="left">
      <sui-grid>


        <sui-grid-column :width="12">
          <sui-grid-row style="background-color: white; border-radius: .28571429rem; padding: 15px">
            <div ref="headerinfo" id="hhh">
              <sui-header is="h1">{{blog_data.title}}</sui-header>
              <sui-header-content style="margin: 5px">

            <span v-if="blog_data.tags !== undefined  && blog_data.tags.length!==0"
                  style="margin-right: 10px">
                          <sui-label size="mini"
                                     v-for="tag in blog_data.tags"
                                     :key="tag">{{tag}}</sui-label>

            </span>
                <span style="margin-right: 10px">发布于：{{blog_data.created_at | changeTime}}</span>
                <span>{{ readTime }}</span>
              </sui-header-content>
            </div>


            <mavon-editor

              v-model="blog_data.content"
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
  var timeago = require('timeago.js');

  export default {
    name: "BlogView",
    data() {
      return {
        blog_data: {
          content: ''
        },
        md_toc: '',
        currentHeight: document.body.clientHeight - 220,

      }

    },


    methods: {
      async getBlogData() {

        this.$loading.show()
        this.$api.blog.getArticle(this.$route.params.id).then(res => {
          this.blog_data = res.data
          this.$loading.hide()
        })

      }
    },

     created() {
      this.$nextTick(() => {
      });

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
      readTime() {

        let $_time = parseInt(this.blog_data.content.length / 300)
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
