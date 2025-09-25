import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchDocuments } from '@/services/dashboardApi';
import type { IDocument } from '@/services/types/dashboardTypes';

export const useDocumentsStore = defineStore('documents', () => {
    const documents = ref<IDocument[]>([]);
    const selectedDoc = ref<IDocument | undefined>(undefined);
    const loading = ref(false);
    const error = ref<string | null>(null);

    function clearResults() {
        documents.value = [];
        selectedDoc.value = undefined;
        error.value = null;
    }

    async function searchDocs(query: string) {
        loading.value = true;
        clearResults();
        try {
            documents.value = await fetchDocuments(query);
        } catch (e: unknown) {
            if (e instanceof Error) {
                error.value = e.message;
            } else {
                error.value = 'Ошибка при загрузке документов';
            }
        } finally {
            loading.value = false;
        }
    }

    function selectDoc(doc: IDocument) {
        selectedDoc.value = doc;
    }

    function removeDoc(id: number) {
        documents.value = documents.value.filter(d => d.id !== id);
        if (selectedDoc.value?.id === id) {
            selectedDoc.value = undefined;
        }
    }

    return {
        documents,
        selectedDoc,
        loading,
        error,
        searchDocs,
        selectDoc,
        removeDoc,
    };
})
