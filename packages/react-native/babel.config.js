module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [[
      'module-resolver', {
        alias: {
          examples: '/Users/mswaagman/projects/ux-button/examples'
        }
      }
    ]]
  };
};
