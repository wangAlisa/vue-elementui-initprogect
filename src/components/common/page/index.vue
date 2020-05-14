
<template>
  <div class="page">
    <div class="page-breadcrumb" v-if="breadcrumbs.length>0">
      <!--顶部左侧面包屑，暂时先放一级路由-->
      <el-breadcrumb separator="/" >
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbs"
          :key="index"
          :to="{path: item.path, query: item.query}"
          >{{ (item.meta && item.meta.title) ||item.name&&item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="page-cont">
      <div class="page-section">
        <slot name="pageSection"></slot>
      </div>
      <!-- 备用 -->
      <div class="other"><slot name="other"></slot></div>
      <!-- tab切换 -->
      <div class="page-tab"><slot name="tabs"></slot></div>
      <div v-if="actionminwidth+minWidth - clientWith >=200" style="margin-bottom:10px;" class="page-action">
        <Action-Btn :actionList="actionList"></Action-Btn>
      </div>
      <!-- page-search -->
      <div :class="searchData.length==0? 'page-search' : 'page-search1'">
        <Search
          v-if="searchData.length"
          :style="{'width':minWidth + 'px','max-width':'100%'}"
          :searchList="searchData"
          :searchBtns="searchBtns"
          :hideBtn="hideBtn"
        />
        <!--操作区域-->
        <div v-if="actionminwidth+minWidth - clientWith <200" class="page-action">
          <Action-Btn :actionList="actionList"></Action-Btn>
        </div>
      </div>
      <div class="page-container">
        <!-- 内容区域 -->
        <slot></slot>
        <div class="page-container-pagination" v-if="hasPagination">
          <slot name="pagination"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from '@components/common/search-box/search-box.vue';
import ActionBtn from '@components/common/actionbtn/index.vue';
import router from '@router';
export default {
  components: {
    Search,
    ActionBtn
  },
  props: {
    hasPagination: {
      type: Boolean,
      default: true
    },
    breadcrumbList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    searchData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    actionList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    searchBtns: {
      type: Array,
      default: () => []
    },
    hideBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      clientWith: document.body.clientWidth || document.body.offsetWidth,
      breadcrumbs: [],
      prevCrumb: ''
    };
  },
  created() {
    let routes = [].concat(router.options.routes[2].children);
    router.options.routes.forEach((item, key) => {
      if (item.children) {
        routes = [].concat(router.options.routes[2].children);
      }
    });
    this.breadcrumbList.forEach((key, index) => {
      routes.forEach(item => {
        if (
          (key && key.name && key.name === item.name) || // 兼容字符串和对象
          key === item.name || // 兼容name为中文
          (item.meta && key === item.meta.title)
        ) {
          this.breadcrumbs.push({ ...item, ...key });
        }
      });
    });
  },
  methods: {
  },
  computed: {
    actionminwidth() {
      const { actionList } = this;
      return actionList.length * 140;
    },
    minWidth() {
      const { searchData, searchBtns } = this;
      console.log(searchData, 'searchData');
      let width = 0;
      if (searchData.length) {
        for (let i = 0; i < searchData.length; i++) {
          switch (searchData[i].type) {
            case 'timeSelect':
              if (searchData[i].label) {
                width += 320;
              } else {
                width += 240;
              }
              break;
            case 'datetimeSelect':
              if (searchData[i].label) {
                width += 260;
              } else {
                width += 180;
              }
              break;
            case 'input':
            case 'select':
            case 'checkboxGroup':
            case 'select-multiple':
              if (searchData[i].label) {
                width += 230;
              } else {
                width += 150;
              }
              break;
            default:
              break;
          }
        };
        if (searchBtns.length) {
          for (let j = 0; j < searchBtns.length; j++) {
            width += 60;
          };
        } else {
          width += 120;
        }
      }
      return width;
    },
    computedPrevName() {
      return this.prevCrumb && this.prevCrumb.name;
    },
    isWechat() {
      return window.location.pathname.indexOf('base') > 0;
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}
.page-tab{
  margin:20px 0;
}
// .page-cont{
//   padding-top:20px;
// }
.page-breadcrumb {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 24px;
  flex-shrink: 0;
  background:#f3f4f7;
  margin-top:-5px;
}
.page-action{
  text-align: right;
  padding:0px 10px 0px 0px;
}
.page-search {
  padding: 0px 20px 0px 20px;
  text-align: right;
}
.page-search1 {
  padding: 0px 20px 0px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between
}
.page-container {
  flex-grow: 1;
  border-radius: 2px;
  padding: 10px 20px;
  background: #ffffff;
  .page-container-pagination {
    margin-bottom: 16px;
    text-align: right;
    padding: 16px;
  }
}
</style>
