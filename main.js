const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('koa-weapp-demo');
const response = require('./middlewares/response');
//const bodyParser = require('./middlewares/bodyparser')
const config = require('./config');
const bodyParser = require('koa-bodyparser');
const static = require("koa-static");

// 使用响应处理中间件
app.use(response);
//静态文件处理
app.use(static("./",{ extensions: ['html','js','css']}));



// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes());

// 启动程序，监听端口
app.listen(config.port, () => {
	debug(`listening on port ${config.port}`);
	console.log(`listening on port: ${config.port}`);
})
