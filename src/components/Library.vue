<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <QuizList/>
</template>

<script>
import QuizList from './libraryComponent/QuizList.vue'

export default {
    name: 'Library',
    components: {
        QuizList
    }
}
</script>