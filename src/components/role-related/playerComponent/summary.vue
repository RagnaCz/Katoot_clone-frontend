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
                    <tr v-for="i in [0, 1, 2, 3]" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{"Apple MacBook Pro 17"}}
                        </th>
                        <td class="px-6 py-4">
                            {{"Silver"}}
                        </td>
                        <td class="px-6 py-4">
                            <svg v-if="true" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                            </svg>
                            <svg v-else class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>


                        </td>
                        <td class="px-6 py-4">
                            {{"$2999"}}
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

    </div>
</template>



<script>
export default {
    name: 'summaryPlayer',
    props: {
        players: {
        },
        playerData: {}
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        sortedPlayers() {
            const sorted = this.players.sort((a, b) => b.score - a.score);
            return sorted.slice(0, 3);
        }
    }
}

</script>