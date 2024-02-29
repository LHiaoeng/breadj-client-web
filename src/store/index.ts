import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(
    createPersistedState({
        serializer: {
            // 指定参数序列化器
            serialize: JSON.stringify,
            deserialize: JSON.parse
        }
    })
)

export default store
