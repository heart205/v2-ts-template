/**
 * @author heart
 * @description 日志的装饰器
 * @Date 2022-07-17
 */
export function logger(target: unknown, name: string, descriptor: PropertyDescriptor) {
  // console.log(target === MyComponent.prototype) // true
  console.log(target)
  // 装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型
  const oldValue = descriptor.value // 保存原来的方法
  descriptor.value = function (...rest: unknown[]) {
    console.log(`${name} params:`, ...rest)
    const result = oldValue.apply(this, ...rest)
    console.log('result: ', result)
    return result
  }
}
