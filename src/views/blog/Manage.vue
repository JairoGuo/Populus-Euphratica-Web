<template>

  <sui-container align="left">
    <sui-grid>
      <sui-grid-column :width="3">
        <div class="ui secondary vertical menu fluid ">

          <router-link
            is="sui-menu-item"
            :to="{name: 'ArticlesManage'}"
            :active="isActive('文章管理')"
            content="文章管理"
            @click.native="select('文章管理')"
          />
          <router-link
            is="sui-menu-item"
            :to="{name: 'CategoryManage'}"
            :active="isActive('分类专栏')"
            content="分类专栏"
            @click.native="select('分类专栏')"
          />

        </div>

      </sui-grid-column>
      <sui-grid-column :width="13">
        <!--        <articles-manage></articles-manage>-->
        <router-view></router-view>
      </sui-grid-column>


    </sui-grid>


  </sui-container>

</template>

<script>

  export default {
    name: "Manage",
    components: {
      // ArticlesManage
    },
    props: {},
    data() {
      return {
        active: '文章管理',
      }
    },
    computed: {},
    created() {

    },
    mounted() {
    },
    methods: {
      isActive(name) {
        return this.active === name;
      },
      select(name) {
        this.active = name;
      },
    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
