<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="80px"
      @keyup.enter.native="dataFormSubmit()"
    >
      <el-form-item label="类型" prop="paramType">
        <el-input v-model="dataForm.paramType" placeholder="类型" />
      </el-form-item>
      <el-form-item label="键值" prop="paramKey">
        <el-input v-model="dataForm.paramKey" placeholder="键值" />
      </el-form-item>
      <el-form-item label="名称" prop="paramName">
        <el-input v-model="dataForm.paramName" placeholder="名称" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注" />
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button plain @click="visible = false">取消</el-button>
      <el-button plain type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { updateConfig, createConfig } from '@/api/sys-config'

const defaultConfig = {
  id: null,
  paramType: null,
  paramKey: null,
  paramName: null,
  remark: null,
  status: 0
}

export default {
  data() {
    return {
      visible: false,
      roleList: [],
      dataForm: Object.assign({}, defaultConfig),
      dataRule: {
        paramType: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        paramKey: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id, row) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
      if (this.dataForm.id) {
        this.dataForm = Object.assign({}, row)
      }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const configData = Object.assign({}, this.dataForm)
          if (this.dataForm.id) {
            updateConfig(this.dataForm.id, configData).then(({ data }) => {
              this.$notify({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            })
          } else {
            createConfig(configData).then(({ data }) => {
              this.$notify({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            })
          }
        }
      }
      )
    }
  }
}
</script>
