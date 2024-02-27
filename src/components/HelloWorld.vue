<template>
    <a-layout class="mainLayout">
        <background-switcher source="./animated-bilgewater.webm" type="video" />
        <a-layout-header :style="headerStyle"></a-layout-header>
        <a-layout-content :style="contentStyle">
            <a-input-search
                v-model:value="keyword"
                enter-button
                @search="onSearch"
                size="large"
                class="searchBox"
            >
                <template #addonBefore>
                    <a-select v-model:value="selectedEngine" style="width: 90px">
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
        <a-layout-footer :style="footerStyle"></a-layout-footer>
    </a-layout>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ref } from 'vue'
import BackgroundSwitcher from './BackgroundSwitcher.vue'

const keyword = ref<string>('')
const selectedEngine = ref<string>('baidu')

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

const onSearch = (searchValue: string) => {
    const usrEngine = engines.find((engine) => engine.id === selectedEngine.value)

    if (usrEngine) {
        const url = `${usrEngine.url}${searchValue}`
        window.open(url, '_blank') // 在新窗口打开搜索结果
    }
}

const headerStyle: CSSProperties = {
    textAlign: 'center',
    color: '# fff',
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
    flex: 1
}

const footerStyle: CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    background: 'white'
}
</script>

<style scoped lang="scss">
.mainLayout {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: white;
}

.searchBox {
    width: 600px;
    margin-top: 50px;
}
</style>
