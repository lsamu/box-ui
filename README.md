# 简介

```
box-ui是基于element-ui二次进行封装。提供企业常用的，高复用的组件封装。
基于Vue3 CompositionAPI进行开发。方便后期扩展到Vue3.
使用这种模式是因为vue2还有大量好用的组件。
```

# 技术栈
```
vite2+element-ui+composition
```

# 网址
[国内](http://www.v5soft.com) [国外](https://lsamu.github.io/box-ui/)

# 基于box-ui案例展示

<a href="http://admin.v5soft.com" target="_blank">协作管理后台</a>

<a href="http://bigdata.v5soft.com" target="_blank">大数据可视化</a>

<a href="http://h5.v5soft.com" target="_blank">H5小程序可视化</a>

<a href="http://datagrid.v5soft.com" target="_blank">数据表格配置</a>

<a href="http://form.v5soft.com" target="_blank">动态表单可视化</a>

<a href="http://panorama.v5soft.com" target="_blank">360全景可视化</a>

<!-- [协作管理后台](http://admin.v5soft.com)

[大数据可视化](http://bigdata.v5soft.com)

[H5小程序可视化](http://h5.v5soft.com)

[数据表格配置](http://datagrid.v5soft.com)

[动态表单可视化](http://form.v5soft.com)

[360全景可视化](http://panorama.v5soft.com) -->

# 安装
```
npm install --save @lauxinyi/box-ui
或者
yarn add @lauxinyi/box-ui
```

# 使用
```
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

import BoxUI from "@lauxinyi/box-ui";
Vue.use(BoxUI);
import '@lauxinyi/box-ui/style.css';

```