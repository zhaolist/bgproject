<template>
  <div>
    <el-table :data="getMangerList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <!-- {{ item.row.id }} -->
            <el-button type="primary" @click="edit(item.row.uid)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.uid)" size="mini"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :page-size="getMangeSize"
      :total="getCountNum"
      @current-change="changePage"
      layout="prev, pager, next"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { deleteManger } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {

    this.getMangerListAction();
     this.getCountAction();
  },
  computed: {
    ...mapGetters({
      getMangerList: "manger/getMangerList",
      getMangeSize: "manger/getMangeSize",
      getCountNum: "manger/getCountNum"
    })
  },
  methods: {
    ...mapActions({
      getMangerListAction: "manger/getMangerListAction",
      getCountAction: "manger/getCountAction",
      changePageAction: "manger/changePageAction"
    }),
    changePage(n) {
    
      this.changePageAction(n);
    },
    edit(id) {
 
      this.$emit("edit", id);
    },

    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          deleteManger({
            uid: id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getMangerListAction();
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="" scoped></style>
