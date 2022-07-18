/**
 * @author heart
 * @description hightLight的实现
 * @Date 2022-07-18
 * @see https://cn.vuejs.org/v2/guide/custom-directive.html#ad
 */
import type { PluginFunction } from 'vue'
import hljs from 'highlight.js'
import type { DirectiveBinding } from 'vue/types/options'
const noop = () => {
  /** */
}
// 自定义指令
const vueHighlightJs: {
  install: PluginFunction<null>
} = {
  install: noop,
}

function updateCode(el: HTMLElement, binding: DirectiveBinding): void {
  const targets = el.querySelectorAll('code')
  let target
  for (let i = 0; i < targets.length; i++) {
    target = targets[i]
    // 如果v-ht 绑定了属性值则会直接赋值
    // v-ht="http" // true
    if (typeof binding.value === 'string') {
      target.textContent = binding.value
    }
    hljs.highlightElement(target)
  }
}

vueHighlightJs.install = function (Vue) {
  // 指令钩子函数会被传入以下参数
  // el binding vNode  oldVNode
  Vue.directive('highlight', {
    // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
    bind: noop,
    // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted: function (el: HTMLElement, binding: DirectiveBinding) {
      updateCode(el, binding)
    },
    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
    update: noop,
    componentUpdated: function (el: HTMLElement, binding: DirectiveBinding) {
      /** */
      updateCode(el, binding)
    },
    unbind: noop,
  })
}

export default vueHighlightJs
