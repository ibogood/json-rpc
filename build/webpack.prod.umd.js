const baseConfig = require('./webpack.base')
const path = require('path');
module.exports = {
    ...baseConfig,
    mode: 'production',
    output: {
        filename: 'umd.min.js',
        path: path.resolve(__dirname, '../dist'),
        library: 'jsonRPC',
        libraryTarget: 'umd'
    }
}