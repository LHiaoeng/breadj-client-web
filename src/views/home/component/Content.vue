<script setup lang="ts">
import { onUpdated, ref, onMounted } from 'vue'
import type { SizeType } from 'ant-design-vue/es/config-provider'

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
</script>

<template>
    <a-flex vertical align="center">
        <div class="searchBox">
            <a-input-search
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
        </div>
    </a-flex>
</template>

<style scoped lang="scss">
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
</style>
