<template>
  <div>
    <el-table :data="seckList" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
            <el-button type="primary" @click="edit(item.row.id)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)" size="mini"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import {mapActions,mapGetters} from 'vuex'
//引入封装好的接口
import {getSeckDelete} from '../../util/axios'
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      seckList:'seck/getSeckList'
    })
  },
  mounted() {
    //组件一加载触发行动
    this.getSeckListAction()
  },
  methods: {
    //获取行动
    ...mapActions({
      getSeckListAction:'seck/getSeckListAction'
    }),
    //删除事件
    del(id){
        this.$confirm('确定要删除吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调取删除接口
          getSeckDelete({id})
          .then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              //重新调取列表
              this.getSeckListAction()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
     edit(id){
      this.$emit('edit',id)
    }
  },
};
</script>

<style lang="" scoped></style>
