<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传音乐
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload" action="http://localhost:8080/api/upload" :multiple="true" :file-list="fileList" :show-file-list="true"
        list-type="text" :limit="1" :on-remove="handleRemove"  :before-upload="beforeUpload" :http-request="musicUpLoad"
        accept=".mp3,.ogg">
        <el-button size="small" type="primary">上传音乐</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
// import { getToken } from 'api/qiniu'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.axios = axios

export default {
  name: 'editorMusicUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('正在努力上传中')
        return
      }
      // console.log(arr)
      this.$emit('successCBKmus', arr)
      // this.listObj = {}
      // this.fileList = []
      this.dialogVisible = false
    },
    // handleSuccess(response, file) {
    //   console.log(file)
    //   console.log(response)
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       this.listObj[objKeyArr[i]].url = response.files.file
    //       this.listObj[objKeyArr[i]].hasSuccess = true
    //       return
    //     }
    //   }
    // },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const fileName = file.uid
      console.log(fileName)
      // console.log(file.uid)
      this.listObj[fileName] = {}
      _self.listObj[fileName] = { name: file.name, hasSuccess: false, uid: file.uid }
    },
    musicUpLoad(file) {
      var pars = new FormData()
      pars.append('file', file.file)
      pars.append('uid', file.file.uid)
      const config = {
        headers: {
          'X-Token': getToken()
        }
      }
      this.axios.post(`http://localhost:8080/api/musicupload`, pars, config).then(response => response.data).then(data => {
        const uid = data.data.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === parseInt(uid)) {
            this.listObj[objKeyArr[i]].url = data.data.url
            this.listObj[objKeyArr[i]].hasSuccess = true
            this.$notify({
              title: '成功',
              message: '上传' + file.file.name + '成功',
              type: 'success',
              duration: 5000
            })
            return
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
