const webpack = require('webpack');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const commonPaths = require('./paths');

module.exports = {
  entry: commonPaths.entryPath,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.fontsFolder,
              publicPath: url => '../fonts/' + url
            },
          },
        ],
      },
    ],
  },
  serve: {
    add: app => {
      app.use(convert(history()));
    },
    content: commonPaths.entryPath,
    dev: {
      publicPath: commonPaths.outputPath,
    },
    open: true,
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new CopyPlugin([
      {
        from: 'static-data/**/*',
        to: 'static-data/[name].[ext]',
        test: /\.json/,
      },
    ]),
    new AppManifestWebpackPlugin({
      logo: './src/assets/images/lsst_logo_small.png',
      persistentCache: true,
      output: './',
      config: {
        appName: 'LSST App', // Your application's name. `string`
        appDescription: null, // Your application's description. `string`
        developerName: null, // Your (or your developer's) name. `string`
        developerURL: null, // Your (or your developer's) URL. `string`
        background: '#ffffff', // Background colour for flattened icons. `string`
        theme_color: '#ffffff', // Theme color for browser chrome. `string`
        display: 'standalone', // Android display: "browser" or "standalone". `string`
        orientation: 'portrait', // Android orientation: "portrait" or "landscape". `string`
        start_url: '/?homescreen=1', // Android start application's URL. `string`
        version: '1.0.0', // Your application's version number. `number`
        logging: false, // Print logs to console? `boolean`
        icons: {
          // Platform Options:
          // - offset - offset in percentage
          // - shadow - drop shadow for Android icons, available online only
          // - background:
          //   * false - use default
          //   * true - force use default, e.g. set background for Android icons
          //   * color - set background for the specified icons
          //
          android: false, // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
          appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background }`
          appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background }`
          coast: false, // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
          favicons: true, // Create regular favicons. `boolean`
          firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background }`
          windows: false, // Create Windows 8 tile icons. `boolean` or `{ background }`
          yandex: false, // Create Yandex browser icon. `boolean` or `{ background }`
        },
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new StylelintPlugin({
      syntax: 'scss',
    }),
  ],
};
