<template>
  <div style="background-color: #e9ecef">
    <sui-container align="left">
      <sui-grid>
        <sui-grid-column :width="5">
          <sui-card class="ui fluid">
            <sui-card-content>
<!--              <sui-card-header>分类专栏</sui-card-header>-->

                <router-link :to="{name: 'UserDetail'}">
                  <sui-image
                    :src="userInfo.avatar ? userInfo.avatar: defaultAvatar"
                    size="mini"
                    circular
                  />
                  {{userInfo.username}}
                </router-link>
              <br><br>
              <div>
                <sui-button size=mini color="green">{{$t('user.follow')}}</sui-button>
                <sui-button size=mini>{{$t('user.privateMessage')}}</sui-button>
                <sui-button color="orange" size=mini>{{$t('user.reward')}}</sui-button>
              </div>





            </sui-card-content>
            <sui-card-content align="center">
              <div>
                <sui-statistic size="mini">
                  <sui-statistic-value>
                    {{userInfo.articles_num}}
                  </sui-statistic-value>
                  <sui-statistic-label>
                    文章
                  </sui-statistic-label>
                </sui-statistic>
                <sui-statistic size="mini">
                  <sui-statistic-value>
                    2204
                  </sui-statistic-value>
                  <sui-statistic-label>
                    粉丝
                  </sui-statistic-label>
                </sui-statistic>

                <sui-statistic size="mini">
                  <sui-statistic-value>
                    233
                  </sui-statistic-value>
                  <sui-statistic-label>
                    获赞
                  </sui-statistic-label>
                </sui-statistic>

                <sui-statistic size="mini">
                  <sui-statistic-value>
                    233
                  </sui-statistic-value>
                  <sui-statistic-label>
                    评论
                  </sui-statistic-label>
                </sui-statistic>
                <sui-statistic size="mini">
                  <sui-statistic-value>
                    2134
                  </sui-statistic-value>
                  <sui-statistic-label>
                    访问
                  </sui-statistic-label>
                </sui-statistic>

              </div>

            </sui-card-content>


          </sui-card>


          <sui-card class="ui fluid"> <!--style="box-shadow: none"-->
            <sui-card-content>
              <sui-card-header>
                分类专栏
              </sui-card-header>
              <sui-card-description>

                <sui-item-group>

                  <sui-item v-for="i in categorys" :key="i.id">
                    <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
                    <sui-item-content>

                      <sui-item-content>
                        <a style="color: #2c3e50" @click="getArticles(active, i.id)">{{i.name}}</a>

                      </sui-item-content>
                    </sui-item-content>
                  </sui-item>

                </sui-item-group>

              </sui-card-description>
            </sui-card-content>

          </sui-card>

          <sui-card   class="ui fluid"> <!--style="box-shadow: none"-->
            <sui-card-content>
              <sui-card-header>
                最新文章

              </sui-card-header>
              <sui-card-description>

                <sui-item-group>
                  <sui-item v-for="i in newestArticles" :key="i.article_id">
                    <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
                    <sui-item-content>

                      <sui-item-content>
                        <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article_id }}"
                                     style="color: #212121"
                        >
                          {{i.title}}
                        </router-link>
                      </sui-item-content>
                    </sui-item-content>
                  </sui-item>

                </sui-item-group>

              </sui-card-description>
            </sui-card-content>

          </sui-card>
          <sui-card class="ui fluid"> <!--style="box-shadow: none"-->
            <sui-card-content>
              <sui-card-header>热门文章</sui-card-header>
              <sui-card-description>

                <sui-item-group>
                  <sui-item v-for="i in hottestArticles" :key="i.article_id">
                    <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
                    <sui-item-content>

                      <sui-item-content>
                        <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article_id }}"
                                     style="color: #212121"
                        >
                          {{i.title}}
                        </router-link>
                      </sui-item-content>
                    </sui-item-content>
                  </sui-item>

                </sui-item-group>

              </sui-card-description>
            </sui-card-content>

          </sui-card>



          <!--              <router-link-->
          <!--                is="sui-menu-item"-->
          <!--                :to="{name: 'ArticlesManage'}"-->
          <!--                :active="isActive('文章管理')"-->
          <!--                content="文章管理"-->
          <!--                @click.native="select('文章管理')"-->
          <!--              />-->


        </sui-grid-column>
        <sui-grid-column :width="11">
          <sui-card class="ui fluid">
            <sui-card-content>


                <sui-menu text floated="right">
                  <a is="sui-menu-item"
                     class="ui header floated left "
                     style="color: #2f5282"
                     v-show="isForCategory"
                     @click="getArticles('默认')">全部文章</a>

                  <div class="ui header"  is="sui-menu-item">排序：</div>
                  <a
                    is="sui-menu-item"
                    content="默认"

                    :active="isActive('默认')"
                    @click="getArticles('默认', categoryId)"
                  />
                  <a
                    is="sui-menu-item"
                    content="时间"
                    :active="isActive('时间')"
                    @click="getArticles('时间', categoryId, 'created_at' )"
                  />
                  <a
                    is="sui-menu-item"
                    content="访问量"
                    :active="isActive('访问量')"
                    @click="getArticles('访问量', categoryId, 'click_nums')"

                  />
                </sui-menu>




            </sui-card-content>
            <sui-card-content>
              <sui-item-group divided>
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
                      <span class="ui right floated"><sui-icon name="eye" />{{i.click_nums}}</span>
                      <span class="ui  right floated"><sui-icon name="comment" />{{i.comment_num  }}</span>


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
                    <sui-button content="下一页" :disabled="end" @click="changePage(true)" icon="right arrow" label-position="right"/>

                  </sui-menu-item>
                </sui-menu-menu>
              </sui-menu>


            </sui-card-content>

          </sui-card>



        </sui-grid-column>


      </sui-grid>


    </sui-container>

  </div>
</template>

<script>
  import filters from "@/filters";

  import {ACCOUNT} from "@/store/types";
  import {mapState} from "vuex"

  export default {
    name: "Blog",
    components: {

    },
    props: {},
    data() {
      return {
        categorys: [],
        articles: [],
        blog: [],
        page: 1,
        end: false,
        top: true,
        next: null,
        previous: null,
        active: '默认',
        isForCategory: false,
        hottestArticles: [],
        newestArticles: [],
        desc: true,
        categoryId: null,
        orderName: null
      }
    },
    computed: {

      ...mapState('account', {
        logStatus: ACCOUNT.LOG_STATUS,
        userInfo: ACCOUNT.USER_INFO,
        username: ACCOUNT.CURRENT_USERNAME,
        defaultAvatar: ACCOUNT.DEFAULT_AVATAR,
        isUserInfoEditing: ACCOUNT.IS_USER_INFO_EDITING,
        editType: ACCOUNT.EDIT_TYPE
      }),
    },
    created() {
      this.getArticles(null, this.$route.params.category)
      this.getTopArticles()
      this.$api.blog.getCategorys().then((res) => {
        this.categorys = res.data
        // const category = res.data
        // for (let i in category) {
        //   this.categorys.push({text: category[i].name, value: category[i].id})
        // }
      })
    },
    mounted() {
    },
    methods: {

      changePage(flag) {
        if (flag) {
          this.page += 1
          this.getArticles(this.active, this.categoryId, this.orderName)

        } else {
          this.page -= 1
          this.getArticles(this.active, this.categoryId, this.orderName)

        }
      },

      getArticles(name, categoryId=null, orderName=null) {
        this.desc = !this.desc
        this.active = name;
        this.isForCategory = !!categoryId;
        this.categoryId = categoryId
        this.orderName = orderName
        this.$loading.show();
        this.$api.blog.getArticleParamList({
          username: this.username,
          page: this.page,
          category: categoryId,
          ordering: this.desc ? '-' + orderName:  orderName

        }).then(res => {
          this.articles = res.data.results
          this.top = res.data.previous === null
          this.end = res.data.next === null

          this.$loading.hide()
        })
      },


      getTopArticles(){
        this.$api.blog.getArticleParamList({
          username: this.username,
          page: this.page,
          size: 5
        }).then(res => {
          this.newestArticles = res.data.results
        })

        this.$api.blog.getArticleParamList({
          username: this.username,
          page: this.page,
          size: 5,
          ordering: '-click_nums'
        }).then(res => {
          this.hottestArticles = res.data.results

        })
      },


      isActive(name) {
        return this.active === name;
      },
      select(name) {
        this.active = name;
      },
    },
    filters: {
      ...filters,

    },
    watch: {},

  }
</script>

<style scoped>
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
