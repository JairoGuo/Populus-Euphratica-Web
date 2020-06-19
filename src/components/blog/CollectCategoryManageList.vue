<template>
  <div>
    <sui-item-group divided>
      <sui-item v-for="i in collectCategory" :key="i.id">
        <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
        <sui-item-content>

          <router-link
            is="sui-header"
            :to="{name: 'CollectManage', params: {
                  id: i.id,
                  username: $route.params.username,
                  collectCategory: i.name,
                  collectCategoryDescription: i.description,

                }}">
            {{i.name}}
            <sui-label style="margin-left: 10px" basic circular size="mini">{{i.collect_num}}</sui-label>
          </router-link>

          <sui-item-content>
            {{i.description}}
          </sui-item-content>
          <sui-item-extra class="ui end floated">
            <a class="ui  right floated" style="color: #ca0c16" @click="deleteCollectCategory(i.id)">删除</a>
            <a class="ui  right floated" style="color: #349edf" @click="editCollectCategory(i)">编辑</a>
          </sui-item-extra>
        </sui-item-content>
      </sui-item>

    </sui-item-group>


    <modal-base v-model="editCollectCategoryVisable" @onConfirm="editConfirm()" title="编辑收藏夹" size="tiny">
      <template v-slot:content>
        <sui-form>
          <sui-form-field>
            <label>名称</label>
            <input v-model="collectCategoryData.name" placeholder="名称"/>
          </sui-form-field>
          <sui-form-field>
            <label>介绍</label>
            <textarea v-model="collectCategoryData.description" placeholder="介绍"/>
          </sui-form-field>
          <sui-form-fields inline>
            <label>收藏夹类型:</label>
            <sui-form-field>
              <sui-checkbox radio v-model="collectCategoryData.type" label="公开" value="Public"/>
            </sui-form-field>
            <sui-form-field>
              <sui-checkbox radio v-model="collectCategoryData.type" label="私密" value="Private"/>
            </sui-form-field>

          </sui-form-fields>

        </sui-form>

      </template>

    </modal-base>

    <!--    <sui-modal v-model="editCollectCategoryVisable" size="tiny">-->
    <!--      <sui-modal-header>编辑收藏夹</sui-modal-header>-->
    <!--      <sui-modal-content>-->

    <!--        <sui-modal-description>-->
    <!--          <sui-form>-->
    <!--            <sui-form-field>-->
    <!--              <label>名称</label>-->
    <!--              <input v-model="collectCategoryData.name" placeholder="名称" />-->
    <!--            </sui-form-field>-->
    <!--            <sui-form-field>-->
    <!--              <label>介绍</label>-->
    <!--              <textarea v-model="collectCategoryData.description" placeholder="介绍" />-->
    <!--            </sui-form-field>-->
    <!--            <sui-form-fields inline>-->
    <!--              <label>收藏夹类型:</label>-->
    <!--              <sui-form-field>-->
    <!--                <sui-checkbox radio v-model="collectCategoryData.type" label="公开" value="Public"/>-->
    <!--              </sui-form-field>-->
    <!--              <sui-form-field>-->
    <!--                <sui-checkbox radio v-model="collectCategoryData.type" label="私密" value="Private"/>-->
    <!--              </sui-form-field>-->

    <!--            </sui-form-fields>-->

    <!--          </sui-form>-->
    <!--        </sui-modal-description>-->
    <!--      </sui-modal-content>-->
    <!--      <sui-modal-actions>-->
    <!--        <sui-button @click.native="switchAdd">-->
    <!--          返回-->
    <!--        </sui-button>-->
    <!--        <sui-button @click.native="toggle()">-->
    <!--          取消-->
    <!--        </sui-button>-->
    <!--        <sui-button positive @click.native="createCollectCategory">-->
    <!--          创建-->
    <!--        </sui-button>-->
    <!--      </sui-modal-actions>-->
    <!--    </sui-modal>-->


    <message-modal
      title="警告"
      header="是否删除该收藏夹？"
      @onConfirm="confirm"
      content="删除后不可撤销"
      v-model="messageVisable"
      size="mini"/>


  </div>
</template>

<script>
  import MessageModal from "../common/MessageModal";
  import ModalBase from "../common/ModalBase";

  export default {
    name: "CollectCategoryManageList",
    components: {
      ModalBase,
      MessageModal
    },
    model: {
      prop: 'collectCategory',
      event: 'input'
    },
    props: {
      collectCategory: {
        type: Array,
      }
    },
    data() {
      return {
        messageVisable: false,
        editCollectCategoryVisable: false,
        collectCategoryId: '',
        collectCategoryData: {}
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      messageOpen() {
        this.messageVisable = true
      },

      confirm() {
        console.log('confirmEvent()')
        this.$api.blog.deleteCollectCategory(this.collectCategoryId).then(() => {
          this.$message.success('删除收藏夹成功')
          this.collectCategory.splice(this.collectCategory.findIndex(item => item.id === this.collectCategoryId), 1)
        })
      },
      editConfirm() {
        this.$api.blog.updateCollectCategory(this.collectCategoryId, this.collectCategoryData).then((res) => {
          this.$message.success('更新收藏夹成功')
          this.collectCategory.splice(
            this.collectCategory.findIndex(item => item.id === this.collectCategoryId),
            1, res.data)
        })
      },

      deleteCollectCategory(collectCategoryId) {
        this.collectCategoryId = collectCategoryId
        this.messageVisable = true
      },
      editCollectCategory(collectCategory) {
        this.collectCategoryData = collectCategory
        this.collectCategoryId = collectCategory.id
        this.editCollectCategoryVisable = true

      }

    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
