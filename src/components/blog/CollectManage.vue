<template>
  <div>
    <sui-container>

      <router-link
        is="sui-header"
        :to="{name: 'CollectCategoryManage'}">
        <div><sui-icon name="angle left"></sui-icon>返回我的收藏夹列表</div>
      </router-link>


      <sui-divider></sui-divider>


      <h4 is="sui-header">{{$route.params.collectCategory}}</h4>
      <div>
        {{$route.params.collectCategoryDescription}}
      </div>

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
              <a class="ui  right floated" style="color: #ca0c16" @click="deleteCollect(i.id)">删除</a>

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


    </sui-container>
    <sui-modal v-model="open" size="mini">
      <sui-modal-header>警告</sui-modal-header>
      <sui-modal-content>

        <sui-modal-description>
          <sui-header>是否从改收藏夹移除此文章？</sui-header>
          <p>
            删除后不可撤销
          </p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="cancel">
          取消
        </sui-button>
        <sui-button negative @click.native="confirm">
          确认删除
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

  </div>


</template>

<script>
  // import {mapState} from "vuex";
  // import moment from "moment";
  // import {ACCOUNT} from "../../store/types";
  import filters from "../../filters";

  export default {
    name: "CollectManage",
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
        open: false,
        collectId: '',

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
      },
      deleteCollect(collectId) {
        this.toggle()
        this.collectId = collectId

      },
      toggle() {
        this.open = !this.open
      },
      confirm() {

        // this.articles = this.articles.filter((item) => item.article_id !== this.articleId)
        this.$api.blog.deleteCollect(this.collectId).then(() => {

          this.$message.success('删除成功')
        })

        this.collects.splice(this.collects.findIndex(item => item.article_id === this.collectId), 1)
        // this.articles.pop({'article_id': this.articleId})
        this.toggle()
      },
      cancel() {
        this.toggle()
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
