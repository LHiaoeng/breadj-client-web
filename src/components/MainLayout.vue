<template>
    <background-switcher />
    <a-layout class="mainLayout" v-show="isShowMainLayout">
        <div class="overlayGradient"></div>
        <a-layout-header :style="headerStyle"></a-layout-header>
        <a-layout-content :style="contentStyle">
            <a-input-search
                class="searchBox"
                v-model:value="keyword"
                enter-button
                @search="onSearch"
                :size="searchInputSize"
                allow-clear
                ref="searchInputRef"
            >
                <template #addonBefore>
                    <a-select
                        v-model:value="selectedEngine"
                        :size="searchInputSize"
                        class="engine-select"
                    >
                        <a-select-option
                            v-for="(engine, key) in engines"
                            :key="key"
                            :value="engine.id"
                            >{{ engine.name }}</a-select-option
                        >
                    </a-select>
                </template>
            </a-input-search>
        </a-layout-content>
        <a-layout-footer :style="footerStyle"> </a-layout-footer>
        <FloatButtonGroup class="floatButtonGroup" />
    </a-layout>
</template>
<script setup lang="ts">
import { CSSProperties, onUpdated, ref, onMounted, Directive } from 'vue'
import type { SizeType } from 'ant-design-vue/es/config-provider'
import { useMainLayoutStore } from '@/store/modules/MainLayoutStore'
import { storeToRefs } from 'pinia'
import FloatButtonGroup from '@/components/FloatButtonGroup.vue'
import BackgroundSwitcher from './BackgroundSwitcher.vue'

const store = useMainLayoutStore()
const { isShowMainLayout } = storeToRefs(store)

const keyword = ref<string>('')
const selectedEngine = ref<string>('baidu')
const searchInputSize = ref<SizeType>('large')

// 定义 ref 来引用输入框
const searchInputRef = ref(null)

// 在组件挂载完成后，自动聚焦输入框
onMounted(() => {
    searchInputRef.value.focus()
})

onUpdated(() => {
    searchInputRef.value.focus()
})

interface Engine {
    id: string
    name: string
    url: string
}

const engines: Array<Engine> = [
    {
        id: 'google',
        name: 'Google',
        url: 'https://www.google.com/search?q='
    },
    { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=' }
]

const onSearch = (searchValue: string, e: MouseEvent) => {
    if (e.type === 'click' && e.target instanceof HTMLInputElement) {
        return
    }

    const usrEngine = engines.find((engine) => engine.id === selectedEngine.value)

    if (usrEngine) {
        const url = `${usrEngine.url}${searchValue}`
        window.open(url, '_blank') // 在新窗口打开搜索结果
    }
}

const headerStyle: CSSProperties = {
    textAlign: 'center',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    background: 'white'
}

const contentStyle: CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    height: '100%',
    flex: 1,
    position: 'relative'
}

const footerStyle: CSSProperties = {
    textAlign: 'center',
    background: 'white'
}
</script>

<style scoped lang="scss">
.mainLayout {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

.overlayGradient {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
        radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
    transform: translateZ(0px);
    backface-visibility: hidden;
    perspective: 1000px;
    transition: all 0.07s ease-out 0s;
}

.searchBox {
    width: 600px;
    margin-top: 50px;

    .engine-select {
        width: 100px;
    }

    :deep(.ant-input-group-addon) {
        background: white;
    }
}

.floatButtonGroup {
    position: fixed;
    bottom: 7px;
    right: 12px;
    z-index: 100;
    //width: 30px;
    //color: rgb(255, 255, 255);
    transition: opacity 0.2s ease 0s;
}
</style>
