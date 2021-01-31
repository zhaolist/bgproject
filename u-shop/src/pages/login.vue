<template>
  <div class="login">
    <el-form
      :model="loginList"
      label-width="100px"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginList.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="loginList.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from "../util/axios/index";
export default {
  data() {
    return {
      loginList: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login(formName) {
      console.log(formName, "formName");
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.loginList);
          // console.log(valid);
          // if (
          //   this.loginList.username == "admin" &&
          //   this.loginList.password == "123"
          //   // valid
          // ) {
          //   this.$message.success("登录成功");
          //   this.$router.push("/index");
          // } else { 
          //   this.$message.error("账号或密码错误");
          // }
          userLogin(this.loginList).then(res => {
            // console.log(res,"111111111111111111111111111111111111111");
            if (res.data.code === 200) {
              // console.log(1111);
              this.$message.success(res.data.msg);
              //把登录结果存储到会话存储中
              sessionStorage.setItem(
                "loginInfo",
                JSON.stringify(res.data.list)
              );
              this.$router.push("/home");
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
}
</script>

<style lang="stylus" scoped>
@import "../stylus/index.styl";
.login
  width 100vw
  height 100vh
  background $oneBgColor
  .el-form
    position absolute
    left 50%
    top 50%
    margin -150px 0 0 -190px
    width 400px
    height 250px
</style>
