<template>
  <div>
    <sui-container>
      <sui-grid align="left">

        <sui-grid-column :width="11">
          <sui-header>{{categoryFollowName}}</sui-header>
          <sui-divider></sui-divider>
          <sui-item-group>
            <sui-item v-for="i in categoryFollowArticles" :key="i.id">

              <sui-item-content>
                <sui-item-header>
                  <router-link target="_blank"
                               :to="{name: 'BlogView', params: { id: i.article_id }}"
                               style="color: #212121">
                    {{i.title}}
                  </router-link>
                </sui-item-header>

                <sui-item-description>
                  <p>
                    <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article_id }}"
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
              <router-link target="_blank" :to="{name: 'BlogView', params: { id: i.article_id }}" style="color: #888">
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
    name: "CategoryFollowView",
    components: {},
    props: {},
    data() {
      return {
        categoryFollowArticles: [],
        categoryFollowName: '',
        page: 1,
        end: false,
        top: true,
        next: null,
        previous: null,
      }
    },
    computed: {},
    async created() {
       await this.$api.blog.getCategoryFollow(this.$route.params.id).then(res => {
        this.categoryFollowName = res.data.category_name
        this.categoryFollowCategoryId = res.data.category
      })
      await this.getCategoryFollowArticles()
    },
    mounted() {
    },
    methods: {
      changePage(flag) {
        if (flag) {
          this.page += 1
          this.getCategoryFollowArticles()

        } else {
          this.page -= 1
          this.getCategoryFollowArticles()

        }
      },
      getCategoryFollowArticles() {
        this.$loading.show();

        this.$api.blog.getArticleParamList({
          category: this.categoryFollowCategoryId,
          page: this.page,
          status: 'P'
        }).then((res) => {
          this.categoryFollowArticles = res.data.results
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
