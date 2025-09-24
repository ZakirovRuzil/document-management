<template>
    <div v-if="store.selectedDoc" class="doc-preview">
        <div class="doc-preview__left">
            <div class="doc-preview__media">
                <img
                    :src="store.selectedDoc?.image
                        ? store.selectedDoc.image
                        : '/docImage.svg'
                    "
                    alt="document"
                    class="doc-preview__image"
                >
            </div>
        </div>

        <div class="doc-preview__right">
            <h2 class="doc-preview__title">
                {{ store.selectedDoc.name }}
            </h2>
            <div class="doc-preview__actions">
                <button
                    class="doc-preview__btn doc-preview__btn--download"
                    @click="downloadDoc"
                >
                    Скачать
                </button>
                <button
                    class="doc-preview__btn doc-preview__btn--delete"
                    @click="deleteDoc"
                    :disabled="!store.selectedDoc?.image"
                >
                    Удалить
                </button>
            </div>

            <div class="doc-preview__description">
                <p class="doc-preview__description-title">
                    Описание:
                </p>
                <p class="doc-preview__description-text">
                    {{ store.selectedDoc.description }}
                </p>
            </div>
        </div>
    </div>

    <div v-else class="doc-preview__empty">
        <p>Выберите документ, чтобы посмотреть его содержимое</p>
    </div>
</template>

<script setup lang="ts">
import { useDocumentsStore } from '@/store/documents'

const store = useDocumentsStore()

function downloadDoc() {
    if (!store.selectedDoc) return
    const blob = new Blob([store.selectedDoc.description], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${store.selectedDoc.name}.txt`
    link.click()
}

function deleteDoc() {
    if (!store.selectedDoc) return
    alert(`Документ ${store.selectedDoc.name} удалён!`)
}
</script>

<style scoped lang="scss">
@use "sass:map";
@use '@/assets/styles/colors.scss' as colors;

.doc-preview {
    display: flex;
    gap: 40px;
    height: 100%;
    padding: 30px;

    .doc-preview__left {
        flex: 0 0 auto;
        display: flex;
        align-items: flex-start;
        justify-content: center;

        .doc-preview__media {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            width: clamp(360px, 48vw, 560px);
            aspect-ratio: 3 / 2;
            height: auto;

            border: 1px solid #e0e0e0;
            border-radius: 6px;
            background: #fff;

            overflow: hidden;
        }

        .doc-preview__image {
            display: block;
            width: 100%;
            height: 100%;

            object-fit: contain;
            object-position: top center;
            user-select: none;
            -webkit-user-drag: none;
            box-sizing: border-box;
        }
    }

    .doc-preview__right {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 0;

        .doc-preview__title {
            margin: 0;

            font-size: 16px;
            font-weight: 600;
        }

        .doc-preview__actions {
            display: flex;
            gap: 18px;
        }

        .doc-preview__btn {
            padding: 6px 14px;

            font-size: 14px;
            font-weight: 500;

            border-radius: 6px;
            border: 1px solid transparent;
            background: #fff;

            transition: background-color .15s ease, border-color .15s ease, color .15s ease;
            cursor: pointer;

            &--download {
                color: map.get(colors.$text-colors, blue);
                border-color: map.get(colors.$text-colors, blue);
            }

            &--download:hover {
                background: rgba(26, 115, 232, 0.08);
            }

            &--delete {
                color: map.get(colors.$text-colors, danger);
                border-color: map.get(colors.$text-colors, danger);
            }

            &--delete:hover {
                background: rgba(233, 78, 78, 0.08);
            }

            &:disabled {
                opacity: .5;
                cursor: not-allowed;
                pointer-events: none;
            }
        }

        .doc-preview__description {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .doc-preview__description-title {
            margin: 0;

            font-size: 16px;
            font-weight: 600;
        }

        .doc-preview__description-text {
            margin: 0;

            color: map.get(colors.$text-colors, secondary);
        }
    }
}

.doc-preview__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 30px;

    color: map.get(colors.$text-colors, secondary);
}
</style>
