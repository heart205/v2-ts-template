import Vue, { type CreateElement } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

export interface TableColumn {
  key: string
  dataIndex: string
  title: string
  width?: number | string
  [props: string]: unknown
}

function resizableTitle(h: CreateElement, props: TableColumn, children: string, columns: TableColumn[]) {
  let thDom: HTMLTableCellElement
  const { key, ...restProps } = props

  const draggingMap: {
    [key: drag]: number | string
  } = {}
  columns.forEach((col) => {
    draggingMap[col.key] = col.width || 0
  })
  type drag = typeof columns[number]['key']
  const draggingState = Vue.observable(draggingMap)

  const col = columns.find((col) => {
    const k = col.dataIndex || col.key
    return k === key
  })

  if (col === undefined) return undefined
  if (!col.width) {
    return <th {...restProps}>{children}</th>
  }

  const onDrag = (x: number) => {
    draggingState[key] = 0
    if (col) {
      col.width = Math.max(x, 1)
    }
  }

  const onDragStop = () => {
    if (thDom) {
      draggingState[key] = thDom.getBoundingClientRect().width
    }
  }

  return (
    <th {...restProps} v-ant-ref={(r: HTMLTableCellElement) => (thDom = r)} class='resize-table-th'>
      {children}
      <vue-draggable-resizable
        key={col.key}
        class='table-draggable-handle'
        w={6}
        x={draggingState[key] || col.width}
        z={1}
        axis='x'
        draggable={true}
        resizable={false}
        onDragging={onDrag}
        onDragstop={onDragStop}
      ></vue-draggable-resizable>
    </th>
  )
}
export default resizableTitle
