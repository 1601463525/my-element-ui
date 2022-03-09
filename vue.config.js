//nodejs内置的管理路径相关的模块
const path = require('path');
function resolve(str) {
    // _dirname nodejs的内置变量，代表当前项目路径
  return path.resolve(__dirname, 'src', str);
}

module.exports = {
    //开发服务器
  // devServer: {
  //     //端口
  //   port: 8080,
  //   proxy: {
  //     //   /api/user/test  => http://192.168.1.222:8888/user/test
  //     "/api": {
  //       target: "http://192.168.1.222:88/",
  //       pathRewrite: {
  //         "^/api": "", // rewrite path
  //       }, // target: 'http://www.example.org', // target host // changeOrigin: true, // needed for virtual hosted sites // ws: true, // proxy websockets // pathRewrite: { //     '^/api/old-path': '/api/new-path', // rewrite path //     '^/api/remove/path': '/path', // remove base path // }, // router: { //     // when request.headers.host == 'dev.localhost:3000', //     // override target 'http://www.example.org' to 'http://localhost:8000' //     'dev.localhost:3000': 'http://localhost:8000', // },
  //     },
  //     "/foo": {
  //       target: "http://1.3.4.6:8899",
  //     },
  //   },
  // },
  lintOnSave: 'warning', //lint验证,警告
  productionSourceMap: false, //不产生map文件
  publicPath: '/', //当项目放在网站子目录时，需配置成子目录名称
  // configureWebpack: {
  //   module: {
  //     rules: [
  //         {
  //           test:/\.js$/,
  //           use: [
  //             {
  //               loader: "babel-loader",
  //               options: {
  //                 presets: ['env']
  //               }
  //             },
  //             "eslint-loader"
  //           ],
  //           exclude: __dirname + 'node_modules',
  //           include: __dirname + 'src'
  //       }
  //     ],
  //   }, // resolve: { //     alias: { //         '~c': __dirname + '/src/components', //         '~v': __dirname + '/src/views', //     } // }
  // },
   //链式操作webpack
  chainWebpack: (config) => {
    //告诉webpack处理bmp文件时采用url-loader加载
    // config.module
    
  //配置文件夹路径别名
    config.resolve.alias
    .set('~c',resolve('components'))
    .set('~r',resolve('router'))
    .set('~p',resolve('page'))
    .set('~v',resolve('views'))
    .set('@a',resolve('assets'))
    .set('hongxin-ui',resolve('lib/hongxin-ui/index'));

      //配置网站标题
      config 
      .plugin('html')
      .tap(args => {
          args[0].title = '铁塔区块链管理平台';
          return args;
      });
 
  },
};
