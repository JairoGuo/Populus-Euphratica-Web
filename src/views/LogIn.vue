<template lang="html">
  <sui-container style="margin-top: 10vh">


    <sui-grid>
      <sui-grid-column :width="10">

        <sui-container text class="left aligned" style="padding: 75px">

          <h1 is="sui-header">
            始于足下

          </h1>
          <p>
            GitHub is a development platform inspired by the way you work. From open source to business, you can host
            and review code, manage projects, and build software alongside 50 million developers.
          </p>


        </sui-container>


      </sui-grid-column>
      <sui-grid-column text-align="left" :width="6">
        <sui-tab>
          <sui-tab-pane title="登录" style="height: 50vh">
            <sui-form>
              <sui-form-field>
                <label>用户名</label>

                <sui-input v-model="signInPostData.username" placeholder="用户名"/>

              </sui-form-field>
              <sui-form-field>
                <label>密码</label>
                <sui-input v-model="signInPostData.password" placeholder="密码"/>
              </sui-form-field>
              <sui-button size="huge" fluid positive  @click="signIn">
                登录
              </sui-button>
              <a href="#"> 忘记密码</a>
            </sui-form>
          </sui-tab-pane>
          <sui-tab-pane title="注册" style="height: 50vh">
            <sui-form>
              <sui-form-field>

                <label>用户名</label>

                <sui-input v-model="signUpPostData.username" placeholder="用户名"/>


              </sui-form-field>
              <sui-form-field>
                <label>邮箱</label>


                <sui-input v-model="signUpPostData.email" placeholder="邮箱"/>

              </sui-form-field>
              <sui-form-field>
                <label>密码</label>


                <sui-input v-model="signUpPostData.password1" placeholder="密码"/>

              </sui-form-field>
              <sui-form-field>
                <label>再次输入密码</label>


                <sui-input v-model="signUpPostData.password2" placeholder="再次输入密码"/>

              </sui-form-field>
              <sui-button size="huge" fluid primary @click="signUp">注册</sui-button>
            </sui-form>

          </sui-tab-pane>

        </sui-tab>

      </sui-grid-column>

    </sui-grid>


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
        signUpPostData: {
          username: "",
          email: "",
          password1: "",
          password2: ""
        },
        signInPostData: {
          username: "jairoguo",
          password: "guojinru19990112",

        }
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      ...mapActions('account', {
        logIn: ACCOUNT.GO_LOG_IN
      }),
      signIn() {
        this.logIn(this.signInPostData)
        this.$router.push('/')
      },
      signUp() {
        this.$api.account.signUp(this.signUpPostData).then(()=>{
          this.$message.success('注册成功, 请注意查收邮件进行激活')
          this.$router.push('/')

        })

      }
    },
    filter: {},
    watch: {},

  }
</script>
<style>
</style>
