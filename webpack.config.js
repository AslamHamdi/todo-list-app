const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        "Shared/layout": './ClientApp/src/js/Shared/layout.js',
        "MyDay/MyDay": './ClientApp/src/js/MyDay/MyDay.js',
        "Planned/Planned": './ClientApp/src/js/Planned/Planned.js',
    },
    output: {
        filename: 'js/[name].entry.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ""
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                //include: path.resolve(__dirname, './ClientApp/src/css/Shared/'),
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', /*'style-loader',*/ 'postcss-loader']
            },
            {
                test: /\.(eot|woff(2)?|ttf|otf|svg)$/i,
                type: 'asset'
            },
            {
                test: /\.js$/,
                use: {
                  loader: "babel-loader",
                },
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    // Requires sass-loader@^7.0.0
                    options: {
                      implementation: require('sass'),
                      indentedSyntax: true // optional
                    },
                    // Requires >= sass-loader@^8.0.0
                    options: {
                      implementation: require('sass'),
                      sassOptions: {
                        indentedSyntax: true // optional
                      },
                    },
                  },
                ],
            },
        
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ]
};