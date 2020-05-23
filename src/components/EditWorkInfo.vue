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
      <sui-button @click="submitWorkInfo()" type="submit" color="green" floated="right">保存</sui-button>
    </sui-form>


  </sui-card-content>

</template>

<script>
  import {mapMutations, mapState} from "vuex";
  import {ACCOUNT} from "@/store/mutation-types";

  export default {
    name: "EditWorkInfo",
    data() {
      return {
        workinfos: {
          company: this.$store.state.users.company,
          position: this.$store.state.users.position,
          industry: this.$store.state.users.industry
        }
      }
    },
      computed: {
      ...mapState('account', ['editType'])
    },
    methods: {
      ...mapMutations('account', {'setEditStatus': ACCOUNT.SET_USERINFO_EDIT_STATUS}),


      submitWorkInfo() {
        this.axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.axios.patch("/api/users/" + this.$store.state.users.username + "/",
          this.workinfos).then(response => {
          console.log(response)
          console.log('suss')

          this.axios.get("/api/users/me/").then(response => {
            this.$store.commit("setUsers", response.data)
            console.log(this.$store.state.users)
          })

          this.$store.commit('switchWorkInfo')

        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
