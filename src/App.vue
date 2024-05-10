<script setup>

</script>

<template>
  <component>
    <!-- routerview -->
    <router-view />
  </component>
</template>

<script>

export default {
  methods: {
    selectPage(page) {
      this.$router.push(page.path);
    }
  },
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: black;
}
</style>