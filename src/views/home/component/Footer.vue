<script setup lang="ts"></script>

<template>
    <footer class="footer dynamicFooter showFooter">
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
