

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    mode: 'development',
    devServer:{
        contentBase:'.',
        port:3000
    },
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: ['style-loader', 'sass-loader'],
            },
            {
                test: /.ts$/,
                use: ['ts-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: "cli-template"
        })
    ]

}