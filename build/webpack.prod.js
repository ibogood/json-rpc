const baseConfig = require('./webpack.base')
const path = require('path');
module.exports = {
    ...baseConfig,
    mode: 'production',
　　output: {
　　　　filename: 'index.js',
　　　　path: path.resolve(__dirname, '../dist'),
       libraryTarget: 'commonjs2'
　　}
}