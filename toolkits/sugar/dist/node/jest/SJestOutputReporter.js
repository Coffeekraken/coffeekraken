"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __getFilename = require('../fs/filename');

var __packageRoot = require('../path/packageRoot');

var __highlight = require('cli-highlight').highlight; // my-custom-reporter.js


var SJestOutputReporter = /*#__PURE__*/function () {
  function SJestOutputReporter(globalConfig, options) {
    _classCallCheck(this, SJestOutputReporter);

    this._globalConfig = globalConfig;
    this._options = options;
  }

  _createClass(SJestOutputReporter, [{
    key: "onRunStart",
    value: function onRunStart(metas, vars) {
      console.log("<bgYellow><black> Starting tests </black></bgYellow> estimated time: <yellow>".concat(vars.estimatedTime, "s</yellow>"));
    }
  }, {
    key: "onTestStart",
    value: function onTestStart(obj) {
      console.log("#temp #mb:0 <yellow>\u2502</yellow> <bgCyan> ".concat(__getFilename(obj.path), " </bgCyan> ").concat(obj.path.replace("".concat(__packageRoot(), "/"), '')));
    }
  }, {
    key: "onTestResult",
    value: function onTestResult(obj, result) {
      // console.log('test result', result);
      if (result.numFailingTests === 0) {
        console.log("<yellow>\u2502</yellow> <bgGreen><black> ".concat(__getFilename(obj.path), " </black></bgGreen> ").concat(obj.path.replace("".concat(__packageRoot(), "/"), '')));
      } else {
        console.log("#mb:0 <yellow>\u2502</yellow> <bgRed><black> ".concat(__getFilename(obj.path), " </black></bgRed> ").concat(obj.path.replace("".concat(__packageRoot(), "/"), '')));
        console.log("<yellow>\u2502</yellow>");
        result.testResults.forEach(resObj => {
          if (resObj.status === 'passed') {
            console.log("<yellow>\u2502</yellow> <bgGreen><black> Passed </black></bgGreen> ".concat(resObj.title));
          } else if (resObj.status === 'failed') {
            console.log("<yellow>\u2502</yellow> <bgRed><black> Failed </black></bgRed> <red>".concat(resObj.title, "</red>"));
          }
        });
      }
    }
  }, {
    key: "onRunComplete",
    value: function onRunComplete(contexts, result) {
      result.testResults.forEach(resultObj => {
        if (resultObj.failureMessage) {
          console.log("<bgRed><black> ".concat(resultObj.testFilePath.replace("".concat(__packageRoot(), "/"), ''), " </black></bgRed>"));
          var lines = resultObj.failureMessage.split('\n').map((line, i) => {
            if (i === 0) {
              return "<yellow>".concat(line, "</yellow>");
            } else if (line.trim().slice(0, 8) === 'Expected') {
              return "<green>".concat(line, "</green>");
            } else if (line.trim().slice(0, 8) === 'Received') {
              return "<red>".concat(line, "</red>");
            } else if (line.trim().slice(0, 3) === 'at ') {
              return "<cyan>".concat(line, "</cyan>");
            }

            return line;
          });
          console.log("<white>".concat(lines.join('\n'), "\n</white>"));
        }
      });
      var titleBg = result.numFailedTests > 0 ? 'bgRed' : 'bgGreen';
      console.log("<".concat(titleBg, "><black> Stats </black></").concat(titleBg, ">\n"));
      console.log("- <yellow>total</yellow>  tests: <yellow>".concat(result.numTotalTests, "</yellow>"));
      console.log("- <green>passed</green> tests: <green>".concat(result.numPassedTests, "</green>"));
      console.log("- <red>failed</red> tests: <red>".concat(result.numFailedTests, "</red>"));
    }
  }]);

  return SJestOutputReporter;
}();

module.exports = SJestOutputReporter;