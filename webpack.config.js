const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: {
        "Shared/layout": './ClientApp/src/js/Shared/layout.js',
        "AjaxCall": './ClientApp/src/js/AjaxCall.js',
        "Auth/Login": './ClientApp/src/js/Auth/Login.js',
        "MyDay/MyDay": './ClientApp/src/js/MyDay/MyDay.js',
        "Important/Important": './ClientApp/src/js/Important/Important.js',
        "Planned/Planned": './ClientApp/src/js/Planned/Planned.js',
        "Tasks/Tasks": './ClientApp/src/js/Tasks/Tasks.js',
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
                test: /\.vue$/,
                loader: 'vue-loader'
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
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
    ]
};