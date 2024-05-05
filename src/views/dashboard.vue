<template>
  <div class="w-screen h-screen flex">
    <!-- Side Bar -->
    <div class="w-[400px] h-full bg-gray-200 text-white" v-show="showSide">
      <div class="h-[50px] bg-gray-900 justify-center items-center flex">
        <h3 class="font-bold text-xl">Kahoot! Clone</h3>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800">

        <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
          <div class=" flex flex-col justify-between space-y-[10px]">
            <router-link to="/library" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
              <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
              </svg>
              Home
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Mainsection-->
    <div class="w-full h-full bg-gray-400 border-gray-500 border-b-2">
      <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b ">
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class=" w-[25px] h-[25px]">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>

        
        <div class="w-[calc(100%-30px)] flex">
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
            <div v-show="showDropDown" class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1 text-left" role="none">
                <form method="POST" action="#" role="none">
                  <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <router-view></router-view>
        </div>
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
    toggleSideBar() {
      this.showSide = !this.showSide

    },
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

.sidebar-item:active {
  transform: scale(0.95);
}
</style>
