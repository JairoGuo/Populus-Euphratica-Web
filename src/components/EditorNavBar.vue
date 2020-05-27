<template>
  <div>
    <nav-bar-base>

      <sui-menu-item>
        <router-link
          is="sui-button"
          icon="chevron left"
          color="red"
          class="circular ui"
          :content="$t('nav.back')"
          to="/"
        />
      </sui-menu-item>

      <sui-menu-item>
        <sui-header>{{title}}</sui-header>
      </sui-menu-item>

      <sui-menu-menu position="right">
        <slot/>

      </sui-menu-menu>

    </nav-bar-base>
  </div>
</template>

<script>
  // import $ from 'jquery'
  import NavBarBase from "@/components/NavBarBase";

  export default {
    name: "EditorNavBar",
    components: {
      NavBarBase,

    },
    data() {

      return {}

    },
    props: {

      title: {
        type: String
      }
    },

    methods: {}
  }
</script>

<style scoped>

</style>
