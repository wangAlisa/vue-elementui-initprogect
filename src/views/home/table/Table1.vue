<!--
 * @Author: wanglijuan01
 * @Date: 2020-02-29 21:16:00
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 09:29:02
 * @Description: table表格
 -->
<template>
  <Page :breadcrumb-list="breadcrumbList" :searchData="searchData" :actionList="actionList">
    <div slot="action">
      <el-button type="success" size="small" @click="addMicroMessage()">配置客服消息</el-button>
    </div>
    <el-table stripe :data="tableData">
      <el-table-column prop="title" label="活动名称" min-width="160"></el-table-column>
      <el-table-column prop="type" label="type值" width="120"></el-table-column>
      <el-table-column prop="page" label="地址" min-width="200"></el-table-column>
      <el-table-column prop="contact_name" label="联系人" min-width="120"></el-table-column>
      <el-table-column label="创建时间" width="140">
          <template slot-scope="scope">
          {{scope.row.create_time | formatTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="text-primary" @click="editerMicroMessage(scope.row)">编辑</el-button>
          <i class="split"></i>
          <el-button size="mini" type="text-primary" @click="delMicroMessage(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer slot="pagination">
      <el-pagination v-show="pagination.total"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     :page-size="pagination.rn"
                     :page-sizes="[10, 20, 50, 100]"
                     @size-change="pageSizeChange"
                     :current-page="pagination.pn"
                     :total="pagination.total"
                     @current-change="changePage">
      </el-pagination>
    </footer>
  </Page>
</template>
<script>
import { searchData2 } from './static-data';
import Page from '@/components/common/page/index.vue';
import PageCommon from '@/components/common/page-common/page-common';
export default {
  name: 'tablePage',
  data() {
    return {
      breadcrumbList: ['table列表'],
      searchData: searchData2,
      actionList: [{
        content: '配置客服消息',
        type: 'button',
        btnType: 'success',
        size: 'small',
        calback: cd => {
          this.$router.push({ path: '/' });
        }
      },
      {
        content: '同步消息',
        type: 'button',
        btnType: 'warning',
        size: 'small',
        calback: cd => {
          this.$message.warning('成功');
        }
      }],
      tableData: []
    };
  },
  components: {
    Page
  },
  mixins: [PageCommon],
  created() {
    this.queryTableData();
  },
  methods: {
    /**
    * 获取表格数据
    */
    queryTableData(data) {
      this.getMicroCusList(data);
    },
    // 获取列表数据
    getMicroCusList(val) {
      // const params = this.paginationParams();
      // this.$service.get('接口url', { ...params, ...val, app_id: 'wx113984df14e5d9d9' }, { allback: 0, needLoading: true })
      //   .then(data => {
      //     this.tableData = data.data_list;
      //     this.assignPagination(data.meta);
      //   });
    },
    // 添加
    addMicroMessage() {
      this.$message.warning('成功');
    },
    // 编辑
    editerMicroMessage(row) {
      this.$message.warning('成功');
    },
    // 删除
    delMicroMessage(row) {
      this.$confirm('您是确认删除该配置?', '提示')
        .then((val) => {
          this.$message.warning('删除成功');
        }).catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
  .split {
    display: inline-block;
    width: 1px;
    height: 10px;
    vertical-align: middle;
    margin: 0 10px;
    background-color: #42C57A;
  }
  .total-message {
    display:inline-block;
    text-align:left;
    font-size:14px;
    margin-left:-240px;
    margin-right:20px;
    margin-bottom:15px;
    .total-num {
      color:#42c57a;
      padding:10px;
      cursor:pointer;
    }
  }
  /deep/.el-table {
    th,td{
      text-align:center;
    }
  }
</style>
