<template>
  <sui-container>
    <sui-grid>

      <sui-grid-column :width="12">
        <sui-grid-row>

          <sui-card class="ui fluid">

            <sui-card-content>
              <sui-card-header>{{$t('user.personalInformation')}}</sui-card-header>

            </sui-card-content>

            <EditArchives v-if="isUserInfoEditing.Archives"></EditArchives>
            <sui-card-content v-else>

              <sui-grid>
                <sui-grid-row>
                  <sui-grid-column>
                    <sui-container textAlign="left">
                      <div>
                        <span>ID: {{userInfo.username}}</span>
                        <a @click="setEditStatus(editType.Archives)"
                           class="ui right floated aligned"
                           v-show="isLogin"
                           style="color: #999999">
                          <sui-icon name="edit online"/>
                          {{$t('user.edit')}}</a>

                      </div>
                      <sui-divider></sui-divider>

                      <sui-grid>
                        <sui-grid-column :width="8">
                          <p>
                            {{$t('user.nickname')}}: {{userInfo.nickname}}
                          </p>
                          <p>
                            {{$t('user.name')}}: {{userInfo.name}}
                          </p>
                          <p>
                            Email: {{userInfo.email}}
                          </p>
                          <p>
                            {{$t('user.birthday')}}: {{userInfo.birthday}}
                          </p>
                          <p>
                            {{$t('user.sex')}}: {{userInfo.sex | getSex}}
                          </p>

                        </sui-grid-column>

                        <sui-grid-column :width="8">
                          <p>
                            {{$t('user.homepage')}}: <a
                            :href="userInfo.website">{{userInfo.website}}</a>
                          </p>
                          <p>
                            {{$t('user.education')}}: {{userInfo.education}}
                          </p>

                        </sui-grid-column>


                      </sui-grid>

                    </sui-container>
                  </sui-grid-column>


                </sui-grid-row>

              </sui-grid>

            </sui-card-content>

          </sui-card>


        </sui-grid-row>
        <!--技能-->
        <sui-grid-row style="margin-top: 28px">
          <sui-card class="ui fluid">
            <sui-card-content>
              <sui-card-header>
                {{$t('user.skill')}}
              </sui-card-header>
            </sui-card-content>

            <EditSkill v-if="isUserInfoEditing.Skill"></EditSkill>
            <sui-card-content v-else>
              <a @click="setEditStatus(editType.Skill)"
                 v-show="isLogin"
                 class="ui right floated aligned" style="color: #999999">
                <sui-icon name="edit online"/>
                {{$t('user.edit')}}</a>
              <div v-if="userInfo.skill !== ''">
                <sui-label style="margin-top: 5px; margin-bottom: 5px"
                           size="mini"
                           :color="getColor()"
                           v-for="skill in userInfo.skill.split(',')"
                           :key="skill">{{skill}}
                </sui-label>
              </div>


            </sui-card-content>

          </sui-card>
        </sui-grid-row>
        <!--开源项目 & 文章著作-->
        <sui-grid-row style="margin-top: 28px">
          <sui-card class="ui fluid">
            <sui-card-content>
              <sui-card-header>
                {{$t('user.openSourceProjectWorks')}}
              </sui-card-header>
            </sui-card-content>
            <sui-card-content>


            </sui-card-content>

          </sui-card>
        </sui-grid-row>


        <sui-grid-row>


        </sui-grid-row>

      </sui-grid-column>

      <!--工作信息-->
      <sui-grid-column :width="4">
        <sui-grid-row>
          <sui-card class="ui fluid">
            <sui-card-content>
              <sui-card-header>
                {{$t('user.workInformation')}}
              </sui-card-header>
            </sui-card-content>

            <EditWorkInfo v-if="isUserInfoEditing.WorkInfo"></EditWorkInfo>
            <sui-card-content v-else>
              <sui-container textAlign="left">
                <a @click="setEditStatus(editType.WorkInfo)"
                   v-show="isLogin"
                   class="ui right floated aligned" style="color: #999999">
                  <sui-icon name="edit online"/>
                  {{$t('user.edit')}}
                </a>
                <p>
                  {{$t('user.company')}}: {{userInfo.company}}
                </p>
                <p>
                  {{$t('user.position')}}: {{userInfo.position}}
                </p>

                <p>
                  {{$t('user.industry')}}: {{userInfo.industry}}
                </p>

              </sui-container>


            </sui-card-content>

          </sui-card>
        </sui-grid-row>
        <sui-grid-row style="padding-top: 28px">
          <sui-grid-column :width="3">
            <p>{{$t('user.registrationTime')}}：{{ userInfo.created_at }}</p>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid-column>

    </sui-grid>

  </sui-container>
</template>

<script>
  import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
  import {ACCOUNT} from "../../store/types";
  import filters from "../../filters";
  import EditWorkInfo from "./EditWorkInfo";
  import EditSkill from "./EditSkill";
  import EditArchives from "./EditArchives";

  export default {
        name: "UserProfile",
      components: {
        EditWorkInfo,
        EditSkill,
        EditArchives,
      },
      props: {},
      data() {return {}},
      computed: {
        ...mapState('account', {
          logStatus: ACCOUNT.LOG_STATUS,
          userInfo: ACCOUNT.USER_INFO,
          username: ACCOUNT.CURRENT_USERNAME,
          defaultAvatar: ACCOUNT.DEFAULT_AVATAR,
          isUserInfoEditing: ACCOUNT.IS_USER_INFO_EDITING,
          editType: ACCOUNT.EDIT_TYPE
        }),
        ...mapGetters('account', {
          isLogin: ACCOUNT.GET_IS_LOG_IN
        }),
      },
      created() {
        this.getUserInfo(this.$route.params.username)

      },
      mounted() {},
      methods: {
        getColor() {
          let colorSet = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue',
            'violet', 'purple', 'pink', 'brown', 'grey', 'black']
          return colorSet[Math.round(Math.random() * colorSet.length)]
        },
        ...mapMutations('account', {setEditStatus: ACCOUNT.SET_USERINFO_EDIT_STATUS}),
        ...mapActions('account', {getUserInfo: ACCOUNT.GO_USER_INFO}),
      },
      filters: {
        ...filters,
        getSex: (value)=> {

          if (value === 'P') {
            return '未公开';
          } else {
            if (value === 'M') {
              return '男'
            } else {
              return '女'
            }
          }
        }
      },
      watch: {
        $route() {
          this.getUserInfo(this.$route.params.username)
        }
      },

    }
</script>

<style lang="scss" scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>
