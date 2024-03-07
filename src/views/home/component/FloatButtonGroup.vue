<script setup lang="ts">
import { ref } from 'vue'
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    PictureOutlined,
    ArrowsAltOutlined,
    ShrinkOutlined,
    DownloadOutlined
} from '@ant-design/icons-vue'
import { useBackgroundStore } from '@/store/modules/BackgroundStore'
import { useMainLayoutStore } from '@/store/modules/MainLayoutStore'
import { storeToRefs } from 'pinia'
import BackgroundGallery from '@/views/home/component/BackgroundGallery.vue'

defineProps<{
    vertical: {
        type: Boolean
        default: false
    }
    justify: {
        type: String
        default: 'normal'
    }
}>()

type SizeType = 'small' | 'middle' | 'large' | undefined

const btnSize = ref<SizeType | 'customize'>('small')

const store = useBackgroundStore()
const mainLayoutStore = useMainLayoutStore()
const { isVideoPlay, background } = storeToRefs(store)
const { isShowMainLayout } = storeToRefs(mainLayoutStore)

const togglePlayPause = () => {
    isVideoPlay.value = !isVideoPlay.value
}

const toggleOverlay = () => {
    isShowMainLayout.value = !isShowMainLayout.value
}

const getPlayPauseIcon = () => (isVideoPlay.value ? PauseCircleOutlined : PlayCircleOutlined)
const getBackgroundShowIcon = () => (isShowMainLayout.value ? ArrowsAltOutlined : ShrinkOutlined)

const open = ref<boolean>(false)

const showModal = () => {
    open.value = true
}

const downloadFile = () => {
    const a = document.createElement('a')
    // const urlPath = window.URL.createObjectURL(new Blob([source.value], { type: 'video/mp4' }))
    a.href = background.value.url
    a.target = '_blank'
    a.download = background.value.title
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
</script>

<template>
    <a-flex class="container" gap="small" :vertical="vertical" :justify="justify">
        <a-button :size="btnSize" type="text" title="下载背景" @click="downloadFile"
            ><DownloadOutlined
        /></a-button>
        <a-button
            :size="btnSize"
            type="text"
            @click="togglePlayPause"
            :title="isVideoPlay ? '暂停视频' : '播放背景'"
            v-if="background.type === 'video'"
        >
            <component :is="getPlayPauseIcon()" />
        </a-button>
        <a-button :size="btnSize" type="text" title="编辑背景" @click="showModal"
            ><PictureOutlined
        /></a-button>
        <a-button :size="btnSize" type="text" title="展开背景" @click="toggleOverlay"
            ><component :is="getBackgroundShowIcon()"
        /></a-button>
        <a-modal v-model:open="open" :footer="null" width="800px">
            <BackgroundGallery />
            <template #title>
                <div class="backgroundGalleryHeading">自定义背景</div>
            </template>
        </a-modal>
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

.backgroundGalleryHeading {
    font-weight: 600;
    font-size: 24px;
}
</style>
