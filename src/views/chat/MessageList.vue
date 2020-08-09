<template>
  <div>
    <sui-checkbox label="visible" v-model="visible"/>

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
        <sui-menu-item to="/">
          <sui-icon name="home"/>
          Home
        </sui-menu-item>
        <sui-menu-item to="/">
          <sui-icon name="gamepad"/>
          Games
        </sui-menu-item>
        <sui-menu-item to="/">
          <sui-icon name="camera"/>
          Channels
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


              <div style="height: 40vh; width: 100%; overflow-y: auto" ref="show_words" id="show_words">

                <sui-list style="height: 40vh; width: 100%; overflow-y:auto">

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

              <sui-form @submit.native.prevent>
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
  import ReconnectingWebSocket from 'reconnecting-websocket'
  import md5 from 'md5'
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
        conversations: [],
        webSock: null
      }
    },
    computed: {
      ...mapState('chat', {
        receiver: 'receiver',
        receiverId: 'receiverId',
        receiverInfo: 'receiverInfo'
      }),

      ...mapState('account', {

        userInfo: 'userInfo',
        username: 'loginUsername',
        userId: 'loginUserId',

      }),
    },
    created() {

      this.getMessages()
      this.initWebSocket()

      this.scrollToBottom()

    },
    mounted() {



    },
    methods: {
      sendMessage() {
        this.messageData.receiver = this.receiver
        this.$api.chat.sendMessage(this.messageData).then(r => {
          this.messages.push(r.data)
          // console.log('send:', r.data)

        })

      },

      getMessages() {
        this.$api.chat.getMessages(this.receiverId).then(response => {
          this.messages = response.data

        })

      },

      scrollToBottom() {

        this.$nextTick(function(){
          var container = this.$el.querySelector("#show_words");
          container.scrollTop = container.scrollHeight;

        })
      },

      onMessage(event) {
        const data = JSON.parse(event.data);
        console.log(data.message)
        if(data.message.sender === this.receiver){  // 发送者为当前选中的用户

          this.messages.push(data.message.message)
        }

      },


      initWebSocket(){ //初始化weosocket

        let groupName = md5([this.receiver, this.username]);

        const ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
        // const ws_path = ws_scheme + "://" + window.location.host + "/ws/" + this.receiver + "/";
        const ws_path = ws_scheme + "://127.0.0.1:8000/ws/" + groupName + "/";
        this.webSock = new ReconnectingWebSocket(ws_path);
        // this.webSock = new WebSocket(ws_path);
        this.webSock.onmessage =  this.onMessage
        // this.webSock.onmessage = function (event) {
        //   const data = JSON.parse(event.data);
        //   console.log('message: ',data)
        //   if(data.sender === this.receiver){  // 发送者为当前选中的用户
        //     console.log('message1:', data.message)
        //     // this.messages.push(data.message)
        //   }
        // };

        this.webSock.onopen = function () {
          console.log("onopen");

        }

        this.webSock.onclose = function () {
          console.log("close");

        };

      },

    },
    filters: {},
    watch: {},

  }
</script>

<style scoped>

</style>
