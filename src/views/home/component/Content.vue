<script setup lang="ts">
import { onUpdated, ref, onMounted, nextTick } from 'vue'
import type { SizeType } from 'ant-design-vue/es/config-provider'
import type { Dayjs } from 'dayjs'

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
        name: '小谷',
        url: 'https://www.google.com/search?q='
    },
    { id: 'bing', name: '小必', url: 'https://www.bing.com/search?q=' },
    { id: 'baidu', name: '小度', url: 'https://www.baidu.com/s?wd=' }
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

const count = 1
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const initLoading = ref(true)
const loading = ref(false)
const data = ref([])
const list = ref([])
onMounted(() => {
    fetch(fakeDataUrl)
        .then((res) => res.json())
        .then((res) => {
            initLoading.value = false
            data.value = res.results
            list.value = res.results
        })
})

const onLoadMore = () => {
    loading.value = true
    list.value = data.value.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))
    )
    fetch(fakeDataUrl)
        .then((res) => res.json())
        .then((res) => {
            const newData = data.value.concat(res.results)
            loading.value = false
            data.value = newData
            list.value = newData
            nextTick(() => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'))
            })
        })
}

const tabListNoTitle = [
    {
        key: 1,
        tab: '技术文章'
    },
    {
        key: 2,
        tab: '生活随记'
    }
]
const key = ref(1)

const onTabChange = (value: number, type: string) => {
    key.value = value
    // console.log(value, type)
    // if (type === 'key') {
    //     key.value = value
    // } else if (type === 'noTitleKey') {
    //     noTitleKey.value = value
    // }
}
</script>

<template>
    <div>
        <a-space direction="vertical" style="width: 100%">
            <div class="searchBox">
                <a-input-search
                    style="width: 100%"
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
        </a-space>
        <!--        <a-flex class="navAndContent" vertical>-->
        <!--            <a-card-->
        <!--                style="width: 100%"-->
        <!--                :tab-list="tabListNoTitle"-->
        <!--                :active-tab-key="key"-->
        <!--                @tabChange="(key) => onTabChange(key, 'noTitleKey')"-->
        <!--            >-->
        <!--                <a-list-->
        <!--                    v-show="key === 1"-->
        <!--                    :loading="initLoading"-->
        <!--                    item-layout="horizontal"-->
        <!--                    :data-source="list"-->
        <!--                >-->
        <!--                    <template #loadMore>-->
        <!--                        <div-->
        <!--                            v-if="!initLoading && !loading"-->
        <!--                            :style="{-->
        <!--                                textAlign: 'center',-->
        <!--                                marginTop: '12px',-->
        <!--                                height: '32px',-->
        <!--                                lineHeight: '32px'-->
        <!--                            }"-->
        <!--                        >-->
        <!--                            <a-button @click="onLoadMore">加载更多</a-button>-->
        <!--                        </div>-->
        <!--                    </template>-->
        <!--                    <template #renderItem="{ item }">-->
        <!--                        <a-list-item>-->
        <!--                            <template #actions>-->
        <!--                                <a key="list-loadmore-edit">edit</a>-->
        <!--                                <a key="list-loadmore-more">more</a>-->
        <!--                            </template>-->
        <!--                            <a-skeleton avatar :title="false" :loading="!!item.loading" active>-->
        <!--                                <a-list-item-meta-->
        <!--                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"-->
        <!--                                >-->
        <!--                                    <template #title>-->
        <!--                                        <a target="_blank" href="https://www.antdv.com/">{{-->
        <!--                                            item.name.last-->
        <!--                                        }}</a>-->
        <!--                                    </template>-->
        <!--                                    <template #avatar>-->
        <!--                                        <a-avatar :src="item.picture.large" />-->
        <!--                                    </template>-->
        <!--                                </a-list-item-meta>-->
        <!--                                <div>content</div>-->
        <!--                            </a-skeleton>-->
        <!--                        </a-list-item>-->
        <!--                    </template>-->
        <!--                </a-list>-->
        <!--                <p v-show="key === 2">生活随记</p>-->
        <!--            </a-card>-->
        <!--        </a-flex>-->
    </div>
</template>

<style scoped lang="scss">
.searchBox {
    padding: 0 30%;
    margin-top: 50px;

    .engine-select {
        width: 100px;
    }

    :deep(.ant-input-group-addon) {
        background: white;
    }
}

.navAndContent {
    padding: 0 20%;
    margin-top: 120px;
    position: relative;
    transition: background-color 0.4s ease-in-out 0s;
    --content-min-width: 750px;
}
</style>
