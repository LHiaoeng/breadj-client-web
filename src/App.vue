<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import type { Locale } from 'ant-design-vue/es/locale-provider'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

const locale = ref<Locale>(zhCN)

dayjs.locale('zh-cn')
</script>

<template>
    <a-config-provider :locale="locale">
        <router-view />
    </a-config-provider>
</template>

<style lang="scss"></style>
