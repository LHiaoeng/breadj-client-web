import request from '@/utils/request'

export interface WallpaperPageRequest {
    page?: number
    size?: number
    title?: string
    type?: number
    source?: number
    status?: number
    launchTimeStart?: string
    launchTimeEnd?: string
}

const BASE_URL: string = `${import.meta.env.VITE_REQUEST_BASE_URL}`

export async function getWallpaperPage(req: WallpaperPageRequest): Promise<any> {
    return request.get(`${BASE_URL}/wallpaper/page`, req)
}
