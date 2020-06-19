<template>
  <div>
    <sui-container>
      <sui-grid align="left">

        <sui-grid-column :width="11">
          <sui-header>{{$route.params.collectCategory}}</sui-header>
          <sui-divider></sui-divider>
          <sui-item-group>
            <sui-item v-for="i in collects" :key="i.id">

              <sui-item-content>
                <sui-item-header>
                  <router-link target="_blank"
                               :to="{name: 'BlogView', params: { id: i.article }}"
                               style="color: #212121">
                    {{i.title}}
                  </router-link>
                </sui-item-header>

                <sui-item-description>
                  <p>
                    <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article }}"
                                 style="color: #888"
                    >
                      {{i.abstract | wordLimit}}
                    </router-link>
                    <!--                    {{ i| setAbstract }}-->
                  </p>
                </sui-item-description>
                <sui-item-extra class="ui end floated">

                  <span>{{i.created_at | changeTime}}</span>

                </sui-item-extra>
              </sui-item-content>
              <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article }}" style="color: #888">
                <sui-item-image class="cover-img"
                                :style="{'background-image': 'url('+ i.cover +')',
                                width: '180px',
                                height: '120px',
                                marginLeft: '20px'}"
                                v-if="i.cover" src=""/>
              </router-link>


            </sui-item>
          </sui-item-group>

          <sui-menu secondary>
            <sui-menu-item>
              <sui-button content="上一页" :disabled="top" @click="changePage(false)" icon="left arrow"
                          label-position="left"/>
            </sui-menu-item>
            <sui-menu-menu position="right">
              <sui-menu-item>
                <sui-button content="下一页" :disabled="end" @click="changePage(true)" icon="right arrow"
                            label-position="right"/>

              </sui-menu-item>
            </sui-menu-menu>
          </sui-menu>

        </sui-grid-column>
        <sui-grid-column :width="5" floated="right">

          <sui-card class="ui fluid">

            <sui-card-content>

              <sui-card-header>1</sui-card-header>

            </sui-card-content>

            <sui-card-content style="height: 150px; overflow: auto; resize: none; white-space:pre">

              2
            </sui-card-content>
          </sui-card>
        </sui-grid-column>
      </sui-grid>
    </sui-container>

  </div>
</template>

<script>
  import filters from "../../filters";
  export default {
    name: "BlogCollectView",
    components: {},
    props: {},
    data() {
      return {
        collects: [],
        page: 1,
        end: false,
        top: true,
        next: null,
        previous: null,
      }
    },
    computed: {},
    created() {
      this.getCollects()
    },
    mounted() {
    },
    methods: {
      changePage(flag) {
        if (flag) {
          this.page += 1
          this.getCollects()

        } else {
          this.page -= 1
          this.getCollects()

        }
      },
      getCollects() {
        this.$loading.show();

        this.$api.blog.getClollects({
          collectcategory: this.$route.params.id,
          page: this.page,
        }).then((res) => {
          this.collects = res.data.results
          this.top = res.data.previous === null
          this.end = res.data.next === null
          this.$loading.hide()

        })
      }
    },
    filters: {
      ...filters
    },
    watch: {},

  }
</script>

<style scoped>

</style>
