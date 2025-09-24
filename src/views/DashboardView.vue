<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <p class="dashboard-header__title">
                MyApp
            </p>
            <p class="dashboard-header__user">
                Username
            </p>
        </div>

        <div class="dashboard-content">
            <div class="search-wrapper">
                <div class="search-block">
                    <p class="search-block__title">
                        Поиск документа
                    </p>
                    <SearchInput />
                </div>
                <div class="search-block">
                    <p class="search-block__title">
                        Результаты
                    </p>
                    <Loader :visible="store.loading" />
                    <div class="search-block__docs-list">
                        <DocumentCard
                            v-for="doc in store.documents"
                            :key="doc.id"
                            :doc="doc"
                        />
                    </div>
                    <div
                        v-if="store.error"
                        class="error"
                    >
                        {{ store.error }}
                    </div>
                </div>
            </div>

            <div class="dashboard-content__doc-preview">
                <DocumentPreview />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
import DocumentCard from '@/components/DocumentCard.vue'
import DocumentPreview from '@/components/DocumentPreview.vue'
import Loader from '@/components/Loader.vue'
import { useDocumentsStore } from '@/store/documents'

const store = useDocumentsStore()
</script>

<style scoped lang="scss">
@use "sass:map";

@use '@/assets/styles/colors.scss' as colors;

.dashboard {
    display: flex;
    flex-direction: column;
    gap: 35px;
    padding: 40px 50px;
}

.dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dashboard-header__title {
        font-weight: 700;
        font-size: 32px;
    }

    .dashboard-header__user {
        font-size: 16px;
    }
}


.dashboard-content {
    display: flex;
    height: 80vh;

    border-radius: 10px;
    background-color: map.get(colors.$background-colors, primary);
    box-shadow: map.get(colors.$shadows, sm);
}

.search-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px 30px 30px 20px;
    width: 20%;

    .search-block {
        display: flex;
        flex-direction: column;
        gap: 14px;

        .search-block__title {
            font-size: 16px;
            font-weight: 600;
        }
    }

    .search-block__docs-list {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }
}

.dashboard-content__doc-preview {
    width: 80%;

    background-color: map.get(colors.$background-colors, secondary);
    border-radius: 0 10px 10px 0;
    border-left: 1px solid #E0E0E0;
}
</style>
