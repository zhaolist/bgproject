<template>
  <div>
    <v-Bread></v-Bread>
    <el-button type="primary" plain size="small" @click="openInfo"
      >添加</el-button
    >
    <vTable @edit="edit"> </vTable>
    <vaddinfo ref="vDialog" :addInfo="addInfo" @cancel="cancel"></vaddinfo>
  </div>
</template>

<script>
import vTable from "./list";
import vaddinfo from "./addInfo";
export default {
  data() {
    return {
      addInfo: {
        isShow: false, //控制弹框显示隐藏
        isAdd: true //控制是添加或者编辑 true添加 false 编辑
      }
    };
  },
  methods: {
    // 打开弹框
    openInfo() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    // 关闭弹框
    cancel(e) {
      this.addInfo = e;
    },
    // 编辑
    edit(e) {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      // 调用查询方法
      this.$refs.vDialog.lookInfo(e);
    }
  },
  components: {
    vTable,
    vaddinfo
  }
};
</script>

<style lang="stylus" scoped>
.el-button
  margin 10px 0
</style>
