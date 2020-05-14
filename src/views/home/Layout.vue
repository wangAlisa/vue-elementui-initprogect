<!--
 * @Author: wanglijuan01
 * @Date: 2020-02-29 20:44:26
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-03-01 10:18:22
 * @Description: 内容组件
 -->
 <template>
  <Layout :hideMenu="hideMenu" :hideWrap="hideWrap" >
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </Layout>
</template>
<script>
import Layout from '@/components/layout';
export default {
  name: 'layout',
  components: {
    Layout
  },
  data() {
    return {
      hideMenu: false,
      hideWrap: false
    };
  }
};
</script>
