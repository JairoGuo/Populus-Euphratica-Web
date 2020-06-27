<template>
  <sui-container class="ui left aligned">
    <sui-header>我的关注</sui-header>
    <sui-divider></sui-divider>
    <sui-list divided class="ui middle aligned">
      <sui-list-item v-for="i in followList" :key="i.id">
        <sui-image avatar :src="i.avatar ? i.avatar: defaultAvatar"/>
        <sui-list-content>
          <a is="sui-list-header">{{i.username}}</a>

        </sui-list-content>
        <sui-button basic floated="right" :color="i.mutual_follow ? 'green' : null" size="mini" @click="createUserFollow(i.user_id)">
          {{i.mutual_follow ? '互相关注' : '取消关注'}}
        </sui-button>

      </sui-list-item>

    </sui-list>

  </sui-container>
</template>

<script>
  import {mapState} from "vuex";
  import {ACCOUNT} from "../../store/types";

  export default {
    name: "UserFollow",
    components: {},
    props: {},
    data() {
      return {
        followList: []
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
      this.getFollow()
    },
    mounted() {
    },
    methods: {
      getFollow() {
        this.$api.account.getFollow(this.loginUserId).then(res=>{
          this.followList = res.data
          console.log(res.data)
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
