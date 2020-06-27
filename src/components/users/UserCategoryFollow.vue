<template>
  <sui-container class="ui left aligned">
    <sui-item-group divided>
      <sui-item  v-for="i in categoryFollow" :key="i.id">
        <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
        <sui-item-content>


          <router-link
            is="sui-header"
            :to="{name: 'CategoryFollowView', params: {username: $route.params.username, id: i.id} }">
            {{i.category_name}}
          </router-link>


          <sui-item-content>
            {{i.category_summary}}
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
        name: "UserCategoryFollow",
      components: {},
      props: {},
      data() {return {
        categoryFollow: [],

      }},
      computed: {
        ...mapState('account', {
          username: ACCOUNT.CURRENT_USERNAME,
        }),
      },
      created() {
          this.getCategoryFollow()
      },
      mounted() {},
      methods: {
        getCategoryFollow() {
          this.$loading.show();
          this.$api.blog.getCategoryFollows({username: this.username}).then((res) => {
            this.categoryFollow = res.data
            this.$loading.hide()

          })
        }
      },
      filters: {},
      watch: {},

    }
</script>

<style scoped>

</style>
