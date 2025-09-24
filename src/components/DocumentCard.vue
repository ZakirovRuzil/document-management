<template>
    <div
        class="doc-card"
        @click="store.selectDoc(doc)"
    >
        <div class="doc-card__image">
            <img
                :src="doc?.image ? doc.image : '/docImage.svg'"
                alt="docImage"
                loading="lazy"
            >
        </div>

        <div
            class="doc-card__info"
            :class="{
                active: store.selectedDoc && store.selectedDoc.id === doc.id
            }"
        >
            <p
                class="doc-card__doc-title"
            >
                {{ doc.name }}
            </p>
            <p
                class="doc-card__doc-size"
            >
                {{ doc.size }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDocumentsStore } from '@/store/documents'
import type { IDocument } from '@/services/types/dashboardTypes'

defineProps<{ doc: IDocument }>()
const store = useDocumentsStore()
</script>

<style scoped lang="scss">
@use "sass:map";

@use '@/assets/styles/colors.scss' as colors;

.doc-card {
    display: flex;

    background: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s;

    box-shadow: map.get(colors.$shadows, sm);

    .doc-card__image {
        flex-shrink: 0;
        width: 70px;
        height: 70px;

        border-right: 1px solid map.get(colors.$grey, light);
        border-radius: 10px 0 0 10px;


        overflow: hidden;
        background: #f7f7f7;
    }

    .doc-card__image img {
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center;
        display: block;
        user-select: none;
        -webkit-user-drag: none;
    }

    .doc-card__info {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 6px;
        padding: 15px;

        border-radius: 0 10px 10px 0;

        .doc-card__doc-title {
            font-size: 14px;
            font-weight: 600;
            color: map.get(colors.$text-colors, primary);
        }

        .doc-card__doc-size {
            color: map.get(colors.$text-colors, secondary);
        }
    }

    .doc-card__info.active {
        background: #1a73e8;

        .doc-card__doc-title,
        .doc-card__doc-size {
            color: #fff;
        }
    }
}

.doc-card:hover {
    background: #f0f0f0;
}
</style>
