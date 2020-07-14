<template>
  <sui-container class="ui left aligned">
    <sui-grid>
      <sui-grid-column :width="5">
        <sui-menu inverted vertical fluid divided>



          <sui-menu-item link>
            <sui-image size="mini" floated="left" avatar :src="require('@/assets/images/default-avatar.png')"/>

            <div style="float: right; color: #d9d9d9">
              just now
            </div>
            <sui-menu-header>Rachel</sui-menu-header>

            <div>
              [在线]
            </div>
          </sui-menu-item>

        </sui-menu>
      </sui-grid-column>
      <sui-grid-column :width="11">
        <sui-header>Rachel</sui-header>
        <sui-divider></sui-divider>

        <div style="height: 350px; width: 100%; overflow-y:auto">

          <sui-list>
            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>
            <br>

            <sui-list-item>
              <sui-list-content align="left">
                <sui-image floated="left" avatar :src="require('@/assets/images/default-avatar.png')"/>
                <sui-label color="blue" size="large" pointing="left">
                  Your password must be 6 characters or more
                </sui-label>
              </sui-list-content>
            </sui-list-item>
            <br>
            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>
            <br>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>
            <br>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>
            <br>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>
            <br>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>
            <br>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>
            <br>

            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>
            <br>


            <sui-list-item>
              <sui-list-content align="right">
                <sui-label color="red" size="large" pointing="right">
                  Your password must be 6 characters or more
                </sui-label>
                <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
              </sui-list-content>
            </sui-list-item>


          </sui-list>

        </div>

        <sui-divider></sui-divider>

        <sui-form>
          <sui-form-fields inline>
            <sui-icon name="edit"></sui-icon>
            <sui-icon name="edit"></sui-icon>
            <sui-icon name="edit"></sui-icon>

          </sui-form-fields>
          <sui-form-field>
            <textarea v-model="messageData.message" placeholder="输入发送内容..." ></textarea>
          </sui-form-field>
          <sui-button primary>发送</sui-button>
        </sui-form>

      </sui-grid-column>
    </sui-grid>
  </sui-container>
</template>

<script>
  export default {
    name: "MessageList",
    components: {},
    props: {},
    data() {return {
      messageData: {
        receiver: '',
        message: ''
      }
    }},
    computed: {},
    created() {},
    mounted() {},
    methods: {
      send_message() {
        this.$api.chat.sendMessage(this.messageData).then({

        })

      }
    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
