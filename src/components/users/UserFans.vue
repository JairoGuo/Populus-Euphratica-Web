<template>
  <sui-container class="ui left aligned">
    <sui-header>我的粉丝</sui-header>
    <sui-divider></sui-divider>
    <sui-list divided class="ui middle aligned">
      <sui-list-item v-for="i in fansList" :key="i.id">
        <sui-image avatar :src="i.avatar ? i.avatar: defaultAvatar"/>
        <sui-list-content>
          <a is="sui-list-header">{{i.username}}</a>

        </sui-list-content>
        <sui-button v-if="i.mutual_follow" basic floated="right" color="green" size="mini" @click="createUserFollow(i.user_id)">
          互相关注
        </sui-button>
        <sui-button v-else basic floated="right" color="red" size="mini" @click="createUserFollow(i.user_id)">
         关注
        </sui-button>

      </sui-list-item>

    </sui-list>

  </sui-container>
</template>

<script>
  import {mapState} from "vuex";
  import {ACCOUNT} from "../../store/types";

  export default {
    name: "UserFans",
    components: {},
    props: {},
    data() {
      return {
        fansList: []
      }
    },
    computed: {

      ...mapState('account', {
        logStatus: ACCOUNT.LOG_STATUS,
        userInfo: ACCOUNT.USER_INFO,
        username: ACCOUNT.CURRENT_USERNAME,
        isFollow: ACCOUNT.IS_FOLLOW,
        userId: ACCOUNT.CURRENT_USER_ID,
        loginUserId: ACCOUNT.LOG_IN_USER_ID,
        defaultAvatar: ACCOUNT.DEFAULT_AVATAR,
      }),
    },
    created() {
      this.getFans()
    },
    mounted() {
    },
    methods: {
      getFans() {
        this.$api.account.getFans(this.loginUserId).then(res => {
          this.fansList = res.data
        })
      },

      createUserFollow(userId) {

        this.$api.account.createUserFollow(userId).then((res) => {

          console.log(res.data)
        })
      },
    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
