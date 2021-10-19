const baseConfig = require('./webpack.base');
const path = require('path');
module.exports = {
    ...baseConfig,
    mode: 'development',
    entry: './examples/index.ts',
    devServer: {
        disableHostCheck: true,
        hot: true,
        contentBase: path.join(__dirname, "../examples"),
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    }
}