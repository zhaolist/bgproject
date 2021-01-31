<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="bannerForm" :rules="rules" ref="ruleForm">
        <!--  -->
        <el-form-item
          label="标题"
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="bannerForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- {{ bannerForm.pid }} -->
        <!--图片： -->
        <el-form-item label="图片" :label-width="formLabelWidth">
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
            v-model="bannerForm.status"
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
// 添加bannerForm
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      bannerForm: {
         id: 0, //上级分类编号
        title: "", //标题
        img: "", //图标
        status: 1 //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        id: [{ required: true, message: "请选择上级分类", trigger: "change" }]
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
      getBannerList: "banner/getBannerList"
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
      getBannerListAction: "banner/getBannerListAction"
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
      this.bannerForm = {
        id: 0, //上级分类编号
        title: "", //标题
        img: "", //图标
        status: 1 //状态1正常2禁用 
      };
      this.fileList= []
    },
   
     lookUp(id) {  
       getBannerInfo({ id }).then(res => {        
        if (res.data.code == 200) {
          this.bannerForm = res.data.list;         
          this.bannerForm.id = id;
          //把图片格式进行转化
          this.fileList = this.bannerForm.img
            ? [{ url: `${this.$imgUrl}${this.bannerForm.img}` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

     //添加事件
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         
          let data = this.bannerForm;
          // console.log(this.bannerForm);
          let file = new FormData();
        
          for (let i in data) {
            file.append(i, data[i]);
          }
          //添加img参数
          file.append("img", this.imgUrl);
                   //调取添加接口
          getBannerAdd(file).then(res => {
        
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getBannerListAction();
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
          this.bannerForm.img = this.imgUrl ? this.imgUrl : this.bannerForm.img;
          let file = new FormData();
          for (let i in this.bannerForm) {
            file.append(i, this.bannerForm[i]);
          }
          getBannerEdit(file).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //成功之后关闭弹框以及重置
              this.cancel();
              //重新调取接口列表
              this.getBannerListAction();
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
