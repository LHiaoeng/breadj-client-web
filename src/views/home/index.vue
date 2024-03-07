<script setup lang="ts">
import { useMainLayoutStore } from '@/store/modules/MainLayoutStore'
import { storeToRefs } from 'pinia'
import FloatButtonGroup from '@/views/home/component/FloatButtonGroup.vue'
import Background from '@/views/home/component/Background.vue'
import Header from '@/views/home/component/Header.vue'
import Content from '@/views/home/component/Content.vue'
import Footer from '@/views/home/component/Footer.vue'

const store = useMainLayoutStore()
const { isShowMainLayout } = storeToRefs(store)
</script>

<template>
    <Background />
    <a-flex class="mainLayout" vertical v-show="isShowMainLayout">
        <div class="overlayGradient"></div>
        <Header class="header" />
        <Content class="content" />
        <Footer />
        <FloatButtonGroup class="floatButtonGroup" :vertical="true" />
    </a-flex>
</template>

<style scoped lang="scss">
.mainLayout {
    display: flex;
    flex-direction: column;
    width: 100vw;
    overflow: hidden;
    //height: 100vh;

    .overlayGradient {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
            radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
        transform: translateZ(0px);
        backface-visibility: hidden;
        perspective: 1000px;
        transition: all 0.07s ease-out 0s;
    }

    .header {
        position: relative;
        min-height: 64px;
    }

    .content {
        position: relative;
        flex: 1;
    }

    .floatButtonGroup {
        position: fixed;
        bottom: 7px;
        right: 12px;
        z-index: 100;
        transition: opacity 0.2s ease 0s;
    }
}
</style>
