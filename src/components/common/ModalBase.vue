<template>

  <sui-modal v-model="visible" :size="size">
    <sui-modal-header>{{title}}</sui-modal-header>
    <sui-modal-content>
        <slot name="content"></slot>
    </sui-modal-content>
    <sui-modal-actions>
      <slot name="actions">
        <sui-button @click.native="cancel()">
          取消
        </sui-button>
        <sui-button positive @click.native="confirm()">
          确定
        </sui-button>
      </slot>
    </sui-modal-actions>
  </sui-modal>

</template>

<script>
  export default {
    name: "ModalBase",
    components: {},
    props: {
      title: {
        type: String,
      },
      value: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'tiny'
      }


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
      confirm() {

        this.$emit('onConfirm')
        this.toggle()
      },
      cancel() {
        this.visible = false;

      }

    },
    filters: {},
    watch: {
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
