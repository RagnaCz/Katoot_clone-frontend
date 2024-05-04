<!-- SidebarMenu.vue -->
<template>
    <div>
      <ul>
        <li v-for="page in pages" :key="page.path" @click="selectPage(page)">
          {{ page.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'sidebarmenu',
    data() {
      return {
        pages: [
          { title: 'mainpage', path: '/mainmenu' }
        ]
      };
    },
    methods: {
      selectPage(page) {
        this.$emit('pageSelected', page);
      }
    }
  }
  </script>