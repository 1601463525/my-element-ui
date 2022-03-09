import mixin from './mixin';
// import filter from './filter'
import directive from './directive';
import './css/simba.css';
import component from './component';
import prototype from './prototype';
export default {
    install(Vue, options = {}) {
        //扩展Vue原型对象
        Object.keys(prototype).forEach(key => {
            Vue.prototype[key] = prototype[key];
        });
        //注册所有全局组件
        Object.keys(component).forEach(key => {
            Vue.component(key, component[key]);
        });
        //全局混入
        Vue.mixin(mixin);
        //注册所有全局指令
        Object.keys(directive).forEach(key => {
            Vue.directive(key, directive[key]);
        });
        //注册所有全局过滤器
        // Object.keys(filter).forEach(key => {
        //     Vue.filter(key, filter[key])
        // })

        if (!options.silent) {
            console.log('-'.repeat(50));
            console.log('SIMBA-PLUGIN加载成功');
        }
    }
};
