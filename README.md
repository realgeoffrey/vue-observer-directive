# vue-observer-directive

[![NPM Version](https://img.shields.io/npm/v/vue-observer-directive)](https://www.npmjs.com/package/vue-observer-directive)
![Vue 2](https://img.shields.io/badge/Vue_2-42b883)

通过[`window.IntersectionObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)判断DOM是否在视口展示，在Vue@2自定义指令中进行方法执行。

demo：<https://realgeoffrey.github.io/vue-observer-directive/demo/index.html>

### 安装
1. Node.js安装

    ```bash
    npm install vue-observer-directive --save
    ```
2. 浏览器引用

    ```html
    <!-- 需要先引入vue：<script src="//unpkg.com/vue@2"></script> -->
    <script src="//unpkg.com/vue-observer-directive"></script>
    ```

### 注册指令
1. Node.js注册

    1. 全局注册

        ```javascript
        import Vue from 'vue'
        import vueObserverDirective from 'vue-observer-directive'

        // 全局注册
        Vue.use(vueObserverDirective, { directive: 'observer' }) // 自定义指令名默认是：observer
        // 或：Vue.directive('observer', vueObserverDirective)
        ```
    2. 局部注册

        ```javascript
        import vueObserverDirective from 'vue-observer-directive'

        export default {
          directives: {
            // 局部注册
            observer: vueObserverDirective
          }
        }
        ```
2. 浏览器注册

    1. 全局注册

        ```html
        <!-- 需要先引入vue：<script src="//unpkg.com/vue@2"></script> -->
        <!-- 需要先引入vue-observer-directive：<script src="//unpkg.com/vue-observer-directive"></script> -->

        <script>
        // 全局注册
        Vue.use(vueObserverDirective, { directive: 'observer' }) // 自定义指令名默认是：observer
        // 或：Vue.directive('observer', vueObserverDirective)
        </script>
        ```
    2. 局部注册

        ```html
        <!-- 需要先引入vue：<script src="//unpkg.com/vue@2"></script> -->
        <!-- 需要先引入vue-observer-directive：<script src="//unpkg.com/vue-observer-directive"></script> -->

        <script>
        new Vue({
          directives: {
            // 局部注册
            observer: vueObserverDirective
          }
        })
        </script>
        ```

### 用法
1. 指令名称：`v-observer`
2. 指令参数：

    1. 传给指令的参数：`:数字`（数字：1~100）
    2. 修饰符：`.once`
    3. 绑定值：`{ show: 可见时方法, hide: 非可见时方法 }`

- e.g.

    ```vue
    <!-- DOM展示100%时执行：方法1；否则执行：方法2 -->
    <div v-observer="{ show: 方法1, hide: 方法2 }" />

    <!-- DOM展示≥10%时执行：方法1；否则执行：方法2 -->
    <div v-observer:10="{ show: 方法1, hide: 方法2 }" />

    <!-- DOM展示100%时执行：方法1；否则执行：方法2。若展示过一次，则不再触发2个方法 -->
    <div v-observer.once="{ show: 方法1, hide: 方法2 }" />

    <!-- DOM展示≥80%时执行：方法1；否则执行：方法2。若展示过一次，则不再触发2个方法 -->
    <div v-observer:80.once="{ show: 方法1, hide: 方法2 }" />
    ```

### 注意
若用来处理无限加载的问题，则要考虑`show`方法仅在从消失变为展示时才会触发（`window.IntersectionObserver`作用原理），`hide`方法同理。

- 可以在触发节点上增加`v-if/v-show`来处理无限加载

    >e.g.`<div v-if="showLoadMore" v-observer="{ show: () => { 加载数据；在加载数据前把showLoadMore设置为false、加载完毕后设置为true } }">`
