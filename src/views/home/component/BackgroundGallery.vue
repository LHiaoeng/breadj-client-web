<script setup lang="ts">
import { onMounted, ref, toRefs, reactive, watchEffect } from 'vue'
import { LikeOutlined, DislikeOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'
import {
    useBackgroundStore,
    backgroundSourceList,
    backgroundTypeList,
    Wallpaper
} from '@/store/modules/BackgroundStore'
import { storeToRefs } from 'pinia'
import PlaceholderImage from '@/components/common/PlaceholderImage.vue'
import { getWallpaperPage, WallpaperPageRequest, WallpaperPageResponse } from '@/api/background'
import { debounce } from 'lodash'

const props = defineProps<{
    modalOpen: boolean
}>()

const { modalOpen } = toRefs(props)
const backgroundPageData = reactive<WallpaperPageResponse>({})

const backgroundStore = useBackgroundStore()
const { background } = storeToRefs(backgroundStore)
const selectedBackgroundIndex = ref(background.value.id)
const selectedBackground = ref<Wallpaper>(null)

if (background.value) {
    selectedBackground.value = background.value
}

const setBackground = () => {
    backgroundStore.setBackground(selectedBackground.value)
}

const pageSizeOptions = ref<string[]>(['14', '21', '28', '42', '56'])
const currentPage = ref<number>(1)
const currentPageSize = ref<number>(14)
const keyword = ref<string>('')
const currentType = ref<number>(undefined)
const currentSource = ref<number>(undefined)

const wallpaperPageRequest = reactive<WallpaperPageRequest>({
    page: currentPage.value,
    size: currentPageSize.value,
    source: currentType.value,
    type: currentSource.value,
    title: keyword.value
})

const reset = () => {
    currentPage.value = 1
    currentType.value = undefined
    currentSource.value = undefined
    keyword.value = ''
    wallpaperPageRequest.title = ''
}

const onTypeChange = () => {
    currentPage.value = 1
}

const onSourceChange = () => {
    currentPage.value = 1
}

const initGallery = debounce(() => {
    getWallpaperPage(wallpaperPageRequest).then((res) => {
        Object.assign(backgroundPageData, res.data)
    })
}, 300)

watchEffect(() => {
    Object.assign(wallpaperPageRequest, {
        page: currentPage.value,
        size: currentPageSize.value,
        title: keyword.value,
        type: currentType.value,
        source: currentSource.value
    })

    initGallery()
})

const onShowSizeChange = (current: number, pageSize: number) => {
    currentPage.value = 1
}

const onKeywordChange = () => {
    currentPage.value = 1
}

const getImageSrc = (wallpaper: Wallpaper) => {
    if (!wallpaper) return ''
    return wallpaper.poster && wallpaper.poster.trim() !== '' ? wallpaper.poster : wallpaper.url
}

onMounted(() => {
    initGallery()
})

const selectImage = (index: number) => {
    selectedBackgroundIndex.value = index
    selectedBackground.value = backgroundPageData.records.find(({ id }) => id === index)
}

const handleImageLoad = (title: string) => {
    console.log(`${title} Image loaded successfully`)
}
</script>

<template>
    <a-flex vertical>
        <a-flex class="previewAndInformationSection">
            <div class="previewWindow">
                <img
                    v-if="selectedBackground.type === 1"
                    class="picture"
                    id="backgroundImagePicture"
                    :src="getImageSrc(selectedBackground)"
                    @load="handleImageLoad(selectedBackground.title)"
                    referrerpolicy="no-referrer"
                />
                <video
                    v-if="selectedBackground.type === 2"
                    class="video"
                    autoplay
                    loop
                    muted
                    :src="selectedBackground.url"
                    :poster="selectedBackground.poster"
                ></video>
                <div class="playbackButtonSection"></div>
            </div>
            <div class="informationSection">
                <div class="title">{{ selectedBackground.title }}</div>
                <a-typography-paragraph
                    class="attribution"
                    :ellipsis="{ rows: 3, tooltip: selectedBackground.description }"
                    :content="selectedBackground.description"
                />

                <div class="copyright">
                    <a-space>
                        <span
                            >©
                            {{
                                selectedBackground.copyright &&
                                selectedBackground.copyright.startsWith('©')
                                    ? selectedBackground.copyright.substring(1)
                                    : selectedBackground.copyright
                            }}</span
                        >
                        <span
                            >发布时间：{{
                                selectedBackground.launchTime
                                    ? selectedBackground.launchTime.substring(0, 10)
                                    : '未知'
                            }}</span
                        >
                    </a-space>
                </div>
                <a-flex gap="small" class="backgroundDispositionControls">
                    <a-button type="primary" @click="setBackground">应用</a-button>
                    <!--                    <a-button><LikeOutlined />赞</a-button>-->
                    <!--                    <a-button><DislikeOutlined /> 不喜欢</a-button>-->
                </a-flex>
            </div>
        </a-flex>
        <a-flex class="backgroundDisplaySettings">
            <span class="backgroundSectionHeading">背景</span>
            <div class="backgroundConditions">
                <a-space>
                    <a-input
                        v-model:value.trim="keyword"
                        placeholder="请输入关键字"
                        allow-clear
                        @change="onKeywordChange"
                    />
                    <a-radio-group @change="onTypeChange" v-model:value="currentType">
                        <a-radio-button
                            v-for="item in backgroundTypeList"
                            :key="item.key"
                            :value="item.key"
                            >{{ item.tab }}</a-radio-button
                        >
                    </a-radio-group>
                    <a-radio-group v-model:value="currentSource" @change="onSourceChange">
                        <a-radio-button
                            v-for="item in backgroundSourceList"
                            :key="item.key"
                            :value="item.key"
                            >{{ item.tab }}</a-radio-button
                        >
                    </a-radio-group>
                    <a-button @click="reset">重置</a-button>
                </a-space>
            </div>
        </a-flex>
        <a-flex wrap="wrap" gap="8" class="backgroundSelectionSection">
            <div class="wrapper" v-for="item in backgroundPageData.records">
                <a-image
                    v-bind:class="{ selected: item.id === selectedBackgroundIndex }"
                    :key="item.id"
                    :src="getImageSrc(item)"
                    :alt="item.title"
                    :width="100"
                    :height="100"
                    :preview="false"
                    @click="selectImage(item.id)"
                    @load="handleImageLoad(item.title)"
                    referrerpolicy="no-referrer"
                    fallback="data:image/png;base64,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"
                >
                    <template #placeholder>
                        <PlaceholderImage width="100" height="100" />
                    </template>
                </a-image>
                <a-flex justify="center" v-if="item.type === 2" class="videoIndicator">
                    <VideoCameraOutlined />
                </a-flex>
            </div>

            <a-pagination
                class="pagination"
                v-model:current="currentPage"
                v-model:page-size="currentPageSize"
                :total="backgroundPageData.total"
                v-model:page-size-options="pageSizeOptions"
                @showSizeChange="onShowSizeChange"
                size="small"
                :show-total="(total, range) => `第${range[0]}-${range[1]}张，共${total}张`"
            >
                <template #buildOptionText="props">
                    <span>{{ props.value }}张/页</span>
                </template>
            </a-pagination>
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
            min-height: 58px;
        }
        .copyright {
            margin-top: 12px;
            opacity: 0.55;

            :deep(.ant-space) {
                font-size: 12px;
            }
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

    .backgroundConditions {
        margin-left: auto;
    }
}

.backgroundSelectionSection {
    //background-color: #4a4a4a;
    box-shadow: 0px 1.6px 3.6px rgba(0, 0, 0, 0.13), 0px 0px 2.9px rgba(0, 0, 0, 0.11);
    border-radius: 8px;
    width: 100%;
    padding: 16px;

    .wrapper {
        position: relative;

        .videoIndicator {
            position: absolute;
            top: 4px;
            left: 4px;
            width: 24px;
            height: 24px;
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
        }

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

    .pagination {
        flex: 0 0 100%;
        text-align: right;
    }
}
</style>
