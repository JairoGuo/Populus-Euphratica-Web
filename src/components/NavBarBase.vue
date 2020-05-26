<template>
  <div  class="ui  segment menu fixed top" style="background-color: #fafafa">
    <sui-menu secondary fluid>

      <slot />
    </sui-menu>
  </div>
</template>

<script>
    export default {
        name: "NavBarBase"
    }
</script>

<style scoped>

</style>
