<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue'
</script>

<template>
    <header>
        <a-flex class="headerEnd">
            <a-button type="text" size="small"><SettingOutlined /></a-button>
        </a-flex>
    </header>
</template>

<style scoped lang="scss">
.header {
    position: fixed;
    padding: 7px 12px 0 0;

    .headerEnd {
        float: right;

        button {
            width: auto;
            color: white;
        }
        button:hover {
            color: white;
            background: rgba(240, 240, 240, 0.2);
        }
    }
}
</style>
