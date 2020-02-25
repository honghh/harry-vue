<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span >筛选搜索</span>
        <el-button
          plain
          style="float:right"
          type="primary"
          size="mini"
          @click="handleSearchList()"
        >
          搜索
        </el-button>
        <el-button
          plain
          style="float:right;margin-right: 15px"
          size="mini"
          @click="handleResetSearch()"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="mini" label-width="140px">
          <el-form-item label="关键字：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="类型/键值/名称" clearable @keyup.enter.native="handleSearchList" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="类型" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.paramType }}</template>
        </el-table-column>
        <el-table-column label="键值" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.paramKey }}</template>
        </el-table-column>
        <el-table-column label="名称" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.paramName }}</template>
        </el-table-column>
        <el-table-column label="启用/禁用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
                    v-model="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    @change="handleStatusChange(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="备注"  align="center">
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              plain
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="addOrUpdateHandle(scope.row.id, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              plain
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.row.id, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="dialogVisible"
      ref="addOrUpdate"
      @refreshDataList="getList"
    />
  </div>
</template>
<script>
import { fetchList, updateStatus, deleteConfig } from '@/api/sys-config'
import Pagination from '@/components/Pagination'
import AddOrUpdate from './user-add-or-update'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}
const defaultConfig = {
  id: null,
  paramType: null,
  paramKey: null,
  paramName: null,
  remark: null,
  status: 0
}
export default {
  name: 'UserList',
  components: {
    AddOrUpdate,
    Pagination
  },
  filters: {

  },
  data() {
    return {
      tableKey: 0,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: 0,
      listLoading: false,
      dialogVisible: false,
      user: Object.assign({}, defaultConfig)
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
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteConfig(row.id).then(response => {
          this.$notify({
            type: 'success',
            message: '删除成功 ！',
            duration: 1500
          })
          this.getList()
        })
      })
    },
    handleStatusChange(index, row) {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatus(row.id, { status: row.status }).then(response => {
          this.$notify({
            type: 'success',
            message: '修改成功 ！',
            duration: 1500
          })
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '取消修改',
          duration: 1500
        })
        this.getList()
      })
    },
    addOrUpdateHandle(id, row) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, row)
      })
    }
  }
}
</script>
<style>

</style>

