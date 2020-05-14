/*
 * @Author: wanglijuan01
 * @Date: 2020-03-01 12:44:44
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-03-01 18:39:32
 * @Description: 分页组件
 */
export default {
  data() {
    return {
      cacheData: {},
      pagination: {
        total: 0,
        pn: 1,
        rn: 20
      }
    };
  },
  mounted() {
    this.$bus.$on('search', this.search);
    this.$bus.$on('reset', this.reset);
  },
  methods: {
    search(data) {
      // 过滤空字符串
      for (const it in data) {
        data[it] === '' && delete data[it];
      }
      this.cacheData = data;
      this.pagination.pn = 1;
      console.log('mixin-search', this.cacheData);
      this.queryTableData(this.cacheData);
    },
    reset() {
      this.cacheData = {};
      this.pagination.pn = 1;
      this.queryTableData();
    },
    /**
     * 请求列表时候携带的翻页参数
     */
    paginationParams() {
      return {
        page_size: this.pagination.rn || 20,
        // page_no: this.pagination.pn
        page_no: this.pagination.pn || 1,
        pageSize: this.pagination.rn || 20,
        pageNo: this.pagination.pn || 1
      };
    },
    /**
     * 翻页事件
     * @param pn  当前页码
     */
    changePage(pn) {
      console.log('changePage', pn);
      this.pagination.pn = pn;
      this.cacheData = { ...this.cacheData, page_no: pn };
      this.queryTableData(this.cacheData);
    },
    /**
     * 给翻页组件赋值
     * @param meta 翻页信息
     */
    assignPagination(meta) {
      this.pagination.total = meta.total;
      this.pagination.pn = meta.pageNo || meta.page_no;
      this.pagination.rn = meta.pageSize || meta.page_size;
    },
    /**
     * 每页条数变化
     */
    pageSizeChange(val) {
      console.log(val);
      this.pagination.rn = val;
      this.queryTableData();
    }
  },
  beforeDestroy() {
    this.$bus.$off('search', this.search);
    this.$bus.$off('reset', this.reset);
  }
};
