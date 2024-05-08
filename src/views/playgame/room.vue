<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
onMounted(() => {
    initFlowbite();
})

</script>

<template>
    <nav class="bg-indigo-900 h-[70px] flex text-center items-center justify-center p-3">
        <span class="font-bold text-2xl ml-5 mr-5 text-white">PIN : {{ roompin }} </span>
        <span class="font-bold text-2xl ml-5 mr-5 text-white">Player {{ currentPlayer() }}/{{ player.max }}</span>
        <button type="button" class=" font-bold h-full p-3 m-5 rounded-[10px] bg-indigo-700 text-indigo-300 hover:bg-indigo-600"
            v-if="isHost">
            START
        </button>
    </nav>
    <div class="w-full h-[calc(100vh-70px)] bg-indigo-100 p-10 overflow-auto">
        <PlayerList :players="players" />
    </div>
</template>

<script>
import PlayerList from '../../components/playComponent/PlayerList.vue';

export default {
    name: 'Room',
    data() {
        return {
            roompin: '',
            isHost: true,
            player: {
                max: 30,
            },
            players: [
                {
                    name: 'golf',
                },
                {
                    name: 'fran',
                },
                {
                    name: 'ek',
                },
                {
                    name: 'pao',
                },
                {
                    name: 'ming',
                },
                {
                    name: 'bank',
                },
                {
                    name: 'pun',
                },
            ],
            state: {

            }
        }
    },
    created() {
        this.roompin = this.$route.params.roompin;
    },
    methods: {
        currentPlayer() {
            return this.players.length
        }
    },

}
</script>