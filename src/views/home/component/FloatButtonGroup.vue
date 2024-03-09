<script setup lang="ts">
import { ref } from 'vue'
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    PictureOutlined,
    ArrowsAltOutlined,
    ShrinkOutlined,
    DownloadOutlined,
    EyeOutlined
} from '@ant-design/icons-vue'
import { useBackgroundStore } from '@/store/modules/BackgroundStore'
import { useMainLayoutStore } from '@/store/modules/MainLayoutStore'
import { storeToRefs } from 'pinia'
import BackgroundGallery from '@/views/home/component/BackgroundGallery.vue'

defineProps<{
    vertical?: {
        type: boolean
        default: false
    }
    justify?: {
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

// 解析文件名和格式的函数
function parseFileNameAndExtension(url: string) {
    const parts = url.split('/')
    const fileNameWithExtension = parts[parts.length - 1]
    const fileNameParts = fileNameWithExtension.split('.')
    const fileName = fileNameParts.slice(0, -1).join('.')
    const extension = fileNameParts[fileNameParts.length - 1]
    return { fileName, extension }
}

// 下载文件的函数
function downloadFile() {
    const { url, title } = background.value
    const { fileName, extension } = parseFileNameAndExtension(url)
    const link = document.createElement('a')
    link.href = url
    link.download = `${title || fileName}.${extension}`

    // 判断是否同源，不同源则在新标签页中打开资源
    if (
        /^(http|https):\/\/.*/.test(url as string) &&
        window.location.origin !== new URL(url).origin
    ) {
        window.open(url, '_blank')
    } else {
        link.click()
    }
}

const visible = ref<boolean>(false)
const setVisible = (value): void => {
    visible.value = value
}
</script>

<template>
    <div>
        <a-flex class="container" gap="small" :vertical="vertical" :justify="justify">
            <a-button :size="btnSize" type="text" title="预览背景" @click="() => setVisible(true)"
                ><EyeOutlined
            /></a-button>
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
        </a-flex>
        <div class="hideComponent">
            <a-modal v-model:open="open" :footer="null" width="830px" :destroyOnClose="false">
                <BackgroundGallery :modalOpen="open" />
                <template #title>
                    <div class="backgroundGalleryHeading">自定义背景</div>
                </template>
            </a-modal>
            <a-image
                :preview="{
                    visible,
                    onVisibleChange: setVisible
                }"
                :src="background.url"
            />
        </div>
    </div>
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

.hideComponent {
    display: none;

    .backgroundGalleryHeading {
        font-weight: 600;
        font-size: 24px;
    }
}
</style>
