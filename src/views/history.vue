<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>

<template>
  <!-- header -->
  <nav
    class="flex fixed w-full z-10 top-0 start-0 h-screen-[70px] bg-gray-100 items-center shadow-sm px-[10px] py-[5px] border-b">

    <div class="w-[calc(100%-30px)] flex">
      <div class="w-[calc(100%-200px)]"></div><!-- User login -->
      <div class="w-[200px]">
        <div class="flex items-center justify-end space-x-4 text-right">
          <div class="font-semibold text-gray-900 text-left">
            <div> {{ auth.currentUser.displayName }} </div><a
              class="text-sm text-gray-500 dark:text-gray-400 underline cursor-pointer hover:text-blue-600">Sign Out</a>
          </div><img class="w-10 h-10 rounded-full" src="/src/assets/vue.svg" alt="">
        </div>
      </div>
    </div>
  </nav>

  <!-- main content -->
  <div class="mt-70 w-full max-w-screen-xl mx-auto p-20">
    <!-- jumbotron -->
    <div
      class="mb-10 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-5 text-3xl font-bold text-gray-900 dark:text-white">Quiz Name</h5>
      <div
        class="items-center justify-evenly space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse text-white">
        <div class="flex">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
              d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
          </svg>
          Questions: {{ "value" }}
        </div>
        <div class="flex">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
              clip-rule="evenodd" />
          </svg>
          players: {{ "value" }}/{{ "value" }}
        </div>
        <div class="flex">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Start: {{ "value" }}
        </div>
        <div class="flex">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Finish: {{ "value" }}
        </div>
      </div>
    </div>

    <!-- tables -->
    <div v-for="i in range(0, 5)">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption
            class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Question {{ i + 1 }}: {{ "question" }}
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Answer: {{ "answer" }}
            </p>
          </caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Username
              </th>
              <th scope="col" class="px-6 py-3">
                Answer
              </th>
              <th scope="col" class="px-6 py-3">
                Correct?
              </th>
              <th scope="col" class="px-6 py-3">
                Time Usage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="j in range(0, 4)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                Silver
              </td>
              <td class="px-6 py-4">
                <svg v-if="true" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>
                <svg v-if="false" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>


              </td>
              <td class="px-6 py-4">
                $2999
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>



</template>

<script>
import { getAuth } from 'firebase/auth'
import axios from 'axios'

export default {
  name: 'History',
  data() {
    return {
      auth: getAuth(),
      room: {},
    }
  },
  methods: {
    range(start, end) {
      end = end - 1
      return Array.from({ length: end - start + 1 }, (_, index) => start + index);
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
  },
  mounted() {
    
  }
}
</script>