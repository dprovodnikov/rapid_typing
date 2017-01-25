module.exports = {

  entry: './js/app.js',

  output: {
    path: './build',
    filename: 'build.js'
  },

  watch: true,
  devtool: 'inline-source-map',

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015',
      exclude: /\/node_modules\//,
    }],
  },

}