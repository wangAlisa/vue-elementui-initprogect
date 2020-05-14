import router from './router';
import NProgress from 'nprogress'; // progress bar
import '@static/css/nprogress.less';

NProgress.configure({
  showSpinner: false
}); // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});