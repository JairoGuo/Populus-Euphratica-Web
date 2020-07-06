<template>
  <sui-container class="ui left aligned">
    <router-link
      is="sui-label"
      color="orange"
      ribbon="right"
      :to="{name: 'Blog', params: $route.params.username}"
    >
      访问博客主页
    </router-link>
    <sui-item-group>
      <sui-item v-for="i in articles" :key="i.article_id">

        <sui-item-content>
          <sui-item-header>
            <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article_id }}"
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
              <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article_id }}"
                           style="color: #888"
              >
                {{i.abstract | wordLimit}}
              </router-link>
              <!--                    {{ i| setAbstract }}-->
            </p>
          </sui-item-description>
          <sui-item-extra class="ui end floated">


            <span>{{i.created_at | changeTime}}</span>
            <span class="ui right floated"><sui-icon name="eye"/>{{i.click_nums}}</span>
            <span class="ui  right floated"><sui-icon name="comment"/>{{i.comment_num}}</span>


          </sui-item-extra>
        </sui-item-content>
        <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article_id }}" style="color: #888">
          <sui-item-image class="cover-img"
                          :style="{'background-image': 'url('+ i.cover +')',
                                width: '180px',
                                height: '120px',
                                marginLeft: '20px'}"
                          v-if="i.cover" src=""/>
        </router-link>


      </sui-item>
    </sui-item-group>

    <sui-menu secondary>
      <sui-menu-item>
        <sui-button content="上一页" :disabled="top" @click="changePage(false)" icon="left arrow" label-position="left"/>
      </sui-menu-item>
      <sui-menu-menu position="right">
        <sui-menu-item>
          <sui-button content="下一页" :disabled="end" @click="changePage(true)" icon="right arrow"
                      label-position="right"/>

        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>
  </sui-container>
</template>

<script>
  import {mapState} from "vuex";
  import {ACCOUNT} from "../../store/types";
  import filters from "../../filters";
  import '@/assets/scss/cover.scss'

  import changePage from "@/mixins/changePage";

  export default {
    name: "UserArticle",
    components: {},
    mixins: [changePage],
    props: {},
    data() {
      return {
        articles: [],
      }
    },
    computed: {
      ...mapState('account', {

        username: ACCOUNT.CURRENT_USERNAME,

      }),


    },
    created() {
      this.getArticles()
    },
    mounted() {
    },
    methods: {
      getArticles() {
        this.$loading.show();
        this.$api.blog.getArticleParamList({
          username: this.username,
          page: this.page,
          status: 'P'
        }).then(res => {
          this.articles = res.data.results
          console.log(res.data.results)

          this.top = res.data.previous === null
          this.end = res.data.next === null

          this.$loading.hide()
        })
      },

      changePageCallback() {
        this.getArticles()
      },
    },
    filters: {
      ...filters,
    },
    watch: {},

  }
</script>

<style scoped>

</style>
