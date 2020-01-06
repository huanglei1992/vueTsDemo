![image.png](https://upload-images.jianshu.io/upload_images/15009210-f4a60551d5dc01ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 环境

系统：window10
node\npm 版本：

```
PS D:\project\vsuite> node -v    //Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)
v8.9.4
PS D:\project\vsuite> npm -v
5.6.0
```

已安装 vue-cli3

```
npm install -g @vue/cli
```

vue 版本：

```
PS D:\project\vsuite> vue --version
3.6.3
```

工具：vscode

# 新建项目

```
PS D:\project> vue create ts_demo
'pnpm' �����ڲ����ⲿ���Ҳ���ǿ����еĳ���
���������ļ���


Vue CLI v3.6.3
┌───────────────────────────┐
│  Update available: 4.1.2  │
└───────────────────────────┘
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, PWA, Router, Vuex, CSS Pre-processors, Linter, Unit
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript for auto-detected polyfills? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
? Pick a unit testing solution: Mocha
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No


Vue CLI v3.6.3
✨  Creating project in D:\project\ts_demo.
🗃  Initializing git repository...
⚙  Installing CLI plugins. This might take a while...


> nodent-runtime@3.2.1 install D:\project\ts_demo\node_modules\nodent-runtime
> node build.js

## Built D:\project\ts_demo\node_modules\nodent-runtime/dist/index.js

> yorkie@2.0.0 install D:\project\ts_demo\node_modules\yorkie
> node bin/install.js

setting up Git hooks
done


> core-js@2.6.11 postinstall D:\project\ts_demo\node_modules\babel-runtime\node_modules\core-js
> node -e "try{require('./postinstall')}catch(e){}"


> core-js@3.6.1 postinstall D:\project\ts_demo\node_modules\core-js
> node -e "try{require('./postinstall')}catch(e){}"


> ejs@2.7.4 postinstall D:\project\ts_demo\node_modules\ejs
> node ./postinstall.js

added 1273 packages in 78.736s
�🚀  Invoking generators...
�📦  Installing additional dependencies...


> node-sass@4.13.0 install D:\project\ts_demo\node_modules\node-sass
> node scripts/install.js

Cached binary found at C:\Users\Acer\AppData\Roaming\npm-cache\node-sass\4.13.0\win32-x64-57_binding.node

> node-sass@4.13.0 postinstall D:\project\ts_demo\node_modules\node-sass
> node scripts/build.js

Binary found at D:\project\ts_demo\node_modules\node-sass\vendor\win32-x64-57\binding.node
Testing binary
Binary is fine
added 167 packages in 26.156s
⚓  Running completion hooks...

�📄  Generating README.md...

�🎉  Successfully created project ts_demo.
�👉  Get started with the following commands:

 $ cd ts_demo
 $ npm run serve
```

新生成的项目目录：

```
D:\project\ts_demo
├─.browserslistrc
├─.eslintrc.js
├─.gitignore
├─babel.config.js
├─package-lock.json
├─package.json
├─README.md
├─tsconfig.json
├─tests
|   ├─unit
|   |  ├─.eslintrc.js
|   |  └example.spec.ts
├─src
|  ├─App.vue
|  ├─main.ts
|  ├─registerServiceWorker.ts
|  ├─shims-tsx.d.ts
|  ├─shims-vue.d.ts
|  ├─views
|  |   ├─About.vue
|  |   └Home.vue
|  ├─store
|  |   └index.ts
|  ├─router
|  |   └index.ts
|  ├─components
|  |     └HelloWorld.vue
|  ├─assets
|  |   └logo.png
├─public
|   ├─favicon.ico
|   ├─index.html
|   ├─robots.txt
|   ├─img
|   |  ├─icons
|   |  |   ├─favicon-16x16.png
|   |  |   ├─...
├─.git
|  ├─...
```

# 项目配置

#### 环境变量.env 和运行命令配置

对于用习惯了 vue2 的同学来说，启动项目通常用的是`npm run dev`，然而此时我们运行这条命令是无法启动项目的，需要运行`npm run serve`。如果想继续使用`npm run dev`启动项目，在`package.json`中 script 对象新增一条`"dev": "vue-cli-service serve"`：

```
//package.json
{
  "name": "ts_demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit"
  },
...
}
```

此时就可以使用`npm run dev`启动项目了。

###### 默认模式

默认情况下，一个 Vue CLI 项目有三个模式：`"development"`、`"production"`  或  `"test"`
VUE CLI3 中，有三种特殊变量可以被配置：

- `NODE_ENV` - 会是  `"development"`、`"production"`  或  `"test"`  中的一个。具体的值取决于应用运行的[模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)。访问方式：`process.env.NODE_ENV`
- `BASE_URL` - 会和  `vue.config.js`  中的  `publicPath`  选项相符，即你的应用会部署到的基础路径。访问方式：`process.env.BASE_URL`，因此配置项目发布路径时，可以直接在环境变量配置。默认是`/`。
- 以 `VUE_APP_`开头的变量，只有以 VUE*APP* 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，可以在客户端侧的代码中访问。访问方式：`process.env.VUE_APP_<自定义变量名>`

如果你的项目需要为不同的环境配置环境变量，比如域名，在根目录下新建文件`.env.development`、`.env.production`
编辑环境变量：

```
//.env.development
BASE_URL = "/development/"
```

```
//.env.production
BASE_URL = "/production/"
```

此时运行命令`npm run dev`、`npm dev build`分别对应这两种模式。

###### 自定义模式

环境变量文件命名格式：`.env.[mode]`，对应的环境模式启动时会加载对应的环境变量配置文件。如果不想用默认模式的名字，可以自定义。
在根目录创建`.env.dev`、`.env.prod`，编辑好文件。
并且在`package.json`的 script 命令中显式定义模式，覆盖默认模式：

```
{
  "name": "typescript_demo1",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve --mode dev",
    "serve": "vue-cli-service serve --mode dev",
    "build": "vue-cli-service build --mode prod",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit"
  },
...
}
```

注意，如果你想让`NODE_ENV`变量变化，需要在.env 环境变量文件中设置，重启项目生效。
所以可以随意定制自己想要的模式变量，通过`process.env.<变量名>`访问。
如编辑环境变量如下：

```
//.env.dev
NODE_ENV = "dev"
VUE_APP_URL = "/development/"
```

```
//.env.prod
NODE_ENV = "prod"
VUE_APP_URL = "/production/"
```

在入口文件打印变量如下：

```
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;
console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_URL);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

配置好`package.json`中的 script 命令模式后，运行`npm run dev`启动项目。
![image.png](https://upload-images.jianshu.io/upload_images/15009210-7e280c641347424e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可见打印内容是当前 dev 模式下的变量值。
有关更多环境变量内容，可以访问[环境变量与模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)、

#### 配置 vue.config.js

VUE CLI3 默认隐藏了配置，如果需要自定义配置，在根目录新建`vue.config.js`，项目会自动加载解析这个文件的配置选项，覆盖默认配置。
官网配置说明：[vue.config.js](https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE)
`vue.config.js`部分配置汇总解析：

```
module.exports = {
 // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
 publicPath: '/',
 // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
 outputDir: 'dist',
 //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录，默认为""
 assetsDir:"",
 //指定生成的 index.html 的输出路径 (相对于 outputDir)
 indexPath:"",
 // eslint-loader 是否在保存的时候检查
 lintOnSave: true,
 // webpack配置
 // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
//如果这个值是一个对象，则会通过 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并到最终的配置中。
//如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
 configureWebpack: () => {},
//是一个函数，会接收一个基于 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 `ChainableConfig` 实例。允许对内部的 webpack 配置进行更细粒度的修改。
 chainWebpack: () => {},
 // 生产环境是否生成 sourceMap 文件
 productionSourceMap: true,
 // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
 parallel: require('os').cpus().length > 1,
 // PWA 插件相关配置
 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
 pwa: {},
 /* webpack-dev-server 相关配置 */
 devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8066,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://47.100.47.3/',
                /* 允许跨域 */
                changeOrigin: true,
            },
        },
 },
 // 第三方插件配置
 pluginOptions: {
  // ...
 }
}
```

###### 配置部署目录和资源目录

编辑配置文件

```
//vue.config.js
module.exports = {
  publicPath: "/",
  assetsDir: "static",
}
```

配置前 build 的 dist 目录，资源直接在 dist 目录下

```
D:\project\ts_demo\dist
├─favicon.ico
├─index.html
├─manifest.json
├─robots.txt
├─js
| ├─about.js
| ├─app.js
| └chunk-vendors.js
├─img
|  ├─logo.82b9c7a5.png
|  ├─...
```

配置后 build 的 dist 目录：静态资源在 static 目录

```
D:\project\ts_demo\dist
├─favicon.ico
├─index.html
├─manifest.json
├─robots.txt
├─static
|   ├─js
|   | ├─about.js
|   | ├─app.js
|   | └chunk-vendors.js
|   ├─img
|   |  └logo.82b9c7a5.png

```

###### 添加别名

对于经常使用的目录，可以给它配置个别名，配置别名：
编辑配置文件：

```
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  publicPath: "/",
  assetsDir: "static",
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@router", resolve("src/router"))
      .set("@views", resolve("src/views"));
  }
};
```

编辑`main.ts`中的文件中的`import "./registerServiceWorker";`，修改.为@，可见别名已配置完成：
![image.png](https://upload-images.jianshu.io/upload_images/15009210-7b2483b96210b311.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
检测 webpack 配置有没有配置成功，还有一个方法，[审查项目的 webpack 配置](https://cli.vuejs.org/zh/guide/webpack.html#%E5%AE%A1%E6%9F%A5%E9%A1%B9%E7%9B%AE%E7%9A%84-webpack-%E9%85%8D%E7%BD%AE)
运行命令：

```
vue inspect > webpack.config.js
```

根目录中生成了当前项目的 webpack 完整配置，此时我们查看：
![image.png](https://upload-images.jianshu.io/upload_images/15009210-b952af4a61afe56e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以看到我们刚刚设置的配置。

###### 打包分析

我们想要看项目的打包分析报告，该怎么配置呢？一般使用插件`webpack-bundle-analyzer`
首先安装：

```
npm i webpack-bundle-analyzer -D
```

我们可以使用一个模式来区分生产打包和打包分析，引入分析模式会产生一个 report.html，生产模式不需要。新建环境变量文件`.env.analyz`，编辑如下

```
NODE_ENV = 'prod'
IS_ANALYZ = 'analyz'
```

配置`package.json`，新增命令`"analyz": "vue-cli-service build --mode analyz"`

```
{
  "name": "ts_demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve --mode dev",
    "serve": "vue-cli-service serve --mode dev",
    "build": "vue-cli-service build --mode prod",
    "analyz": "vue-cli-service build --mode analyz",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit"
  },
...
}
```

在根目录下新建`vue.config.js`，编辑如下：

```
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  publicPath: "/",
  assetsDir: "static",
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@router", resolve("src/router"))
      .set("@views", resolve("src/views"));
  }
  chainWebpack: config => {
    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          //  可以是`server`，`static`或`disabled`。
          //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
          //  在“静态”模式下，会生成带有报告的单个HTML文件。
          //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
          analyzerMode: "static"
        }
      ]);
    }
  }
};

```

运行命令`npm run analyz`，自动打开浏览器页面如下：
![image.png](https://upload-images.jianshu.io/upload_images/15009210-41b75661f3b96366.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
更多信息查看：[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

###### 打包优化配置

1、 打包压缩
考虑到性能，在生产模式我们的资源要尽可能的小。于是需要在生产模式启用压缩。
gizp 压缩是一种 http 请求优化方式，通过减少文件体积来提高加载速度。html、js、css 文件甚至 json 数据都可以用它压缩，可以减小 60%以上的体积。
我们在编译时可以看到压缩的体积缩小的值：

```
File                               Size                Gzipped

  dist\static\js\chunk-vendors.js    567.50 KiB          128.21 KiB
  dist\static\js\app.js              80.62 KiB           7.91 KiB
  dist\static\js\about.js            6.84 KiB            1.19 KiB
```

可以通过 webpack 插件`compression-webpack-plugin`实现，首先安装：

```
npm i compression-webpack-plugin -D
```

查询详细配置：[compression-webpack-plugin](https://webpack.docschina.org/plugins/compression-webpack-plugin/)
未压缩前 dist 目录如下：

```
D:\project\ts_demo\dist
├─favicon.ico
├─index.html
├─manifest.json
├─robots.txt
├─static
|   ├─js
|   | ├─about.js
|   | ├─app.js
|   | └chunk-vendors.js
|   ├─img
|   |  └logo.82b9c7a5.png
├─img
|  ├─icons
```

压缩后目录如下，有了带后缀`.gz`的文件

```
D:\project\ts_demo\dist
├─favicon.ico
├─index.html
├─manifest.json
├─robots.txt
├─static
|   ├─js
|   | ├─about.js
|   | ├─app.js
|   | ├─app.js.gz
|   | ├─chunk-vendors.js
|   | └chunk-vendors.js.gz
|   ├─img
|   |  └logo.82b9c7a5.png
├─img
|  ├─icons
```

要使服务器返回.gz 文件，还需要对服务器进行配置，根据 Request Headers 的 Accept-Encoding 标签进行鉴别，如果支持 gzip 就返回.gz 文件。
生产环境中客户端向服务器请求资源的时候，请求头里 Accept-Encoding: gzip, deflate, br（三种编码方式）。如果服务端配置好了的话，在响应头中会有 Content-Encoding: gzip 这里就说明服务端返回的文件编码方式为 gzip。

2、 依赖大文件打包配置
打包完之后，可以看到`chunk-vendors.js`很大，是因为里面包含了所有的依赖包，运行`npm run build`时把所有的依赖包打包的过程会拖慢打包速度，大文件也会影响性能，我们可以把一些开发过程中一般不会变更的依赖包预先打包起来，比如`vue`,`vue-router`等，这样在编译时就可以不用再把这些不变的包再打包一次。
提前打包的过程，使用到了[webpack 的 DllPlugin 和 DllReferencePlugin](https://www.webpackjs.com/plugins/dll-plugin/)。

> DllPlugin：这个插件是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 bundle(dll-only-bundle)。 这个插件会生成一个名为  `manifest.json`  的文件，这个文件是用来让  [`DLLReferencePlugin`](https://www.webpackjs.com/plugins/dll-plugin#dllreferenceplugin)  映射到相关的依赖上去的

> DllReferencePlugin：这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。

这里的操作有几步：
1、新增一个 webpack 配置 dll.config.js，用 dllPlugin 定义要打包的 dll 文件
2、运行 dll.config.js 生成 vendor.dll.js 及相应的 manifest 文件 vendor-manifest.json，并在项目模板 index.html 中引入 vendor.dll.js
3、在项目的 webpack 配置中，通过 dllReferencePlugin 及 vendor-manifest.json 告诉 webpack 哪些包已经提前构建好了，不再需要重复构建

下面开始操作：
根目录新增文件`dll.config.js`，用于配置 dll 文件的生成。

```
//dll.config.js
const path = require("path");
const webpack = require("webpack");

// dll文件存放的目录
const dllPath = "public/vendor";

module.exports = {
  entry: {
    // 需要提取的库文件
    vendor: ["vue", "vue-router", "vuex"]
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name].dll.js",
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: "[name]_[hash]"
  },
  plugins: [
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      // 保持与 output.library 中名称一致
      name: "[name]_[hash]",
      context: process.cwd()
    })
  ]
};
```

然后在`package.json`中新增命令`"dll": "webpack -p --progress --config ./dll.config.js"`：

```
{
  "name": "ts_demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve --mode dev",
    "serve": "vue-cli-service serve --mode dev",
    "build": "vue-cli-service build --mode prod",
    "analyz": "vue-cli-service build --mode analyz",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit",
    "inspect": "vue-cli-service inspect > webpack.config.js",
    "dll": "webpack -p --progress --config ./dll.config.js"
  },
  ...
}
```

运行命令`npm run dll`
public 目录中就会生成目录：
![image.png](https://upload-images.jianshu.io/upload_images/15009210-143b63ec47f6e846.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
此时，如果我们的依赖包有变，比如修改生成的目录文件如下：
![image.png](https://upload-images.jianshu.io/upload_images/15009210-7227bcbb37783c24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
再次运行`npm run dll`
目录如下：
![image.png](https://upload-images.jianshu.io/upload_images/15009210-f469fa4f7c323090.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以看到上一次生成的文件还存在。为了不产生冗余，我们需要在生成文件之前删除上一次打包的 dll 文件，使用[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)

> clean-webpack-plugin：用于删除构建目录和文件

安装

```
npm i clean-webpack-plugin -D
```

引用：

```
//dll.config.js
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// dll文件存放的目录
const dllPath = "public/vendor";

module.exports = {
  entry: {
    // 需要提取的库文件
    vendor: ["vue", "vue-router", "vuex"]
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name].dll.js",
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: "[name]_[hash]"
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["*.*"]
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      // 保持与 output.library 中名称一致
      name: "[name]_[hash]",
      context: process.cwd()
    })
  ]
};

```

此时再次运行`npm run dll`，上一次的文件就会在生成新的 dll 文件之前被删除。
然后我们需要在全局配置中用`DllReferencePlugin`告诉 webpack 在打包时不必打包哪些文件，并且在打包时把文件增加到 dist 目录的 index.html 上。
我们需要使用[add-asset-html-webpack-plugin](https://www.npmjs.com/package/add-asset-html-webpack-plugin)来把`vendor.dll.js`增加到 html 中。

> add-asset-html-webpack-plugin：把 JavaScript 或者 CSS 资源添加到发布目录下的 html

安装

```
npm i add-asset-html-webpack-plugin -D
```

编辑全局配置`vue.config.js`

```
//vue.config.js
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  publicPath: "/",
  assetsDir: "static",
  configureWebpack: config => {
    //生产模式启用gzip压缩
    if (process.env.NODE_ENV === "prod") {
      const plugins = [];
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]", //目标资源文件名称
          algorithm: "gzip", //压缩算法
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, //匹配所有对应的文件
          threshold: 10240, //只处理比这个值大的资源。按字节计算
          minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理（minRatio = 压缩大小 / 原始大小）
          deleteOriginalAssets: false //是否删除原始资源
        }),
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require("./public/vendor/vendor-manifest.json")
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: path.resolve(__dirname, "./public/vendor/*.js"),
          // dll 引用路径
          publicPath: `${process.env.BASE_URL}static/js/vendor`,
          // dll最终输出的目录
          outputPath: "static/js/vendor"
        })
      );
      // 合并plugins
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@router", resolve("src/router"))
      .set("@views", resolve("src/views"));
    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          //  可以是`server`，`static`或`disabled`。
          //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
          //  在“静态”模式下，会生成带有报告的单个HTML文件。
          //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
          analyzerMode: "static"
        }
      ]);
    }
  }
};
```

此时运行命令`npm run build`，可以看到 dist 目录下生成了 vendor 目录，下面是预先打包的大文件，同时 html 中自动引入了大文件。

```
PS D:\project\ts_demo> npm run build

> ts_demo@0.1.0 build D:\project\ts_demo
> vue-cli-service build --mode prod


\  Building for prod...Starting type checking service...
Using 1 worker with 2048MB memory limit
\  Building for prod...

 DONE  Compiled successfully in 4587ms                                                                                                                                                                                                                                                      16:58:46
  File                                   Size              Gzipped

  dist\static\js\chunk-vendors.js        231.52 KiB        40.36 KiB
  dist\static\js\vendor\vendor.dll.js    104.53 KiB        35.37 KiB
  dist\vendor\vendor.dll.js              104.53 KiB        35.37 KiB
  dist\static\js\app.js                  84.10 KiB         8.27 KiB
  dist\static\js\about.js                6.84 KiB          1.19 KiB

  Images and other types of assets omitted.

 DONE  Build complete. The dist directory is ready to be deployed.
 INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
```

![image.png](https://upload-images.jianshu.io/upload_images/15009210-cb8a097505b28ce9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 接口处理 axios

接下来给项目配置接口处理，使用 axios
安装：

```
npm i axios -S
npm i qs -S
```

src 目录下新增 axios 配置文件：

```
//axios.tool.ts
/**
 * axios公共处理
 * 1、取消重复的请求
 * 2、集中处理接口失败的普通情况
 * 3、设置默认的表头
 * 4、设置默认的请求前缀
 * 5、设置请求超时限制
 * 6、设置token过期或者重新登录时，请求接口的处理，此时刷新页面到登录
 * 7、绑定公共的请求方法到vue原型：get和post
 */
import Vue from "vue";
import axios from "axios";
import qs from "qs";

// 取消请求
const CancelToken = axios.CancelToken;
// 设置默认请求头
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  "Cache-Control": "no-cache",
  "If-Modified-Since": "0"
};
// Axios中post请求将data数据以request payload转换为form data的形式
axios.defaults.transformRequest = [
  function(data: any) {
    return qs.stringify(data);
  }
];
let _window: any = window;
//设置默认的请求前缀
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" &&
  _window.location.pathname.indexOf("qualityBoard3") > -1
    ? process.env.VUE_APP_URL1
    : process.env.VUE_APP_URL;
// 请求超时的时间限制
axios.defaults.timeout = 20000;
// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
const pending: any = {};
const removePending = (key: any, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]("取消重复请求");
  }
  delete pending[key];
};
/**
 * config: 请求数据
 * isReuest: 请求拦截器中 config.url = '/users', 响应拦截器中 config.url = 'http://localhost:3000/users'，所以加上一个标识来计算请求的全路径
 */
const getRequestIdentify = (config: any, isReuest = false) => {
  let url = config.url;
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length);
  }
  return config.method === "get"
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(config.url + JSON.stringify(config.data));
};
axios.interceptors.request.use(
  (config: any) => {
    // 拦截重复请求(即当前正在进行的相同请求)
    let requestData = getRequestIdentify(config, true);
    removePending(requestData, true);

    config.cancelToken = new CancelToken(c => {
      pending[requestData] = c;
    });

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
var account = _window.user ? _window.user.account : "";
// 请求到结果的拦截处理
axios.interceptors.response.use(
  (response: any) => {
    // 把已经完成的请求从 pending 中移除
    let requestData = getRequestIdentify(response.config);
    removePending(requestData);
    // 对响应数据做点什么
    if (process.env.NODE_ENV !== "development") {
      // sessionStatus 浏览器不一样，大小写不一样
      if (
        (response.headers.SESSIONSTATUS &&
          response.headers.SESSIONSTATUS === "TIMEOUT") ||
        (response.headers.Sessionstatus &&
          response.headers.Sessionstatus === "TIMEOUT") ||
        (response.headers.sessionstatus &&
          response.headers.sessionstatus === "TIMEOUT")
      ) {
        // 如果接口返回timeout,表示当前账号实际退出了，不管当前用户显示不显示，都刷新为未登录状态
        window.location.href = "https:///ux.21cn.com";
      } else if (
        (response.headers.USER && response.headers.USER !== account) ||
        (response.headers.User && response.headers.User !== account) ||
        (response.headers.user && response.headers.user !== account)
      ) {
        // 如果当前接口返回显示当前已经登录，而页面显示未登录或者显示登录的账号与实际登录的账号不一致，则刷新为正确账号
        // 当切换了账号，重新刷新页面登录
        window.location.reload();
      }
    }

    if (
      response.data.code !== undefined &&
      parseInt(response.data.code) !== 0
    ) {
      //接口错误处理
    }
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
    // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
  }
);
// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$post = (url: any, params: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
Vue.prototype.$get = (url: any, params: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((res: any) => {
        resolve(res); // 返回请求成功的数据 data
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
```

此时显示 qs 未声明的报错，在`shims-vue.d.ts`中增加：

```
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
//增加qs声明
declare module "qs" {
  const qs: any;
  export default qs;
}
```

在`main.ts`中导入配置文件

```
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/registerServiceWorker";

Vue.config.productionTip = false;
console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_URL);

import "./axios.tool"; // 导入封装好的axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

此时就可以使用 axios 了。

#### 保存代码自动格式化和查错

项目生成时选择了`eslint+prettier`，此时还需要配置 vscode 才能在保存时代码自动格式化和查错。
打开 vscode，键盘 ctrl+shift+p，输入 setting，选择 Open User Settings；
进入界面后选择`Extensions`下的`ESLint`，勾选三个选项：

- Auto Fix On Save
- Enable
- Lint Task: Enable

找到`ESLint`中的 Validate 点击 Edit in settings.json，编辑如下：

```
{
    "window.zoomLevel": 0,
    "terminal.integrated.rendererType": "dom",
    "editor.formatOnSave": true,
    "eslint.lintTask.enable": true,
    "vetur.validation.template": false,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "javascript.updateImportsOnFileMove.enabled": "always",
}
```

此时修改代码时，随意的格式就可以自动格式化了。
如果需要对 prettier 的格式化做一些修改，在根目录下新建文件`.prettierrc.js`，在这里可以编辑修改格式化的选项

```
//.prettierrc.js
module.exports = {
  singleQuote: false//禁止单引号
};
```

比如上面设置了不允许输入单引号，当在 main.ts 中输入：

```
let a = '1';
```

时，保存时，会自动修正成双引号：

```
let a = "1";
```

`eslint`和`prettier`会自动帮你格式化代码并且修复程序可以自动修复的错误。

#### 全局组件注册

当全局组件很多时，引用的代码很多，可以使用代码简化全局组件注册，在 src 下新增配置文件：

```
/**
 *{全局扫描注册组件}
 */
import Vue from "vue";

// 自动加载 common 目录下的 .js 结尾的文件
const componentsContext = require.context("@/components/common", true, /\.ts$/);
console.log(componentsContext);

componentsContext.keys().forEach((component) => {
  const componentConfig = componentsContext(component);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  const ctrl = componentConfig.default || componentConfig;
  Vue.component(ctrl.options.name, ctrl);
});

```

以上代码即把组件全局注册的代码写成自动检测配置生成。
把它引入入口文件 main.ts

```
import "@/registerGlobalComponents";
```

在 components 下新增组件目录如下如下：
![image.png](https://upload-images.jianshu.io/upload_images/15009210-3215fb458e94e176.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
编辑组件：

```
//Hello.vue
<template>
  <div>Hello</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Hello"
})
export default class Hello extends Vue {}
</script>

<style scoped></style>

```

```
//index.ts
import Hello from "./Hello.vue";
export default Hello;

```

在`App.vue`中使用 Hello 组件，直接在模板中使用：

```
<template>
  <div id="app">
    <Hello></Hello>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

可以看到在浏览器上正常使用：
![image.png](https://upload-images.jianshu.io/upload_images/15009210-f9ec64b9157b3e12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 引入第三方组件库

现在开发中大型的项目，一般都要用到组件库，用到组件库的方式，有全局使用和按需使用两种。

#### 全局引入

全局引入的步骤：
1、 安装第三方组件

```
npm i ComponentsName -S
```

2、引入
在入口文件 main.ts 中：

```
import "ComponentsName/dist/styles/vsuite.css";
import ComponentsName from "ComponentsName";
Vue.use(ComponentsName);
```

#### 按需引入

如果第三方组件符合按需引入的格式，则可以按需引入需要的组件，不同的组件库引入的方式可能不同，可以使用`babel-plugin-import`
安装：

```
npm i babel-plugin-import -D
```

根目录下新建`.babelrc`

```
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "ComponentsName",
        "libraryDirectory": "src/components"
      }
    ]
  ]
}

```

在 main.ts 中引入：

```
import Vue from "vue";
import {
  Icon
} from "ComponentsName";
Vue.component("Icon", Icon);
```

具体操作内容可查看[vue 组件库如何按需引入之 babel-plugin-import](https://www.jianshu.com/p/ee8371b5d4e5)
持续更新中。。。
