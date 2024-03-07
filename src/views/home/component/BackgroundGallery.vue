<script setup lang="ts">
import { onUpdated, ref, watch } from 'vue'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons-vue'
import { useBackgroundStore, backgroundSourceList } from '@/store/modules/BackgroundStore'
import { storeToRefs } from 'pinia'
import { BingRequest, getAllBingImageList } from '@/api/background/bingService'

const backgroundStore = useBackgroundStore()

const { background } = storeToRefs(backgroundStore)

const backgroundType = 'video'

const setBackground = () => {
    background.value.url =
        // 'https://prod-streaming-video-msn-com.akamaized.net/a925b86d-ff80-43c3-8a7a-d40546c93a86/3aa04bd2-eb1f-47a8-9433-92e41744ffff.mp4'
        'https://prod-streaming-video-msn-com.akamaized.net/3cba863a-4f1c-4882-98e8-7031dffb59ab/31c3ea28-7af6-486b-ac85-3cf9240aa340.mp4'

    background.value.type = backgroundType
}

const backgroundSource = ref(1)

const baseBingReq: BingRequest = {
    format: 'js',
    n: 8,
    uhd: 1,
    uhdwidth: 3840,
    uhdheight: 2160
}

getAllBingImageList([
    { ...baseBingReq, idx: 0 },
    { ...baseBingReq, idx: 8 }
]).then((res) => {
    console.log(res)
})
</script>

<template>
    <a-flex vertical>
        <a-flex class="previewAndInformationSection">
            <div class="previewWindow">
                <img
                    v-if="backgroundType === 'image'"
                    class="picture"
                    id="backgroundImagePicture"
                    src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wppc?ver=11e4"
                />
                <video
                    v-if="backgroundType === 'video'"
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
                <div class="title">热带珊瑚礁</div>
                <div class="attribution">Yevgen Belich / Shutterstock</div>
                <div class="copyright">© 版权</div>
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
</style>
