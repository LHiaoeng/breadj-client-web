<template>
    <div class="background-container">
        <img v-if="type === 'image'" :src="source" alt="background" />
        <video v-else-if="type === 'video'" :src="source" autoplay loop muted></video>
        <div class="overlayGradient"></div>
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
</style>
