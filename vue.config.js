/* eslint-disable */

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('store', resolve('src/store'))
            .set('theme', resolve('src/theme'))
    },
    devServer: {
        port: 8010,
        proxy: 'http://localhost:4000'
    },
};
