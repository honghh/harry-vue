<template>
  <div class="mod-menu">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
    </el-card>
    <el-form
      :inline="true"
      :model="dataForm"
    >
      <el-form-item>
        <el-button plain size="mini" class="btn-add" style="margin-left: 20px" @click="addOrUpdateHandle()">添加
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      row-key="id"
      border
      style="width: 100%; "
    >
      <el-table-column
        prop="name"
        header-align="center"
        min-width="150"
        label="名称"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="图标"
      >
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon || ''" />
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="mini">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="mini" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="mini" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        label="排序号"
      />
      <el-table-column
        prop="uri"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="菜单URL"
      />
      <el-table-column
        prop="value"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="授权标识"
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="addOrUpdateHandle(scope.row.id)"
          >修改
          </el-button>
          <el-button
            plain
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="deleteHandle(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
    />
  </div>

</template>

<script>
import { fetchList, deleteMenu } from '@/api/sys-menu'
import AddOrUpdate from './menu-add-or-update'
import { treeDataTranslate } from '@/utils'

export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {},
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      fetchList(null).then(({ data }) => {
        this.dataList = treeDataTranslate(data, 'id')
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu(id).then(({ data }) => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.getDataList()
        })
      }).catch(() => {
      })
    }
  }
}
</script>
