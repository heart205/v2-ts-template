<template>
  <div class="container flex">
    <div>
      <span>
        {{ count }}
      </span>
      <div>
        <button @click="handleClick">add click</button>
      </div>
      <div>
        <hight-light-code :code="coding" />
        <textarea v-model="coding" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HightLightCode from '../components/highLightCode.vue'
import Component from 'vue-class-component'
import { logger } from '../decorators/logger'

@Component({
  components: {
    HightLightCode,
  },
})
export default class PagesIndex extends Vue {
  count = 0
  coding =
    "import Vue from 'vue'\nconst Props = Vue.extend({\n  props: {\n    code: {\n      type: String,\n      default: '',\n    },\n    lang: {\n      type: String,\n      default: 'javascript',\n      //  验证情况\n      validator(value: string) {\n        return ['javascript', 'typescript', 'java', 'go'].includes(value)\n      },\n    },\n  },\n})\nexport default class extends Props {}"

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
    width: 70%;
    margin: auto;
    & > span {
      display: inline-block;
      margin: 12px 0;
    }
  }
}
textarea {
  width: 100%;
}
</style>
