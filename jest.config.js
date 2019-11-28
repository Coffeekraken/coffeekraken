module.exports = {
  testMatch: [
    `${process.cwd()}/tests/**/*.[jt]s?(x)`,
  ],
  transform: {
    "\\.txt$": "jest-raw-loader",
    "\\.js$": ["babel-jest", { rootMode: "upward" }]
  }
};
