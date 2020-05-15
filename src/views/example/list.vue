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
          <span>{{scope.row.authorAccount}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="150px" align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{scope.row.author_name}}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="创建日期" width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新日期" width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新人" width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.lastAuthor}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>
        </template>
      </el-table-column> -->

      <el-table-column  align="center" class-name="status-col" label="状态" width="120px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isModify | statusFilter"><span v-if="scope.row.isModify===1">可以编辑</span><span v-if="scope.row.isModify===0">不可编辑</span></el-tag>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="点击数">
        <template slot-scope="scope">
          <span>{{scope.row.clicks}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="auto" label="标题">
        <template slot-scope="scope">
<el-popover
    placement="left-start"
    :title="scope.row.title"
    width="80%"
    trigger="hover">
     <div class="popover-content tips_div" v-html="scope.row.content"></div>
    <a slot="reference">{{ scope.row.title }}</a>
  </el-popover>
          <!-- <router-link class="link-type" :to="'/article/edit/'+scope.row.id">
            <span>{{ scope.row.title }}</span>
          </router-link> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120px">
        <template slot-scope="scope">
          <!-- <router-link :to="'/article/edit/'+scope.row.id"> -->
            <el-button @click="deleteMusicById(scope.row.id)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageStart"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

<!-- <el-dialog
  :title="content"
  :visible.sync="dialogVisible"
  width="80%">
  <span v-html="content"></span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->

  </div>
</template>

<script>
import { fetchList, deleteMusic } from '@/api/article'

export default {
  name: 'articleList',
  data() {
    return {
      list: null,
      total: 0,
      dialogVisible: false,
      listLoading: true,
      listQuery: {
        pageStart: 1,
        rows: 10
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
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },
    deleteMusicById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMusic(id).then(response => {
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: '删除曲谱ID:' + id + '成功',
              type: 'success',
              duration: 5000
            })
            this.getList()
          } else {
            this.$notify({
              title: response.data.message,
              message: '删除曲谱ID:' + id + '失败',
              type: 'error',
              duration: 5000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageStart = val
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
.tips_div {
  width: 80%;
}
</style>
