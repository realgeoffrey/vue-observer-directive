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
function DisplayDom() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      target = _ref.target,
      _ref$show = _ref.show,
      show = _ref$show === void 0 ? function () {} : _ref$show,
      _ref$hide = _ref.hide,
      hide = _ref$hide === void 0 ? function () {} : _ref$hide,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 0.01 : _ref$threshold,
      _ref$once = _ref.once,
      once = _ref$once === void 0 ? false : _ref$once,
      _ref$root = _ref.root,
      root = _ref$root === void 0 ? null : _ref$root;

  threshold = Math.max(Math.min(threshold, 1), 0.01); // 取值在[0.01, 1]

  try {
    var io = new window.IntersectionObserver(function (entries) {
      if (entries[0].intersectionRatio >= threshold) {
        // 展示
        show();

        if (once) {
          _this.stop();
        }
      } else {
        // 消失
        hide();
      }
    }, {
      threshold: [threshold],
      root: root
    });
    io.observe(target); // 开始观察

    this.stop = function () {
      io.disconnect();
    };
  } catch (error) {
    console.error(error.message, "\n\u4E0D\u652F\u6301IntersectionObserver\uFF0C\u5347\u7EA7\u6D4F\u89C8\u5668\u6216\u4EE3\u7801\u4F7F\u7528polyfill: https://github.com/w3c/IntersectionObserver");
  }
}

var observer = {
  // v-observer:数字.once="{ show: ()=>{}, hide: ()=>{} }"
  inserted: function inserted(el, _ref2) {
    var value = _ref2.value,
        arg = _ref2.arg,
        modifiers = _ref2.modifiers;
    el.observer = new DisplayDom({
      target: el,
      show: typeof value === 'function' ? value : value.show,
      hide: value.hide,
      threshold: arg / 100 || undefined,
      once: modifiers.once,
      root: value.dom
    });
  },
  unbind: function unbind(el) {
    if (el.observer && typeof el.observer.stop === 'function') {
      el.observer.stop();
    }
  }
};
var vueObserverDirective = {
  // 全局注册
  install: function install(Vue) {
    Vue.directive('observer', observer);
  },
  // 局部注册
  observer: observer
};

export default vueObserverDirective;
