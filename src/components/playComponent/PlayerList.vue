<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div v-for="player in players" :key="player.name" class="bg-white p-4 rounded-lg shadow-md">
            <p class="text-lg font-semibold">{{ player.name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayerList',
    props:{
        players: {}
    },
    data() {
        return {
            
        }
    },
    methods: {

    }
}
</script>