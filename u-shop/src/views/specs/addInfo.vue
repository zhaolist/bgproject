<template>
  <div>
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="addInfo.isShow"
    >
      <el-form :model="specsFrom" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="specsname"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="specsFrom.specsname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="specsFrom" :rules="rules" ref="ruleForm">
        <el-form-item
          v-for="(item, index) in attrArr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="Vip"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index === 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="del(item)" type="danger">删除</el-button>
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
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      attrArr: [
        {
          value: ""
        }
      ],
      specsFrom: {
        specsname: "",
        attrs: "",
        status: 1 //状态1正常2禁用
      },
      rules: {
        specsname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2到 15 个字符", trigger: "blur" }
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
    addAttr() {
      if (this.attrArr.length <= 6) {
        this.attrArr.push({
          value: ""
        });
      } else {
        this.$message.warning("最多六个");
      }
    },
    del(item) {
      var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
      getSpecsListAction: "specs/getSpecsListAction",
      getCountAction: "specs/getCountAction"
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
      this.specsFrom = {
        specsname: "",
        attrs: "",
        status: 1 //状态1正常2禁用
      };
      this.attrArr = [
        {
          value: ""
        }
      ];
    },
    // 添加
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.specsFrom.attrs = this.attrArr.map(item => item.value).join(",");
          getSpecsAdd(this.specsFrom).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getSpecsListAction();
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

      getSpecsInfo({ id }).then(res => {
        if (res.data.code === 200) {
          // console.log(res);
          this.specsFrom = res.data.list[0];
          this.specsFrom.id = id;
          this.specsFrom.attrs.map((item, index) => {
            // console.log(item);
            if (index == 0) {
              this.attrArr[0].value = item;
            } else {
              this.attrArr.push({
                value: item
              });
            }
          });
          // console.log(this.specsFrom);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    //封装一个修改事件

    // ====================================================
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.specsFrom.attrs = this.attrArr.map(item => item.value).join(",");
          getSpecsEdit(this.specsFrom).then(res => {
            // console.log(res, "rea");
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getSpecsListAction();
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
    }
  }
};
</script>

<style lang="" scoped>
.Vip {
  width: 70%;
}
</style>
