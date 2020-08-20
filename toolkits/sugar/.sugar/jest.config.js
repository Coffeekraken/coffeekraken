const __path = require('path');
const __isChildProcess = require('../src/node/is/childProcess');
const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  setupFiles: [
    '<rootDir>/.jest/setup.js',
    `${__path.resolve(__dirname, '../src/node/index.js')}`
  ],
  reporters: [
    __isChildProcess()
      ? `${__path.resolve(
          __dirname,
          '../src/node/test/jest/STestJestOutputReporter.js'
        )}`
      : 'default'
  ],
  testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
  moduleNameMapper: {
    '^@coffeekraken/sugar/(.*)$': '<rootDir>/src/$1'
  },
  modulePathIgnorePatterns: ['__wip__|tests/'],
  cli: {
    /**
     * @name              input
     * @namespace         config.jest
     * @type              String
     * @default           <appRoot>/src/\*\*\/\*.scss
     *
     * Specify the root folder (or file) to check for .js files to launch tests for.
     * Glob patterns can be used
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `${__packageRoot(__dirname)}/src/**/*.test.js`,

    /**
     * @name              watch
     * @namespace         config.jest
     * @type              String
     * @default           src/js\/**\/*.js
     *
     * Set the watch files that you want to check
     *
     * @since             2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch: `${__packageRoot(__dirname)}/src/js/**/*.js`,

    silent: true,
    config: __path.resolve(__dirname + '/../jest.config.js'),
    bail: true,
    noStackTrace: true
  }
};
