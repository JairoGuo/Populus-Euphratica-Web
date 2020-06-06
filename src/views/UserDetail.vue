

<template>
  <div class="UserDetail">
    <sui-container>
      <sui-grid align="left">

        <sui-grid-column :width="2">
          <div>
            <sui-image
              :src="userInfo.avatar ? userInfo.avatar: defaultAvatar"
              size="medium"
              circular
            />
            <upload-avatar v-show="isLogin"></upload-avatar>
          </div>
          <div>
            <span v-for="i in userInfo.homepage" :key="i.homepage_type">
              <a :href="i.homepage_url" style="color: black"><sui-icon
                size="large"
                :name="i.homepage_type.toLowerCase()"></sui-icon></a>
            </span>
          </div>
        </sui-grid-column>
        <sui-grid-column :width="8">
          <sui-header>
            {{userInfo.nickname ?
            userInfo.nickname :
            userInfo.username}}
          </sui-header>
          <div>
            <a v-if="userInfo.website"
               :href="userInfo.website">
              <sui-icon name="linkify"></sui-icon>
              {{userInfo.website}}
            </a>
          </div>
          <div>

            <sui-statistic size="mini">
              <sui-statistic-value>
                21
              </sui-statistic-value>
              <sui-statistic-label>
                关注
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
                文章
              </sui-statistic-label>
            </sui-statistic>


          </div>

          <div>
            <sui-button size=mini color="green">{{$t('user.follow')}}</sui-button>
            <sui-button size=mini>{{$t('user.privateMessage')}}</sui-button>
            <sui-button color="orange" size=mini>{{$t('user.reward')}}</sui-button>
          </div>

        </sui-grid-column>
        <sui-grid-column :width="6" floated="right">

          <sui-card class="ui fluid">

            <sui-card-content>

              <sui-card-header>{{$t('user.introduction')}}</sui-card-header>

            </sui-card-content>

            <sui-card-content style="height: 150px; overflow: auto; resize: none; white-space:pre">

              {{userInfo.introduction}}
            </sui-card-content>
          </sui-card>
        </sui-grid-column>
      </sui-grid>


      <sui-divider></sui-divider>
      <sui-tab @change="handleChange" :active-index="activeIndex" :menu="{ vertical: true, fluid: true }"
               menu-position="left">
        <!-- User Info -->
        <sui-tab-pane class="tab-pane" :title="$t('user.profiles')">
          <sui-grid>

            <sui-grid-column :width="12">
              <sui-grid-row>

                <sui-card class="ui fluid">

                  <sui-card-content>
                    <sui-card-header>{{$t('user.personalInformation')}}</sui-card-header>

                  </sui-card-content>

                  <EditArchives v-if="isUserInfoEditing.Archives"></EditArchives>
                  <sui-card-content v-else>

                    <sui-grid>
                      <sui-grid-row>
                        <sui-grid-column>
                          <sui-container textAlign="left">
                            <div>
                              <span>ID: {{userInfo.username}}</span>
                              <a @click="setEditStatus(editType.Archives)"
                                 class="ui right floated aligned"
                                 v-show="isLogin"
                                 style="color: #999999">
                                <sui-icon name="edit online"/>
                                {{$t('user.edit')}}</a>

                            </div>
                            <sui-divider></sui-divider>

                            <sui-grid>
                              <sui-grid-column :width="8">
                                <p>
                                  {{$t('user.nickname')}}: {{userInfo.nickname}}
                                </p>
                                <p>
                                  {{$t('user.name')}}: {{userInfo.name}}
                                </p>
                                <p>
                                  Email: {{userInfo.email}}
                                </p>
                                <p>
                                  {{$t('user.birthday')}}: {{userInfo.birthday}}
                                </p>
                                <p>
                                  {{$t('user.sex')}}: {{userInfo.sex | getSex}}
                                </p>

                              </sui-grid-column>

                              <sui-grid-column :width="8">
                                <p>
                                  {{$t('user.homepage')}}: <a
                                  :href="userInfo.website">{{userInfo.website}}</a>
                                </p>
                                <p>
                                  {{$t('user.education')}}: {{userInfo.education}}
                                </p>

                              </sui-grid-column>


                            </sui-grid>

                          </sui-container>
                        </sui-grid-column>


                      </sui-grid-row>

                    </sui-grid>

                  </sui-card-content>

                </sui-card>


              </sui-grid-row>
              <!--技能-->
              <sui-grid-row style="margin-top: 28px">
                <sui-card class="ui fluid">
                  <sui-card-content>
                    <sui-card-header>
                      {{$t('user.skill')}}
                    </sui-card-header>
                  </sui-card-content>

                  <EditSkill v-if="isUserInfoEditing.Skill"></EditSkill>
                  <sui-card-content v-else>
                    <a @click="setEditStatus(editType.Skill)"
                       v-show="isLogin"
                       class="ui right floated aligned" style="color: #999999">
                      <sui-icon name="edit online"/>
                      {{$t('user.edit')}}</a>
                    <div v-if="userInfo.skill !== ''">
                      <sui-label style="margin-top: 5px; margin-bottom: 5px"
                                 size="mini"
                                 :color="getColor()"
                                 v-for="skill in userInfo.skill.split(',')"
                                 :key="skill">{{skill}}
                      </sui-label>
                    </div>


                  </sui-card-content>

                </sui-card>
              </sui-grid-row>
              <!--开源项目 & 文章著作-->
              <sui-grid-row style="margin-top: 28px">
                <sui-card class="ui fluid">
                  <sui-card-content>
                    <sui-card-header>
                      {{$t('user.openSourceProjectWorks')}}
                    </sui-card-header>
                  </sui-card-content>
                  <sui-card-content>


                  </sui-card-content>

                </sui-card>
              </sui-grid-row>


              <sui-grid-row>


              </sui-grid-row>

            </sui-grid-column>

            <!--工作信息-->
            <sui-grid-column :width="4">
              <sui-grid-row>
                <sui-card class="ui fluid">
                  <sui-card-content>
                    <sui-card-header>
                      {{$t('user.workInformation')}}
                    </sui-card-header>
                  </sui-card-content>

                  <EditWorkInfo v-if="isUserInfoEditing.WorkInfo"></EditWorkInfo>
                  <sui-card-content v-else>
                    <sui-container textAlign="left">
                      <a @click="setEditStatus(editType.WorkInfo)"
                         v-show="isLogin"
                         class="ui right floated aligned" style="color: #999999">
                        <sui-icon name="edit online"/>
                        {{$t('user.edit')}}
                      </a>
                      <p>
                        {{$t('user.company')}}: {{userInfo.company}}
                      </p>
                      <p>
                        {{$t('user.position')}}: {{userInfo.position}}
                      </p>

                      <p>
                        {{$t('user.industry')}}: {{userInfo.industry}}
                      </p>

                    </sui-container>


                  </sui-card-content>

                </sui-card>
              </sui-grid-row>
              <sui-grid-row style="padding-top: 28px">
                <sui-grid-column :width="3">
                  <p>{{$t('user.registrationTime')}}：{{ userInfo.created_at }}</p>
                </sui-grid-column>
              </sui-grid-row>
            </sui-grid-column>

          </sui-grid>
        </sui-tab-pane>
        <!-- Blog -->
        <sui-tab-pane class="tab-pane"  :label="userInfo.articles_num.toString()" align="left" :title="$t('user.MyBlog')">
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
                  <span class="ui right floated"><sui-icon name="eye" />{{i.click_nums}}</span>
                  <span class="ui  right floated"><sui-icon name="comment" />{{i.comment_num}}</span>


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


        </sui-tab-pane>
        <sui-tab-pane class="tab-pane" label="14" title="我的问答(Dev stage)">
          我的问答
        </sui-tab-pane>
        <sui-tab-pane class="tab-pane" label="23" title="我的圈子(Dev stage)">
          我的圈子
        </sui-tab-pane>
        <sui-tab-pane class="tab-pane" label="4" title="我的收藏(Dev stage)">
          我的收藏
        </sui-tab-pane>
        <sui-tab-pane class="tab-pane" :label="userInfo.category_num.toString()" align="left" title="我的专栏">
          <sui-item-group divided>
            <sui-item  v-for="i in categorys" :key="i.id">
              <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
              <sui-item-content>
                <sui-item-header href="javascript:void(0)">
                  {{i.name}}
                </sui-item-header>
                <sui-item-content>
                  {{i.summary}}
                </sui-item-content>
              </sui-item-content>
            </sui-item>

          </sui-item-group>

        </sui-tab-pane>
        <sui-tab-pane class="tab-pane" label="10" title="我的关注(Dev stage)">
          我的关注
        </sui-tab-pane>
        <sui-tab-pane class="tab-pane"  label="44" title="我的粉丝(Dev stage)">
          我的粉丝
        </sui-tab-pane>
      </sui-tab>

    </sui-container>


  </div>


</template>

<script>
  // import $ from 'jquery'
  import EditArchives from "../components/users/EditArchives";
  import EditSkill from "../components/users/EditSkill";
  import EditWorkInfo from "../components/users/EditWorkInfo";
  import UploadAvatar from "../components/users/UploadAvatar";
  import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
  import {ACCOUNT} from "@/store/types"
  import filters from "@/filters";

  export default {

    data() {
      return {
        isEditArchives: false,
        imageUrl: '',
        upload_img: require("../assets/images/upload.png"),
        activeIndex: null,
        table: {
          inside: null,
          index: null,
          name: null,
        },
        articles: [],
        categorys: [],
        page: 1,
        end: false,
        top: true,
        next: null,
        previous: null


      }
    },
    created() {
      this.getUserInfo(this.$route.params.username)
      this.$api.blog.getCategory().then((res)=> {
        this.categorys = res.data
        // const category = res.data
        // for (let i in category) {
        //   this.categorys.push({text: category[i].name, value: category[i].id})
        // }
      })


    },
    methods: {
      getColor: function () {
        let colorSet = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue',
          'violet', 'purple', 'pink', 'brown', 'grey', 'black']
        return colorSet[Math.round(Math.random() * colorSet.length)]
      },
      ...mapMutations('account', {setEditStatus: ACCOUNT.SET_USERINFO_EDIT_STATUS}),
      ...mapActions('account', {getUserInfo: ACCOUNT.GO_USER_INFO}),
      activatePane(index) {
        this.table.index = +index;
        this.activeIndex = +index;
      },
      handleChange(e, activePane, index) {
        this.table.inside = !!e;
        this.table.index = +index;
        this.table.title = activePane.title;

        switch (index) {
          case 1:
            this.page = 1
            this.getArticles()
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
      }
    },
    mounted() {
      this.activatePane(0)

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
      ...mapGetters('account', {
        isLogin: ACCOUNT.GET_IS_LOG_IN
      }),


    },
    filters: {
      ...filters,
      getSex: (value)=> {

        if (value === 'P') {
          return '未公开';
        } else {
          if (value === 'M') {
            return '男'
          } else {
            return '女'
          }
        }
      }
    },
    watch: {
      $route() {
        this.getUserInfo(this.$route.params.username)
      }
    },
    components: {
      EditWorkInfo,
      EditSkill,
      EditArchives,
      UploadAvatar
    },

  };
</script>

<style lang="scss" scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

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
