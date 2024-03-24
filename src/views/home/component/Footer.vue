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
            <!--            <div class="copyright">© 2024 BreadJ</div>-->
            <div class="links">
                <span>© 2024 BreadJ</span>
                <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2024167887号-2</a>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer {
    width: 100%;
    min-width: 768px;
    height: 36px;
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
            a {
                color: #aaa;
                margin: 0 5px;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
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
