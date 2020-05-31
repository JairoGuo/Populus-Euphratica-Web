<template>
  <div>
    <sui-header size="large">分类专栏</sui-header>
    <sui-header-content>
      文章专栏是面向开发者的严谨写作频道
      <sui-button floated="right" @click.native="createCategory">创建</sui-button>
    </sui-header-content>

    <sui-item-group divided>
      <sui-item  v-for="i in categorys" :key="i.id">
        <!--        <sui-item-image size="tiny" src="static/images/wireframes/image.png" />-->
        <sui-item-content v-if="i.id !== categoryItemId">
          <sui-item-header href="javascript:void(0)">
            {{i.name}}
          </sui-item-header>
          <sui-item-content>
            {{i.summary}}
          </sui-item-content>
          <sui-item-extra class="ui end floated">
            <a class="ui  right floated" style="color: #ca0c16" @click="deleteCategory(i.id)">删除</a>
            <a class="ui  right floated" style="color: #349edf" @click="togglecategoryItem(i)">编辑</a>
          </sui-item-extra>

        </sui-item-content>
        <sui-item-content v-else>
          <sui-form align="left">
            <sui-form-field>
              <label>名称</label>
              <input type="text" v-model="category.name" placeholder="昵称"/>
            </sui-form-field>
            <sui-form-field>
              <label>简介</label>
              <textarea rows="5" v-model="category.summary" ></textarea>
            </sui-form-field>

            <sui-button @click="togglecategoryItem(null)" floated="right">取消</sui-button>
            <sui-button @click="updateCategory(i.id)" color="green" floated="right">保存</sui-button>
          </sui-form>

        </sui-item-content>
      </sui-item>

    </sui-item-group>

    <sui-modal v-model="open" size="tiny">
      <sui-modal-header>创建分类专栏</sui-modal-header>
      <sui-modal-content>

        <sui-modal-description>
          <sui-form>
            <sui-form-field>
              <label>名称</label>
              <input v-model="category.name" placeholder="名称" />
            </sui-form-field>
            <sui-form-field>
              <label>介绍</label>
              <textarea v-model="category.summary" placeholder="介绍" />
            </sui-form-field>

          </sui-form>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="toggle()">
          取消
        </sui-button>
        <sui-button positive @click.native="confirmCreate">
          创建
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <sui-modal v-model="isDelete" size="mini">
      <sui-modal-header>警告</sui-modal-header>
      <sui-modal-content>

        <sui-modal-description>
          <sui-header>是否删除该分类？</sui-header>
          <p>
            删除后不可撤销
          </p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="toggleDelete">
          取消
        </sui-button>
        <sui-button negative @click.native="confirmDelete">
          确认删除
        </sui-button>
      </sui-modal-actions>
    </sui-modal>


  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {ACCOUNT} from "@/store/types";

  export default {
    name: "CategoryManage",
    components: {},
    props: {},
    data() {
      return {
        categorys: [],
        open: false,
        isDelete: false,
        categoryId: null,
        category: {
          name: '',
          summary: ''

        },
        categoryItemId: null,
      }
    },
    computed: {
      ...mapState('account', {userInfo: ACCOUNT.USER_INFO,})
    },
    created() {

      this.$api.blog.getCategory().then((res)=> {
        this.categorys = res.data
        // const category = res.data
        // for (let i in category) {
        //   this.categorys.push({text: category[i].name, value: category[i].id})
        // }
      })
    },
    mounted() {
    },
    methods: {
      toggle() {
        this.open = !this.open
      },
      togglecategoryItem(categoryItem) {
        if (categoryItem === null) {
          this.category.name = ''
          this.category.summary = ''
          this.categoryItemId = null
        } else {

          this.category.name = categoryItem.name;
          this.category.summary = categoryItem.summary
          this.categoryItemId = categoryItem.id
        }

      },
      toggleDelete() {
        this.isDelete = !this.isDelete
      },
      deleteCategory(categoryId) {
        this.categoryId = categoryId
        this.toggleDelete()

      },
      createCategory() {
        this.toggle()
      },
      updateCategory(categoryId) {
        this.$api.blog.updateCategory(categoryId, this.category).then((res) => {
          this.categorys.splice(this.categorys.findIndex(item => item.id === categoryId), 1, res.data)
          this.$message.success('更新分类成功')
          this.categoryItemId = null
          this.category.name = ''
          this.category.summary = ''

        }).catch(()=>{
          this.$message.success('更新分类失败')

        })
      },
      confirmCreate() {

        this.$api.blog.createCategory(this.category).then((res) => {
          this.categorys.push(res.data)
          this.$message.success('创建分类成功')
          this.category.name = ''
          this.category.summary = ''


        }).catch(()=>{
          this.$message.success('创建分类失败')

        })

        this.toggle()
      },
      confirmDelete() {
        this.$api.blog.deleteCategory(this.categoryId).then(()=>{
          this.$message.success('删除成功')
          this.categorys.splice(this.categorys.findIndex(item => item.id === this.categoryId), 1)
        }).catch(()=> {
          this.$message.error('删除失败')

        })
        this.toggleDelete()


      }
    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
