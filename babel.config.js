module.exports = function(api) {
  api.cache(false);
  return {
    presets: [
      [
        "@babel/env",
        {
          useBuiltIns: "usage",
          corejs: "3.0.0"
        }
      ]
    ],
    plugins: [
      "add-module-exports",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-export-default-from"
    ]
  };
};
