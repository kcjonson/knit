/*eslint-disable */
module.exports = {
    entry: './src/app.jsx',
    output: {
        path: __dirname,
        filename: './scripts/bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['env', {
                        targets: {
                          browsers: ['chrome >= 60']
                        }
                      }]
                    ],
                    plugins: ['transform-class-properties']
                  }

                }
            },
            {
                test: /\.jsx$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['env', {
                        targets: {
                          browsers: ['chrome >= 60']
                        }
                      }]
                    ],
                    plugins: ['transform-class-properties', 'inferno']
                  }

                }
            }
        ]
    }
};
