import request from '@/utils/request'
import { Background } from '@/store/modules/BackgroundStore'

// https://global.bing.com/HPImageArchive.aspx?format=js&idx=0&n=9&pid=hp&FORM=BEHPTB&uhd=1&uhdwidth=3840&uhdheight=2160&setmkt=%s&setlang=en

// const BING_API: string = 'https://cn.bing.com/HPImageArchive.aspx'
// const BING_API: string = `${import.meta.env.VITE_REQUEST_BING_BASE_URL}/HPImageArchive.aspx`
const BING_API: string = `${import.meta.env.VITE_REQUEST_BING_BASE_URL}/bing/getBingWallpaper.do`

const BING_URL: string = 'https://cn.bing.com'

export interface BingRequest {
    format: 'js' | 'xml'
    idx?: number // 0:当天
    n?: number // 1-8张图片
    uhd?: number
    uhdwidth?: number
    uhdheight?: number
}

/**
 * 获取bing壁纸函数
 * @param req
 */
export async function getBingImageList(req: BingRequest): Promise<Background[]> {
    try {
        const response = await request.post(BING_API, req)

        if (!response.object) {
            return []
        }

        return response.object.images.map((item: any) => {
            // 提取item.copyright括号的内容
            const copyright = item.copyright.split('(')[1].split(')')[0]
            // 提取item.copyright括号前的内容
            const description = item.copyright.split('(')[0]
            return {
                url: `${BING_URL}${item.url}`,
                urlBase: item.urlbase,
                type: 'image',
                copyright,
                title: item.title,
                titleLink: item.copyrightlink,
                description
            }
        })
    } catch (error) {
        return []
    }
}

/**
 * 获取bing壁纸函数
 * @param paramsList
 */
export async function getAllBingImageList(paramsList: BingRequest[]): Promise<Background[]> {
    try {
        // 使用Map来存储结果，以保证结果的唯一性
        const resultMap = new Map<any, any>()

        // 循环发起多次请求
        await Promise.all(
            paramsList.map(async (params) => {
                const data = await getBingImageList(params)
                data.forEach((item: any) => {
                    resultMap.set(item.urlBase, item) // 假设每个数据项有一个唯一的id属性
                })
            })
        )

        // 将Map转换为数组并返回
        return Array.from(resultMap.values())
    } catch (error) {
        return []
    }
}
