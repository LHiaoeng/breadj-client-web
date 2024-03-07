<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons-vue'
import {
    useBackgroundStore,
    backgroundSourceList,
    Background
} from '@/store/modules/BackgroundStore'
import { storeToRefs } from 'pinia'
import { BingRequest, getAllBingImageList } from '@/api/background/bingService'

const props = defineProps<{
    modalOpen: boolean
}>()

const { modalOpen } = toRefs(props)
const backgroundSource = ref(1)

const backgroundStore = useBackgroundStore()
const { background, bingBackgroundList } = storeToRefs(backgroundStore)
const selectedBackgroundIndex = ref(background.value.urlBase)
const selectedBackground = ref(null)

if (background.value) {
    selectedBackground.value = background.value
}

function initBingGallery(): void {
    if (bingBackgroundList.value.length > 0) {
        return
    }

    const baseBingReq: BingRequest = {
        format: 'js',
        n: 8,
        uhd: 1,
        uhdwidth: 320,
        uhdheight: 180
    }

    getAllBingImageList([
        { ...baseBingReq, idx: 0 },
        { ...baseBingReq, idx: 8 }
    ]).then((res) => {
        backgroundStore.setBingBackgroundList(res)

        console.log('bingBackgroundList', bingBackgroundList.value)
    })
}
function initGallery(): void {
    if (backgroundSource.value === 1) {
        initBingGallery()
    }
}

watch(modalOpen, () => {
    if (modalOpen.value) {
        initGallery()
    }
})

// 配置对象，用于存储要替换的键值对
const resolutionMapping = {
    'w=320': 'w=3840',
    'h=180': 'h=2160'
}

const setBackground = () => {
    // 检查 selectedBackground 是否定义，以及它是否有 url 属性
    if (selectedBackground.value && typeof selectedBackground.value.url === 'string') {
        let { url } = selectedBackground.value
        // 使用循环和配置对象进行高效的替换
        Object.entries(resolutionMapping).forEach(([search, replace]) => {
            url = url.replace(search, replace)
        })

        console.log('url', url)
        // 检查替换后的URL是否与原始URL不同
        if (url !== selectedBackground.value.url) {
            selectedBackground.value.url = url
            background.value = selectedBackground.value
        }
    } else {
        // 可以在这里处理 selectedBackground 或者 url 属性未定义的情况
        console.warn('selectedBackground or its url property is undefined.')
    }
}

const selectImage = (index: string) => {
    selectedBackgroundIndex.value = index
    selectedBackground.value = bingBackgroundList.value.find(({ urlBase }) => urlBase === index)
}
</script>

<template>
    <a-flex vertical>
        <a-flex class="previewAndInformationSection">
            <div class="previewWindow">
                <img
                    v-if="selectedBackground.type === 'image'"
                    class="picture"
                    id="backgroundImagePicture"
                    :src="selectedBackground.url"
                />
                <video
                    v-if="selectedBackground.type === 'video'"
                    class="video"
                    autoplay
                    loop
                    muted
                    src="https://prod-streaming-video-msn-com.akamaized.net/73165e4b-2d93-4cb0-bdc2-4ef05acbc704/8a74a05a-60c3-44a1-9363-31d8d85fd82c.mp4"
                    poster="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA12PJYI.img"
                ></video>
                <div class="playbackButtonSection"></div>
            </div>
            <div class="informationSection">
                <div class="title">{{ selectedBackground.title }}</div>
                <div class="attribution">{{ selectedBackground.description }}</div>
                <div class="copyright">© 版权 {{ selectedBackground.copyright }}</div>
                <a-flex gap="small" class="backgroundDispositionControls">
                    <a-button type="primary" @click="setBackground">应用</a-button>
                    <a-button><LikeOutlined />赞</a-button>
                    <a-button><DislikeOutlined /> 不喜欢</a-button>
                </a-flex>
            </div>
        </a-flex>
        <a-flex class="backgroundDisplaySettings">
            <span class="backgroundSectionHeading">背景</span>
            <a-radio-group class="backgroundSources" v-model:value="backgroundSource">
                <a-radio-button
                    v-for="item in backgroundSourceList"
                    :key="item.key"
                    :value="item.key"
                    >{{ item.tab }}</a-radio-button
                >
            </a-radio-group>
        </a-flex>
        <a-flex wrap="wrap" gap="8" class="backgroundSelectionSection">
            <a-image
                v-bind:class="{ selected: item.urlBase === selectedBackgroundIndex }"
                v-for="item in bingBackgroundList"
                :key="item.urlBase"
                :src="item.url"
                :alt="item.description"
                :width="100"
                :height="100"
                :preview="false"
                @click="selectImage(item.urlBase)"
            >
                <div>0000</div>
            </a-image>
        </a-flex>
    </a-flex>
</template>

<style scoped lang="scss">
.previewAndInformationSection {
    .previewWindow {
        width: 320px;
        height: 180px;
        border-radius: 8px;
        position: relative;

        .picture,
        .video {
            width: 320px;
            height: 180px;
            object-fit: cover;
            border-radius: 8px;
        }

        .playbackButtonSection {
            position: absolute;
            bottom: 8px;
        }
    }

    .informationSection {
        flex: 1;
        margin-left: 16px;
        max-width: 435px;
        position: relative;

        .title {
            font-size: 20px;
            font-weight: 600;
        }

        .attribution {
            margin-top: 12px;
            font-size: 12px;
        }
        .copyright {
            font-size: 12px;
            margin-top: 12px;
            opacity: 0.55;
        }

        .backgroundDispositionControls {
            bottom: 6px;
            position: absolute;
        }
    }
}

.backgroundDisplaySettings {
    margin: 16px 0;

    .backgroundSectionHeading {
        font-size: 20px;
        font-weight: 600;
    }

    .backgroundSources {
        margin-left: auto;
    }
}

.backgroundSelectionSection {
    //background-color: #4a4a4a;
    box-shadow: 0px 1.6px 3.6px rgba(0, 0, 0, 0.13), 0px 0px 2.9px rgba(0, 0, 0, 0.11);
    border-radius: 8px;
    width: 100%;
    padding: 16px;

    :deep(.ant-image) {
        img {
            border-radius: 8px;
            object-fit: cover;
        }
        img:hover {
            cursor: pointer;
        }

        img.selected {
            outline: 2px solid #1677ff;
        }
    }
}
</style>
