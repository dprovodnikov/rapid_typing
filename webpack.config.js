module.exports = {

  entry: './public/js/main.js',

  output: {
    path: './public/build',
    filename: './build.js'
  },

  devtool: 'inline-source-map',

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015',
      exclude: /\/node_modules\//,
    }],
  },

}