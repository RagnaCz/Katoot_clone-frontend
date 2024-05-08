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
    <div class="quizbox text-left w-full bg-white border-2 border-indigo-900 rounded-lg shadow justify-between">
      <div class="p-4 bg-white rounded-lg md:p-8 ">
        <div class="flex items-center justify-between">
          <h2 class="mb-3 text-3xl font-bold tracking-tight text-indigo-900">{{ quiz.quiz_name }}</h2>
          <button :id="'dropdownModifyQuizBtn' + quiz._id" :data-dropdown-toggle="'dropdownModifyQuiz' + quiz._id"
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 16 3">
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <div :id="'dropdownModifyQuiz' + quiz._id"
            class="relative top-0 z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
              :aria-labelledby="'dropdownModifyQuizBtn' + quiz._id">
              <li>
                <a :href="`/editor/${quiz._id}`"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
              </li>
              <li>
                <div @click="deleteQuiz(quiz._id)"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</div>
              </li>
            </ul>
          </div>

        </div>


        <div class="flex items-center mb-3 text-gray-500 ">
          <svg class="w-6 h-6 text-indigo-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
              d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
          </svg>
          <!-- {{ Array(quiz.questions)[0].length }} items -->
        </div>
        <div class="flex text-indigo-900 items-center justify-between">
          <p class="text-left">Create at: {{ quiz.createdAt }}</p>
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
      quizzes: [
        {
          _id: "a299012830293",
          quiz_name: "q_name1",
          question_count: 3,
          create_at: "12 13 14"
        },
        {
          _id: "asdioneqpw9eqwe",
          quiz_name: "q_name2",
          question_count: 2,
          create_at: "12 13 14"
        }
      ]
    }
  },
  methods: {
    deleteQuiz(quiz_id) {

    },
  },
  mounted() {
    this.auth.currentUser.getIdToken().then((token) => {
      axios.get(import.meta.env.VITE_BACKEND_URI + '/api/quizzes', {
        withCredentials: true,
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