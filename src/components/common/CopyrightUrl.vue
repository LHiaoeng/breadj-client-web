<script setup lang="ts">
import { computed } from 'vue'
import { ExportOutlined } from '@ant-design/icons-vue'

interface Props {
    copyright: string
    copyrightLink: string
}

const props = defineProps<Props>()

const isValidLink = computed(() => {
    const link = props.copyrightLink
    // 判断link是否为空和是否是链接
    return link && link.startsWith('http')
})
</script>

<template>
    <div>
        <template v-if="copyright.startsWith('©')">
            <a v-if="isValidLink" :href="copyrightLink" target="_blank">
                {{ copyright }} <ExportOutlined />
            </a>
        </template>
        <template v-else>
            <a v-if="isValidLink" :href="copyrightLink" target="_blank">
                © {{ copyright }} <ExportOutlined />
            </a>
            <template v-else>
                {{ copyright }}
            </template>
        </template>
    </div>
</template>

<style scoped lang="scss">
a {
    color: rgba(255, 255, 255, 0.54);
    text-decoration: none;
}

a:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
