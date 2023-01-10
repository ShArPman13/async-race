const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: { noEmit: false },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      extensions: [`js`, `ts`],
      exclude: [`/node_modules/`, `/bower_components/`],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets',
          to: './assets',
        },
      ],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
