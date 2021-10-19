const path = require('path');
module.exports = {
　　entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.json']
    },
　　module: {
　　　　rules: [{
　　　　　　test: /\.tsx?$/,
　　　　　　// ts-loader是官方提供的处理tsx的文件
　　　　　　use: 'ts-loader',
　　　　　　exclude: /node_modules/
　　　　}]
　　}
}