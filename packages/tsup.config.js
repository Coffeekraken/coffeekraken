module.exports = {
  entry: "packages/*/*/src/node/**/*.ts",
  bundle: false,
  format: [
    "cjs"
  ],
  outDir: "packages",
  platform: "node",
  dts: false,
  tsconfig: "my-tsconfig.json"
};
