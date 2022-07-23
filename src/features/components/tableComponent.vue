<template>
  <div>
    <table-component :columns="columns" bordered :dataSource="dataSource" :components="tableTitle">
      <template v-for="item in scopedArray">
        <template :slot="item">
          <slot :name="item" />
        </template>
      </template>
      <template v-for="item in scopedSlotsArray" :slot="item" slot-scope="text, record, index">
        <slot :name="item" :data="{ text, record, index }" />
      </template>
    </table-component>
  </div>
</template>

<script lang="ts">
import Vue, { type CreateElement } from 'vue'
import { Table } from 'ant-design-vue'
import Component from 'vue-class-component'
import type { TableColumn } from './draggableResizable'
import resizableTitle from './draggableResizable'

const Props = Vue.extend({
  components: {
    TableComponent: Table,
  },

  props: {
    columns: {
      type: Array as () => TableColumn[],
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
})

@Component
export default class extends Props {
  scopedArray: string[] = []
  scopedSlotsArray: string[] = []

  tableTitle = {
    header: {
      cell: (h: CreateElement, props: TableColumn, children: string) =>
        resizableTitle(h, props, children, this.columns),
    },
  }

  mounted() {
    this.scopedArray = Object.getOwnPropertyNames(this.$slots)
    this.scopedSlotsArray = Object.getOwnPropertyNames(this.$scopedSlots).filter((val) => {
      return !this.scopedArray.includes(val)
    })
  }
}
</script>

<style lang="less">
.resize-table-th {
  position: relative !important;
  .table-draggable-handle {
    height: 100% !important;
    bottom: 0;
    left: auto !important;
    cursor: col-resize;
    touch-action: none;
    position: absolute;
    background: #ddd;
  }
}
</style>
