<script setup lang="ts">
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons-vue'
const backgroundType = 'video'
</script>

<template>
    <a-flex>
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
                <a-button type="primary">应用</a-button>
                <a-button><LikeOutlined />赞</a-button>
                <a-button><DislikeOutlined /> 不喜欢</a-button>
            </a-flex>
        </div>
    </a-flex>
</template>

<style scoped lang="scss">
.previewWindow {
    width: 320px;
    height: 220px;
    border-radius: 8px;
    position: relative;

    .picture,
    .video {
        width: 320px;
        height: 220px;
        object-fit: cover;
        border-radius: 4px;
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
</style>
