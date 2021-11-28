const webpack = require("webpack")
module.exports ={
    devServer: {
	    port: 8000,
	    // proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
	    proxy:{
	        '^/api':{
	            target: 'http://8.208.82.237:9000/',//代理地址，这里设置的地址会代替axios中设置的baseURL
	            changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
	            ws: true, 
				logLevel: 'debug',
	            //pathRewrite方法重写url 
	            pathRewrite: {
	                '^/api': '' 

	           }
	        }
        }
    },
	publicPath: process.env.NODE_ENV === "production" ? "/pc" : "/",
	lintOnSave: false,
	// configureWebpack: {
	//   resolve: {
	// 	alias: {
	// 	// src下的文件夹
	// 	  assets: "@/assets",
	// 	  components: "@/components",
	// 	  views: "@/views",
	// 	},
	//   },
	// },
}