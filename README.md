# vue-observer-directive

通过[`window.IntersectionObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)判断DOM是否在视口展示，在Vue自定义指令中进行方法执行。

1. npm：<https://www.npmjs.com/package/vue-observer-directive>
2. demo：<https://realgeoffrey.github.io/vue-observer-directive/index.html>

### 安装
1. node安装

    ```bash
    npm install vue-observer-directive
    ```
2. 浏览器引用

    ```html
    <script src="//unpkg.com/vue-observer-directive"></script>
    ```

### 注册指令
1. 全局注册

    ```javascript
    import Vue from 'vue'
    import vueObserverDirective from 'vue-observer-directive'

    // 全局注册
    Vue.use(vueObserverDirective)
    ```
2. 局部注册

    ```javascript
    import vueObserverDirective from 'vue-observer-directive'

    export default {
      directives: {
        // 局部注册
        observer: vueObserverDirective.observer
      }
    }
    ```

### 用法
1. 指令名称：`v-observer`
2. 指令参数：

    1. 传给指令的参数：`:数字`（数字：1~100）
    2. 修饰符：`.once`
    3. 绑定值：`{ show: 可见时方法, hide: 非可见时方法 }`

- e.g.

    ```vue
    <!-- DOM展示≥10%执行：方法1-1；否则执行：方法2-1 -->
    <img v-observer:10="{ show: 方法1-1, hide: 方法2-1 }" alt="first" src="//via.placeholder.com/150?text=first">

    <!-- DOM展示100%执行：方法1-2；否则执行：方法2-2；若展示过一次，则不再触发2个方法 -->
    <img v-observer.once="{ show: 方法1-2, hide: 方法2-2 }" alt="second" src="//via.placeholder.com/150?text=second">

    <!-- DOM展示≥80%执行：方法1-3；否则执行：方法2-3；若展示过一次，则不再触发2个方法 -->
    <img v-observer:80.once="{ show: 方法1-3, hide: 方法2-3 }" alt="third" src="//via.placeholder.com/150?text=third">

    <!-- DOM展示100%执行：方法1-4；否则执行：方法2-4 -->
    <img v-observer="{ show: 方法1-4, hide: 方法2-4 }" alt="four" src="//via.placeholder.com/150?text=four">
    ```
