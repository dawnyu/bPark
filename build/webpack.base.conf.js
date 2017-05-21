var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../') ///——driname当前目录

module.exports = {
    entry: {
        app: './src/main.js' //打包入口
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, //根名称可配置
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'vue': 'vue/dist/vue.js',
            'components': path.resolve(__dirname, '../src/components'),
            'jquery': 'jquery'
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 30000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    vue: {
        loaders: utils.cssLoaders(),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('static/build.js'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
}