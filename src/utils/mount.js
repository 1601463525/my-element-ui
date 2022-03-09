/*
 * @Description: 
 * @Author: seep
 * @Date: 2019-08-14 15:26:00
 * @LastEditTime: 2019-08-14 15:42:37
 */
import Vue from 'vue';

/**
 * @description 将Vue组件挂在到HTML元素上
 * @param {HTMLElement} el HTML元素
 * @param {Component} component Vue组件
 * @param {VueStore} store vuex store
 * @param {VueRouter} router vue router
 * @return {ViewModel} Vue实例
 */
export default (el, component, router, store) => {
    
    return new Vue({
        el,
        router,
        store,
        render: h => h(component)
    });
};
