<script setup>

</script>

<template>
  <component>
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