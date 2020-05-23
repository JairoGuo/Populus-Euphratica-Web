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
      <sui-button type="submit" @click="submitSkill()" color="green" floated="right">保存</sui-button>
    </sui-form>


  </sui-card-content>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {ACCOUNT} from "@/store/mutation-types";
  export default {
    name: "EditSkill",
    data() {
      return {
        current: this.$store.state.users.skill.split(','),

        skill: "A,B,C",
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
      ...mapState('account', ['editType'])
    },
    methods: {
      ...mapMutations('account', {'setEditStatus': ACCOUNT.SET_USERINFO_EDIT_STATUS}),

      submitSkill() {


        this.axios.defaults.headers.post['Content-Type'] = 'application/json';

        this.axios.patch("/api/users/" + this.$store.state.users.username + "/",
          {"skill": this.current.join(',')}).then(response => {
          console.log(response)
          console.log('suss')
          this.axios.get("/api/users/me/").then(response => {
            this.$store.commit("setUsers", response.data)
            console.log(this.$store.state.users)
          })
          this.$store.commit("switchEditSkill")
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
