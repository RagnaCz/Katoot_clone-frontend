<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
onMounted(() => {
    initFlowbite();
})

</script>

<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: 'Room',
    data() {
        return {
            roompin: '' 
        }
    },
    created() {
        this.roompin = this.$route.params.roompin;
    }
}
</script>