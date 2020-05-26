<template>
  <div>
    <p v-for="item in list" :key="item">
      Line:
      <span v-text="item"></span>
    </p>
    <!--infinite-loading这个组件要放在列表的底部，滚动的盒子里面！-->
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>

</template>



<script>
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: 'News',
    components: { InfiniteLoading,},
    props: {},
    data() {
      return {
        list: [],
      }
    },
    computed: {

    },
    created() {
    },
    mounted() {


    },
    methods: {
      load () {
        this.count += 2
        console.log(this.count)
      },
      infiniteHandler($state) {
        setTimeout(() => {
          const temp = [];
          for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
            temp.push(i);
          }
          this.list = this.list.concat(temp);
          $state.loaded();
        }, 1000);
      },
    },
    filter: {},
    watch: {},


  }
</script>

<style lang="scss" scoped>
  @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
</style>
