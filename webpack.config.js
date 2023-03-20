const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/assets/TS/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/main.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include:[path.resolve(__dirname, 'src')],
                // exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader",]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        port: 9000
    }
}