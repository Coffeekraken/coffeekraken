module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "2"
        }
      }
    ]
  ],
  plugins: ["add-module-exports"]
};
