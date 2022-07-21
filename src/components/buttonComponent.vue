<script lang="ts">
import { CSSProperties } from 'vue/types/jsx'
import Component from 'vue-class-component'
import Vue from 'vue'

type typeClick = 'primary' | 'dashed' | 'danger' | 'default' | 'flat'
type classBtnType = typeClick extends typeClick ? `btn-${typeClick}` : never

const ButtonProps = Vue.extend({
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value: string) {
        return ['primary', 'dashed', 'danger', 'default', 'flat'].includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [Number, String],
      default: 'small',
      validator(value: string | number) {
        return typeof value == 'number' || ['mini', 'small', 'default'].includes(value)
      },
    },
  },
})

@Component
export default class ButtonComponent extends ButtonProps {
  clickType: classBtnType = 'btn-default'
  style: {
    '--x': string
    '--y': string
    '--fontSize': string
  } & CSSProperties = {
    '--fontSize': '1em',
    '--x': '',
    '--y': '',
  }
  mounted() {
    this.clickType = `btn-${(this.type as typeClick) || 'default'}`
  }
  btnClick(e: MouseEvent) {
    if (this.disabled || this.loading) return
    const target = e.target as HTMLButtonElement
    if (target) {
      this.style['--x'] = e.offsetX + 'px'
      this.style['--y'] = e.offsetY + 'px'
    }
    this.$emit('click', e)
  }
}
</script>

<template>
  <button
    :class="['btn', clickType, disabled ? 'btn-disabled' : '', loading ? 'btn-loading' : '']"
    ref="btn"
    @click="btnClick"
    :style="style"
    :disabled="disabled"
    tabIndex="0"
  >
    <slot></slot>
  </button>
</template>

<style lang="less">
// less 变量也有先后优先级的顺序
.btn {
  display: inline-block;
  position: relative;
  padding: 0.5em 1em;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: unset;
  user-select: none;
  border: none;
  border-radius: 0.25rem;
  background-color: transparent;
  transition: all 0.3s;
  overflow: hidden;
  cursor: pointer;
  --wave-color: #fff;
  --btn-color: #41b983;
  --color: #fff;
  --border-color: #dee2e6;

  .changeColor {
    color: var(--btn-color);
    border-color: currentColor;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: #fff;
    transition: opacity 0.3s;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    left: var(--x, 0);
    top: var(--y, 0);
    pointer-events: none;
    background-image: radial-gradient(circle, var(--wave-color, #fff) 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    // scale关键
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
    transition: transform 0.3s, opacity 0.8s;
  }
}

.btn:not([disabled]):active::after {
  transform: translate(-50%, -50%) scale(0);
  opacity: 0.3;
  transition: 0s;
}

/** 长聚焦颜色模糊 */
.btn:not([disabled]):active::before {
  opacity: 0.4;
}

.btn-default {
  border: 1px solid var(--border-color);
  --wave-color: #41b983;

  // focus-within属性 后代元素获取到了焦点 则会变成默认主题色
  &:not([disabled]):hover,
  &:not([disabled]):focus-within,
  &:not([disabled]):focus-visible {
    .btn .changeColor();
  }
  &:not([disabled]):focus-visible {
    outline-color: currentColor;
  }
}

.btn-primary {
  color: var(--color);
  background-color: var(--btn-color);
}

.btn-dashed {
  .btn-default();
  border: 1px dashed var(--border-color);
}

.btn-danger {
  --btn-color: #ee8079;
  .btn-primary();
}

.btn-flat {
  transition: color 0.3s, background-color 0.5s;

  &:not([disabled]):hover {
    --btn-color: #3ecd79a8;
    color: #3ecd79a8;
    .btn-primary();
  }
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.btn-loading {
  opacity: 0.8;
  cursor: not-allowed;
  &:active::after {
    opacity: 0;
  }

  &:before,
  &:active::before {
    opacity: 0.4;
  }
}
</style>
