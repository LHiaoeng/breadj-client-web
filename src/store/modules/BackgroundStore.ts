import { defineStore } from 'pinia'

export interface BackgroundStateType {
    source: string
    type: 'image' | 'video'
    isVideoPlay: boolean
}

export const useBackgroundStore = defineStore('BackgroundStore', {
    state: (): BackgroundStateType => {
        return {
            source: './animated-bilgewater.webm',
            type: 'video',
            isVideoPlay: false
        }
    }
})
