<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="cateForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="上级分类："
          prop="pid"
          :label-width="formLabelWidth"
        >
          <!-- 让用户自己选择图标 -->
          <el-select v-model="cateForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"> </el-option>
            <el-option
              v-for="item in gatCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称："
          prop="catename"
          :label-width="formLabelWidth"
        >
          <el-input v-model="cateForm.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- {{ cateForm.pid }} -->
        <!--图片： -->
        <el-form-item
          v-if="cateForm.pid != 0"
          label="图片"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            :auto-upload="false"
            :on-change="onChange"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <!-- 分类地址： -->

        <!--  -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="cateForm.status"
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
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 添加cateForm
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      cateForm: {
        pid: 0, //上级分类编号
        catename: "", //标题
        img: "", //图标
        status: 1 //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }]
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "",
      fileList: []
    };
  },
  computed: {
    ...mapGetters({
      gatCateList: "cate/getCateList"
    })
  },
  props: ["addInfo"],
  mounted() {
    // console.log(this.addinfo, " this.addinfo");
  },
  methods: {
    onChange(file) {
      // console.log(file, "文件的属性配置");
      this.imgUrl = file.raw;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getCateListAction: "cate/getCateListAction"
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
      this.cateForm = {
        pid: 0, //上级分类编号
        catename: "", //标题
        img: "", //图标
        status: 1 //状态1正常2禁用
      };
    },
    lookUp(id) {
      // console.log(id);
      getCateInfo({ id }).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.cateForm = res.data.list;
          this.cateForm.id = id;

          this.fileList = this.cateForm.img
            ? [{ url: this.$imgUrl + this.cateForm.img }]
            : "";
        }
      });
    },
    // 添加分类事件
    add(formName) {
      // console.log(this.cateForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.cateForm.img = this.imgUrl;

          getCateAdd(this.cateForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //成功之后关闭弹框以及重置
              this.cancel();
              //重新调取接口列表
              this.getCateListAction();
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
    // 修改分类事件
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.cateForm.img = this.imgUrl ? this.imgUrl : this.cateForm.img;
          let file = new FormData();
          for (let i in this.cateForm) {
            file.append(i, this.cateForm[i]);
          }
          getCateEdit(file).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //成功之后关闭弹框以及重置
              this.cancel();
              //重新调取接口列表
              this.getCateListAction();
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
