<template>
  <sui-card-content style="background-color: #FCF8E3;">

    <sui-form align="left">
      <sui-form-field>
        <label>公司</label>
        <input type="text" v-model="workinfos.company" placeholder="公司"/>
      </sui-form-field>

      <sui-form-field>
        <label>职位</label>
        <input type="text" v-model="workinfos.position" placeholder="职位"/>
      </sui-form-field>

      <sui-form-field>
        <label>行业</label>
        <input type="text" v-model="workinfos.industry" placeholder="行业"/>
      </sui-form-field>
      <sui-button @click="setEditStatus(editType.WorkInfo)" floated="right">取消</sui-button>
      <sui-button @click="submit()" type="submit" color="green" floated="right">保存</sui-button>
    </sui-form>
  </sui-card-content>

</template>

<script>
  import {mapMutations, mapState, mapActions} from "vuex";
  import {ACCOUNT} from "@/store/types";

  export default {
    name: "EditWorkInfo",
    data() {
      return {
        workinfos: {
          company: '',
          position: '',
          industry: ''
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
        this.workinfos.company = this.userInfo.company;
        this.workinfos.position = this.userInfo.position
        this.workinfos.industry = this.userInfo.industry
      },
      submit() {
        this.updateUserInfo(this.workinfos)
        this.setEditStatus(this.editType.WorkInfo)
      }
    }
  };
</script>

<style scoped>

</style>
