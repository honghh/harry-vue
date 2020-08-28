<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="关键字" prop="keyword">
        <el-input
          v-model="queryParams.keyword"
          placeholder="关键字查询"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="list.slice((pageNum-1)*pageSize,pageNum*pageSize)"
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(pageNum - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="会话编号" align="center" prop="tokenId" :show-overflow-tooltip="true" />-->
      <el-table-column label="登录名称" align="center" prop="username" :show-overflow-tooltip="true" />
      <el-table-column label="部门名称" align="center" prop="job" />
      <el-table-column label="主机" align="center" prop="ip" :show-overflow-tooltip="true" />
      <el-table-column label="登录地点" align="center" prop="address" />
      <el-table-column label="浏览器" align="center" prop="browser" />
      <el-table-column label="登录时间" align="center" prop="loginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" align="center" >-->
<!--        <template slot-scope="scope" >-->
<!--          <el-button-->
<!--                  size="mini"-->
<!--                  circle type="danger"-->
<!--                  icon="el-icon-delete"-->
<!--                  @click="handleForceLogout(scope.row)"-->
<!--                  v-hasPermi="['monitor:online:forceLogout']"-->
<!--          />-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
  </div>
</template>

<script>
import { list, forceLogout } from "@/api/monitor/online";

export default {
  name: "Online",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      queryParams: {
        keyword: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询登录日志列表 */
    getList() {
      this.loading = true;
      list(this.queryParams).then(response => {
        this.list = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 强退按钮操作 */
    handleForceLogout(row) {
      this.$confirm('是否确认强退名称为"' + row.username + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return forceLogout(row.tokenId);
        }).then(() => {
          this.getList();
          this.msgSuccess("强退成功");
        }).catch(function() {});
    }
  }
};
</script>

