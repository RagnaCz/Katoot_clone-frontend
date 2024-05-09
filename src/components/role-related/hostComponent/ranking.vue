<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <div class="max-w-[500px] ml-auto mr-auto grid grid-cols-1 gap-4 justify-center">
        <div v-for="(player, index) in sortedPlayers" :key="index" class="bg-white p-4 rounded-lg shadow-md items-center justify-center">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-lg font-semibold">{{ player.name }}</p>
                </div>
                <div>
                    <p class="text-lg font-semibold"> score : {{ player.score }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Ranking',
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
            return this.players.sort((a, b) => b.score - a.score); // Sorting in ascending order
        }
    }
}

</script>