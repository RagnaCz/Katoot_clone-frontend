<template>
  <div class="relative">
    <div class="absolute top-0 right-0 z-10 p-4">
      <div class="flex items-center justify-end space-x-4 text-right">
        <div class="font-semibold text-gray-900 text-left">
          <div>{{ auth.currentUser.displayName }}</div>
          <a class="text-sm text-gray-500 dark:text-gray-400 underline cursor-pointer hover:text-blue-600"
            @click="logout">Sign Out</a>
        </div>
        <img class="w-10 h-10 rounded-full" src="../assets/vue.svg" alt="">
      </div>
    </div>
  </div>

  <div class="h-screen flex flex-col items-center justify-center w-full">
    <p class="mb-8 text-5xl font-bold text-center">Kahoot! <br>
    <p class="text-2xl">Clone</p>
    </p>
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-6" action="" method="POST" @submit.prevent="joinRoom" onsubmit="return false">
        <div>
          <input type="roomPin" name="roomPin" id="roomPin" v-model="formData.roomPin"
            class="placeholder:text-center text-center
           bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="ENTER PIN" @input="validateInput" maxlength="6" minlength="6" required />
        </div>
        <button type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join
          Room</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Create your quiz? <a :href="`/dashboard`"
            class="text-blue-700 hover:underline dark:text-blue-500">Dashboard</a>
        </div>
      </form>
    </div>
  </div>



</template>
<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
export default {
  name: 'login',
  props: {

  },
  data() {
    return {
      formData: {
        roomPin: '',
      },
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
    joinRoom() {
      this.$router.replace('/room/'+this.formData.roomPin);
    },
    validateInput() {
      this.formData.roomPin = this.formData.roomPin.replace(/\D/g, '');
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
.ui.main.container.segment {
  max-width: 500px;
  margin: 0 auto;
}
</style>