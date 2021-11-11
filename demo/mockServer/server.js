const path = require('path')
// mock文件的根目录
const mockRoot = path.join(__dirname, './mock')
// require mock-master
const MockMaster = require('../../lib/index.js')
// mock管理列表
const mockSwitchMap = require('./mockSwitchMap.js')
/**
 * config
 * @param mockRoot mock文件的根目录
 * @param port mock服务的端口
 * @param mockSwitchMap mock管理列表
 * @param apiPrefix 客户端请求api的前缀，比如'/api/kitty.json'，apiPrefix就是'/api'
 * @param apiSuffix 客户端请求api的后缀，比如'/api/kitty.json'，apiSuffix就是'.json'
 */
const mock = new MockMaster({
  root: mockRoot,
  port: 7878,
  switchMap: mockSwitchMap,
  apiPrefix: '/api',
  apiSuffix: '.htm'
})
// 启动mock服务
mock.start()