<template>
  <sui-modal v-model="visible" :size="size">
    <sui-modal-header>{{title}}</sui-modal-header>
    <sui-modal-content>
      <sui-header>{{header}}</sui-header>
      <p>
        {{content}}
      </p>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button @click.native="cancel">
        取消
      </sui-button>
      <sui-button negative @click.native="confirm">
        确定
      </sui-button>
    </sui-modal-actions>
  </sui-modal>

</template>

<script>

  export default {
    name: "MessageModal",
    components: {},

    props: {
      title: {
        type: String,
      },
      header: {
        type: String,
      },
      content: {
        type: String
      },
      value: {
        type: Boolean,
        default: false
      },
      open: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'mini'
      },


    },
    data() {
      return {
        visible: false
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {

      toggle() {
        this.visible = !this.visible
      },
      cancel() {
        this.visible = false;
      },
      confirm() {
        this.$emit('onConfirm')
        this.toggle()
      },
    },
    filters: {},
    watch: {
      open(val) {
        this.$emit('change', !val)
        this.visible = val;
      },
      value(val) {
        this.visible = val;
      },
      visible() {
        this.$emit('input', this.visible);
      }
    },

  }
</script>

<style scoped>

</style>
