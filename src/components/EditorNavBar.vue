<template>
  <div class="ui inverted segment menu fixed top">
    <sui-menu pointing secondary inverted fluid>

      <router-link
        is="sui-menu-item"
        icon="reply"
        content="返回"
        to="/"
      />

      <sui-menu-menu position="right">

        <div is="sui-button-group">
          <sui-button>保存草稿</sui-button>
          <sui-button-or/>
          <sui-button positive @click.native="toggle">发表</sui-button>
        </div>
        <sui-modal v-model="open">
          <sui-modal-header>发表</sui-modal-header>
          <sui-modal-content>

            <sui-modal-description>
              <sui-header>Default Profile Image</sui-header>
              <sui-form>

                <sui-form-field>
                  <label>分类</label>
                  <sui-dropdown
                    placeholder="分类"
                    selection
                    :options="skills"
                    v-model="current"
                  />
                </sui-form-field>
                <sui-form-field>
                  <label>标签</label>

                  <sui-dropdown
                    multiple
                    fluid
                    :options="skills"
                    placeholder="技能"
                    search
                    selection
                    allow-additions
                    v-model="current"

                  />


                </sui-form-field>


                <sui-form-fields  inline>
                  <label>文章类型:</label>
                  <sui-form-field>
                    <sui-checkbox radio v-model="type" label="原创" value="Original"/>
                  </sui-form-field>
                  <sui-form-field >
                    <sui-checkbox radio v-model="type" label="转载" value="Reprint"/>
                  </sui-form-field>
                  <sui-form-field >
                    <sui-checkbox radio v-model="type" label="翻译" value="Translation"/>
                  </sui-form-field>

                </sui-form-fields>


              </sui-form>
              <p>Is it okay to use this photo?</p>
            </sui-modal-description>
          </sui-modal-content>

          <sui-modal-actions>
            <sui-button positive @click.native="postFormData()">
              发表
            </sui-button>
          </sui-modal-actions>
        </sui-modal>

      </sui-menu-menu>


    </sui-menu>

  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    name: "EditorNavBar",
    data() {

      return {
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
        current: '',
        type: "Original"


      }

    },
    props: {
      postData: {
        type: Object
      },
      upload: {
        type: Function
      }
    },

    methods: {
      toggle() {
        this.open = !this.open;
      },
      async postFormData() {
        console.log(this.postData)
        await this.upload();
        this.postData.status = 'P'
        await this.axios.post('api/blog/', this.postData).then((res) => {
          console.log(res)
        })

        this.toggle()
      },


    }
  }
</script>

<style scoped>

</style>
