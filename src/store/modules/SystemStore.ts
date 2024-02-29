import { defineStore } from 'pinia'

export interface SystemStateType {
    title: string
    isShowMainLayout: boolean
}

export const useSystemStore = defineStore('SystemStore', {
    state: (): SystemStateType => ({
        title: '面包街',
        isShowMainLayout: true
    })
})
