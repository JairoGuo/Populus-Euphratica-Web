<template>
  <div>
    <sui-tab active-index="0" @change="handleChange">
      <sui-tab-pane label="14" icon="users" title="全部">
        <sui-item-group>
          <sui-item v-for="i in articles" :key="i.article_id">

            <sui-item-content>
              <sui-item-header>
                <sui-label v-if="i.status  === 'D'">草稿</sui-label>
                <router-link target="_blank" :to="{name: 'EditorArticle', params: { article: i.article_id }}"
                             style="color: #534d4d">
                  {{i.title}}
                </router-link>
              </sui-item-header>

              <sui-item-meta>

              </sui-item-meta>

              <sui-item-extra class="ui end floated">
                <span>{{i.created_at | time}}</span>
                <span><sui-icon name="eye" />{{i.click_nums}}</span>
                <span><sui-icon name="comment" />{{ i.comment_num}}</span>
                <a class="ui  right floated" style="color: #ca0c16" @click="deleteArticle(i.article_id)">删除</a>
                <router-link class="ui  right floated" target="_blank"
                             :to="{name: 'BlogView', params: { id: i.article_id }}"
                             style="color: #349edf">
                  查看
                </router-link>
              </sui-item-extra>
            </sui-item-content>

          </sui-item>
        </sui-item-group>
        <sui-menu secondary>
          <sui-menu-item>
            <sui-button content="上一页" :disabled="top" @click="changePage(false)" icon="left arrow"
                        label-position="left"/>
          </sui-menu-item>
          <sui-menu-menu position="right">
            <sui-menu-item>
              <sui-button content="下一页" :disabled="end" @click="changePage(true)" icon="right arrow"
                          label-position="right"/>

            </sui-menu-item>
          </sui-menu-menu>
        </sui-menu>

      </sui-tab-pane>
      <sui-tab-pane label="0" title="已发表">

        <sui-item-group>
          <sui-item v-for="i in articles" :key="i.article_id">

            <sui-item-content>
              <sui-item-header>
                <router-link target="_blank" :to="{name: 'EditorArticle', params: { article: i.article_id }}"
                             style="color: #534d4d">
                  {{i.title}}
                </router-link>
              </sui-item-header>

              <sui-item-meta>

              </sui-item-meta>

              <sui-item-extra class="ui end floated">
                <span>{{i.created_at | time}}</span>
                <span>阅读数：{{i.click_nums}}</span>
                <span>评论数：{{ i.comment_num}}</span>
                <a class="ui  right floated" style="color: #ca0c16" @click="deleteArticle(i.article_id)">删除</a>
                <router-link class="ui  right floated" target="_blank"
                             :to="{name: 'BlogView', params: { id: i.article_id }}"
                             style="color: #349edf">
                  查看
                </router-link>
              </sui-item-extra>
            </sui-item-content>

          </sui-item>
        </sui-item-group>
        <sui-menu secondary>
          <sui-menu-item>
            <sui-button content="上一页" :disabled="top" @click="changePage(false)" icon="left arrow"
                        label-position="left"/>
          </sui-menu-item>
          <sui-menu-menu position="right">
            <sui-menu-item>
              <sui-button content="下一页" :disabled="end" @click="changePage(true)" icon="right arrow"
                          label-position="right"/>

            </sui-menu-item>
          </sui-menu-menu>
        </sui-menu>
      </sui-tab-pane>
      <sui-tab-pane icon="check" label="14" title="草稿">
        <sui-item-group>
          <sui-item v-for="i in articles" :key="i.article_id">

            <sui-item-content>
              <sui-item-header>
                <sui-label v-if="i.status  === 'D'">草稿</sui-label>
                <router-link target="_blank" :to="{name: 'EditorArticle', params: { article: i.article_id }}"
                             style="color: #534d4d">
                  {{i.title}}
                </router-link>
              </sui-item-header>

              <sui-item-meta>

              </sui-item-meta>

              <sui-item-extra class="ui end floated">
                <span>{{i.created_at | time}}</span>
                <span>阅读数：{{i.click_nums }}</span>
                <span>评论数：{{ i.comment_num}}</span>
                <a class="ui  right floated" style="color: #ca0c16" @click="deleteArticle(i.article_id)">删除</a>
                <router-link class="ui  right floated" target="_blank"
                             :to="{name: 'BlogView', params: { id: i.article_id }}"
                             style="color: #349edf">
                  查看
                </router-link>
              </sui-item-extra>
            </sui-item-content>

          </sui-item>
        </sui-item-group>
        <sui-menu secondary>
          <sui-menu-item>
            <sui-button content="上一页" :disabled="top" @click="changePage(false)" icon="left arrow"
                        label-position="left"/>
          </sui-menu-item>
          <sui-menu-menu position="right">
            <sui-menu-item>
              <sui-button content="下一页" :disabled="end" @click="changePage(true)" icon="right arrow"
                          label-position="right"/>

            </sui-menu-item>
          </sui-menu-menu>
        </sui-menu>
      </sui-tab-pane>
    </sui-tab>

    <sui-modal v-model="open" size="mini">
      <sui-modal-header>警告</sui-modal-header>
      <sui-modal-content>

        <sui-modal-description>
          <sui-header>是否删除改文章？</sui-header>
          <p>
            删除后不可撤销
          </p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="cancel">
          取消
        </sui-button>
        <sui-button negative @click.native="confirm">
          确认删除
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

  </div>
</template>

<script>
  import filters from "@/filters";
  import moment from "moment";
  import {mapState} from "vuex";
  import {ACCOUNT} from "@/store/types";

  export default {
    name: "ArticlesManage",
    components: {},
    props: {},
    data() {
      return {
        articles: [],
        end: false,
        top: true,
        next: null,
        previous: null,
        page: 1,
        open: false,
        articleId: '',
        activeIndex: null,
        table: {
          inside: null,
          index: null,
          name: null,
        },
      }
    },
    computed: {
      ...mapState('account', {
        username: ACCOUNT.LOG_IN_USERNAME,
      }),
    },
    created() {
      this.getArticles()
    },
    mounted() {
    },
    methods: {

      handleChange(e, activePane, index) {
        this.table.inside = !!e;
        this.table.index = +index;
        this.table.title = activePane.title;

        switch (index) {
          case 0:
            this.page = 1
            this.getArticles()
            break
          case 1:
            this.page = 1
            this.getPublishedArticles()
            break
          case 2:
            this.page = 1
            this.getDraftArticles()
            break
        }

      },
      getArticles() {
        this.$loading.show();
        this.$api.blog.getArticleParamList({username: this.username, page: this.page}).then(res => {
          this.articles = res.data.results
          this.top = res.data.previous === null
          this.end = res.data.next === null
          this.$loading.hide()
        }).catch(()=>{
          this.$loading.hide()
        })
      },
      getPublishedArticles() {
        this.$loading.show();
        this.$api.blog.getArticleParamList({
          username: this.username,
          page: this.page,
          status: 'P'
        }).then(res => {
          this.articles = res.data.results
          this.top = res.data.previous === null
          this.end = res.data.next === null
          this.$loading.hide()
        }).catch(()=>{
          this.$loading.hide()
        })
      },
      getDraftArticles() {
        this.$loading.show();
        this.$api.blog.getArticleParamList({
          username: this.username,
          page: this.page,
          status: 'D'
        }).then(res => {
          this.articles = res.data.results
          this.top = res.data.previous === null
          this.end = res.data.next === null
          this.$loading.hide()
        }).catch(()=>{
          this.$loading.hide()
        })
      },
      changePage(flag) {
        if (flag) {
          this.page += 1
          this.getArticles()
        } else {
          this.page -= 1
          this.getArticles()
        }
      },
      deleteArticle(articleId) {
        this.toggle()
        this.articleId = articleId

      },
      toggle() {
        this.open = !this.open
      },
      confirm() {

        // this.articles = this.articles.filter((item) => item.article_id !== this.articleId)
        this.$api.blog.deleteArticle(this.articleId).then(() => {

          this.$message.success('删除成功')
        })

        this.articles.splice(this.articles.findIndex(item => item.article_id === this.articleId), 1)
        // this.articles.pop({'article_id': this.articleId})
        this.toggle()
      },
      cancel() {
        this.toggle()
      }
    },
    filters: {
      ...filters,
      time(val) {
        let time = new Date(val); //先将接收到的json格式的日期数据转换成可用的js对象日期
        return moment(time).format("YYYY年MM月DD日");

      }
    },
    watch: {},

  }
</script>

<style scoped>

</style>
