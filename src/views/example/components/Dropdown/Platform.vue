<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      类型({{platforms.length}})
      <i class="el-icon-caret-bottom el-icon--right"></i>
    </el-button>
    <el-dropdown-menu class="no-border" slot="dropdown">
      <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
        <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
          {{item.name}}
        </el-checkbox>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      platformsOptions: [
        { key: 'pic', name: '有图片' },
        { key: 'song', name: '有伴奏' },
        { key: 'video', name: '有视频' }
      ]
    }
  },
  computed: {
    platforms: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
