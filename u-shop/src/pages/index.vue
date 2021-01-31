<template>
  <div>
    <el-container>
      <el-header>xxx后台管理系统</el-header>
      <el-container>
        <el-aside>
          <v-Nav></v-Nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../components/vNav";
export default {
  components: {
    vNav
  }
};
</script>

<style lang="stylus" scoped>
@import "../stylus/index.styl";
  .el-header
    height 80px
    background #518ECB
    line-height 90px
  .el-aside
    width 200px !important
</style>
