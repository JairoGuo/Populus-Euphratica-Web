<template>
  <div style="background-color: #e9ecef">

    <sui-container align="left">


      <sui-grid>


        <sui-grid-column style="margin-top: 150px;" align="center" :width="1">

          <span style="color: #6c757d" is="sui-header">{{articles.like_num}}</span>
          <sui-button size="big" @click="like" :color="articles.is_like ? 'green': null" circular icon="thumbs up"/>
          <br><br>

          <span style="color: #6c757d" is="sui-header">{{articles.comment_num}}</span>

          <sui-button size="medium" style="margin: 0 auto" @click="focusComment" circular icon="comment"/>
          <br><br>

          <span style="color: #6c757d" is="sui-header">{{articles.collect_num}}</span>

          <sui-button size="medium" @click="toggle" :color="isCollect ? 'teal': null" style="margin: 0 auto" circular icon="bookmark"/>
          <br><br>
          <sui-button size="medium" style="margin: 0 auto" circular icon="share alternate"/>

        </sui-grid-column>

        <sui-modal v-if="addCollectCategory" v-model="open" size="tiny">
          <sui-modal-header>创建收藏夹</sui-modal-header>
          <sui-modal-content>

            <sui-modal-description>
              <sui-form>
                <sui-form-field>
                  <label>名称</label>
                  <input v-model="collectCategoryData.name" placeholder="名称" />
                </sui-form-field>
                <sui-form-field>
                  <label>介绍</label>
                  <textarea v-model="collectCategoryData.description" placeholder="介绍" />
                </sui-form-field>
                <sui-form-fields inline>
                  <label>收藏夹类型:</label>
                  <sui-form-field>
                    <sui-checkbox radio v-model="collectCategoryData.type" label="公开" value="Public"/>
                  </sui-form-field>
                  <sui-form-field>
                    <sui-checkbox radio v-model="collectCategoryData.type" label="私密" value="Private"/>
                  </sui-form-field>

                </sui-form-fields>

              </sui-form>
            </sui-modal-description>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button @click.native="switchAdd">
              返回
            </sui-button>
            <sui-button @click.native="toggle()">
              取消
            </sui-button>
            <sui-button positive @click.native="createCollectCategory">
              创建
            </sui-button>
          </sui-modal-actions>
        </sui-modal>

        <sui-modal v-else v-model="open" size="tiny">

          <sui-modal-header>收藏</sui-modal-header>

          <sui-modal-content>

            <p>如果未选择收藏夹将为您收藏到默认收藏夹中...</p>

              <sui-form>

                <sui-form-fields grouped>
                  <label>添加到收藏夹:</label>
                  <sui-form-field v-for="i in collectCategory" :key="i.id">
                    <sui-checkbox :label="i.name " :value="i.id.toString()" v-model="collectCategoryValue"/>
                    <span style="color: #999; margin-left: 10px">{{i.collect_num}}条内容</span>
                  </sui-form-field>

                </sui-form-fields>

              </sui-form>


          </sui-modal-content>
          <sui-modal-actions>
            <sui-button @click="switchAdd" floated="left" >新增收藏夹</sui-button>

            <sui-button @click.native="toggle()">
              取消
            </sui-button>
            <sui-button :positive="!!collectStatus" :negative="!collectStatus" @click.native="createCollect()">
              {{collectStatus ? '确定' : '删除'}}
            </sui-button>
          </sui-modal-actions>
        </sui-modal>


        <sui-grid-column :width="11">
          <sui-grid-row style="background-color: white;  border-radius: .28571429rem; padding: 15px">
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

          <h3 is="sui-header" dividing>评论</h3>
          <sui-grid-row style="padding-top: 14px">

            <sui-card class="ui fluid " style="box-shadow: none">

              <sui-card-content>
                <sui-comment-group class="ui fluid" style="max-width: none">
                  <sui-form reply>
                    <label>
                      <textarea ref="commentTextarea" v-model="commentContent" :placeholder="replyTips"/>
                    </label>
                    <br>
                    <br>
                    <sui-button
                      positive
                      @click="createComment()">发表评论</sui-button>
                  </sui-form>
                  <sui-comment v-for="i in comments" :key="i.id">
                    <sui-comment-avatar :src="i.avatar ? i.avatar: defaultAvatar"/>
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
                        <sui-comment-avatar :src="reply.avatar ? reply.avatar: defaultAvatar"/>
                        <sui-comment-content>
                          <a is="sui-comment-author">{{reply.username}}</a>
                          <sui-comment-metadata>
                            <div>{{reply.create_time | changeTime}}</div>
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

              </sui-card-content>

            </sui-card>
          </sui-grid-row>

        </sui-grid-column>

        <sui-grid-column :width="4">

          <sui-grid-row v-if="JSON.stringify(category)!=='{}'" style="padding-bottom: 14px">


            <sui-card style="box-shadow: none">
              <sui-card-content>
                <sui-image
                  size="tiny"
                  :src="require('@/assets/images/category.png')"
                  floated="left"
                />

                <sui-card-header style="margin-top: 10px">{{category.name}}</sui-card-header>
                <sui-card-meta>专栏</sui-card-meta>

                <sui-card-description>
                  <sui-card-content>
                    {{category.summary}}
                  </sui-card-content>

                  <sui-statistic horizontal size="mini">
                    <sui-statistic-value>
                      {{category.category_follow_num}}
                    </sui-statistic-value>
                    <sui-statistic-label>
                      关注
                    </sui-statistic-label>
                  </sui-statistic>
                  <sui-statistic horizontal size="mini">
                    <sui-statistic-value>
                      {{category.article_num}}
                    </sui-statistic-value>
                    <sui-statistic-label>
                      文章
                    </sui-statistic-label>
                  </sui-statistic>

                </sui-card-description>

              </sui-card-content>
              <sui-card-content extra>
                <sui-container text-align="center">

                  <sui-button fluid  :color="!isCategoryFollow ? 'green': null"  @click="createCategoryFollow()">
                    {{isCategoryFollow ? '取消关注专栏' :'关注专栏'}}
                  </sui-button>
                  <br>
                  <router-link
                    :to="{name: 'CategoryListView', params: { id: category.id }}"
                    fluid basic negative is="sui-button">
                    专栏主页
                  </router-link>
                </sui-container>
              </sui-card-content>


            </sui-card>
          </sui-grid-row>
          <sui-grid-row style="padding-bottom: 14px; padding-top: 14px; ">


            <sui-card style="box-shadow: none">

              <sui-card-content>
                <sui-card-header>目录</sui-card-header>

                <sui-card-description>
                </sui-card-description>
              </sui-card-content>

            </sui-card>
          </sui-grid-row>
          <sui-grid-row style="padding-top: 14px; padding-bottom: 14px">
            <sui-card style="box-shadow: none">
              <sui-card-content>
                <sui-card-header>相关文章</sui-card-header>
                <sui-card-description>
                </sui-card-description>
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
          avatar: '',
          comments: null
        },
        comments: [],
        category: {},
        md_toc: '',
        currentHeight: document.body.clientHeight - 270,
        userInfo: {},
        commentId: null,
        commentContent: '',
        replyTips: '',
        open: false,
        collectCategory: null,
        collectCategoryValue: [],
        addCollectCategory: false,
        isCollect: false,
        collectCategoryData: {
          name: '',
          description: '',
          type: 'Public'
        },
        isCategoryFollow: false
      }

    },
    methods: {

      toggle() {
        if (this.logStatus) {
          if (this.collectCategory === null) {
            this.$api.blog.getCollectCategorys({username: this.username}).then((res) => {
              this.collectCategory = res.data

            });
          }
          this.open = !this.open
        } else {
          this.$message.warning("请登录后收藏")
        }

      },
      switchAdd() {
        this.addCollectCategory = !this.addCollectCategory
      },
      async getBlogData() {

        this.$loading.show()
        this.$api.blog.getArticle(this.$route.params.id).then(res => {
          this.articles = res.data
          console.log(res.data)
          this.isCollect = res.data.is_collect
          this.isCategoryFollow = res.data.is_category_follow


          document.title = res.data.title
          this.collectCategoryValue = res.data.collect_category

          if (res.data.category) {
            this.$api.blog.getCategory(res.data.category).then((res) => {
              this.category = res.data
            });
          }
          this.$loading.hide()
        })
      },
      getComments() {
        this.$api.blog.getComments(this.$route.params.article_id).then((res)=>{
          this.comments = res.data
        })
      },
      createComment() {
        if (this.logStatus) {
          let postData = {
            blog_id: this.$route.params.id,
            content: this.commentContent,
            reply_comment: this.commentId
          }
          console.log(postData)

          this.$api.blog.createComment(postData).then((res) => {
            if (this.commentId === null) {
              this.comments.push(res.data);
            } else {
              this.comments[this.comments.findIndex(
                item => item.id === this.commentId)].replies.push(res.data)
            }

            this.$message.success('评论成功')
            this.articles.comment_num += 1

            this.replyTips = ''
            this.commentId = null
            this.commentContent = ''
          }).catch(() => {
            this.$message.error('评论失败')
          })
        } else {
          this.$message.warning('请登录后评论')
        }
      },
      createCollect() {
          let postData = {
            article: this.$route.params.id,
            category: this.collectCategoryValue
          }
          this.$api.blog.createCollect(postData).then((res) =>{
            this.isCollect = res.data.is_collect


            if (!res.data.is_collect) {
              this.articles.collect_num -= 1
              this.$message.success('删除收藏成功');
            } else {
              this.articles.collect_num += 1
              this.$message.success('收藏成功');
            }
            this.toggle()
          })
      },
      replyComment(commentId, username) {

        if (this.logStatus) {
          this.replyTips = '回复：' + username;
          this.commentId = commentId;
        } else {
          this.$message.warning('请登录后回复')
        }

      },

      like() {
        if (this.logStatus) {
          let postData = {blog_id: this.$route.params.id}
          this.$api.blog.like(postData).then((res) => {
            this.articles.is_like = res.data.like
          }).catch(() => {
            this.$message.error('点赞出错')
          })
        } else {
          this.$message.warning('请登录后点赞')
        }
      },

      focusComment() {
        if (this.logStatus) {
          this.$refs.commentTextarea.focus();
        } else {
          this.$message.warning('请登录后评论')
        }
      },

      createCollectCategory() {

        this.$api.blog.createCollectCategory(this.collectCategoryData).then((res) => {
          this.collectCategory.push(res.data)
          this.switchAdd()
        })
      },

      createCategoryFollow() {
        this.$api.blog.createCategoryFollow({category: this.category.id}).then((res)=>{

          if (!this.isCategoryFollow) {

            this.$message.success('关注专栏成功');
          } else {
            this.$message.success('取消关注专栏成功');
          }
          this.isCategoryFollow = res.data.isCategoryFollow

        })
      }
    },

    created() {
      // this.$nextTick(() => {
      // });

      this.getBlogData()
      this.getComments()
    },
    mounted() {
      // $(this.$el).find('.ui.sticky').sticky({
      //   context: '#example2',
      //   pushing: true
      // })

      window.onresize = () => {
        return (() => {
          this.currentHeight = document.body.clientHeight - 270
        })();
      }
    },
    filters: {
      changeTime(val) {
        let time = new Date(val);
        return timeago.format(time, 'zh_CN'); //转换成类似于几天前的格式
      },
    },
    computed: {
      ...mapState('account', {
        defaultAvatar: ACCOUNT.DEFAULT_AVATAR,
        logStatus: ACCOUNT.LOG_STATUS,
        username: ACCOUNT.LOG_IN_USERNAME

      }),
      readTime() {

        let $_time = parseInt(this.articles.content.length / 300)
        if ($_time >= 1) {
          return "预计阅读 " + $_time + " 分钟"
        } else {
          return "预计阅读小于 1 分钟"

        }
      },

      collectStatus() {
        if (this.isCollect && this.collectCategoryValue.length > 0) {
          return true;
        } else {
          return !(this.isCollect && this.collectCategoryValue.length === 0);
        }
      }
    },

  }
</script>

<style scoped lang="scss">


</style>
