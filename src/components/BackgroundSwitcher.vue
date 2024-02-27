<template>
    <div class="background-container">
        <img v-if="type === 'image'" :src="source" alt="background" />
        <video v-else-if="type === 'video'" :src="source" autoplay loop muted></video>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BackgroundSwitcher',
    props: {
        type: {
            type: String,
            required: true,
            validator: (value: string) => ['image', 'video'].includes(value)
        },
        source: {
            type: String,
            required: true,
            default: '@/assets/animated-bilgewater.webm'
        }
    }
})
</script>

<style scoped lang="scss">
.background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.background-container img,
.background-container video {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>
