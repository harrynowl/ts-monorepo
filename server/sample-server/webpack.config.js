const os = require('os')
const path = require('path')
const process = require('process')
const Webpack = require('webpack')

const env = process.env.BUILD_ENV ?? 'development'

module.exports = {
  devtool: env === 'production' ? false : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  context: path.resolve(__dirname, 'src'),
  target: 'async-node',
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: os.cpus.length - 1,
              poolTimeout: 2000
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: '14'
                    }
                  }
                ],
                ['@babel/preset-typescript']
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              happyPackMode: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Webpack.ProgressPlugin({
      profile: true,
      dependencies: true,
      modules: true
    }),
    new Webpack.CleanPlugin()
  ]
}
