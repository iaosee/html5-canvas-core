const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const isProd = Boolean(process.env.MODE_ENV);
const ROOT_PATH = __dirname;
const PATHS = {
  src: path.resolve(ROOT_PATH, 'src'),
  build: path.resolve(ROOT_PATH, 'dist')
};

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-eval-source-map',

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

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: isProd ? true : false
            },
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
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
          }
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
        test: /\.s[c|a]ss/,
        // reference <https://www.npmjs.com/package/extract-text-webpack-plugin>
        use: isProd
        ? ExtractTextPlugin.extract({ fallback: ['style-loader'], use: ['css-loader', 'sass-loader'], publicPath: '../' })
        : ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
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
              outputPath: 'images/'
            }
          },
          // {
          //   loader: 'file-loader',
          //   options: { name: '[name].[hash].[ext]', outputPath: 'asset/images/' },
          // },
          {
            loader: 'image-webpack-loader',
            options: { bypassOnDebug: true },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(tsv|cvs|geojson)\w*/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'data/'
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
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/index.html',
      hash: true,
      minify: {
        collapseWhitespace: isProd ? true : false,
      },
    }),
    new ExtractTextPlugin({
      filename: 'style/[name].[hash].css',
      // disable: !isProd
    }),
    new CleanWebpackPlugin(PATHS.build + '/*', {
      root: ROOT_PATH,
      verbose: true,
      dry: false
    }),
  ]
};
