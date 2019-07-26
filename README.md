# 虚拟仿真项目课堂导调工具前端
## 安装

## clone后的第一件事
```
npm install 
##或者
cnpm install (国内源)
```

### 运行
```
npm run serve
```

### 发布
```
npm run build
```

## src说明

### mock
该文件夹主要配置mockjs，请求地址配置在index.js中，数据模拟在mockData.js中
统一命名：mock数据请求地址均以mock开始，后面跟上两个名字，也就是说请求地址为mock/xx/xx

### util
封装axios,axios.js主要是axios的配置和封装，所有的后台请求axios方法写在api.js中，页面中直接import方法即可

### store
封装vuex，比较常规的封装方法，网上有教程
