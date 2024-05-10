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
          Questions:  {{(Array.isArray(player.results)) ?  player.results.length : 0 }}
        </div>
      </div>
    </div>

    <!-- tables -->
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              Answer
            </th>
            <th scope="col" class="px-6 py-3">
              Correct?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in this.player.results" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ 0 }}
            </th>
            <td class="px-6 py-4">
              {{ result.answer }}
            </td>
            <td class="px-6 py-4">
              <svg v-if="result.correct" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 11.917 9.724 16.5 19 7.5" />
              </svg>
              <svg v-else class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>


            </td>
          </tr>

        </tbody>
      </table>
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
      player: {},
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
    this.auth.currentUser.getIdToken().then(token => {
      axios.get(import.meta.env.VITE_BACKEND_URI + '/api/records/' + this.$route.params.quiz_id, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.success) {
          console.log(res.data)
          //this.player = res.data.record.players.filter(player => player.user_id == this.auth.currentUser.uid)[0]
          
        } else {

        }
      })
    })
  }
}
</script>