const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// module.exports = {
//     mode: 'development',
//     entry: './src/main.js',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     runtimeCompiler: true,
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env']
//                     }
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader']
//             },
//             {
//                 test: /\.vue$/,
//                 use: 'vue-loader'
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebPackPlugin({
//             template: './index.html',
//             filename: './index.html'
//         }),
//         new VueLoaderPlugin(),
//         new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
//     ]
// };
module.exports = {
    rules: [
        {
            test: /\.s(c|a)ss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    // Requires sass-loader@^8.0.0
                    options: {
                        implementation: require('sass'),
                        sassOptions: {
                            fiber: require('fibers'),
                            indentedSyntax: true // optional
                        },
                    },
                },
            ],
        },
    ],
    runtimeCompiler: true,
};
