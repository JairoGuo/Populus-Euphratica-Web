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
            <input disabled="true" v-model="archives.email" type="text" placeholder="邮箱"/>
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
        <sui-button @click="submit()" type="submit" color="green" floated="right">保存</sui-button>
      </sui-form>

    </sui-card-content>


</template>

<script>
  import {mapMutations, mapState, mapActions} from 'vuex'
  import {ACCOUNT} from "@/store/types"
  // import account from "@/store/modules/account";

  export default {
    name: "EditArchives",
    data() {
      return {
        archives: {
          introduction: '',
          nickname: '',
          website: '',
          name: '',
          education: '',
          email: '',
          birthday: '',
          sex: ''
        }
      }
    },
    computed: {
      ...mapState('account', {
        editType: ACCOUNT.EDIT_TYPE,
        userInfo: ACCOUNT.USER_INFO
      })
    },
    created() {
      this.init()
    },
    methods: {
      ...mapMutations('account', {setEditStatus: ACCOUNT.SET_USERINFO_EDIT_STATUS}),
      ...mapActions('account', {
        updateUserInfo: ACCOUNT.GO_UPDATE_USERINFO
      }),
      init() {
        this.archives.introduction = this.userInfo.introduction
        this.archives.nickname = this.userInfo.nickname
        this.archives.website = this.userInfo.website
        this.archives.name = this.userInfo.name
        this.archives.email = this.userInfo.email
        this.archives.education = this.userInfo.education
        this.archives.birthday = this.userInfo.birthday
        this.archives.sex = this.userInfo.sex
      },
      submit() {

        this.updateUserInfo(this.archives)
        this.setEditStatus(this.editType.Archives)

      }
    }
  }
</script>

<style scoped>

</style>
