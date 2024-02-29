import { defineStore } from 'pinia'

export interface MainLayoutStoreType {
    isShowMainLayout: boolean
}

export const useMainLayoutStore = defineStore('MainLayoutStore', {
    state: (): MainLayoutStoreType => ({
        isShowMainLayout: true
    })
})
