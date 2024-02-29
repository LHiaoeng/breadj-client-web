<template>
    <div class="background-container" v-if="source">
        <img v-if="type === 'image'" :src="source" alt="background" />
        <video
            ref="backgroundVideoRef"
            v-else-if="type === 'video'"
            :src="source"
            autoplay
            loop
            muted
        ></video>
        <div class="museumCard" v-if="!isShowMainLayout">
            <div class="museumCardCreditsContainer">
                <div class="museumCardTitleContainer">
                    <a class="museumCardTitle">比尔吉沃特</a>
                    <p class="museumCardCredits backgroundGallery">英雄联盟</p>
                </div>
                <div class="copyrightContainer">© 版权</div>
            </div>
            <a-flex class="container" gap="small" justify="flex-end">
                <a-button
                    :size="btnSize"
                    type="text"
                    :title="isVideoPlay ? '暂停视频' : '播放背景'"
                >
                    <PlayCircleOutlined v-if="!isVideoPlay" />
                    <PauseCircleOutlined v-if="isVideoPlay"
                /></a-button>
                <a-button :size="btnSize" type="text" title="编辑背景"
                    ><PictureOutlined
                /></a-button>
                <a-button :size="btnSize" type="text" title="退出完整视图" @click="toggleMainLayout"
                    ><ShrinkOutlined />
                </a-button>
            </a-flex>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import { useBackgroundStore } from '@/store/modules/BackgroundStore'
import { useMainLayoutStore } from '@/store/modules/MainLayoutStore'
import { storeToRefs } from 'pinia'
import {
    PauseCircleOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    ShrinkOutlined
} from '@ant-design/icons-vue'

type SizeType = 'small' | 'middle' | 'large' | undefined

const btnSize = ref<SizeType | 'customize'>('small')

const store = useBackgroundStore()
const mainLayoutStore = useMainLayoutStore()

const { type, source, isVideoPlay } = storeToRefs(store)
const { isShowMainLayout } = storeToRefs(mainLayoutStore)

const backgroundVideoRef = ref<HTMLVideoElement | null>(null)

// 监听背景视频播放状态
watch(isVideoPlay, (newValue) => {
    if (newValue) {
        try {
            backgroundVideoRef.value.play()
        } catch (error) {
            console.error('Error playing video:', error)
        }
    } else {
        try {
            backgroundVideoRef.value.pause()
        } catch (error) {
            console.error('Error pausing video:', error)
        }
    }
})

onMounted(() => {
    if (backgroundVideoRef.value) {
        backgroundVideoRef.value.addEventListener('play', () => {
            isVideoPlay.value = true
        })
        backgroundVideoRef.value.addEventListener('pause', () => {
            isVideoPlay.value = false
        })
    }
})

const toggleMainLayout = () => {
    isShowMainLayout.value = !isShowMainLayout.value
}
</script>

<style scoped lang="scss">
.background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.background-container img,
.background-container video {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.museumCard {
    color: rgb(255, 255, 255);
    opacity: 1;
    position: absolute;
    transition: opacity 0.2s ease 0s;
    z-index: 100;
    left: initial;
    right: 12px;
    bottom: 7px;

    .museumCardCreditsContainer {
        background: rgba(0, 0, 0, 0.77);
        border-bottom: 1px solid transparent;
        border-radius: 4px;
        font-family: inherit;
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 10px;
        max-width: 384px;
        padding: 8px 4px;

        .museumCardTitleContainer {
            background: rgba(0, 0, 0, 0.77);
            border-bottom: 1px solid transparent;
            border-radius: 4px;
            font-family: inherit;
            font-size: 12px;
            font-weight: 400;
            margin-bottom: 10px;
            max-width: 384px;
            padding: 0px 12px;

            .museumCardTitle {
                display: inline-block;
                width: 362px;
                color: rgb(255, 255, 255);
                font-family: inherit;
                font-size: 20px;
                font-weight: 400;
                line-height: 24px;
                margin: 4px 0px;
                text-decoration: none;
            }

            .museumCardTitle:hover {
                cursor: pointer;
                text-decoration: underline;
            }

            .museumCardCredits {
                color: rgba(255, 255, 255, 0.54);
                font-size: 13px;
                margin: 10px 0px 12px !important;
            }
        }

        .copyrightContainer {
            color: rgba(255, 255, 255, 0.54);
            padding-left: 12px;
            padding-bottom: 10px;
        }
    }

    button {
        color: white;
        width: auto;
    }
    button:hover {
        color: white;
        background: rgba(240, 240, 240, 0.2);
    }
}
</style>
