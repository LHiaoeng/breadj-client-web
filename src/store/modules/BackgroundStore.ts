import { defineStore } from 'pinia'

interface BackgroundSourceType {
    key: number
    tab: string
}

export const backgroundSourceList: BackgroundSourceType[] = [
    {
        key: 1,
        tab: '必应'
    },
    {
        key: 2,
        tab: '英雄联盟'
    }
]

export interface Background {
    url: string
    urlBase: string
    type: 'image' | 'video'
    poster?: string
    copyright?: string
    copyrightLink?: string
    title?: string
    titleLink?: string
    description?: string
    sourceType?: number // 背景来源
}

export const useBackgroundStore = defineStore('BackgroundStore', {
    state: () => ({
        isVideoPlay: false,
        background: {} as Background,
        backgroundExpire: 0, // 过期时间。-1:不过期
        bingBackgroundList: [] as Background[]
    }),
    actions: {
        setVideoPlay(isVideoPlay: boolean) {
            this.isVideoPlay = isVideoPlay
        },
        setBackground(background: Background) {
            this.background = background
        },
        setBackgroundExpire(expire: number) {
            this.backgroundExpire = expire
        },
        setBingBackgroundList(bingBackgroundList: Background[]) {
            this.bingBackgroundList = bingBackgroundList
        }
    },
    persist: true
})
