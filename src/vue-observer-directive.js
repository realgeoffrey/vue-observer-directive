/**
 * DOM展示或消失执行方法（IntersectionObserver）
 * @constructor
 * @param {Object} target - 观察的目标元素
 * @param {Function} [show = () => {}] - 展示时调用
 * @param {Function} [hide = () => {}] - 消失时调用
 * @param {Number} [threshold = 0] - 交叉比例
 * @param {Boolean} [once = false] - 是否仅执行一次，否则执行无数次（仅针对展示。若为true，则展示一次后，展示、消失方法均不再执行）
 * @param {Object} [root = null] - 观察的相对物。null: viewport；祖先元素
 */
function DisplayDom ({ target, show = () => {}, hide = () => {}, threshold = 0.01, once = false, root = null } = {}) {
  threshold = Math.max(Math.min(threshold, 1), 0.01)  // 取值在[0.01, 1]
  try {
    const io = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio >= threshold) { // 展示
          show()

          if (once) {
            this.stop()
          }
        } else {  // 消失
          hide()
        }
      },
      { threshold: [threshold], root }
    )

    io.observe(target)    // 开始观察

    this.stop = () => {
      io.disconnect()
    }
  } catch (error) {
    console.error(error.message, `\n不支持IntersectionObserver，升级浏览器或代码使用polyfill: https://github.com/w3c/IntersectionObserver`)
  }
}

const observer = {  // v-observer:数字.once="{ show: ()=>{}, hide: ()=>{} }"
  inserted (el, { value, arg, modifiers }) {
    el.observer = new DisplayDom({
      target: el,
      show: typeof value === 'function' ? value : value.show,
      hide: value.hide,
      threshold: (arg / 100) || undefined,
      once: modifiers.once,
      root: value.dom
    })
  },
  unbind (el) {
    if (el.observer && typeof el.observer.stop === 'function') {
      el.observer.stop()
    }
  }
}

const plugin = {
  install (Vue, options = {}) {
    Vue.directive(options.directive || 'observer', observer)
  }
}

export {
  // 全局注册
  plugin as default,

  // 局部注册
  observer as vueObserverDirective
}
