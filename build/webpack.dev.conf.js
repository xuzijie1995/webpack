const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	mode:'development',
	entry: {
		main: ['@babel/polyfill','./src/main.js'],
		pagea: ['@babel/polyfill','./src/pagea.js'],
		pageb: ['@babel/polyfill','./src/pageb.js'],
	},
	output: {
		path:path.resolve(__dirname , '../test'),
		publicPath:'',
		filename: '[name]-[hash].js',
	},
	resolve: {
	  	extensions: ['.js', '.vue', '.json'], //import引入时，无需写扩展名的文件
	  	alias: {
	  		'@': resolve('src'),
	  	}
	  },
	watch: true,
	watchOptions: { //不监听目录
		ignored: [/node_modules/ , '/static/']
	},
	plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new CleanWebpackPlugin(['dist']),
	new MiniCssExtractPlugin({
	　　filename: "[name].[chunkhash:8].css",
	　　chunkFilename: "[id].css"
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		chunks:['main'],
		template: path.resolve(__dirname , '../index.html')
	}),
	new HtmlWebpackPlugin({
		filename: 'pagea.html',
		chunks:['pagea'],
		template: path.resolve(__dirname , '../index.html')
	}),
	new HtmlWebpackPlugin({
		filename: 'pageb.html',
		chunks:['pageb'],
		template: path.resolve(__dirname , '../index.html')
	})
	],
	devServer: {
      contentBase: path.join(__dirname, "../test/"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
      host: '192.168.1.181',
      // 允许开发服务器访问本地服务器的包JSON文件，防止跨域
      headers: {
      	'Access-Control-Allow-Origin': '*'
      },
      port: 9000, //端口改为9000
      open:true, // 自动打开浏览器，适合懒人
      inline:true,
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin,
      compress: true, // enable gzip compression
	  historyApiFallback: true, // true for index.html upon 404, object for multiple paths
	  https: false, // true for self-signed, object for cert authority
	  //noInfo: true, // only errors & warns on hot reload
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			loader: 'babel-loader',
			include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')],
	        // 不转换node_modules文件夹(不需要编译)
	        exclude: /node_modules/
	    },
	    {
	    	test: /\.(c|sc|sa)ss$/,
            use: [
	            {
	            	loader:MiniCssExtractPlugin.loader,
	            	options:{
	            		publicPath: './'
	            	}
	            },
	            'css-loader','postcss-loader','sass-loader'
	        ], //postcss-loader 依赖 postcss-config.js
        	// include:resolve('client/src'),
        },
        {
        	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        	loader: 'url-loader'
        },
        {
        	test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        	loader: 'url-loader'
        }
        ]
    }
}
