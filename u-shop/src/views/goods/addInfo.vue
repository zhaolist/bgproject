<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
      @opened="createEditor"
    >
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
        <!-- 一级分类： -->
        <el-form-item
          label="一级分类："
          prop="first_cateid"
          :label-width="formLabelWidth"
        >
          <!-- 让用户自己选择图标 -->
          <el-select
            v-model="goodsForm.first_cateid"
            placeholder="请选择"
            @change="changerCate"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类： -->
        <el-form-item
          label="二级分类："
          prop="second_cateid"
          :label-width="formLabelWidth"
        >
          <!-- 让用户自己选择图标 -->
          <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称： -->
        <el-form-item
          label="商品名称："
          prop="goodsname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 市场 -->
        <el-form-item
          label="市场价格"
          prop="market_price"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="goodsForm.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- {{ goodsForm.pid }} -->
        <!--图片： -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- v-if="goodsForm.pid != 0" -->
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
        <!-- 商品规格 -->
        <el-form-item
          label="商品规格"
          prop="first_cateid"
          :label-width="formLabelWidth"
        >
          <!-- 让用户自己选择图标 -->
          <el-select
            v-model="goodsForm.specsid"
            placeholder="请选择"
            @change="changerSpecs"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item
          label="规格属性"
          prop="second_cateid"
          :label-width="formLabelWidth"
        >
          <!-- 让用户自己选择图标 -->
          <el-select
            multiple
            v-model="goodsForm.specsattr"
            placeholder="请选择"
          >
            <el-option
              v-for="item in secondSpecs"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item label="商品描述" :label-width="formLabelWidth"  v-model="goodsForm.description">
          <div id="editor"></div>
        </el-form-item>
      </el-form>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" type="primary" @click="add"
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
// 添加goodsForm
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";

import { mapActions, mapGetters } from "vuex";
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      des: "", //商品描述
      goodsForm: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price:0 , //商品价格
        market_price: 0, //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品 1是 2否
        ishot: 1, //是否热卖推荐1是 2否
        status: 1 //状态1正常2禁用
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        // price: [
        //   { required: true, message: "请输入商品价格",  },
        //   { type: "number", message: "商品价格必须为数字" }        
        // ],
        // market_price: [
        //   { required: true, message: "请输入市场价格", trigger: "blur" },
        //   { type: "number", message: "市场价格必须为数字" }
        // ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" }
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" }
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" }
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      secondCate: [], //二级分类
      secondSpecs: [], //二级分类
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "",
      fileList: []
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList", //分类列表
      specsList: "specs/getSpecsList" //分类列表
    })
  },
  props: ["addInfo"],
  mounted() {
    this.getCateListAction();
    this.getSpecsListAction();
  },
  methods: {
    // y一级分类切换
    changerCate() {
    
      let index = this.cateList.findIndex(
        item => this.goodsForm.first_cateid == item.id
      );
      this.secondCate = this.cateList[index].children;
      this.goodsForm.second_cateid = "";
      // console.log(this.secondCate);
    },
    changerSpecs() {
      // console.log(this.goodsForm.specsid);
      let index = this.specsList.findIndex(
        // item => this.goodsForm.specsid == item.id
        item =>
          // console.log(item.id);
          this.goodsForm.specsid == item.id
      );
      this.secondSpecs = this.specsList[index].attrs;
      // console.log(this.specsList);
      // console.log(this.secondSpecs);
      this.goodsForm.specsattr = "";
    },

    // 打开弹框创建富文本编辑器
    createEditor() {
      console.log(new E("editor"));
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.des);
    },
    onChange(file) {
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
      //分类列表
      getCateListAction: "cate/getCateListAction",
      getGoodsListAction:"goods/getGoodsListAction",
      getSpecsListAction: "specs/getSpecsListAction"
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
      this.goodsForm = {
        pid: 0, //上级分类编号
        catename: "", //标题
        img: "", //图标
        status: 1 //状态1正常2禁用
      };
      // 清空商品描述
      this.editor.html = "";
      this.fileList=[]
    },
   
     lookUp(id) {  
       getGoodsInfo({ id }).then(res => {        
        if (res.data.code == 200) {
          this.goodsForm = res.data.list;         
          this.goodsForm.id = id;
          //把图片格式进行转化
          this.fileList = this.goodsForm.img
            ? [{ url: `${this.$imgUrl}${this.goodsForm.img}` }]
            : [];

             this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.split(",")
            : [];
             //重新执行一级分类
            // this.changeCate(true)
            // //重新调取规格属性
            // this.changeSpecs(true)
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加事
    add() {
      // console.log(this.goodsForm.specsattr.join(","));

      this.goodsForm.specsattr = this.goodsForm.specsattr
        ? this.goodsForm.specsattr.join(",")
        : "";       
         this.goodsForm.img = this.imgUrl;     
      this.goodsForm.description = this.editor.txt.html();   

      let data = this.goodsForm;
      let file = new FormData();
      // console.log(data,"qqq");
      // console.log(file,'aaaaa');
      for (let i in data) {
        file.append(i, data[i]);
      }

      getGoodsAdd(file).then(res => {
        // console.log(res,11111111111);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          //成功之后关闭弹框以及重置
          this.cancel();
          //重新调取接口列表
          // console.log(this);         
          this.getGoodsListAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改事件
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.goodsForm.img = this.imgUrl ? this.imgUrl : this.goodsForm.img;
          let file = new FormData();
          for (let i in this.goodsForm) {
            file.append(i, this.goodsForm[i]);
          }
          getGoodsEdit(file).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //成功之后关闭弹框以及重置
              this.cancel();
              //重新调取接口列表
             
              this.getGoodsListAction();
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
