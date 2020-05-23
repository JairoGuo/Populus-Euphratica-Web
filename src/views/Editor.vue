<template>
  <div>
    <EditorNavBar v-show="show" :upload="uploadimg" :post-data="article_data"/>
    <sui-container>

      <sui-form>
        <sui-form-field>
          <input v-model="article_data.title" placeholder="请输入标题"/>
        </sui-form-field>
      </sui-form>
      <sui-divider></sui-divider>
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
  import EditorNavBar from "../components/EditorNavBar";

  export default {
    name: "Editor",
    data() {
      return {
        article_data: {
          title: "",
          content: "",
          cover: "",
          type: "Original",
          status: 'D'

        },
        currentHeight: document.body.clientHeight - 200,
        img_file: {},
        show: true
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

        await this.axios({
          url: 'api/upload-image/',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then((res) => {

          /**
           * 例如：返回数据为 res = [[pos, url], [pos, url]...]
           * pos 为原图片标志（0）
           * url 为上传后图片的url地址
           */
          // // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)

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


    },
    mounted() {
      window.onresize = () => {
        return (() => {
          this.currentHeight = document.body.clientHeight - 200
        })();
      }

    },
    components: {EditorNavBar}
  }
</script>


<style scoped>

</style>
