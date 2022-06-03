/* config-overrides.js */

module.exports = {
  webpack: function (config, env) {
    console.log('env', env);

    // if (env !== 'production') {
    //   return config;
    // }
    // const buildHash = uniqid();

    // config.output.filename = 'js/[name].js',
    //   config.output.publicPath = '/app/';
    // config.output.chunkFilename = `js/[id].bundle.js?v=${buildHash}`,
    //   config.plugins.push(
    //     new FileManagerPlugin({
    //       onEnd: {
    //         copy: [{ source: '../ MyApp/build', destination: '../MyApp/app' }],
    //       },
    //     }),
    //   );

    // config.plugins.push(new HtmlWebPackPlugin())
    // config.plugins.push(new MiniCssExtractPlugin({
    //   filename: 'css/main.css',
    //   chunkFilename: `css/[id].css?v=${buildHash}`,
    // })
    // )
    config.externals = {
      'fs': '{}'
    }

    console.log(config)

    return config;
  }
}