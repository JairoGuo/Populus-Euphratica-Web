<template>
  <div>

    <nav-bar-base v-if="!this.isEditor">
        <router-link
          is="sui-menu-item"
          v-for="(value, name) in route_items"
          :active="isActive(name)"
          :key="name"
          :content="name"
          @click.native="select(name)"
          :to="value"
        />
        <sui-menu-menu>
          <sui-button circular icon="search" />
        </sui-menu-menu>

        <sui-menu-menu position="right" v-if="!logStatus" key="logout">
          <router-link
            is="sui-menu-item"
            :active="isActive('LogInOrout')"
            content="登录"
            @click.native="select('LogInOrout')"
            to="/login"
          ></router-link>
          <router-link
            is="sui-menu-item"
            :active="isActive('SignUp')"
            content="注册"
            @click.native="select('SignUp')"
            to="/signUp"
          ></router-link>
        </sui-menu-menu>
        <sui-menu-menu position="right" v-else key="login">

          <sui-dropdown class="teal" style="border-radius: 30px;" text="创建" button floating>
            <sui-dropdown-menu>

              <router-link is="sui-dropdown-item" to="/editor">
                <sui-icon name="file alternate outline"/>
                博客
              </router-link>

              <sui-dropdown-item>

                <sui-icon name="question"/>
                提问
              </sui-dropdown-item>
              <!--                <sui-dropdown-item>-->
              <!--                  <sui-icon name="hide"/>-->
              <!--                  投稿-->
              <!--                </sui-dropdown-item>-->
              <router-link is="sui-dropdown-item" to="/editor">
                <sui-icon name="newspaper outline"/>
                投稿
              </router-link>
            </sui-dropdown-menu>
          </sui-dropdown>

          <el-popover
            placement="bottom"
            trigger="click">

            <sui-card>

              <sui-card-content>
                <sui-card-header>Elliot Fu</sui-card-header>
                <sui-card-meta>Friend</sui-card-meta>
                <sui-card-description
                >Elliot Fu is a film-maker from New York.
                </sui-card-description
                >
              </sui-card-content>
            </sui-card>
            <a slot="reference">
              <sui-button icon="bell outline" style="color: white"></sui-button>
            </a>

          </el-popover>


          <sui-dropdown :icon="null" floating auto>
            <sui-image size="mini"
                       :src="userInfo.avatar ? userInfo.avatar: defaultAvatar"
                       avatar/>
            <sui-dropdown-menu>
              <sui-header>{{userInfo.username}}</sui-header>
              <sui-divider></sui-divider>
              <router-link is="sui-dropdown-item" to="/users/me">
                <sui-icon name="user"/>
                个人主页
              </router-link>
              <router-link is="sui-dropdown-item" to="/users/me">
                <sui-icon name="user"/>
                账号中心
              </router-link>
              <sui-dropdown-item>
                <sui-icon name="help"/>
                帮助
              </sui-dropdown-item>
              <sui-divider></sui-divider>
              <sui-dropdown-item @click="logOut">
                <sui-icon name="close"/>
                注销
              </sui-dropdown-item>
            </sui-dropdown-menu>
          </sui-dropdown>
        </sui-menu-menu>
</nav-bar-base>
    <!--      <EditorNavBar v-else/>-->

  </div>
</template>

<script>
  // import EditorNavBar from "./EditorNavBar";
  import {mapActions, mapState} from 'vuex'
  import NavBarBase from '@/components/NavBarBase'
  export default {
    name: "NavBar",
    components: {
        NavBarBase
    },
    props: {},
    data() {
      return {
        active: "博客",
        route_items: {
          博客: "/blog",
          资讯: "/news",
          问答: "/question"
        },
        fullscreenLoading: false,
        active_url: "",
        isEditor: false,
        open: false
      }
    },
    computed: {
      ...mapState('account', ['logStatus', 'userInfo', 'defaultAvatar']),


    },
    created() {

      // if (this.$store.state.loginStatus) {
      //   this.axios.get("/api/users/me/").then(response => {
      //     this.$store.commit("setUsers", response.data)
      //   });
      // }
      //

      this.active_url = window.location.href.split("/")[4];
      if (this.active_url === "") {
        this.active = "博客";
      } else {
        this.active = this.active_url.replace(
          this.active_url[0],
          this.active_url[0].toUpperCase()
        )
      }

    },
    mounted() {},
    methods: {
      isActive(name) {
        return this.active === name;
      },
      select(name) {
        this.active = name;
      },
      ...mapActions('account', ['logOut']),


      // logout() {
      // this.axios.post("/api/accounts/logout/")
      //   .then(response => {
      //     console.log(response.data)
      //     this.axios.get("/api/users/login_status/").then(response => {
      //       this.$store.commit("setloginStatus", response.data.status)
      //       this.$store.commit("setLoginInfo", null)
      //     })
      //
      //     this.$router.push("/")
      //   }).catch(err => {
      //   console.log(err)
      // })
      // },


    },
    filter: {},
    watch: {
      $route() {
        if (this.$route.name === "Editor") {
          this.isEditor = true
        } else {
          this.isEditor = false
        }
      }
    },

  }
</script>

<style scoped>

</style>
