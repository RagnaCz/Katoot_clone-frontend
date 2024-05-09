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
          <router-link :to="`/editor/${quiz._id}`">
            <div class="cursor-pointer">
              <h2 class="hover:underline mb-3 text-3xl font-bold tracking-tight text-indigo-900">{{ quiz.quiz_name }}
              </h2>
            </div>
          </router-link>
          <button @click="deleteQuiz(quiz._id)" type="button"
            class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <svg class="w-[18px] h-[18px] text-red-700 border-none" aria-hidden="true"
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
            <button data-modal-target="createRoomModal" data-modal-toggle="createRoomModal"
              @click="selectQuiz(quiz._id)"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button">
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

  <div id="createRoomModal" tabindex="-1" aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full z-40">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Create Quiz
          </h3>
          <button type="button" @click="toggleModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-target="createRoomModal" data-modal-hide="createRoomModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->

        <div class="p-4 md:p-5 space-y-4">
          <div>
            <label for="quizName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Time
              limit</label>
            <input type="input" name="timeLimit" id="timeLimit" placeholder="time limit" v-model="formData.time_limit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required />
          </div>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <div>
            <label for="quizName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Max
              players</label>
            <input type="input" name="maxPlayer" id="maxPlayer" placeholder="max players" v-model="formData.max_player"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required />
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button data-modal-hide="createRoomModal" type="button" @click="createRoom"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import axios from 'axios'
import io from 'socket.io-client';

// const socket = io(import.meta.env.VITE_WEBSOCKET_URI);

export default {
  name: 'QuizList',
  data() {
    return {
      auth: getAuth(),
      modal: '',
      quizzes: [],
      formData: {
        time_limit: 60,
        max_player: 30
      },
      selectedQuiz: '',
    }
  },
  methods: {
    selectQuiz(quiz_id) {
      this.selectedQuiz = quiz_id
      this.toggleModal()
      console.log(this.selectedQuiz)
    },
    cancelCreate() {
      this.selectedQuiz = ''
    },
    toggleModal() {
      this.modal.toggle();
    },
    deleteQuiz(quiz_id) {
      this.auth.currentUser.getIdToken().then((token) => {
        axios.delete(import.meta.env.VITE_BACKEND_URI + '/api/quizzes/' + quiz_id, {
          withCredentials: true,
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
    createRoom() {
      this.auth.currentUser.getIdToken().then((token) => {
        axios.post(import.meta.env.VITE_BACKEND_URI + '/api/rooms/' + this.selectedQuiz, {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => {
            if (res.data.success) {
              this.$router.replace('/room/' + res.data.room.room_pin)
            } else {
              alert('starting host room not successful')
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
            console.log(token)
            console.log(this.quizzes)
          }
        }).catch((err) => { console.log(err) })
    })
    // set the modal menu element
    const popuptarget = document.getElementById('createRoomModal');
    this.modal = new Modal(popuptarget);
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