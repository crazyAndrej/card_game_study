const path = require('path')
const LinkTypePlugin =
    require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    mode: isProduction ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader?sourceMap',
                        options: {
                            includePaths: [],
                            sourceMap: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimizer: ['...', new CssMinimizerPlugin()],
    },
    devtool:
        process.env.NODE_ENV === 'production' ? 'source-map' : 'source-map',

    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'img', to: 'static' }],
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: '/index.html',
        }),
        new LinkTypePlugin({
            '*.css': 'text/css',
        }),
    ],
}

// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

// const isProduction = process.env.NODE_ENV === 'production'

// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// const mode =
//     process.env.NODE_ENV === 'production' ? 'production' : 'development'

// module.exports = {
//     entry: '/script.js',
//     mode,
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js',
//         clean: true,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.scss$/,
//                 use: [
//                     {
//                         loader: MiniCssExtractPlugin.loader,
//                         options: {},
//                     },
//                     'style-loader',
//                     'css-loader',
//                     'resolve-url-loader',
//                     {
//                         loader: 'sass-loader?sourceMap',
//                         options: {
//                             includePaths: [],
//                             sourceMap: true,
//                         },
//                     },
//                 ],
//                 exclude: /node_modules/,
//             },
//             {
//                 test: /\.(png|svg|jpg|jpeg|gif)$/i,
//                 type: 'asset/resource',
//             },
//             {
//                 test: /\.(woff|woff2|eot|ttf|otf)$/i,
//                 type: 'asset/resource',
//             },
//         ],
//     },
//     optimization: {
//         minimizer: ['...', new CssMinimizerPlugin()],
//     },
//     devtool:
//         process.env.NODE_ENV === 'production' ? 'source-map' : 'source-map',

//     plugins: [
//         new CopyPlugin({
//             patterns: [{ from: 'img', to: 'static' }],
//         }),
//         new MiniCssExtractPlugin(),
//         new HtmlWebpackPlugin({
//             template: '/index.html',
//         }),
//     ],
// }

// module.exports = {
//     entry: './src/index.js',
//     mode: isProduction ? 'production' : 'development',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js',
//         clean: true,
//     },
//     module: {
//         rules: [
//             { test: /\.css$/, use: ['style-loader', 'scss-loader'] },
//             {
//                 test: /\.(png|svg|jpg|jpeg|gif)$/i,
//                 type: 'asset/resource',
//             },
//             {
//                 test: /\.(woff|woff2|eot|ttf|otf)$/i,
//                 type: 'asset/resource',
//             },
//         ],
//     },
//     plugins: [
//         new CopyPlugin({
//             patterns: [{ from: 'img', to: 'static' }],
//         }),
//         new HtmlWebpackPlugin({
//             template: './index.html',
//         }),
//     ],
// }
