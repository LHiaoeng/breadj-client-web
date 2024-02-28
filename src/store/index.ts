import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

// 批量引入其他module，
const files = import.meta.globEager('./modules/*.ts') // vite的写法
const keys = Object.keys(files)

const modules: any = {}

keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        // 提取文件的名字作为模块名
        modules[key.replace(/(\.\/modules\/|\.ts)/g, '')] = files[key].default
    }
})

// 全局的state,暂无
export interface rootStateType {}

const store = createPinia()

store
    .use(
        createPersistedState({
            serializer: {
                // 指定参数序列化器
                serialize: JSON.stringify,
                deserialize: JSON.parse
            }
        })
    )
    .use(modules)

export default store
