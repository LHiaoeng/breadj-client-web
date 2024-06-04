<script setup lang="ts">
import { ExportOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'

interface Props {
    content: string
    link: string
}

const props = defineProps<Props>()

const isValidLink = computed(() => {
    const { link } = props
    // 判断link是否为空和是否是链接
    return link && link.startsWith('http')
})
</script>

<template>
    <template>
        <a v-if="isValidLink" :href="link" target="_blank">{{ content }} <ExportOutlined /> </a>
        <template v-else> {{ content }} </template>
    </template>
</template>

<style scoped lang="scss">
a {
    color: rgb(255, 255, 255);
    text-decoration: none;
}

a:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
