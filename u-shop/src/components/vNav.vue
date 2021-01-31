<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="defaultActive"
          background-color="#3D5F81"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!-- 只保持一个子菜单的展开
                unique-opened -->
          <!-- 以index为索引开启路由
                  router -->
          <!-- 首页 -->
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 系统管理 -->
          <el-submenu
            v-for="item in navList"
            :index="item.id.toString()"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="list in item.children"
              :key="list.id"
              :index="list.url"
              >{{ list.title }}</el-menu-item
            >
          </el-submenu>
          <!-- 商城管理 -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: "/home",
      navList: []
    };
  },
  mounted() {
    // console.log(this.$route.path);
    this.defaultActive = this.$route.path;
    if (sessionStorage.getItem("loginInfo")) {
      this.navList = JSON.parse(sessionStorage.getItem("loginInfo")).menus;
    }
    // console.log(this.navList);
  }
};
</script>

<style lang="stylus" scoped>
.el-menu
    height 90vh
</style>
