<template>
  <div style="background-color: #e9ecef">
    <sui-container align="left">
      <sui-grid>

        <sui-grid-column :width="1">
          <sui-button circular icon="settings" />
          <br>
          <br>
          <sui-button  circular icon="settings" />
          <br>
          <br>
          <sui-button  circular icon="settings" />


          <sui-rail >

            <div class="ui sticky">
              <h3 class="ui header">Stuck Content</h3>
            </div>

          </sui-rail>


        </sui-grid-column>
        <sui-grid-column :width="11">
          <sui-grid-row style="background-color: white; border-radius: .28571429rem; padding: 15px">
            <div ref="headerinfo" id="hhh" style="margin: 10px">
              <sui-header is="h1">{{articles.title}}</sui-header>
              <sui-header-content style="margin: 5px">
                <div style="margin-top: 10px; margin-bottom: 10px">
                  <router-link
                    :to="{name: 'Blog', params: { username: articles.username }}">
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

          <sui-comment-group class="ui fluid" style="max-width: none">
            <h3 is="sui-header" dividing>评论</h3>
            <sui-form reply >
              <textarea v-model="commentContent" :placeholder="replyTips" />
              <br>
              <br>


              <sui-button
                content="发表评论"
                label-position="left"
                icon="edit"

                primary
                @click="createComment()"
              />
            </sui-form>

            <sui-comment v-for="i in articles.comments" :key="i.id">
              <sui-comment-avatar  :src="i.avatar ? i.avatar: defaultAvatar" />
              <sui-comment-content>
                <a is="sui-comment-author">{{i.username}}</a>
                <sui-comment-metadata>
                  <div>{{i.create_time | changeTime}}</div>
                </sui-comment-metadata>
                <sui-comment-text>{{i.content}}</sui-comment-text>
                <sui-comment-actions>
                  <sui-comment-action>
                    <a @click="replyComment(i.id, i.username)" style="color: #475669">回复</a>
                  </sui-comment-action>
                </sui-comment-actions>
              </sui-comment-content>
              <sui-comment-group v-if="i.replies">
                <sui-comment v-for="reply in i.replies" :key="reply.id">
                  <sui-comment-avatar :src="reply.avatar ? reply.avatar: defaultAvatar" />
                  <sui-comment-content>
                    <a is="sui-comment-author">{{reply.username}}</a>
                    <sui-comment-metadata>
                      <div>{{reply.create_time  | changeTime}}</div>
                    </sui-comment-metadata>
                    <sui-comment-text>
                     {{reply.content}}
                    </sui-comment-text>
<!--                    <sui-comment-actions>-->
<!--                      <sui-comment-action>回复</sui-comment-action>-->
<!--                    </sui-comment-actions>-->
                  </sui-comment-content>
                </sui-comment>
              </sui-comment-group>
            </sui-comment>


          </sui-comment-group>

        </sui-grid-column>


        <sui-grid-column :width="4">
          <sui-grid-row style="padding-bottom: 14px">


            <sui-card style="box-shadow: none">


              <sui-card-content>
                <sui-card-header>目录</sui-card-header>
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

  import $ from 'jquery'


  export default {

    name: "BlogView",
    data() {
      return {
        articles: {
          content: '',
          avatar: '',
          comments: null
        },
        md_toc: '',
        currentHeight: document.body.clientHeight - 270,
        userInfo: {},
        commentId: null,
        commentContent: '',
        replyTips: ''

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

      },
      createComment() {

        let postData = {
          blog_id: this.$route.params.id,
          content: this.commentContent,
          reply_comment: this.commentId
        }

        this.$api.blog.createComment(postData).then((res)=>{


          if (this.commentId === null) {
            console.log("comment")
            this.articles.comments.push(res.data);


          } else {
            console.log('reply')
            console.log(this.articles.comments.findIndex(item => item.id === this.commentId))
            this.articles.comments[this.articles.comments.findIndex(
              item => item.id === this.commentId)].replies.push(res.data)

          }

          this.$message.success('评论成功')
          this.replyTips = ''
          this.commentId = null
          this.commentContent = ''
        }).catch(()=>{
          this.$message.error('评论失败')

        })

      },

      replyComment(commentId, username) {
        this.replyTips = '回复：' + username
        this.commentId = commentId

      }

    },

    created() {
      // this.$nextTick(() => {
      // });

      this.getBlogData()

    },
    mounted() {

      // this.$(this.$el).find('.ui.sticky').sticky({
      //   context: '#example2',
      //   pushing: true
      // })
      $(this.$el).find('.ui.sticky').sticky({
        context: '#example2',
        pushing: true
      })

      window.onresize = () => {
        return (() => {
          this.currentHeight = document.body.clientHeight - 270
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
