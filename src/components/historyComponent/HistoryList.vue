<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>

<template>
  <div v-for="quiz in quizzes.records" :key="quiz._id">

    <div class=" quizbox text-left w-full bg-white border-2 border-indigo-900 rounded-lg shadow justify-between">
      <div class="p-4 bg-white rounded-lg md:p-8 ">
        <div class="flex items-center justify-between">
          <router-link :to="`/history/${quiz._id}`">
            <h2 class="cursor-pointer hover:underline mb-3 text-3xl font-bold tracking-tight text-indigo-900">{{
              quiz.quiz.quiz_name }}
            </h2>
          </router-link>

          <button @click="deleteRecord(quiz._id)" type="button"
            class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <svg class="w-[18px] h-[18px] text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
        </div>


        <div class="flex items-center mb-3 text-gray-500 ">
          <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
              clip-rule="evenodd" />
          </svg>
          <span v-if="quiz.record && Array.isArray(quiz.record.players)"> {{ quiz.record.players.length }} players</span>

        </div>
      </div>
    </div>
    <br>
  </div>

</template>

<script>
import { getAuth } from 'firebase/auth'
import axios from 'axios'

export default {
  name: 'HistoryData ',
  data() {
    return {
      auth: getAuth(),
      quizzes: { records: [] },
      formData: {
        time_limit: 60,
        max_player: 30
      },
    }
  },
  methods: {
    deleteRecord(quiz_id) {
      this.auth.currentUser.getIdToken().then((token) => {
        axios.delete(import.meta.env.VITE_BACKEND_URI + '/api/records/' + quiz_id, {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => {
            if (res.data.success) {
              this.quizzes = this.quizzes.filter(quiz => quiz._id !== quiz_id);
              this.$router.replace('/history')
            } else {
              alert('Remove quiz not successful')
            }
          })
      })
    },
    editQuiz(quiz_id) {
      this.$router.replace('/editor/' + quiz_id);
    }
  },
  mounted() {
    this.auth.currentUser.getIdToken().then((token) => {
      axios.get(import.meta.env.VITE_BACKEND_URI + '/api/records', {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          if (!res.data.success) {
            alert(res.data.message)
          } else {
            this.quizzes = res.data;
            console.log(this.quizzes); // Log quizzes data here
          }
        }).catch((err) => { console.log(err) })
    })
  }
}
</script>

<style scoped>
.quizbox {
  z-index: 30;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, ;
}

.quizbox:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
</style>