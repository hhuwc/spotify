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
            .set('base', resolve('src/base'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('store', resolve('src/store'))
            .set('theme', resolve('src/theme'))
    },
    devServer: {
        port: 8048,
        proxy: {
            "/py": {
                target: 'http://localhost:5000',
                pathRewrite: { '^/py': '' },
            },
            "/node": {
                target: 'http://localhost:4000',
                pathRewrite: { '^/node': '' },
            },

        }
    },
};
