<template>
  <div class="app-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="50px">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="150px" align="center" label="作者帐号">
        <template slot-scope="scope">
          <span>{{scope.row.author_account}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="150px" align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{scope.row.author_name}}</span>
        </template>
      </el-table-column> -->
      
      <el-table-column align="center" label="创建日期" width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="更新日期" width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.update_time}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新人" width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.last_author}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>
        </template>
      </el-table-column> -->

      <el-table-column  align="center" class-name="status-col" label="状态" width="120px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_modify | statusFilter"><span v-if="scope.row.is_modify===1">可以编辑</span><span v-if="scope.row.is_modify===0">不可编辑</span></el-tag>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="点击数">
        <template slot-scope="scope">
          <span>{{scope.row.clicks}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="auto" label="标题">
        <template slot-scope="scope">

          <router-link class="link-type" :to="'/article/edit/'+scope.row.id">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120px">
        <template slot-scope="scope">
          <router-link :to="'/article/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'articleList',
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        // draft: 'info',
        0: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
