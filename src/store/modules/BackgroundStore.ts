import { defineStore } from 'pinia'

export interface BackgroundSourceType {
    key: number
    tab: string
}

export const backgroundSourceList: BackgroundSourceType[] = [
    {
        key: 2,
        tab: '必应'
    },
    {
        key: 1,
        tab: '英雄联盟'
    }
]

export interface BackgroundTypeType {
    key: number
    tab: string
}

export const backgroundTypeList: BackgroundTypeType[] = [
    {
        key: 1,
        tab: '图片'
    },
    {
        key: 2,
        tab: '视频'
    }
]

export interface Wallpaper {
    id?: number
    type?: number
    url: string
    urlBase?: string
    poster?: string
    copyright?: string
    copyrightLink?: string
    title?: string
    titleLink?: string
    description?: string
    source?: number
    launchTime?: string
    bingCountry?: string
}

export const useBackgroundStore = defineStore('BackgroundStore', {
    state: () => ({
        isVideoPlay: false,
        background: {} as Wallpaper,
        backgroundExpire: 0 // 过期时间。-1:不过期
    }),
    actions: {
        setVideoPlay(isVideoPlay: boolean) {
            this.isVideoPlay = isVideoPlay
        },
        setBackground(background: Wallpaper) {
            this.background = background
        },
        setBackgroundExpire(expire: number) {
            this.backgroundExpire = expire
        }
    },
    persist: true
})
