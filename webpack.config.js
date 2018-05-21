var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: false,
    entry: [
    'webpack/hot/dev-server',
     path.resolve(__dirname, 'src/js/index.js')
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/, 
                loader: 'babel',
                query:
                  {
                    presets: ['es2015', 'react']
                  }
            },
            // css module
            {
                test: /\.css/,
                exclude: /node_modules/,
                loader: 'style!css'
            },
            {   test: /\.css$/, 
                loader: "style-loader!css-loader"
            },
            // scss module
            {
                test: /\.scss?$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style","css!sass")
            },
            {
                test: /\.(png|jpg)$/, 
                loader: "file-loader?name=../img/[hash:8].[name].[ext]"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: __dirname + "/src/index/index.html"
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'jst.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false
              }
            })
    ],
    devServer: {
        colors: true,
        inline: true
    }
};