<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="menu" :rules="rules" ref="ruleForm">
        <el-form-item
          label="菜单名称："
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menu.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="上级菜单："
          prop="pid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="menu.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"> </el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <el-radio v-model="menu.type" :label="1">目录</el-radio>
          <el-radio v-model="menu.type" :label="2">菜单</el-radio>
        </el-form-item>
        <!-- 菜单图标： -->
        <el-form-item
          v-if="menu.type == 1"
          label="菜单图标："
          :label-width="formLabelWidth"
        >
          <!-- 让用户自己选择图标 -->
          <el-select v-model="menu.icon" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"> </el-option>
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单地址： -->
        <el-form-item v-else label="菜单地址：" :label-width="formLabelWidth">
          <el-select v-model="menu.url" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"> </el-option>
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menu.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" type="primary" @click="add('ruleForm')"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="updata('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 添加menu
import { addMenu, menuinfo, editMenu } from "../../util/axios";
// 引入路由配置
import { indexRoutes } from "../../router";
// console.log(indexRoutes, "indexRoutes");
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1 //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }]
      },
      formLabelWidth: "120px",
    
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods"
      ],
      indexRoutes: indexRoutes
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList"
    })
  },
  props: ["addInfo"],
  mounted() {
    // console.log(this.addinfo, " this.addinfo");
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction"
    }),
    // 关闭弹框
    cancel() {
      //   console.log(1111);
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd
      });
      this.reser();
    },
    // 清空弹框
    reser() {
      this.menu = {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1 //状态1正常2禁用
      };
    },
    lookUp(id) {
      // console.log(id);
      menuinfo({ id }).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.menu = res.data.list;
          this.menu.id = id;
        }
      });
    },
    // 添加菜单事件
    add(formName) {
      // console.log(this.menu);
      this.$refs[formName].validate(valid => {
        if (valid) {
          addMenu(this.menu).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改菜单事件
    updata(formName) {
      // console.log(this.menu);
      this.$refs[formName].validate(valid => {
        if (valid) {
          editMenu(this.menu).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
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

<style lang="" scoped></style>
