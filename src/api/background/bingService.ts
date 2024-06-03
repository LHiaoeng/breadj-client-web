import request from '@/utils/request'

export interface BingRequest {
    format: 'js' | 'xml'
    idx?: number // 0:当天
    n?: number // 1-8张图片
    uhd?: number
    uhdwidth?: number
    uhdheight?: number
}

const BASE_URL: string = `${import.meta.env.VITE_REQUEST_BASE_URL}`

export async function getBingWallpapers(req: BingRequest): Promise<any> {
    return request.get('/wallpaper/getBingWallpapers', req)
}
