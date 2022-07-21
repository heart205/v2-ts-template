<template>
  <div class="pre-coding">
    <div class="pre-lang" v-if="code.length > 0">
      {{ lang }}
    </div>
    <pre v-highlight="code"><code class="javascript">{{code}}</code></pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const Props = Vue.extend({
  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'javascript',
      //  验证情况
      validator(value: string) {
        return ['javascript', 'typescript', 'java', 'go'].includes(value)
      },
    },
  },
})

@Component
export default class HightLightCode extends Props {}
</script>

<style lang="less" scoped>
@background: #f7f8fa;
@coding-background: #4e5969;
.pre-coding {
  position: relative;
  background-color: @background;

  code {
    background-color: inherit;
  }
}

.pre-lang {
  position: absolute;
  font-size: 12px;
  right: 8px;
  top: 4px;
  color: @coding-background;
}
pre {
  display: block;
  width: 100%;
  min-width: 432px;
}
pre code.hljs {
  padding: 16px 12px;
}
</style>
