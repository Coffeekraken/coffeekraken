module.exports = {
  setupFiles: [
    '<rootDir>/.jest/setup.js'
  ],
  // testTimeout: 20000,
  testRegex: "((\\.|/)(test|spec))\\.[jt]sx?$",
  moduleNameMapper: {
    "^@coffeekraken\/sugar\/(.*)$": "<rootDir>/src/$1"
  },
  modulePathIgnorePatterns: ["__wip__"]
};