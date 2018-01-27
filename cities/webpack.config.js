const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = env => {
  return {
    devtool: 'source-map',
    entry: ['index.tsx'],
    output: {
      filename: 'bundle.js',
      publicPath: '/dist',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', 'css'],
      modules: ['src', 'node_modules'],
    },
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loaders: ['babel-loader', 'ts-loader'],
          include: path.resolve('src'),
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
          include: path.resolve('src'),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV),
        },
      }),
    ],
  };
};
