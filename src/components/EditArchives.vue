<template>



    <sui-card-content style="background-color: #FCF8E3;">
      <sui-form align="left">


        <sui-form-field>
          <label>介绍</label>
          <textarea rows="5" v-model="archives.introduction" ></textarea>
        </sui-form-field>

        <sui-form-fields fields="two">
          <sui-form-field>
            <label>昵称</label>
            <input type="text" v-model="archives.nickname" placeholder="昵称"/>
          </sui-form-field>
          <sui-form-field>
            <label>个人主页</label>
            <input type="text" v-model="archives.website" placeholder="个人主页"/>
          </sui-form-field>
        </sui-form-fields>

        <sui-form-fields fields="two">
          <sui-form-field>
            <label>真实姓名</label>
            <input type="text" v-model="archives.name" placeholder="姓名"/>
          </sui-form-field>
          <sui-form-field>
            <label>学历</label>
            <input type="text" v-model="archives.education" placeholder="学历"/>
          </sui-form-field>
        </sui-form-fields>

        <sui-form-fields fields="two">
          <sui-form-field>
            <label>邮箱</label>
            <input type="text" placeholder="邮箱"/>
          </sui-form-field>

        </sui-form-fields>

        <sui-form-fields fields="two">
          <sui-form-field>
            <label>生日</label>
            <input type="text" v-model="archives.birthday" placeholder="生日"/>
          </sui-form-field>

        </sui-form-fields>

        <sui-form-fields fields="two">
          <sui-form-field>
            <label>性别</label>
            <select placeholder="性别" v-model="archives.sex">
              <option value="P">不公开</option>
              <option value="M">男</option>
              <option value="F">女</option>
            </select>
          </sui-form-field>

        </sui-form-fields>

        <sui-button @click="setEditStatus(editType.Archives)" floated="right">取消</sui-button>
        <sui-button @click="submitArchives()" type="submit" color="green" floated="right">保存</sui-button>
      </sui-form>

    </sui-card-content>


</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {ACCOUNT} from "@/store/mutation-types"

  export default {
    name: "EditArchives",
    data() {
      return {
        archives: {
          introduction: this.$store.state.users.introduction,
          nickname: this.$store.state.users.nickname,
          website: this.$store.state.users.website,
          name: this.$store.state.users.name,
          education: this.$store.state.users.education,
          birthday: this.$store.state.users.birthday,
          sex: this.$store.state.users.sex
        }
      }
    },
    computed: {
      ...mapState('account', ['editType'])
    },
    methods: {

      ...mapMutations('account', {'setEditStatus': ACCOUNT.SET_USERINFO_EDIT_STATUS}),

      submitArchives() {

        this.axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.axios.patch("/api/users/" + this.$store.state.users.username + "/",
          this.archives).then(response => {
          console.log(response)
          console.log('suss')

          this.axios.get("/api/users/me/").then(response => {
            this.$store.commit("setUsers", response.data)
            console.log(this.$store.state.users)
          })

          this.$store.commit('switchEditArchives')

        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
