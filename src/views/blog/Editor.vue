<template>
  <div>
    <!--NavBar-->
    <editor-nav-bar :title="$t('nav.writeAnArticle')" v-show="show">
      <sui-menu-item>
        <div is="sui-button-group">
          <sui-button>{{$t('nav.saveDraft')}}</sui-button>
          <sui-button-or/>
          <sui-button positive @click.native="toggle">{{$t('nav.publish')}}</sui-button>
        </div>
      </sui-menu-item>



      <!--      <article-post-modal :open-status="open"></article-post-modal>-->

      <sui-modal v-model="open">
        <sui-modal-header>发表</sui-modal-header>
        <sui-modal-content>
          <sui-modal-description>
            <sui-form>

              <sui-form-fields fields="two">
                <!--文章分类-->
                <sui-form-field>
                  <label>文章分类</label>
                  <sui-dropdown
                    placeholder="分类"
                    selection
                    :options="skills"
                    v-model="article_data.category"
                  />
                </sui-form-field>
                <!--文章标签-->
                <sui-form-field>
                  <label>文章标签</label>
                  <sui-dropdown
                    multiple
                    fluid
                    :options="skills"
                    placeholder="标签"
                    search
                    selection
                    allow-additions
                    v-model="article_data.tags"
                  />
                </sui-form-field>
              </sui-form-fields>


              <sui-form-field>
                <label>文章摘要</label>
                <textarea v-model="article_data.abstract"></textarea>
              </sui-form-field>

              <sui-form-fields inline>
                <label>文章类型:</label>
                <sui-form-field>
                  <sui-checkbox @click="switchOriginalUrlStatus(false)"
                                radio
                                v-model="article_data.type"
                                label="原创"
                                value="Original"/>
                </sui-form-field>
                <sui-form-field>
                  <sui-checkbox @click="switchOriginalUrlStatus(true)"
                                radio
                                v-model="article_data.type"
                                label="转载"
                                value="Reprint"/>
                </sui-form-field>
                <sui-form-field>
                  <sui-checkbox @click="switchOriginalUrlStatus(true)"
                                radio
                                v-model="article_data.type"
                                label="翻译"
                                value="Translation"/>
                </sui-form-field>

              </sui-form-fields>

              <sui-form-field v-show="isShowOriginalUrl">
                <label>原文链接</label>
                <sui-input placeholder="文章地址" v-model="article_data.original_url"></sui-input>
              </sui-form-field>
            </sui-form>

          </sui-modal-description>
        </sui-modal-content>

        <sui-modal-actions>
          <sui-button positive @click.native="createArticcle()">
            发表
          </sui-button>
          <sui-button  @click.native="toggle">
            取消
          </sui-button>
        </sui-modal-actions>
      </sui-modal>

    </editor-nav-bar>

    <!--MainPage-->
    <sui-container>
      <sui-form>
        <sui-form-field>
          <input v-model="article_data.title" placeholder="请输入标题"/>
        </sui-form-field>
      </sui-form>
      <br>

      <mavon-editor ref=md
                    @imgAdd="$imgAdd"
                    @imgDel="$imgDel"
                    :tab-size="4"
                    :style="{height: this.show ? this.currentHeight+'px': '100%', 'z-index': 10}"
                    @fullScreen="onfullScreen()"
                    v-model="article_data.content"/>

    </sui-container>
  </div>

</template>

<script>
  import EditorNavBar from "../../components/EditorNavBar";
  // import ArticlePostModal from "@/components/blog/ArticlePostModal";

  export default {
    name: "Editor",
    data() {
      return {
        article_data: {
          title: "",
          content: "",
          category: '',
          abstract: null,
          cover: "",
          type: "Original",
          status: 'D',
          tags: [],
          original_url: ''

        },
        currentHeight: document.body.clientHeight - 180,
        img_file: {},
        show: true,
        open: false,
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
        isShowOriginalUrl: false
      }
    },
    methods: {
      $imgAdd(pos, $file) {
        // 缓存图片信息
        this.img_file[pos] = $file;
      },
      $imgDel(pos) {
        delete this.img_file[pos];
      },
      async uploadimg() {

        var formdata = new FormData();
        for (var _img in this.img_file) {
          formdata.append(_img, this.img_file[_img]);
        }

        await this.$api.upload.uploadImage(formdata).then((res)=>{
          if (res.data.imgs.length !== 0) {
            this.article_data.cover = res.data.imgs[0][1]

          }
          for (var img in res.data.imgs) {

            this.$refs.md.$img2Url(res.data.imgs[img][0], res.data.imgs[img][1]);
            // this.$refs.md.$img2Url(img[0], img[1]);
          }
        })


      },

      onfullScreen() {
        this.show = !this.show
      },
      toggle() {
        this.open = !this.open;
      },
      async createArticcle() {

        await this.uploadimg();
        this.article_data.status = 'P'
        this.$loading.show()
        await this.$api.blog.postArticle(this.article_data).then(()=>{
          this.$loading.hide()
          this.$router.push("/")
          this.$message.success('发表文章成功')


        }).catch(() => {
            this.$message.error('发表文章失败')
            this.$loading.hide()

        })

          // await this.axios.post('api/blog/', this.article_data).then((res) => {
        //   console.log(res)
        // })
        this.toggle()
      },
      async createDraftArticcle() {

        await this.uploadimg();
        this.article_data.status = 'D'
        this.$loading.show()
        await this.$api.blog.postArticle({
          title: this.article_data.title,
          content: this.article_data.content,
          article: this.article_data.article
        }).then(()=>{
          this.$loading.hide()
          this.$router.push("/")
          this.$message.success('保存草稿成功')


        }).catch(() => {
            this.$message.error('保存草稿失败')

        })

        this.toggle()
      },


      switchOriginalUrlStatus(status){
        this.isShowOriginalUrl = status
      }

    },
    mounted() {

      window.onresize = () => {
        return (() => {
          this.currentHeight = document.body.clientHeight - 180
        })();
      }

    },
    components: {
      EditorNavBar,
      // ArticlePostModal
    }
  }
</script>


<style scoped>

</style>
