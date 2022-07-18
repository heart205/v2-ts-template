import Component from 'vue-class-component'
// 如果插件的hooks不声明的话则这个hooks会被带入到methods中
export function useRegisterHooks(hooksArray: string[] = []) {
  Component.registerHooks(['beforeRouteEnter', ...hooksArray])
}
