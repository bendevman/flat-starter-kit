const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const mode = process.env.NODE_ENV ?? "development"

module.exports = {
  mode: mode,
  entry: {
    'index': './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index','common'],
      template: './src//index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)$/i,
        exclude: [/img/],
        type: "asset/resource",
        generator: {
          filename: 'fonts/[name][ext]'
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        exclude: [/fonts/],
        type: "asset/resource",
        generator: {
          filename: 'img/[name][ext]'
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          minChunks: 2,
          name: 'common',
          enforce: true
        }
      }
    }
  },
  // devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 8888,
  },
}