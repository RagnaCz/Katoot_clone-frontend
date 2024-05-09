<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <HistoryList/>
</template>

<script>
import HistoryList from './historyComponent/HistoryList.vue'

export default {
    name: 'History',
    components: {
        HistoryList
    }
}
</script>