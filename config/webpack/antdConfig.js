module.exports = {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          }
          ,{
            loader: 'less-loader',
            options: {
              modifyVars: {'primary-color':'#54B6C5'},
              javascriptEnabled: true,
            },
          }]
        },
      ],
    },
  };