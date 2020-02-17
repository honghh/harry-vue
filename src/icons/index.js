import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const svgFiles = require.context('./svg', true, /\.svg$/)
const iconList = svgFiles.keys().map(item => svgFiles(item))

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(svgFiles)

export default {
  // 获取图标icon-(*).svg名称列表, 例如[sys, bug, chart, ...]
  getNameList() {
    return iconList.map(item => item.default.id.split('icon-')[1])
  }
}
