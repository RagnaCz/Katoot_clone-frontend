
<template>
    <div class="flex">
      <div class="w-1/4 bg-gray-200">
        <SidebarMenu @pageSelected="selectPage" />
      </div>
  
      <div class="w-3/4">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import SidebarMenu from '../components/sidebarMenu.vue';
  
  export default {
    components: {
      SidebarMenu,
    },
    methods: {
      selectPage(page) {
        this.$router.push(page.path);
      }
    }
  }
  </script>