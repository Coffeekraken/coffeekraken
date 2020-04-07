module.exports = {
  testRegex: "((\\.|/)(test|spec))\\.[jt]sx?$",
  moduleNameMapper: {
    "^@coffeekraken\/sugar\/(.*)$": "<rootDir>/src/$1"
  }
};