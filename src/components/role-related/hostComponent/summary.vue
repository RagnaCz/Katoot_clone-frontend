<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <div class="max-w-[500px] ml-auto mr-auto grid grid-cols-3 gap-4 justify-center">
        <div>{{ sortedPlayers[0].name }}</div>
        <div>{{ sortedPlayers[1].name }}</div>
        <div>{{ sortedPlayers[2].name }}</div>
        <div class="bg-indigo-700 h-[100px] mt-[50px] p-4 rounded-lg shadow-md items-center justify-center">
        </div>
        <div class="bg-indigo-900 h-[150px] p-4 rounded-lg shadow-md items-center justify-center">
        </div>
        <div class="bg-indigo-800 h-[50px] mt-[100px] p-4 rounded-lg shadow-md items-center justify-center">
        </div>
        <div> score: {{ sortedPlayers[0].score }}</div>
        <div> score: {{ sortedPlayers[1].score }}</div>
        <div> score: {{ sortedPlayers[2].score }}</div>
    </div>
</template>


<script>
export default {
    name: 'summaryHost',
    props: {
        players: {

        }
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