<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="memberForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="手机号"
          prop="phone"
          :label-width="formLabelWidth"
        >
          <el-input v-model="memberForm.phone" autocomplete="off"></el-input>
        </el-form-item>
  <el-form-item
          label="昵称"
          prop="nickname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="memberForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item
          label="密码"
       
          :label-width="formLabelWidth"
        >
          <el-input v-model="memberForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="memberForm.status"
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
import {  getMemberInfo, getMemberEdit } from "../../util/axios";
// 引入路由配置
import { indexRoutes } from "../../router";
// console.log(indexRoutes, "indexRoutes");
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      memberForm: {
        uid: 0, //会员编号，必填项
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码      
        status: 1 //状态1正常2禁用
      
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号称", trigger: "blur" },
        ], nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
      },
      formLabelWidth: "120px",             
    };
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList"
    })
  },
  props: ["addInfo"],
  
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction"
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
      this.memberForm= {
        uid: 0, //会员编号，必填项
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码      
        status: 1 //状态1正常2禁用
      };
    },
    lookUp(id) {
      // console.log(id);
      getMemberInfo({ uid:id }).then(res => {
        console.log(1111);
        console.log(res);
        if (res.data.code === 200) {
          this.memberForm = res.data.list;
          this.memberForm.id = id;
        }
      });
    },
   
    // 修改菜单事件
    updata(formName) {
      // console.log(this.menu);
      this.$refs[formName].validate(valid => {
        if (valid) {
          getMemberEdit(this.memberForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMemberList();
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
