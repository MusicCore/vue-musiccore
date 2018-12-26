<template>
  <el-dropdown trigger="click" :show-timeout="100">
    <el-button plain>{{is_modify?'已删除':'正常'}}
      <i class="el-icon-caret-bottom el-icon--right"></i>
    </el-button>
    <el-dropdown-menu class="no-padding" slot="dropdown">
      <el-dropdown-item>
        <el-radio-group style="padding: 10px;" v-model="is_modify">
          <el-radio :label="true">删除</el-radio>
          <el-radio :label="false">恢复</el-radio>
        </el-radio-group>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    is_modify: {
      get() {
        if (this.value === 1) {
          return true
        } else {
          return false
        }
      },
      set(val) {
        // this.$emit('input', val)
        console.log(val)
        if (val === true) {
          this.$emit('input', 1)
        } else {
          this.$emit('input', 0)
        }
      }
    }
  }
}
</script>
