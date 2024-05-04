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

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default {
  data() {
    return {
      isLoggedIn: false,
      auth: getAuth(),
    }
  },
  components: {
    SidebarMenu,
  },
  methods: {
    selectPage(page) {
      this.$router.push(page.path);
    }
  },
  mounted() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    })
  }
}
</script>