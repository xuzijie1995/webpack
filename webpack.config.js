const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

const config = {
	mode: 'production',
	entry: {
		main: ['@babel/polyfill','./src/main.js'],
		pagea: ['@babel/polyfill','./src/pagea.js'],
		pageb: ['@babel/polyfill','./src/pageb.js'],
	},
	output: {
		path:path.resolve(__dirname , './dist'),
		publicPath:'./',
		filename: 'js/[name]-[hash].js',
	},
	resolve: {
	  	extensions: ['.js', '.vue', '.json'], //import引入时，无需写扩展名的文件
	  	alias: {
	  		'@': resolve('src'),
	  	}
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
	    	test: /\.(c|sc)ss$/,
	        use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'] //postcss-loader 依赖 postcss-config.js
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
    },
    watch: false,
	watchOptions: { //不监听目录
		ignored: [/node_modules/ , '/static/']
	},
	plugins: [
		new MiniCssExtractPlugin({
		　　filename: "css/[name].css",
		　　chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			filename: 'main.html',
			chunks:['main'],
			template: path.resolve(__dirname , './index.html')
		}),
		new HtmlWebpackPlugin({
			filename: 'pagea.html',
			chunks:['pagea'],
			template: path.resolve(__dirname , './index.html')
		}),
		new HtmlWebpackPlugin({
			filename: 'pageb.html',
			chunks:['pageb'],
			template: path.resolve(__dirname , './index.html')
		})
	],
	devServer: {
	    proxy: { // proxy URLs to backend development server
	      //'/api': 'http://localhost:3000'
	  	},
	    contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
	    compress: true, // enable gzip compression
	    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
	    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
	    https: false, // true for self-signed, object for cert authority
	    noInfo: true, // only errors & warns on hot reload
	    // ...
	}
};

module.exports = config;