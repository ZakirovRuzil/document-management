<template>
    <div v-if="visible" class="loader">Загрузка...</div>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<style scoped>
.loader {
    padding: 0.5rem;
    text-align: center;
    font-weight: 500;
}
</style>
