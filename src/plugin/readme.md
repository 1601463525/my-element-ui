# Simba的Vue插件
> 对常用方法进行了封装，搭建了基础结构，方便使用者自由扩展。尽量不要修改文件结构。

#### 使用方式
```
将plugin文件夹放入src目录中:
main.js
    import plugin from './plugin'
    Vue.use(plugin)
    //如果不希望有额外日志
    Vue.use(plugin,{ silent: true })

如您需要新增全局通用组件
1.在plugin/components文件夹添加vue组件
2.在plugin/component.js中配置组件名称
即可在其他页面或组件直接使用

如您需要新增混入项，在plugin/mixin.js中添加即可
如您需要新增自定义指令，在plugin/directive.js中添加即可
参考原代码，其他同理

plugin/index.js用于自动加载所有插件内容，尽量不要改动
```