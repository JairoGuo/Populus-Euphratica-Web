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
  import {ACCOUNT} from "@/store/types";

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
      ...mapActions('account', {
        logIn: ACCOUNT.GO_LOG_IN
      }),
    },
    filter: {},
    watch: {},

  }
</script>
<style>
</style>
