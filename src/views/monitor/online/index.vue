<template>
  <div class="app-container">
    <div class="head-container" />
    <vxe-grid
      resizable
      export-config
      border
      height="680"
      :loading="listLoading"
      :pager-config="tablePage"
      :form-config="tableForm"
      :toolbar="tableToolbar"
      :data="list"
      :columns="tableColumn"
      @form-submit="getList"
      @page-change="pageChangeEvent"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/monitor-online'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: ''
}

export default {
  data() {
    return {
      listLoading: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        align: 'left',
        layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total'],
        perfect: true
      },
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      tableForm: {
        data: {
          keyword: ''
        },
        items: [
          { field: 'keyword', title: '关键字 ', itemRender: { name: '$input', props: { placeholder: '请输入关键字' }}},
          { itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' }}, { props: { type: 'reset', content: '重置' }}] }}
        ]
      },
      tableToolbar: {
        export: true,
        custom: true
      },
      tableColumn: [
        { type: 'seq', width: 60 },
        { type: 'checkbox', title: 'ID', width: 60 },
        { field: 'username', title: '用户名', minWidth: 120, remoteSort: true },
        { field: 'nickName', title: '用户昵称', minWidth: 120, remoteSort: true },
        { field: 'job', title: '工作', minWidth: 120, remoteSort: true },
        { field: 'ip', title: '登陆IP', minWidth: 120, remoteSort: true },
        { field: 'address', title: '登陆地点', minWidth: 120, remoteSort: true },
        { field: 'browser', title: '浏览器', minWidth: 120, remoteSort: true },
        { field: 'loginTime', title: '登陆时间', minWidth: 120, remoteSort: true }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.pageNum = this.tablePage.currentPage
      this.listQuery.pageSize = this.tablePage.pageSize
      this.listQuery.keyword = this.tableForm.data.keyword

      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.tablePage.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    pageChangeEvent({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getList()
    }
  }
}
</script>
