<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>

<template>
  <div v-for="quiz in quizzes" :key="quiz._id">
    <router-link :to="`/editor/${quiz._id}`">
    <div
      class="cursor-pointer quizbox text-left w-full bg-white border-2 border-indigo-900 rounded-lg shadow justify-between">
      <div class="p-4 bg-white rounded-lg md:p-8 ">
        <div class="flex items-center justify-between">
          <h2 class="mb-3 text-3xl font-bold tracking-tight text-indigo-900">{{ quiz.quiz_name }}</h2>
          <button @click="deleteQuiz(quiz._id, $event)" type="button"
            class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <svg class="w-[18px] h-[18px] text-gray-800 text-red-700" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
        </div>


        <div class="flex items-center mb-3 text-gray-500 ">
          <svg class="w-6 h-6 text-indigo-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
              d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
          </svg>
          <span v-if="Array.isArray(quiz.questions)"> {{ quiz.questions.length }} items</span>
        </div>
        <div class="flex text-indigo-900 items-center justify-between">
          <p class="text-left">Create at: {{ quiz.createdAt.slice(0, 10) }} </p>
          <div class="flex items-center">
            <button type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                  clip-rule="evenodd" />
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>
        </div>
      </div>
      </div>
    </router-link>
    <br>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import axios from 'axios'

export default {
  name: 'QuizList',
  data() {
    return {
      auth: getAuth(),
      quizzes: []
    }
  },
  methods: {
    deleteQuiz(quiz_id, event) {
      event.stopPropagation();

      this.auth.currentUser.getIdToken().then((token) => {
        axios.delete(import.meta.env.VITE_BACKEND_URI + '/api/quizzes/' + quiz_id, {
          withCblueentials: true,
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => {
            if (res.data.success) {
              this.quizzes = this.quizzes.filter(quiz => quiz._id !== quiz_id);
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
      axios.get(import.meta.env.VITE_BACKEND_URI + '/api/quizzes', {
        withCblueentials: true,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          if (!res.data.success) {
            alert(res.data.message)
          }
          else {
            this.quizzes = res.data.quizzes
            console.log(this.quizzes)
          }
        }).catch((err)=>{console.log(err)})
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