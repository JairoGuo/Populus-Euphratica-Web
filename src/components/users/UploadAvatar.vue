<template>
  <div>

    <sui-button size="mini" fluid @click.native="toggle">上传头像</sui-button>
    <sui-modal size="tiny" v-model="open">
      <sui-modal-header>上传图片</sui-modal-header>
      <sui-modal-content image>
        <div style="margin-right: 15px">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"

            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            :limit="limitNum"
            :class="{hide:hideUpload}"
            :on-change="imgChange"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </div>

        <sui-modal-description>

          <p>只能上传jpg/png文件，且不超过2M</p>

        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="save()">
          上传
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

  </div>
</template>

<script>
  import {ACCOUNT} from "@/store/types";
  import {mapActions, mapState} from "vuex";

  export default {
    data() {
      return {
        open: false,
        imageUrl: null,
        dialogImageUrl: '',
        dialogVisible: false,
        hideUpload: false,
        limitNum: 1
      };
    },

    computed: {
      ...mapState('account', {
        userInfo: ACCOUNT.USER_INFO,
        username: ACCOUNT.LOG_IN_USERNAME,
      })
    },
    methods: {
      ...mapActions('account', {getUserInfo: ACCOUNT.GO_USER_INFO}),
      handleRemove(file, fileList) {
        console.log(file, fileList)
        this.hideUpload = false
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      save() {
        let formData = new FormData();

        formData.append('avatar', this.imageUrl)
        this.axios.patch('api/users/' + this.username + '/', formData, {
          'Content-Type': 'multipart/form-data'
        }).then(() => {
          console.log('suss')
          this.getUserInfo(this.$route.params.username)

        })
        this.toggle()
      },
      imgChange(file, fileList) {
        this.imageUrl = file.raw
        this.hideUpload = fileList.length >= this.limitNum;

      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      toggle() {
        this.open = !this.open;
      },
    }
  }
</script>

<style>
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
