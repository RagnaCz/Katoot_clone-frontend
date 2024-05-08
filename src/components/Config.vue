<template>
  <div
    class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-left">
    <form class="space-y-6" action="" method="POST" @submit.prevent="updateUsername" onsubmit="return false">
      <p class="text-left text-2xl text-white">Change Username</p>
      <div>
        <label for="displayName"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Username</label>
        <input type="displayName" name="displayName" id="displayName" v-model="formData.displayName"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="username" required />
      </div>
      <button type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update
        Username</button>
    </form>
    <br>
    <form class="space-y-6" action="" method="POST" @submit.prevent="updatePass" onsubmit="return false">
      <p class="text-left text-2xl text-white">Change Password</p>
      <div>
        <label for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Password</label>
        <input type="password" name="password" id="password" placeholder="••••••••" v-model="formData.password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required />
      </div>
      <div>
        <label for="confirmPassword"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
          v-model="formData.confirmPassword"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required />
      </div>
      <button type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update
        Password</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>

<script>
import { getAuth, updatePassword, updateProfile, signOut } from 'firebase/auth'

export default {
  name: 'config',
  data() {
    return {
      auth: getAuth(),
      formData: {
        displayName: '',
        password: '',
        confirmPassword: '',
      }
    }
  },
  methods: {
    updateUsername() {
      updateProfile(this.auth.currentUser, {
        displayName: this.formData.displayName,
      }).then(() => {
        this.formData.displayName = ''
        this.$router.replace('/config')
      })
      
    },
    updatePass() {
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Fckyou Idiotic, you just put your password, can\'t you remember what you have done before?')
        return;
      }

      updatePassword(this.auth.currentUser, this.formData.password)
        .then(() => {
          alert("You have to login again!");
          signOut(this.auth)
            .then(() => {
              this.$router.replace('/login')
            })
            .catch((error) => {
              alert(error.message)
            })
        }).catch((error) => {
          alert(error.message)
        });

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
  }
}
</script>