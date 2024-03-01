<script setup lang="ts">
import { ref } from 'vue'
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    PictureOutlined,
    ArrowsAltOutlined
} from '@ant-design/icons-vue'
import { useBackgroundStore } from '@/store/modules/BackgroundStore'
import { useMainLayoutStore } from '@/store/modules/MainLayoutStore'
import { storeToRefs } from 'pinia'

type SizeType = 'small' | 'middle' | 'large' | undefined

const btnSize = ref<SizeType | 'customize'>('small')

const store = useBackgroundStore()
const mainLayoutStore = useMainLayoutStore()
const { isVideoPlay } = storeToRefs(store)
const { isShowMainLayout } = storeToRefs(mainLayoutStore)

const togglePlayPause = () => {
    isVideoPlay.value = !isVideoPlay.value
}

const toggleOverlay = () => {
    isShowMainLayout.value = !isShowMainLayout.value
}

const getPlayPauseIcon = () => (isVideoPlay.value ? PauseCircleOutlined : PlayCircleOutlined)
</script>

<template>
    <a-flex class="container" gap="small" vertical>
        <a-button
            :size="btnSize"
            type="text"
            @click="togglePlayPause"
            :title="isVideoPlay ? '暂停视频' : '播放背景'"
        >
            <component :is="getPlayPauseIcon()" />
        </a-button>
        <a-button :size="btnSize" type="text" title="编辑背景"><PictureOutlined /></a-button>
        <a-button :size="btnSize" type="text" title="展开背景" @click="toggleOverlay"
            ><ArrowsAltOutlined
        /></a-button>
    </a-flex>
</template>

<style scoped lang="scss">
.container {
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
