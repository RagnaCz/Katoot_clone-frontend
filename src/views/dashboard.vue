<template>
    <!-- Side Bar -->
    <aside id="default-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar">
      <div class="h-full overflow-y-auto bg-gray-200 text-white" v-show="showSide">
        <div class="h-[50px] bg-gray-900 justify-center items-center flex">
          <h3 class="font-bold text-xl">Kahoot! Clone</h3>
        </div>
        <div class="h-[calc(100vh-50px)] bg-gray-800">

          <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
            <div class=" flex flex-col justify-between space-y-[10px]">
              <router-link to="/library"
                class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                Library
              </router-link>
              <router-link to="/library"
                class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                Library
              </router-link>
            </div>

            <div class=" flex flex-col justify-between space-y-[10px]">
              <router-link to="/library"
                class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                Play
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mainsection-->
    <div class=" sm:ml-64 bg-gray-400 border-gray-500 border-b-2">
      <header class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] py-[10px] z-10 border-b ">
        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar" type="button"
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
              class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
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
</style>
