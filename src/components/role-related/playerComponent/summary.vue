<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <div class="max-w-[550px] mt-10 ml-auto mr-auto grid grid-cols-1 gap-4 items-center justify-center">
        <span class="font-bold text-3xl ">Score Summary</span>
        <div class="bg-white p-4 rounded-lg shadow-md items-center justify-center mt-[50px]">
            <div class="flex justify-between p-5">
                <span class="font-bold ">Player Name:</span>
                <span>{{ playerData.name }}</span>
            </div>
            <div class="flex justify-between p-5 mt-2">
                <span class="font-bold">Score:</span>
                <span>{{ playerData.score }}</span>
            </div>
        </div>



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
    name: 'summaryPlayer',
    props: {
        players: {
        },
        playerData: {}
    },
    data() {
        return {
            auth: getAuth(),
            records: [],
            player: {}
        }
    },
    methods: {
        range(start, end) {
            end = end - 1
            return Array.from({ length: end - start + 1 }, (_, index) => start + index);
        },
    },
    computed: {
        sortedPlayers() {
            const sorted = this.players.sort((a, b) => b.score - a.score);
            return sorted.slice(0, 3);
        }
    },
    mounted() {
        this.auth.currentUser.getIdToken().then(token => {
            axios.get(import.meta.env.VITE_BACKEND_URI + '/api/records/' + this.$route.params.roompin, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    this.player = res.data.record.players.filter(player => player.user_id == this.auth.currentUser.uid)[0]
                    console.log(this.player)
                } else {

                }
            })
        })
    }
}

</script>