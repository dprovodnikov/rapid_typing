module.exports = {

  context: './public',
  entry: './js/app.js',

  output: {
    path: './public/build',
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