const webpack = require('webpack');

const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[local]',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  stats: {
    colors: true,
    entrypoints: true,
    errors: true,
    warnings: true,
    chunkGroups: true,
    modules: false,
    chunks: true,
    chunkModules: true,
    chunkOrigins: true,
    // depth: true,
    env: true,
    reasons: true,
    // usedExports: true,
    // providedExports: true,
    // optimizationBailout: true,
    errorDetails: true,
    publicPath: true,
    // exclude: false,
    // maxModules: Infinity,
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
