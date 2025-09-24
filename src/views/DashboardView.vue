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
                <div class="search-block scroll-section">
                    <p class="search-block__title">
                        Результаты
                    </p>
                    <Loader :visible="store.loading" />

                    <div
                        v-if="!store.loading && store.documents.length === 0 && !store.error"
                        class="search-block__empty"
                    >
                        Ничего не найдено
                    </div>

                    <div
                        v-else
                        class="search-block__docs-list"
                    >
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

        .search-block__empty {
            padding: 16px;
            font-size: 14px;
            color: map.get(colors.$text-colors, secondary);
        }
    }

    .scroll-section {
        flex: 1;
        min-height: 0;
    }

    .search-block__docs-list {
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding: 10px;
        flex: 1;

        min-height: 0;
        overflow-y: auto;

        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: #b8bec6 transparent;

        &::-webkit-scrollbar {
            width: 8px;
        }
    }
}

.dashboard-content__doc-preview {
    width: 80%;

    background-color: map.get(colors.$background-colors, secondary);
    border-radius: 0 10px 10px 0;
    border-left: 1px solid #E0E0E0;
}

.doc-card {
    transition: transform .1s ease, background .2s ease;

    &:hover {
        transform: translateY(-1px);
        background: #f5f7ff;
    }

    &.active {
        background: #1a73e8;

        .doc-card__doc-title,
        .doc-card__doc-size {
            color: #fff;
        }
    }
}

.error {
    color: map.get(colors.$text-colors, danger);
}
</style>
