<template>
  <sui-container class="ui left aligned">
    <sui-item-group divided>
      <sui-item v-for="i in collectCategory" :key="i.id">
        <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
        <sui-item-content>

          <router-link
            is="sui-header"
            :to="{name: 'BlogCollectView', params: {username: $route.params.username, id: i.id, collectCategory: i.name} }">
            {{i.name}}
            <sui-label
              style="margin-left: 10px"
              circular
              color="green"
              size="mini">
              {{i.collect_num}}
            </sui-label>
          </router-link>



          <sui-item-content>
            {{i.description}}
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
    name: "UserCollect",
    components: {},
    props: {},
    data() {
      return {
        collectCategory: [],

      }
    },
    computed: {
      ...mapState('account', {
        username: ACCOUNT.CURRENT_USERNAME,
      }),
    },
    created() {
      this.getCollectCategory()
    },
    mounted() {
    },
    methods: {
      getCollectCategory() {
        this.$loading.show();
        this.$api.blog.getCollectCategorys({username: this.username}).then((res) => {
          this.collectCategory = res.data
          this.$loading.hide()

        })
      },

    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
