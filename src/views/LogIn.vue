<template lang="html">
  <sui-container text style="width: 30vw;">
    <sui-form>
      <sui-form-field>
        <input v-model="postForm.username" placeholder="用户名"/>
      </sui-form-field>
      <sui-form-field>
        <input v-model="postForm.password" placeholder="密码"/>
      </sui-form-field>
      <sui-button type="submit" @click="logIn(postForm)">登录</sui-button>
      <a href="#"> 忘记密码</a>
    </sui-form>
  </sui-container>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "LogIn",
    components: {},
    props: {},
    data() {
      return {
        postForm: {
          username: "jairoguo",
          password: "guojinru19990112"
        }
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      ...mapActions('account', ['logIn']),
      // submit() {
      //
      //   this.$api.account.logIn(this.postForm).then(res => {
      //     console.log(res)
      //     this.$api.account.logStatus().then(response => {
      //       this.$store.commit("setloginStatus", response.data.status)
      //     })
      //     this.$api.account.getMe().then(response => {
      //       console.log(response)
      //       this.$store.commit("setUsers", response.data)
      //       this.$store.commit("setLoginInfo", response.data.username)
      //
      //     })
      //   })
      //
      //   // this.axios.post("/api/accounts/login/", this.postForm).then(response => {
      //   //   console.log(response)
      //   //
      //   //   this.axios.get("/api/users/login_status/").then(response => {
      //   //     this.$store.commit("setloginStatus", response.data.status)
      //   //
      //   //   })
      //   //   this.axios.get("/api/users/me/").then(response => {
      //   //     console.log(response)
      //   //     this.$store.commit("setUsers", response.data)
      //   //     this.$store.commit("setLoginInfo", response.data.username)
      //   //
      //   //     console.log(this.$store.state.users)
      //   //   })
      //   //
      //   //   this.$router.push("/")
      //   //
      //   // });
      // }

    },
    filter: {},
    watch: {},

  }
</script>
<style>
</style>
