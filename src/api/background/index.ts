import request from '@/utils/request'
import { Wallpaper } from '@/store/modules/BackgroundStore'

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

export interface WallpaperPageResponse {
    records?: Wallpaper[]
    total?: number
}
export async function getWallpaperPage(req: WallpaperPageRequest): Promise<any> {
    return request.get('/wallpaper/page', req)
}

export async function getRandomWallpaper(req: WallpaperPageRequest): Promise<any> {
    return request.get('/wallpaper/getRandomWallpaper', req)
}
