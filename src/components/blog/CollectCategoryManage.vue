<template>

  <div>
    <sui-tab active-index="0" @change="handleChange">
      <sui-tab-pane :label="userInfo.collect_category_by_all.toString()" icon="users" title="全部">
        <collect-category-manage-list v-model="collectCategory"></collect-category-manage-list>

      </sui-tab-pane>
      <sui-tab-pane :label="userInfo.collect_category_by_public.toString()" title="公开">
        <collect-category-manage-list v-model="collectCategory"></collect-category-manage-list>
      </sui-tab-pane>
      <sui-tab-pane icon="check" :label="userInfo.collect_category_by_private.toString()" title="私密">
        <collect-category-manage-list v-model="collectCategory"></collect-category-manage-list>


      </sui-tab-pane>
    </sui-tab>


  </div>


</template>

<script>
  import {mapState} from "vuex";
  import {ACCOUNT} from "../../store/types";
  import CollectCategoryManageList from "./CollectCategoryManageList";

  export default {
    name: "CollectCategoryManage",
    components: { CollectCategoryManageList},
    props: {},
    data() {
      return {
        collectCategory: [],
        editCollectCategoryOpen: false,
        collectCategoryData: {
          // name: '',
          // description: '',
          // type: 'Public'
        },
        table: {
          inside: null,
          index: null,
          name: null,
        },
        collectCategoryId: ''

      }
    },
    computed: {
      ...mapState('account', {
        userInfo: ACCOUNT.USER_INFO,
        username: ACCOUNT.CURRENT_USERNAME,

      }),
    },
    created() {
      this.getCollectCategory()
    },
    mounted() {
    },
    methods: {
      getCollectCategory(collectCategoryType = null) {
        this.$loading.show();
        this.$api.blog.getCollectCategory({username: this.username, type: collectCategoryType}).then((res) => {
          this.collectCategory = res.data
          this.$loading.hide()

        })
      },
      handleChange(e, activePane, index) {
        this.table.inside = !!e;
        this.table.index = +index;
        this.table.title = activePane.title;

        switch (index) {
          case 0:
            this.getCollectCategory()
            break
          case 1:
            this.getCollectCategory('Public')
            break
          case 2:
            this.getCollectCategory('Private')
            break
        }

      },
    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
