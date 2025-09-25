<template>
    <input
        type="text"
        v-model="search"
        placeholder="Введите ID документа"
        @keyup.enter="onSearch"
        class="search-input"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDocumentsStore } from '@/store/documents';

const store = useDocumentsStore();
const search = ref('');

function onSearch() {
    const query = search.value.trim();
    if (!query) {
        return;
    }

    store.searchDocs(query);
}
</script>

<style scoped lang="scss">
@use "sass:map";

@use '@/assets/styles/colors.scss' as colors;

.search-input {
    padding: 16px 24px;
    width: 100%;

    font-size: 14px;

    border: 1px solid map.get(colors.$grey, light);
    border-radius: 6px;
}
</style>
