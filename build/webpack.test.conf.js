var path = require("path");
var webpackConfig = module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: path.resolve(__dirname, '../dist')
    },
    devtool: '#inline-source-map',
    resolve: {
        extensions: ['.js','.ts'],
        alias: {
            'vue': 'vue/dist/vue.js'
          }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}

module.exports = webpackConfig
