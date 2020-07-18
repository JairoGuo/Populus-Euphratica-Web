<template>
  <div>
    <sui-checkbox label="visible" v-model="visible" />

    <sui-sidebar-pushable>
      <sui-menu
        is="sui-sidebar"
        :visible="visible"
        animation="overlay"
        width="thin"
        icon="labeled"
        inverted
        vertical
      >
        <sui-menu-item to="/"> <sui-icon name="home" /> Home </sui-menu-item>
        <sui-menu-item to="/">
          <sui-icon name="gamepad" /> Games
        </sui-menu-item>
        <sui-menu-item to="/">
          <sui-icon name="camera" /> Channels
        </sui-menu-item>
      </sui-menu>

      <sui-sidebar-pusher :dimmed="visible">

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
                <sui-header>{{receiver}}</sui-header>
                <sui-divider></sui-divider>


                <div style="height: 40vh; width: 100%; overflow-y:auto">

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

                    <sui-list-item v-for="i in messages" :key="i.uuid_id">

                      <sui-list-content v-if="i.receiver === receiverId" align="right">
                        <sui-label color="red" size="large" pointing="right">
                          {{i.message}}
                        </sui-label>
                        <sui-image floated="right" avatar :src="require('@/assets/images/default-avatar.png')"/>
                      </sui-list-content>
                      <sui-list-content v-else align="left">

                        <sui-image floated="left" avatar :src="require('@/assets/images/default-avatar.png')"/>
                        <sui-label color="blue" size="large" pointing="left">
                          {{i.message}}
                        </sui-label>
                      </sui-list-content>
                      <br>
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
                    <textarea v-model="messageData.message" placeholder="输入发送内容..."></textarea>
                  </sui-form-field>
                  <sui-button @click="sendMessage" primary>发送</sui-button>
                </sui-form>

              </sui-grid-column>
            </sui-grid>
          </sui-container>

      </sui-sidebar-pusher>
    </sui-sidebar-pushable>

  </div>
</template>

<script>

  import {mapState} from "vuex";

  export default {
    name: "MessageList",
    components: {},
    props: {},
    data() {
      return {
        visible: false,
        messageData: {
          receiver: '',
          message: ''
        },
        messages: [],
        conversations: []
      }
    },
    computed: {
      ...mapState('chat', {
        receiver: 'receiver',
        receiverId: 'receiverId',
        receiverInfo: 'receiverInfo'
      })
    },
    created() {

      this.getMessages()


    },
    mounted() {
    },
    methods: {
      sendMessage() {
        this.messageData.receiver = this.receiver
        this.$api.chat.sendMessage(this.messageData).then(r => {
          this.messages.push(r.data)
          console.log(r.data)
        })

      },

      getMessages() {
        this.$api.chat.getMessages(this.receiverId).then(response => {
          console.log(response.data)
          this.messages = response.data
        })
      }
    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
