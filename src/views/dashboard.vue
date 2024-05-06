<script setup>
import { ref } from 'vue'
const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)
</script>

<template>
  <!-- Side Bar -->
  <aside id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
    aria-label="Sidebar">
    <div class="h-full text-white border-gray-500">
      <div class="h-[70px] bg-indigo-950 justify-center items-left py-6">
        <p class="font-bold text-5xl">Kahoot!</p>
        <p class="font-bold text-xl">Clone</p>
      </div>
      <div class="w-full h-[calc(100vh-70px)] bg-indigo-950">

        <div class="justify-between items-center w-full h-full space-y-[10px]">
          <ul class="space-y-2 font-medium flex flex-col justify" >
            <li><br></li>
            <li><br></li>
            <div class="flex flex-col justify-between px-5">
              <button type="button"
                class="sidebar-button text-white hover:text-white border border-white hover:bg-gray-900 focus:outline-none font-bold rounded-lg text-2xl w-full py-4 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-indigo-950 dark:hover:bg-white">
                + CREATE
              </button>
            </div>
            <li>
              <router-link @click="scrollToTop" class="flex items-center px-6 py-3 mt-4 duration-200 border-l-4"
                :class="[$route.name === 'library' ? activeClass : inactiveClass]" to="/library">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M5.005 10.19a1 1 0 0 1 1 1v.233l5.998 3.464L18 11.423v-.232a1 1 0 1 1 2 0V12a1 1 0 0 1-.5.866l-6.997 4.042a1 1 0 0 1-1 0l-6.998-4.042a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1ZM5 15.15a1 1 0 0 1 1 1v.232l5.997 3.464 5.998-3.464v-.232a1 1 0 1 1 2 0v.81a1 1 0 0 1-.5.865l-6.998 4.042a1 1 0 0 1-1 0L4.5 17.824a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1Z"
                    clip-rule="evenodd" />
                  <path
                    d="M12.503 2.134a1 1 0 0 0-1 0L4.501 6.17A1 1 0 0 0 4.5 7.902l7.002 4.047a1 1 0 0 0 1 0l6.998-4.04a1 1 0 0 0 0-1.732l-6.997-4.042Z" />
                </svg>
                <span class="mx-4 font-bold text-3xl">Library</span>
              </router-link>
            </li>
            <li>
              <router-link @click="scrollToTop" class="flex items-center px-6 py-3 mt-4 duration-200 border-l-4"
                :class="[$route.name === 'history' ? activeClass : inactiveClass]" to="/history">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clip-rule="evenodd" />
                </svg>
                <span class="mx-4 font-bold text-3xl">History</span>
              </router-link>
            </li>
            <li>
              <router-link @click="scrollToTop" class="flex items-center px-6 py-3 mt-4 duration-200 border-l-4"
                :class="[$route.name === 'config' ? activeClass : inactiveClass]" to="/config">
                <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4" />
                </svg>
                <span class="mx-4 font-bold text-3xl">Config</span>
              </router-link>
            </li>
          </ul>
          <div class="flex flex-col justify-between px-5">
            <br><br>
            <router-link to="/library">
              <button type="button"
                class="sidebar-button text-white hover:text-white border border-white hover:bg-gray-900 focus:outline-none font-bold rounded-lg text-2xl w-full py-4 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-indigo-950 dark:hover:bg-white">
                ▶ PLAY
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mainsection-->
  <div class="sm:ml-64 bg-gray-400 border-gray-500 border-b-2">
    <nav
      class="flex fixed w-full z-10 top-0 start-0 h-screen-[70px] bg-gray-100 items-center shadow-sm px-[10px] py-[5px]  border-b ">
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
        type="button"
        class="items-center p-2 m-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-indigo-950 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
          </path>
        </svg>
      </button>


      <div class="w-[calc(100%-30px)] flex ">
        <div class="w-[calc(100%-200px)]"></div>
        <!-- User login -->
        <div class="w-[200px]">
          <div class="flex items-center justify-end space-x-4 hover:bg-gray-200 rounded-lg text-center"
            @click="toggleDrop">
            <img class="w-10 h-10 rounded-full" src="../assets/vue.svg" alt="">
            <div class="font-semibold text-gray-900 text-left">
              <div>{{ this.auth.currentUser.displayName }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ this.auth.currentUser.email }}</div>
            </div>
          </div>

          <!-- Drop down -->
          <div v-show="showDropDown"
            class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1 text-left" role="none">
              <form method="POST" action="" @submit.prevent="logout">
                <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem"
                  tabindex="-1" id="menu-item-3">Sign out</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="h-full mt-[50px] bg-gray-50 p-[40px]">
      <div class="min-h-[calc(100vh-70px)] ">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default {
  data() {
    return {
      auth: getAuth(),
      showDropDown: false,
    }
  },
  methods: {
    toggleDrop() {
      this.showDropDown = !this.showDropDown
    },
    logout() {
      signOut(this.auth)
        .then(() => {
          this.$router.replace('/login')
        })
        .catch((error) => {
          alert(error.message)
        })
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    console.log(this.auth)
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
    })
  }
}
</script>

<style scoped>
.sidebar-item {
  transition: background-color 0.3s ease;
}

.sidebar-item:hover {
  background-color: #4a5568;
}

.sidebar-item {
  transition: background-color 0.3s ease;
}

.sidebar-button {
  transition: background-color 0.3s ease;
}
</style>
