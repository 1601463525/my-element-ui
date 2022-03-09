import Vue from 'vue';
import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
Vue.use(VueRouter);
import Nprogress from 'nprogress';
import routes from './routes';
const router = new VueRouter({
    mode: 'history',
    base: '/blockchain/',
    routes
});
// 前置导航守卫，路由拦截器，所有的路由跳转前经过其处理
router.beforeEach((to,from,next) => {
    Nprogress.start();
    const isAuth = sessionStorage.getItem('isAuth') === 'true';
    console.log('----- isAuth ------',isAuth);
    if(to.path === '/login'){
        if(isAuth){
            next('/');
        }else{
            next();
        }
    }else{
        // requireAuth:可以在路由元信息指定哪些页面需要登录权限
        if(isAuth) {
            next();
        }else{
            next('/login');
        }
    }
});
   
 router.afterEach(() => {
     Nprogress.done();
 });  


export default router;
