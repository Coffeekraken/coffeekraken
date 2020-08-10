const __path = require('path');
const __isChildProcess = require('../src/node/is/childProcess');

module.exports = {
  setupFiles: [
    '<rootDir>/.jest/setup.js',
    `${__path.resolve(__dirname, '../src/node/index.js')}`
  ],
  reporters: [
    __isChildProcess()
      ? `${__path.resolve(
          __dirname,
          '../src/node/jest/SJestOutputReporter.js'
        )}`
      : 'default'
  ],
  testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
  moduleNameMapper: {
    '^@coffeekraken/sugar/(.*)$': '<rootDir>/src/$1'
  },
  modulePathIgnorePatterns: ['__wip__|tests/'],
  cli: {
    silent: true,
    config: __path.resolve(__dirname + '/../jest.config.js'),
    bail: true,
    noStackTrace: true
  }
};
