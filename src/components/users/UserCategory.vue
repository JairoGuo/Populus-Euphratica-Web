<template>
  <sui-container class="ui left aligned">
    <sui-item-group divided>
      <sui-item v-for="i in categorys" :key="i.id">
        <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
        <sui-item-content>


          <router-link
            is="sui-header"
            :to="{name: 'Blog', params: {username: $route.params.username, category: i.id} }">
            {{i.name}}
          </router-link>


          <sui-item-content>
            {{i.summary}}
          </sui-item-content>
        </sui-item-content>
      </sui-item>

    </sui-item-group>

  </sui-container>
</template>

<script>
  import {mapState} from "vuex";
  import {ACCOUNT} from "../../store/types";

  export default {
    name: "UserCategory",
    components: {},
    props: {},
    data() {
      return {
        categorys: [],

      }
    },
    computed: {
      ...mapState('account', {
        username: ACCOUNT.CURRENT_USERNAME,
      }),
    },
    created() {
      this.getCategorys()
    },
    mounted() {
    },
    methods: {
      getCategorys() {
        this.$loading.show();

        this.$api.blog.getCategorys({username: this.username}).then((res)=> {
          this.categorys = res.data
          this.$loading.hide()

          // const category = res.data
          // for (let i in category) {
          //   this.categorys.push({text: category[i].name, value: category[i].id})
          // }
        })
      },
    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
