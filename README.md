mock-master
---
本地开发mock数据工具。

安装
---
```sh
npm install --save-dev mock-master

```

使用
---
使用方式很灵活，我们先看最简单的用法。

### 简单用法
#### 第一步
在项目根目录创建文件夹，命名为`mockFiles`。
然后目录中新建一个文件，命名为`kitty.js`。
```shell
# 目录结构
├── mockFiles
│   └── kitty.js
```
```js
// kitty.js
module.exports = () => {
  return {
    message: 'ok',
    code: 200,
    result: {
      name: 'kitty',
      age: 10
    }
  }
}
```
#### 第二步
创建mock数据拼接管理文件，命名为`mockSwitchMap.js`。
这个文件用途之后会介绍，它是本工具最重要的元素之一。
```shell
# 目录结构
├── mockFiles
│   └── kitty.js
├── mockSwitchMap.js
```
```js
module.exports = {
  share: [],
  api: []
}
```

新建mock的node服务启动文件，命名为`mockServer.js`。
```shell
# 目录结构
├── mockFiles
│   └── kitty.js
├── mockServer.js
├── mockSwitchMap.js
```
```js
// mockServer.js
const MockMaster = require('mock-master')
const path = require('path')
const mockSwitchMap = require('./mockSwitchMap.js')
/**
 * config说明
 * @param mockRoot mock文件的根目录
 * @param port mock服务的端口
 * @param mockSwitchMap mock管理列表
 * @param apiPrefix 客户端请求api的前缀，比如'/api/kitty.json'，apiPrefix就是'/api'
 * @param apiSuffix 客户端请求api的后缀，比如'/api/kitty.json'，apiSuffix就是'.json'
 */
const mock = new MockMaster({
  root: path.join(__dirname, 'mockFiles'),
  port: 7878,
  switchMap: mockSwitchMap,
  apiPrefix: '/api',
  apiSuffix: '.htm'
})
// 启动mock服务
mock.start()
```

#### 第三步
运行：
```shell
node mockServer.js
```
这样，就可以像简单的mock工具那样使用了。

使用方法进阶
---
如果这工具只能和普通的mock工具那样，就没存在的意义了。所以我们接下来介绍进阶方式。