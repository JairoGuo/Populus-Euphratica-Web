<template>
  <sui-card-content style="background-color: #FCF8E3;">

    <sui-form>
      <sui-form-field>
        <sui-dropdown
          multiple
          fluid
          :options="skills"
          placeholder="技能"
          search
          selection
          allow-additions
          v-model="current"

        />


      </sui-form-field>


      <sui-button @click="setEditStatus(editType.Skill)" floated="right">取消</sui-button>
      <sui-button type="submit" @click="submit()" color="green" floated="right">保存</sui-button>
    </sui-form>


  </sui-card-content>
</template>

<script>
// todo: 待定改造
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {ACCOUNT} from "@/store/types";
  export default {
    name: "EditSkill",
    data() {
      return {
        current: this.$store.state.users.skill.split(','),

        skill: "",

        skills: [
          {key: 'angular', text: 'Angular', value: 'angular'},
          {key: 'css', text: 'CSS', value: 'css'},
          {key: 'design', text: 'Graphic Design', value: 'design'},
          {key: 'ember', text: 'Ember', value: 'ember'},
          {key: 'html', text: 'HTML', value: 'html'},
          {key: 'ia', text: 'Information Architecture', value: 'ia'},
          {key: 'javascript', text: 'Javascript', value: 'javascript'},
          {key: 'mech', text: 'Mechanical Engineering', value: 'mech'},
          {key: 'meteor', text: 'Meteor', value: 'meteor'},
          {key: 'node', text: 'NodeJS', value: 'node'},
          {key: 'plumbing', text: 'Plumbing', value: 'plumbing'},
          {key: 'python', text: 'Python', value: 'python'},
          {key: 'rails', text: 'Rails', value: 'rails'},
          {key: 'react', text: 'React', value: 'react'},
          {key: 'repair', text: 'Kitchen Repair', value: 'repair'},
          {key: 'ruby', text: 'Ruby', value: 'ruby'},
          {key: 'ui', text: 'UI Design', value: 'ui'},
          {key: 'ux', text: 'User Experience', value: 'ux'},
        ],
      };
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
      ...mapMutations('account', {
        setEditStatus: ACCOUNT.SET_USERINFO_EDIT_STATUS,
      }),
      ...mapActions('account', {
        updateUserInfo: ACCOUNT.GO_UPDATE_USERINFO
      }),
      init() {
        this.skill = this.userInfo.skill
    },
      submit() {

        this.updateUserInfo({"skill": this.current.join(',')})
        this.setEditStatus(this.editType.Skill)
      }
    }
  }
</script>

<style scoped>

</style>
