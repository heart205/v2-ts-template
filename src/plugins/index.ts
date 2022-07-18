import Highlight from './highlight'
import Vue from 'vue'
import 'highlight.js/styles/github.css'

export function useRegisterPlugin() {
  Vue.use(Highlight)
}
