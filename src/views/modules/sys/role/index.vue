<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          plain
          style="float:right"
          type="primary"
          size="mini"
          @click="handleSearchList()"
        >
          查询搜索
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
          <el-form-item label="角色名称：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="角色" clearable />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
      <el-button plain size="mini" class="btn-add" style="margin-left: 20px" @click="addOrUpdateHandle()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="flashTable"
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              plain
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click.stop="addOrUpdateHandle(scope.row.id)"
            >编辑
            </el-button>

            <el-button
              plain
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click.stop="deleteHandle(scope.row.id)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getList"
    />
  </div>
</template>
<script>
import { fetchList, deleteRole } from '@/api/sys-role'
import Pagination from '@/components/Pagination'
import AddOrUpdate from './role-add-or-update'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}
const defaultRole = {
  id: null,
  name: null,
  sort: null,
  status: 0
}
export default {
  name: 'RoleList',
  components: {
    Pagination,
    AddOrUpdate
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: 0,
      listLoading: false,
      addOrUpdateVisible: false,
      role: Object.assign({}, defaultRole),
      isEdit: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    deleteHandle(id) {
      this.$confirm(`确定对[id=${id}]进行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getList()
            }
          })
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style>

</style>

