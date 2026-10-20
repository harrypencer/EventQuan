const { tempoExpoBabelPlugin } = require("tempo-sdk/expo/plugin");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [[tempoExpoBabelPlugin, { root: __dirname }]],
  };
};
