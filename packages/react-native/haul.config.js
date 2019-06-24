import { createWebpackConfig } from 'haul';
import path from 'path';

export default {
  webpack: env => {
    const config = createWebpackConfig({
      entry: './index.js'
    })(env);

    config.module.rules = [
      {
        test: /\.js$/,
        include: [
          path.resolve('node_modules/react-native/'),
          path.resolve('node_modules/metro/'),
          path.resolve('node_modules/react-devtools-core/'),
          path.resolve('node_modules/react-hot-loader/')
        ],
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['module:metro-react-native-babel-preset'],
              cacheDirectory: true
            }
          }
        ]
      },
      ...config.module.rules
    ];

    return config;
  }
};
