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
    <div class="h-full text-white border-gray-500" v-show="showSide">
      <div class="h-[70px] bg-indigo-950 justify-center items-left py-6">
        <p class="font-bold text-5xl">Kahoot!</p>
        <p class="font-bold text-xl">Clone</p>
      </div>
      <div class="w-full h-[calc(100vh-70px)] bg-indigo-950">

        <div class=" justify-between items-center w-full h-full  space-y-[10px]">
          <ul class="space-y-2 font-medium flex flex-col justify">
            <li><br></li><li><br></li>
            <div class="flex flex-col justify-between px-5">
              <button type="button" class="sidebar-button text-white hover:text-white border border-white hover:bg-gray-900 focus:outline-none font-bold rounded-lg text-2xl w-full py-4 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-indigo-950 dark:hover:bg-white">
                + CREATE
              </button>
            </div>
            <li>
              <router-link class="flex items-center px-6 py-3 mt-4 duration-200 border-l-4"
                :class="[$route.name === 'library' ? activeClass : inactiveClass]" to="/library">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                    fill="currentColor" />
                  <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
                </svg>

                <span class="mx-4 font-bold text-3xl">Library</span>
              </router-link>
            </li>
            <li>
              <router-link class="flex items-center px-6 py-3 mt-4 duration-200 border-l-4"
                :class="[$route.name === 'history' ? activeClass : inactiveClass]" to="/history">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                    fill="currentColor" />
                  <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
                </svg>

                <span class="mx-4 font-bold text-3xl">History</span>
              </router-link>
            </li> 
            <li>
              <router-link class="flex items-center px-6 py-3 mt-4 duration-200 border-l-4"
                :class="[$route.name === 'config' ? activeClass : inactiveClass]" to="/config">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                    fill="currentColor" />
                  <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
                </svg>

                <span class="mx-4 font-bold text-3xl">Config</span>
              </router-link>
            </li>

            
          </ul>
            <div class="flex flex-col justify-between px-5">
              <br><br>
              <router-link to="/library">
                <button type="button" class="sidebar-button text-white hover:text-white border border-white hover:bg-gray-900 focus:outline-none font-bold rounded-lg text-2xl w-full py-4 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-indigo-950 dark:hover:bg-white">
                  PLAY
                </button>
              </router-link>
            </div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mainsection-->
  <div class=" sm:ml-64 bg-gray-400 border-gray-500 border-b-2">
    <header class="h-[70px] bg-gray-100 flex items-center shadow-sm px-[20px] py-[10px] z-10 border-b ">
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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
          <div class="flex items-center justify-end space-x-4" @click="toggleDrop">
            <div class="font-semibold text-gray-900 text-left">
              <div>Username</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">User</div>
            </div>
          </div>
          <!-- Drop down -->
          <div v-show="showDropDown"
            class="absolute right-[10px] z-10 mt-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1 text-left" role="none">
              <form method="POST" action="#" role="none">
                <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem"
                  tabindex="-1" id="menu-item-3">Sign out</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="h-[calc(100vh-70px)] bg-gray-50 p-[20px]">
      <div class="border border-gray-300 rounded-md p-[20px] h-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      auth: getAuth(),
      showDropDown: false,
      showSide: true
    }
  },
  methods: {
    toggleDrop() {
      this.showDropDown = !this.showDropDown
    }
  },
  mounted() {
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
