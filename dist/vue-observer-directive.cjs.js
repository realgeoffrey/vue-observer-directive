"use strict";function DisplayDom(){var e=this,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=o.target,t=o.show,i=void 0===t?function(){}:t,n=o.hide,s=void 0===n?function(){}:n,v=o.threshold,c=void 0===v?.01:v,d=o.once,h=void 0!==d&&d,u=o.root,a=void 0===u?null:u;c=Math.max(Math.min(c,1),.01);try{var b=new window.IntersectionObserver((function(o){o[0].intersectionRatio>=c?(i(),h&&e.stop()):s()}),{threshold:[c],root:a});b.observe(r),this.stop=function(){b.disconnect()}}catch(e){console.error(e.message,"\n不支持IntersectionObserver，升级浏览器或代码使用polyfill: https://github.com/w3c/IntersectionObserver")}}var observer={inserted:function(e,o){var r=o.value,t=o.arg,i=o.modifiers;e.observer=new DisplayDom({target:e,show:"function"==typeof r?r:r.show,hide:r.hide,threshold:t/100||void 0,once:i.once,root:r.dom})},unbind:function(e){e.observer&&"function"==typeof e.observer.stop&&e.observer.stop()}},vueObserverDirective={install:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.directive(o.directive||"observer",observer)},vueObserverDirective:observer};module.exports=vueObserverDirective;
