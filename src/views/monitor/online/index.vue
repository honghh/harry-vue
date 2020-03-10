<template>
  <div class="app-container">
    <div class="head-container" />
    <!--表格渲染-->
    <vxe-table
      border
      stripe
      resizable
      highlight-hover-row
      height="500"
      :loading="listLoading"
      :checkbox-config="{labelField: 'id', highlight: true, range: true}"
      :data="list"
    >
      <vxe-table-column type="seq" width="60" />
      <vxe-table-column type="checkbox" title="ID" width="140" />
      <vxe-table-column field="username" title="用户名" sortable />
      <vxe-table-column field="nickName" title="用户昵称" show-overflow />
      <vxe-table-column field="job" title="工作" show-overflow />
      <vxe-table-column field="ip" title="登陆IP" show-overflow />
      <vxe-table-column field="address" title="登陆地点" show-overflow />
      <vxe-table-column field="browser" title="浏览器" show-overflow />
      <vxe-table-column field="loginTime" title="登陆时间" show-overflow />
    </vxe-table>
    <!--分页组件-->
    <vxe-pager
      perfect
      size="mini"
      :loading="listLoading"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageSize"
      :total="total"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/monitor-online'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}
export default {
  data() {
    return {
      listLoading: false,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    handlePageChange({ currentPage, pageSize }) {
      this.listQuery.pageNum = currentPage
      this.listQuery.pageSize = pageSize
      this.getList()
    }
  }
}
</script>
