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
        /// 使用对象来存储每个请求的结果
        const results: { [index: number]: Background[] } = {}

        // 循环发起多次请求，并保持顺序
        await Promise.all(
            paramsList.map(async (params, index) => {
                results[index] = await getBingImageList(params)
            })
        )

        return Array.from(
            // 使用Map来确保唯一性
            new Map(
                // 将所有结果数组合并为一个数组
                paramsList
                    .flatMap((params) => results[paramsList.indexOf(params)] || [])
                    // 使用urlBase属性作为Map的键，确保唯一性
                    .map((item) => [item.urlBase, item])
            ).values()
        )
    } catch (error) {
        return []
    }
}
