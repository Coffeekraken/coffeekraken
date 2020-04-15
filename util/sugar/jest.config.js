module.exports = {
  setupFiles: [
    '<rootDir>/.jest/setup.js'
  ],
  testRegex: "((\\.|/)(test|spec))\\.[jt]sx?$",
  moduleNameMapper: {
    "^@coffeekraken\/sugar\/(.*)$": "<rootDir>/src/$1"
  }
};