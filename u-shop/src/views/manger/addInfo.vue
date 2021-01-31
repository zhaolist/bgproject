<template>
  <div>
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加用户' : '编辑用户'"
      :visible.sync="addInfo.isShow"
    >
      <el-form :model="mangerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="roleid"
          label="所属角色"
          :label-width="formLabelWidth"
        >
          <el-select v-model="mangerForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="mangerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="mangerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="mangerForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
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
import { addManger, mangerInfo, editManger } from "../../util/axios";
export default {
  data() {
    return {
      mangerForm: {
        roleid: "",
        username: "",
        passward: "",
        status: 1 //状态1正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2到 15 个字符", trigger: "blur" }
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList"
    })
  },
  mounted() {
    this.getRoleListAction();
    // this.getMangerListAction();
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
      getMangerListAction: "manger/getMangerListAction",
      getCountAction: "manger/getCountAction"
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
      this.mangerForm = {
        roleid: "",
        username: "",
        passward: "",
        status: 1 //状态1正常2禁用
      };
    },
    // 添加
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addManger(this.mangerForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getMangerListAction();
              this.cancel();
              this.getCountAction();
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

      mangerInfo({ uid: id }).then(res => {
        if (res.data.code === 200) {
          // console.log(res);
          this.mangerForm = res.data.list;

          this.mangerForm.uid = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.mangerForm);
          // console.log(this.mangerForm, "ssssssssssssssssssssss");
          editRole(this.mangerForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMangerListAction();
              this.getCountAction();
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
