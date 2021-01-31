<template>
  <div>
    <el-dialog
      :before-close="cancel"
      center
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.isShow"
    >
      <el-form :model="roleForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            default-expand-all
            ref="tree"
            check-strictly
            :props="{
              children: 'children',
              label: 'title'
            }"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roleForm.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add('ruleForm')" type="primary"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 引入接口
import { addRole, roleInfo, editRole } from "../../util/axios";
export default {
  data() {
    return {
      roleForm: {
        rolename: "", //角色名称
        menus: "", //角色权限/菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1 //状态1正常2禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList"
    })
  },
  mounted() {
    this.getMenuListAction();
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction",
      getRoleListAction: "role/getRoleListAction"
    }),
    // 取消
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd
      });
      this.reser();
    },
    // 重置
    reser() {
      this.roleForm = {
        rolename: "",
        menus: "",
        status: 1
      };
      // 重置权限选择
      this.$refs.tree.setCheckedKeys([]);
    },
    // 添加
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          // console.log(this.roleForm);
          // console.log(this.roleForm, "ssssssssssssssssssssss");
          addRole(this.roleForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // console.log(this.$refs.tree.getCheckedKeys()); //通过key获取节点
    },
    lookInfo(id) {
      // 调取查询接口

      roleInfo({ id }).then(res => {
        if (res.data.code === 200) {
          // console.log(res);
          this.roleForm = res.data.list;
          this.$refs.tree.setCheckedKeys(this.roleForm.menus.split(","));
          this.roleForm.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          // console.log(this.roleForm);
          // console.log(this.roleForm, "ssssssssssssssssssssss");
          editRole(this.roleForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // console.log(this.$refs.tree.getCheckedKeys()); //通过key获取节点
    }
  }
};
</script>

<style lang="" scoped></style>
