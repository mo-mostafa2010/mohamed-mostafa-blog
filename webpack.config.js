const path = require("path");

// include the js minification plugin
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    headjs: "./assets/src/js/head.js",
    footerjs: "./assets/src/js/footer.js",
    styles: "./assets/src/scss/styles.scss"
  },
  output: {
    filename: "./assets/build/[name].min.js",
    path: path.resolve(__dirname)
  },
  devtool: "source-map",
  module: {
    rules: [
      // perform js babelization on all .js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      //Compile SCSS to css
      {
        test: /\.(sass|scss)$/,
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // extract css into dedicated file
    new MiniCssExtractPlugin({
      filename: "./assets/build/[name].min.css"
    })
  ],

  optimization: {
    minimizer: [
      // enable the js minification plugin
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      }),
      // enable the css minification plugin
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
