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
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio v-for="(type, index) in dataForm.typeList" :key="index" :label="index">{{ type }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="dataForm.typeList[dataForm.type] + '名称'" prop="name">
        <el-input v-model="dataForm.name" :placeholder="dataForm.typeList[dataForm.type] + '名称'" />
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-cascader
          v-model="selectedMenu"
          expand-trigger="hover"
          :options="menuList"
          :props="menuListTreeProps"
          change-on-select
          @change="handleSelectMenuChange"
        />
      </el-form-item>
      <el-form-item v-if="dataForm.type === 1" label="菜单路由" prop="uri">
        <el-input v-model="dataForm.uri" placeholder="菜单路由" />
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 0" label="授权标识" prop="value">
        <el-input v-model="dataForm.value" placeholder="多个用逗号分隔, 如: user:list,user:create" />
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="排序号" prop="sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序号" />
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="菜单图标" prop="icon">
        <el-row>
          <el-col :span="22">
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover"
            >
              <div class="mod-menu__icon-list">
                <el-button
                  v-for="(item, index) in iconList"
                  :key="index"
                  plain
                  :class="{ 'is-active': item === dataForm.icon }"
                  @click="iconActiveHandle(item)"
                >
                  <svg-icon :icon-class="item" />
                </el-button>
              </div>
            </el-popover>
            <el-input
              v-model="dataForm.icon"
              v-popover:iconListPopover
              :readonly="true"
              placeholder="菜单图标名称"
              class="icon-list__input"
            />
          </el-col>
          <el-col :span="2" class="icon-list__tips">
            <el-tooltip placement="top" effect="light">
              <div slot="content">全站推荐使用SVG Sprite, 详细请参考:icons/index.js 描述</div>
              <i class="el-icon-warning" />
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button plain @click="visible = false">取消</el-button>
      <el-button plain type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeDataTranslate, idList } from '@/utils'
import { listSimpleMenuNoButton, infoMenu, createMenu, updateMenu } from '@/api/sys-menu'
import Icon from '@/icons'

export default {
  data() {
    var validateUrl = (rule, value, callback) => {
      if (this.dataForm.type === 1 && !/\S/.test(value)) {
        callback(new Error('菜单uri不能为空'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      dataForm: {
        id: 0,
        type: 1,
        typeList: ['目录', '菜单', '按钮'],
        name: '',
        pid: 0,
        uri: '',
        value: '',
        sort: 0,
        icon: ''
      },
      iconList: [],
      dataRule: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        uri: [
          { validator: validateUrl, trigger: 'blur' }
        ]
      },
      menuList: [],
      selectedMenu: [],
      menuListTreeProps: {
        value: 'id',
        label: 'name'
      }
    }
  },
  created() {
    this.iconList = Icon.getNameList()
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      listSimpleMenuNoButton().then(({ data }) => {
        this.menuList = treeDataTranslate(data, 'id')
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }).then(() => {
        if (this.dataForm.id) {
          // 修改
          infoMenu(this.dataForm.id).then(({ data }) => {
            this.dataForm.id = data.id
            this.dataForm.type = data.type
            this.dataForm.name = data.name
            this.dataForm.pid = data.pid
            this.dataForm.uri = data.uri
            this.dataForm.value = data.value
            this.dataForm.sort = data.sort
            this.dataForm.icon = data.icon
            this.selectedMenu = idList(this.menuList, data.pid, 'id', 'children').reverse()
          })
        } else {
          this.selectedMenu = []
        }
      })
    },
    handleSelectMenuChange(val) {
      this.dataForm.pid = val[val.length - 1]
    },
    // 图标选中
    iconActiveHandle(iconName) {
      this.dataForm.icon = iconName
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            updateMenu(this.dataForm.id, {
              'id': this.dataForm.id,
              'type': this.dataForm.type,
              'name': this.dataForm.name,
              'pid': this.dataForm.pid,
              'uri': this.dataForm.uri,
              'value': this.dataForm.value,
              'sort': this.dataForm.sort,
              'icon': this.dataForm.icon
            }).then(({ data }) => {
              this.$message({
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
            createMenu({
              'type': this.dataForm.type,
              'name': this.dataForm.name,
              'pid': this.dataForm.pid,
              'uri': this.dataForm.uri,
              'value': this.dataForm.value,
              'sort': this.dataForm.sort,
              'icon': this.dataForm.icon
            }).then(({ data }) => {
              this.$message({
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
      })
    }
  }
}
</script>

<style lang="scss">

  .mod-menu {
    .menu-list__input,
    .icon-list__input {
      > .el-input__inner {
        cursor: pointer;
      }
    }

    &__icon-popover {
      max-width: 420px;
    }

    &__icon-list {
      max-height: 180px;
      padding: 0;
      margin: -8px 0 0 -8px;

      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;

        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }

    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
</style>
