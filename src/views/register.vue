<template>
  <div class="h-screen flex flex-col items-center justify-center w-full">
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-6" action="" method="POST" @submit.prevent="signUp" onsubmit="return false">
        <div>
          <label for="displayName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Username</label>
          <input type="displayName" name="displayName" id="displayName" v-model="formData.displayName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required />
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Email</label>
          <input type="email" name="email" id="email" v-model="formData.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Password</label>
          <input type="password" name="password" id="password" placeholder="••••••••" v-model="formData.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
          <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" v-model="formData.confirmPassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up your account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Have an account? <a :href="`/login`" class="text-blue-700 hover:underline dark:text-blue-500">Login</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import router from "../router";

export default {
  name: 'register',
  props: {

  },
  data() {
    return {
      formData: {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    }
  },
  methods: {
    signUp() {
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Fckyou Idiotic, you just put your password, can\'t you remember what you have done before?')
        return;
      }

      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.formData.email,
        this.formData.password
      )
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: this.formData.displayName,
          })

          console.log("Successfully registered!")
          this.$router.replace('/dashboard')

        })
        .catch((error) => {
          console.log(error.code + ': ' + error.message)
          alert(error.code + '\n' + error.message)
        })
    }
  }
}

</script>

<style scoped>
.ui.main.container.segment {
  max-width: 500px;
  margin: 0 auto;
}
</style>