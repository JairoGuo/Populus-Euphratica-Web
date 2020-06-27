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
                {{userInfo.articles_num}}
              </sui-statistic-value>
              <sui-statistic-label>
                文章
              </sui-statistic-label>
            </sui-statistic>


          </div>

          <div>
            <sui-button size=mini :color="isFollow ? null : 'green'" @click="createUserFollow()">
              {{isFollow ? '取消关注':$t('user.follow' )}}
            </sui-button>
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

      <sui-grid>
        <sui-grid-column :width="4">
          <div class="ui  vertical menu fluid ">
            <!--profile-->
            <router-link
              is="sui-menu-item"
              :to="{name: 'UserProfile'}"

              :active="isActive($t('user.profiles'))"
              :content="$t('user.profiles')"
              @click.native="select($t('user.profiles'))"
              icon="user"
            >
              {{$t('user.profiles')}}
            </router-link>

            <!--myBlog-->
            <router-link
              is="sui-menu-item"
              :to="{name: 'UserArticle'}"
              :label="userInfo.articles_num.toString()"
              :active="isActive($t('user.MyBlog'))"
              :content="$t('user.MyBlog')"
              @click.native="select($t('user.MyBlog'))"
            >
              {{$t('user.MyBlog')}}
              <sui-label>{{userInfo.articles_num}}</sui-label>
            </router-link>


            <router-link
              is="sui-menu-item"
              :to="{name: 'UserCategory'}"
              :label="userInfo.articles_num.toString()"
              :active="isActive($t('user.MyBlog'))"
              :content="$t('user.MyBlog')"
              @click.native="select($t('user.MyBlog'))"
            >
              我的专栏
              <sui-label>{{userInfo.category_num}}</sui-label>
            </router-link>

            <router-link
              is="sui-menu-item"
              :to="{name: 'UserCollect'}"
              :label="userInfo.articles_num.toString()"
              :active="isActive($t('user.MyBlog'))"
              :content="$t('user.MyBlog')"
              @click.native="select($t('user.MyBlog'))"
            >
              我的收藏
              <sui-label>{{userInfo.collect_num}}</sui-label>
            </router-link>

            <router-link
              is="sui-menu-item"
              :to="{name: 'UserCategoryFollow'}"
              :label="userInfo.articles_num.toString()"
              :active="isActive($t('user.MyBlog'))"
              :content="$t('user.MyBlog')"
              @click.native="select($t('user.MyBlog'))"
            >
              我关注的专栏
              <sui-label>{{userInfo.category_follow_num}}</sui-label>
            </router-link>
            <router-link
              is="sui-menu-item"
              :to="{name: 'UserFollow'}"
              :label="userInfo.articles_num.toString()"
              :active="isActive($t('user.MyBlog'))"
              :content="$t('user.MyBlog')"
              @click.native="select($t('user.MyBlog'))"
            >
              我的关注
              <sui-label>{{userInfo.user_follow_num}}</sui-label>
            </router-link>
            <router-link
              is="sui-menu-item"
              :to="{name: 'UserFans'}"
              :label="userInfo.articles_num.toString()"
              :active="isActive($t('user.MyBlog'))"
              :content="$t('user.MyBlog')"
              @click.native="select($t('user.MyBlog'))"
            >
              我的粉丝
              <sui-label>{{userInfo.user_fans_num}}</sui-label>
            </router-link>


          </div>

        </sui-grid-column>
        <sui-grid-column :width="12">

          <router-view></router-view>
        </sui-grid-column>


      </sui-grid>


    </sui-container>


  </div>


</template>

<script>
  // import $ from 'jquery'

  import UploadAvatar from "../../components/users/UploadAvatar";
  import {mapState, mapGetters, mapActions, mapMutations} from "vuex";
  import {ACCOUNT} from "@/store/types"
  import filters from "@/filters";

  export default {

    data() {
      return {
        imageUrl: '',
        upload_img: require("../../assets/images/upload.png"),
        activeIndex: null,
        table: {
          inside: null,
          index: null,
          name: null,
        },
        active: this.$t('user.profiles'),


      }
    },
    async created() {
      await this.getUserInfo(this.$route.params.username)

    },
    methods: {
      ...mapActions('account', {getUserInfo: ACCOUNT.GO_USER_INFO}),
      ...mapMutations('account', {
        setIsFollow: ACCOUNT.SET_IS_FOLLOW
      }),
      createUserFollow() {
        console.log(this.userId)

        this.$api.account.createUserFollow(this.userId).then((res) => {
          this.setIsFollow(res.data.is_follow)
          console.log(res.data)
        })
      },


      isActive(name) {
        return this.active === name;
      },
      select(name) {
        this.active = name;
      },

    },
    mounted() {

    },
    computed: {
      ...mapState('account', {
        logStatus: ACCOUNT.LOG_STATUS,
        userInfo: ACCOUNT.USER_INFO,
        username: ACCOUNT.CURRENT_USERNAME,
        isFollow: ACCOUNT.IS_FOLLOW,
        userId: ACCOUNT.CURRENT_USER_ID,
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

    },
    watch: {
      $route() {
        this.getUserInfo(this.$route.params.username)
      }
    },
    components: {
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
