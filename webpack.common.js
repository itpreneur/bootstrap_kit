const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    filename: "bootstrap.bundle.js",
    //filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery",
      Popper: ["popper.js", "default"],
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    //use htmlwebpackplugin to generate html
    new HtmlWebpackPlugin({
      title: "Bootstrap Webpack Kit",
      template: "src/index.html" //load custom template
    })
  ],
  resolve: {
    extensions: [".js"],
    modules: [path.resolve(__dirname, "scripts"), "node_modules"],
    alias: {
      jquery: "jquery/dist/jquery.slim.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader"
          },
          //image compression
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  }
};
