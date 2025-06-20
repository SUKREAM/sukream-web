const path = require('path');

module.exports = {
  entry: {
    dev: "./src/index.tsx",
  },
  output: {
    filename: "./build/index.js",
  },
  devtool: "source-map",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], 
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },

      {
        test: /\.less$/,
        use: [
          'style-loader', 
          'css-loader',  
          {
            loader: 'less-loader', 
            options: {
              lessOptions: {
                modifyVars: {
                  'input-border-radius': '8px',
                  'input-border-color': '#f06292',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
};
