<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="auto">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="帐号" width="auto">
        <template slot-scope="scope">
          {{scope.row.account}}
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="auto" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" width="auto" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.roles=='superadmin'">超级管理员</span><span v-if="scope.row.roles=='admin'">管理员</span><span v-if="scope.row.roles=='user'">用户</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="auto" align="center">
        <template slot-scope="scope">
          <img class="user-avatar" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="auto" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="auto" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.update_time}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="状态" label="Status" width="auto" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.active | statusFilter">
              <span v-if="scope.row.active=='Y'">正常使用</span><span v-if="scope.row.active=='N'">禁止使用</span><span v-if="scope.row.active=='D'">逻辑删除</span></el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="操作" width="auto">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalRow">
    </el-pagination>
  </div>

  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="帐号" prop="account">
          <el-input class="filter-item" :disabled="true" v-model="temp.account" style='width: 200px;'></el-input>
        </el-form-item>
        <el-form-item  label="昵称" prop="name">
          <el-input class="filter-item" :disabled="true" v-model="temp.name" style='width: 200px;'></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="roles">
          <el-select class="filter-item" v-model="temp.roles" placeholder="Please select">
            <el-option v-for="item in  rolesTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="active">
             <el-select class="filter-item" v-model="temp.active" placeholder="Please select">
          <el-option v-for="item in  activeTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select class="filter-item" v-model="temp.status" placeholder="Please select">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='3'></el-rate>
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">
          </el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, updateUser } from '@/api/user'
const rolesTypeOptions = [
  { key: 'superadmin', display_name: '超级管理员' },
  { key: 'admin', display_name: '管理员' },
  { key: 'user', display_name: '用户' }
]
const activeTypeOptions = [
  { key: 'Y', display_name: '正常使用' },
  { key: 'N', display_name: '禁止使用' },
  { key: 'D', display_name: '逻辑删除' }
]
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      page: {
        currentPage: 1,
        pageSizes: [10, 15, 30, 50],
        pageSize: 10,
        totalRow: 0
      },
      temp: {
        id: undefined,
        account: '',
        name: '',
        timestamp: new Date(),
        rule: '',
        active: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑用户',
        create: '新增用户'
      },
      rules: {
        roles: [{ required: true, message: 'rule is required', trigger: 'change' }],
        active: [{ required: true, message: 'active is required', trigger: 'change' }],
        account: [{ required: true, message: 'rule is required', trigger: 'change' }],
        name: [{ required: true, message: 'active is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]
      },
      rolesTypeOptions,
      activeTypeOptions
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Y: 'success',
        N: 'gray',
        D: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      var pars = new URLSearchParams()
      pars.append('rows', this.page.pageSize)
      pars.append('pageStart', this.page.currentPage)
      getUserList(pars).then(response => {
        console.log(response.data)
        this.list = response.data.items
        this.page.totalRow = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.currentPage = val
      this.fetchData()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        account: '',
        name: '',
        timestamp: new Date(),
        rule: '',
        active: ''
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateUser(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.loading = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
</style>

