<template>
  <div class="container flex">
    <div>
      <span>
        {{ count }}
      </span>
      <div>
        <button-component :loading="loading" @click="handleClick"> add click </button-component>
      </div>
      <div>
        <hight-light-code :code="coding" />
        <textarea v-model="coding" />
      </div>
      <table-component :columns="columns" :dataSource="dataSource">
        <span slot="customTitle"> Name </span>
        <span slot="names" slot-scope="record"> {{ record }} </span>
      </table-component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import HightLightCode from '../components/highLightCode.vue'
import ButtonComponent from '../components/buttonComponent.vue'
import { logger } from '../decorators/logger'
import { TableComponent } from '../features/index'
@Component({
  components: {
    HightLightCode,
    ButtonComponent,
    TableComponent,
  },
  watch: {
    '$route.query.id': {
      handler(val) {
        console.log(val)
      },
      immediate: true,
    },
  },
})
export default class PagesIndex extends Vue {
  count = 0
  coding =
    "import Vue from 'vue'\nconst Props = Vue.extend({\n  props: {\n    code: {\n      type: String,\n      default: '',\n    },\n    lang: {\n      type: String,\n      default: 'javascript',\n      //  验证情况\n      validator(value: string) {\n        return ['javascript', 'typescript', 'java', 'go'].includes(value)\n      },\n    },\n  },\n})\nexport default class extends Props {}"

  loading = false

  columns = [
    {
      dataIndex: 'key',
      key: 'key',
      width: 100,
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'names' },
    },
    {
      dataIndex: 'key1',
      key: 'key1',
      width: 100,
      title: '的撒打算',
    },
  ]

  dataSource = [
    {
      id: 13,
      name: 'script',
      key: 'script',
    },
  ]

  @logger
  handleClick() {
    this.count++
    this.loading = true

    setTimeout(() => {
      this.loading = false
    }, 1000)
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
