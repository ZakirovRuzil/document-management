<template>
    <div v-if="doc" class="doc-preview">
        <h2>{{ doc.name }}</h2>
        <p>{{ doc.description }}</p>

        <button @click="downloadDoc">
            Скачать
        </button>
        <button @click="deleteDoc">
            Удалить
        </button>
    </div>
    <div v-else>
        <p>Выберите документ для просмотра</p>
    </div>
</template>

<script setup lang="ts">
import { useDocumentsStore } from '@/store/documents'

const store = useDocumentsStore()
const doc = store.selectedDoc

function downloadDoc() {
    if (!doc) return
    const blob = new Blob([doc.description], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${doc.name}.txt`
    link.click()
}

function deleteDoc() {
    if (!doc) return
    alert(`Документ ${doc.name} удалён!`)
}
</script>
