module.exports = {
    entry: "./src/client/app.js",
    output: {
        path: __dirname,
        filename: "./public/scripts/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.js$/,
                loader: 'jsx-loader'
            }
        ]
    }
};
