module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["next/babel"],
    plugins: [["react-native-web"]],
  };
}
