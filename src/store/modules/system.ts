import { defineStore } from 'pinia'

export interface SystemStateType {
    title: string
}

export const useSystemStore = defineStore('system', {
    state: (): SystemStateType => ({
        title: '面包街'
    })
})
