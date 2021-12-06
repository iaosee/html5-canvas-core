const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const isProd = Boolean(process.env.MODE_ENV);
const ROOT_PATH = __dirname;
const PATHS = {
  src: path.resolve(ROOT_PATH, 'src'),
  build: path.resolve(ROOT_PATH, 'dist')
};

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'hidden-source-map' : 'inline-source-map',

  entry: {
    main: PATHS.src + '/index.ts',
  },
  output: {
    path: PATHS.build,
    // publicPath: '/www/',
    filename: 'script/[name].bundle.[hash].js',
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.jsx'
    ]
  },
  devServer: {
    // host: "0.0.0.0",
    port: 6600,
    open: true,
    hot: true,
  },

  module: {
    rules: [

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              localIdentName: '[name]-[local]--[hash:base64:5]'
            },
          },
          {
            loader: 'postcss-loader',
          },
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules|vendor/,
        use: {
          loader: 'babel-loader',
          options: { presets: [], plugins: [] },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "postcss-loader" },
          { loader: "less-loader" }
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/',
              esModule: false,
            }
          },
          // {
          //   loader: 'file-loader',
          //   options: { name: '[name].[hash].[ext]', outputPath: 'asset/images/' },
          // },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/',
          esModule: false,
        }
      },
      {
        test: /\.(tsv|cvs|geojson)\w*/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'data/',
          esModule: false,
        }
      },
      {
        test: /\.(mp4)\w*/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'videos/',
          esModule: false,
        }
      },
      {
        test: /\.ts[x]?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new webpack.BannerPlugin(' author: @iaosee \r\n email: iaosee@outlook.com' + '\r\n url: www.iaosee.com'),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/index.html',
      hash: true,
      minify: {
        collapseWhitespace: isProd ? true : false,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[hash].css',
      // disable: !isProd
    }),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
  ],
};
