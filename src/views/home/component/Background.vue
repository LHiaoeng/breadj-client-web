<template>
    <div class="background-container" v-if="background">
        <img
            v-if="background.type === 1"
            :src="background.url"
            alt="background"
            @load="handleBackgroundLoaded"
            referrerpolicy="no-referrer"
        />
        <video
            ref="backgroundVideoRef"
            v-else-if="background.type === 2"
            :src="background.url"
            :poster="background.poster"
            autoplay
            loop
            muted
        ></video>
        <div class="museumCard" v-if="!isShowMainLayout">
            <div class="museumCardCreditsContainer">
                <div class="museumCardTitleContainer">
                    <export-out-url
                        class="museumCardTitle"
                        :content="background.title"
                        :link="background.titleLink"
                    />
                    <p class="museumCardCredits backgroundGallery">{{ background.description }}</p>
                </div>
                <CopyrightUrl
                    class="copyrightContainer"
                    :copyright="background.copyright"
                    :copyright-link="background.copyrightLink"
                />
            </div>
            <FloatButtonGroup justify="flex-end" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import { BingRequest, getBingWallpapers } from '@/api/background/bingService'
import { useBackgroundStore, Wallpaper } from '@/store/modules/BackgroundStore'
import { useMainLayoutStore } from '@/store/modules/MainLayoutStore'
import FloatButtonGroup from '@/views/home/component/FloatButtonGroup.vue'
import { storeToRefs } from 'pinia'
import { ExportOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { loginPath } from '@/config'
import CopyrightUrl from '@/components/common/CopyrightUrl.vue'
import ExportOutUrl from '@/components/common/ExportOutUrl.vue'

const backgroundStore = useBackgroundStore()
const mainLayoutStore = useMainLayoutStore()

const { background, isVideoPlay, backgroundExpire } = storeToRefs(backgroundStore)
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

const defaultBackground: Wallpaper = {
    type: 2,
    url: './animated-bilgewater.webm',
    title: '比尔吉沃特',
    titleLink: 'https://yz.lol.qq.com/zh_CN/region/bilgewater/',
    copyright: '英雄联盟',
    copyrightLink: 'https://lol.qq.com/',
    description:
        '在远离大陆的蓝焰群岛边缘，坐落着独一无二的港城比尔吉沃特。海蛇猎人、码头帮派和走私偷运者从已知世界的四面八方来到这里安家落户。在这里，富可敌国或是家破人亡都只在转瞬之间。对于那些逃避审判、债务和迫害的人，这个城市能让他们重获新生，因为在比尔吉沃特的蜿蜒街路上，没人会在乎你的过去。话虽如此，每当拂晓之际，粗心大意之人都会漂在港湾中，钱袋空空，喉头见血......\n'
}

onMounted(() => {
    const req: BingRequest = {
        format: 'js',
        idx: -1,
        n: 1,
        uhd: 1
    }

    if (!background.value || backgroundExpire.value !== -1) {
        const nowTimestamp = Date.now()

        if (backgroundExpire.value < nowTimestamp) {
            getBingWallpapers(req)
                .then((res: Wallpaper[]) => {
                    background.value = res.data.length > 0 ? res.data[0] : defaultBackground
                })
                .catch(() => {
                    background.value = defaultBackground
                })

            // 当天23:59:59 过期
            const endOfDayTimestamp = dayjs(new Date()).endOf('day').valueOf()
            backgroundStore.setBackgroundExpire(endOfDayTimestamp)
        }
    }

    if (backgroundVideoRef.value) {
        backgroundVideoRef.value.addEventListener('play', () => {
            isVideoPlay.value = true
        })
        backgroundVideoRef.value.addEventListener('pause', () => {
            isVideoPlay.value = false
        })
    }
})

const handleBackgroundLoaded = () => {
    console.log('background loaded')
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
            padding: 0px 12px;

            .museumCardTitle {
                display: inline-block;
                width: 362px;
                color: rgb(255, 255, 255);
                font-family: inherit;
                font-size: 20px;
                font-weight: 400;
                line-height: 24px;
                margin: 4px 0;
                text-decoration: none;
            }

            .museumCardCredits {
                color: rgba(255, 255, 255, 0.54);
                font-size: 13px;
                margin: 10px 0 12px !important;
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

    a .anticon {
        margin-left: 2px;
    }
}
</style>
