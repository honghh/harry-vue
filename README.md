# harry-vue
> 本项目是基于 https://github.com/PanJiaChen/vue-admin-template 创建
## Build Setup

```bash
# 克隆项目
git clone  https://github.com/honghh/harry-vue.git

# 进入项目目录
cd harry-vue

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:10001](http://localhost:10001)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 配套服务端地址

> - **GitHub:** https://github.com/honghh/harry.git
> - **Gitee:** https://gitee.com/honghh/harry.git

- idea、eclipse需安装lombok插件，不然会提示找不到entity的get set方法
- 创建数据库harry，数据库编码为UTF-8
- 执行db/mysql.sql文件，初始化数据
- 修改application-dev.yml，更新MySQL账号和密码
- Eclipse、IDEA运行PlatformApplication.java，则可启动项目
- Swagger注解路径：http://localhost:9001/swagger-ui.html

<br> 

 **联系作者**
- 微信公众号：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200225085656400.png)
- 通过微信公众号联系我呀！！！
<br> 
