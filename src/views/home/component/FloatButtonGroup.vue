<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
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

const targetElement = ref<HTMLElement | null>(null)

// 检测指定元素的背景颜色
const checkBackgroundColor = () => {
    console.log(document.querySelector('.container'))
    if (targetElement.value) {
        const computedStyle = window.getComputedStyle(document.querySelector('.container'))
        const { backgroundColor } = computedStyle
        console.log('指定元素的背景颜色:', backgroundColor)
    } else {
        console.error('指定元素不存在')
    }
}

// 获取指定位置的主要颜色
const analyzeMainColors = () => {
    // Get reference to the content area
    const contentArea = targetElement.value

    // Create a canvas element
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Set canvas dimensions
    canvas.width = contentArea.offsetWidth
    canvas.height = contentArea.offsetHeight

    console.log('contentArea.offsetWidth:', contentArea.offsetWidth)
    console.log('contentArea.offsetHeight:', contentArea.offsetHeight)

    // // Draw content onto the canvas
    // ctx.drawImage(0, 0, contentArea.offsetWidth, contentArea.offsetHeight)
    //
    // // Get pixel data
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    // const pixels = imageData.data
    //
    // // Analyze colors
    // const colorCounts = {}
    // for (let i = 0; i < pixels.length; i += 4) {
    //     const r = pixels[i]
    //     const g = pixels[i + 1]
    //     const b = pixels[i + 2]
    //     const color = `rgb(${r},${g},${b})`
    //
    //     // Count color occurrences
    //     if (colorCounts[color]) {
    //         colorCounts[color]++
    //     } else {
    //         colorCounts[color] = 1
    //     }
    // }
    //
    // // Find the most common color
    // let maxCount = 0
    // let mainColor = ''
    // for (const color in colorCounts) {
    //     if (colorCounts[color] > maxCount) {
    //         maxCount = colorCounts[color]
    //         mainColor = color
    //     }
    // }
    //
    // // Output the main color
    // console.log('Main color:', mainColor)
}

// 在组件挂载后开始定时检测背景颜色
onMounted(() => {
    analyzeMainColors()
    // const element = document.querySelector('.container')
    console.log('targetElement:', targetElement.value)
    const element = targetElement.value.$el
    console.log('element:', element)

    if (element) {
        const rect = element.getBoundingClientRect()

        console.log('Element position:', rect)
        console.log('Element top:', rect.top)
        console.log('Element left:', rect.left)
        console.log('Element right:', rect.right)
        console.log('Element bottom:', rect.bottom)
        console.log('Element width:', rect.width)
        console.log('Element height:', rect.height)
    }
})
</script>

<template>
    <div>
        <a-flex
            class="container"
            gap="small"
            :vertical="vertical"
            :justify="justify"
            ref="targetElement"
        >
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
