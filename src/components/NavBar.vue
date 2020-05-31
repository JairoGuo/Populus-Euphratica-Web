<template>
  <div>

    <nav-bar-base v-if="!this.isEditor">
<!--      <router-link-->
<!--        is="sui-menu-item"-->
<!--        v-for="(value, name) in route_items"-->
<!--        :active="isActive(name)"-->
<!--        :key="name"-->
<!--        :content="name"-->
<!--        @click.native="select(name)"-->
<!--        :to="value"-->
<!--      />-->
      <router-link
        is="sui-menu-item"
        :active="isActive($t('nav.blog'))"
        :content="$t('nav.blog')"
        @click.native="select($t('nav.blog'))"
        to="/blog"
      />
      <router-link
        is="sui-menu-item"
        :active="isActive($t('nav.news'))"
        :content="$t('nav.news')"
        @click.native="select($t('nav.news'))"
        to="/news"
      />
      <router-link
        is="sui-menu-item"
        :active="isActive($t('nav.question'))"
        :content="$t('nav.question')"
        @click.native="select($t('nav.question'))"
        to="/question"
      />

      <sui-menu-item>
        <sui-button circular icon="search"/>
      </sui-menu-item>

      <sui-menu-menu position="right" v-if="!logStatus" key="logout">

        <sui-menu-item>
          <sui-dropdown
            :icon="'world'"
            floating
            button
            class="icon"
            v-model="selectedValue"
            :change="switchLang()"
            :menu-header="menuHeader"
            :search-in-menu="searchInMenu"
            :options="languages"
          />
        </sui-menu-item>
        <router-link
          is="sui-menu-item"
          :active="isActive('LogInOrout')"
          :content="$t('nav.login')"
          @click.native="select('LogInOrout')"
          to="/login"
        ></router-link>
        <router-link
          is="sui-menu-item"
          :active="isActive('SignUp')"
          :content="$t('nav.signup')"
          @click.native="select('SignUp')"
          to="/signUp"
        ></router-link>

      </sui-menu-menu>

      <sui-menu-menu position="right"  v-else key="login">
        <sui-menu-item class="horizontally fitted item">

          <sui-dropdown
            :icon="null"
            floating
            button
            class="icon"
            v-model="selectedValue"
            :change="switchLang()"
            :menu-header="menuHeader"
            :search-in-menu="searchInMenu"
            :options="languages"
          />
        </sui-menu-item>

        <sui-menu-item class="horizontally fitted item">
          <sui-dropdown class="teal" style="border-radius: 30px;" :text="$t('nav.create')" button floating>
            <sui-dropdown-menu>

              <router-link is="sui-dropdown-item" to="/editor">
                <sui-icon name="file alternate outline"/>
                {{$t("nav.createArticle")}}
              </router-link>

              <sui-dropdown-item>

                <sui-icon name="question"/>
                {{$t("nav.createQuestion")}}
              </sui-dropdown-item>
              <router-link is="sui-dropdown-item" to="/editor">
                <sui-icon name="newspaper outline"/>
                {{$t("nav.createNews")}}
              </router-link>
            </sui-dropdown-menu>
          </sui-dropdown>
        </sui-menu-item>

        <sui-menu-item class="horizontally fitted item">
          <el-popover

            placement="bottom"
            trigger="click">
            <sui-card>
              <sui-card-content>
                <sui-card-header>通知</sui-card-header>
                <sui-card-meta>12: 30</sui-card-meta>
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
        </sui-menu-item>

        <sui-menu-item class="horizontally fitted item">
          <sui-dropdown :icon="null" floating auto>
            <sui-image size="mini"
                       :src="$auth.user.avatar? $auth.user.avatar: defaultAvatar"
                       avatar/>
            <sui-dropdown-menu>
              <sui-header>{{$auth.user.username}}</sui-header>
              <sui-divider></sui-divider>
              <router-link is="sui-dropdown-item" to="/users/me">
                <sui-icon name="user"/>
                {{$t('nav.homepage')}}
              </router-link>
              <router-link is="sui-dropdown-item" to="/users/me">
                <sui-icon name="user"/>
                {{$t('nav.account')}}
              </router-link>

              <router-link is="sui-dropdown-item" :to="{name: 'Manage'}">
                <sui-icon name="file alternate outline"/>
                {{$t('nav.articlesManage')}}
              </router-link>

              <sui-dropdown-item>
                <sui-icon name="help"/>
                {{$t('nav.help')}}
              </sui-dropdown-item>
              <sui-divider></sui-divider>
              <sui-dropdown-item @click="logOut">
                <sui-icon name="close"/>
                {{$t('nav.logout')}}
              </sui-dropdown-item>
            </sui-dropdown-menu>
          </sui-dropdown>
        </sui-menu-item>

      </sui-menu-menu>
    </nav-bar-base>

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
        active: this.$t('nav.blog'),
        fullscreenLoading: false,
        active_url: "",
        isEditor: false,
        open: false,
        current: null,
        menuHeader: {
          icon: '',
          content: 'Header',
        },
        searchInMenu: {
          icon: 'search',
          iconPosition: 'left',
        },
        selectedValue: localStorage.getItem('LACALE') || 'zh_CN',
        languages: [
          {
            key: 'zh_CN',
            text: '简体中文',
            value: 'zh_CN',
            flag: 'cn'
          },
          {
            key: 'zh_TW',
            text: '繁體中文 (臺灣)',
            value: 'zh_TW',
            flag: 'tw'
          },
          {
            key: 'zh_HK',
            text: '繁體中文 (香港)',
            value: 'zh_HK',
            flag: 'hk'
          },
          {
            key: 'en_US',
            text: 'English (U.S.A)',
            value: 'en_US',
            flag: 'us'
          },
          {
            key: 'ru_RU',
            text: 'русский язык',
            value: 'ru_RU',
            flag: 'ru'
          },
          {
            key: 'fr_FR',
            text: 'Français',
            value: 'fr_FR',
            flag: 'fr'
          },
          {
            key: 'ja_JP',
            text: '日本語',
            value: 'ja_JP',
            flag: 'jp'
          },
        ],
      }
    },
    computed: {
      ...mapState('account', ['logStatus', 'userInfo', 'defaultAvatar']),
    },
    created() {


      this.active_url = window.location.href.split("/")[4];
      if (this.active_url === "") {
        this.active = this.$t('nav.blog')
      } else {
        this.active = this.active_url.replace(
          this.active_url[0],
          this.active_url[0].toUpperCase()
        )
      }

    },
    mounted() {

    },
    methods: {
      isActive(name) {
        return this.active === name;
      },
      select(name) {
        this.active = name;
      },
      ...mapActions('account', ['logOut']),
      switchLang() {
        this.$i18n.locale = this.selectedValue
        localStorage.setItem('LACALE', this.selectedValue)
      }


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
