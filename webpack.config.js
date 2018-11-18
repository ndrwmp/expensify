// entry -> output (bundle)

// use node's path.join() functionality
const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    // loaders - tell webpack to translate our .js files through babel before 
    // building
    module: {
        rules: [
            {
                loader:     "babel-loader",
                test:       /\.js$/, // regular expression checking for all files ending with .js
                exclude:    /node_modules/ // exclude the node_modules folder - we
                // don't want to run babel on all of the node_modules, they're already good to go
            },
            {
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
                test: /\.s?css$/ // for all css and scss files
            }
        ]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true // tell server we'll do client-side routing
    }
};