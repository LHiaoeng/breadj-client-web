<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isFixedFooter = ref<boolean>(true)

function handleScroll() {
    // 根据页面滚动状态修改 isFixedFooter 的值
    isFixedFooter.value = document.body.scrollHeight < window.innerHeight
    console.log('document.body.scrollHeight', document.body.scrollHeight)
    console.log('window.innerHeight', window.innerHeight)
    console.log('isFixedFooter', isFixedFooter.value)
}

const defaultClasses = 'footer'
const additionalClasses = () => {
    return {
        dynamicFooter: isFixedFooter.value
        // showFooter: isFixedFooter.value
    }
}

onMounted(() => {
    console.log('document.body.scrollHeight', document.body.scrollHeight)
    console.log('window.innerHeight', window.innerHeight)
    console.log('isFixedFooter', isFixedFooter.value)
    // 监听页面滚动事件
    window.addEventListener('scroll', handleScroll)
})
</script>

<template>
    <footer :class="['footer', { 'dynamicFooter showFooter': isFixedFooter }]">
        <div class="wrapper">
            <div class="links">
                <span>© 2024 BreadJ</span>
                <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2024167887号-2</a>
                <a
                    class="ygawb"
                    href="https://beian.mps.gov.cn/#/query/webSearch?code=44011102483768"
                    target="_blank"
                    ><img src="/gh.png" /> 粤公网安备44011102483768号</a
                >
                <br />
                <a
                    class="upyun"
                    href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
                    target="_blank"
                    >本网站由
                    <img src="/upyun.png" alt="又拍云" />
                    提供CDN加速/云存储服务</a
                >
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer {
    width: 100%;
    min-width: 768px;
    padding: 0 10%;
    position: relative;
    white-space: nowrap;
    //background-color: #ececec;
    text-align: center;
    color: #aaa;

    .wrapper {
        padding: 7px;

        .copyright {
        }

        .links {
            display: inline-block;
            margin-top: 5px;
            line-height: 20px;
            a {
                color: #aaa;
                margin: 0 5px;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }

            .ygawb img {
                width: 16px;
                vertical-align: top;
                object-fit: contain;
            }

            .upyun img {
                width: 50px;
            }
        }
    }
}

.footer.dynamicFooter {
    max-height: 0;
    position: fixed;
    bottom: 0;
    transition: max-height 0.6s ease-in-out;
}

.footer.dynamicFooter.showFooter {
    max-height: 100%;
}
</style>
