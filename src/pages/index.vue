<template>
  <div class="container flex">
    <div>
      <span>
        {{ count }}
      </span>
      <div>
        <button @click="handleClick">add click</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { logger } from '../decorators/logger'

@Component
export default class PagesIndex extends Vue {
  count = 0

  @logger
  handleClick() {
    this.count++
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  & > div {
    margin: auto;
    text-align: center;
    & > span {
      display: inline-block;
      margin: 12px 0;
    }
  }
}
</style>
