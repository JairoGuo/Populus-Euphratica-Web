<template>
  <div class="ui menu fixed top" style="background-color: #fafafa; padding-left: 10px">
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
