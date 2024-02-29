<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import MainLayout from './components/MainLayout.vue'
</script>

<template>
    <MainLayout ref="hello" />

    <router-view></router-view>
</template>

<style lang="scss"></style>
