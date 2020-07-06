<template>
  <sui-container class="left aligned">

    <sui-grid>
      <sui-grid-column :width="12">

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
      </sui-grid-column>
      <sui-grid-column :width="4">

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

            </sui-container>
          </sui-card-content>


        </sui-card>

      </sui-grid-column>

    </sui-grid>


  </sui-container>
</template>

<script>
  import {mapState} from "vuex";
  import {ACCOUNT} from "@/store/types";
  import filters from "@/filters";
  import '@/assets/scss/cover.scss'

  import changePage from "@/mixins/changePage";
    export default {
        name: "CategoryListView",
      components: {},
      mixins: [changePage],
      props: {},
      data() {
        return {
          articles: [],
          category: {},
          isCategoryFollow: false


        }
      },
      computed: {
        ...mapState('account', {

          username: ACCOUNT.CURRENT_USERNAME,

        }),


      },
      created() {
        this.getCategory()
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
        getCategory() {
          this.$api.blog.getCategory(this.$route.params.id).then((res) => {
            this.category = res.data
            this.isCategoryFollow = res.data.is_category_follow

          });
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
