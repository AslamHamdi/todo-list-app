const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        //"Shared/global": './ClientApp/src/js/Shared/global.js',
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ]
};