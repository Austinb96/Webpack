const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: "./assets/js/functions.js",
    output: {
        path: __dirname,
        filename: "./_site/assets/js/build.js"
    },
    watch: true,
    module: {
        loaders: [
            {
              enforce: 'pre',
              test:/\.js$/,
              exclude: /(node_modules)/,
              loader: 'jshint-loader'
            },
            {
               test: /\.scss$/,
               use: ExtractTextPlugin.extract({
                 fallback: 'style-loader',
                 use:'css-loader!postcss-loader!sass-loader'
               })
             },
             {
               include: /\.pug/,
               loader: 'file-loader?name=_site/index.html!pug-html-loader?exports=false'
               /* 'file-loader?name=index.html!extract-loader!pug-html-loader?exports=false!html-loader' */
             },
              {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015']
                }
              }
        ]
    },
    plugins: [
      new ExtractTextPlugin('_site/assets/css/style.css'),
      new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: '_site',
        index: 'index.html',
        files: ['assets/css/style.css', 'assets/js/build.js']
     }
   })
    ]
};
