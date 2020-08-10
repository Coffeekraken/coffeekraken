"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const __getFilename = require('../fs/filename');

const __packageRoot = require('../path/packageRoot');

const __highlight = require('cli-highlight').highlight; // my-custom-reporter.js


let SJestOutputReporter = /*#__PURE__*/function () {
  function SJestOutputReporter(globalConfig, options) {
    _classCallCheck(this, SJestOutputReporter);

    this._globalConfig = globalConfig;
    this._options = options;
  }

  _createClass(SJestOutputReporter, [{
    key: "onRunStart",
    value: function onRunStart(metas, vars) {
      console.log(`<bgYellow><black> Starting tests </black></bgYellow> estimated time: <yellow>${vars.estimatedTime}s</yellow>`);
    }
  }, {
    key: "onTestStart",
    value: function onTestStart(obj) {
      console.log(`#temp #mb:0 <yellow>│</yellow> <bgCyan> ${__getFilename(obj.path)} </bgCyan> ${obj.path.replace(`${__packageRoot()}/`, '')}`);
    }
  }, {
    key: "onTestResult",
    value: function onTestResult(obj, result) {
      // console.log('test result', result);
      if (result.numFailingTests === 0) {
        console.log(`<yellow>│</yellow> <bgGreen><black> ${__getFilename(obj.path)} </black></bgGreen> ${obj.path.replace(`${__packageRoot()}/`, '')}`);
      } else {
        console.log(`#mb:0 <yellow>│</yellow> <bgRed><black> ${__getFilename(obj.path)} </black></bgRed> ${obj.path.replace(`${__packageRoot()}/`, '')}`);
        console.log(`<yellow>│</yellow>`);
        result.testResults.forEach(resObj => {
          if (resObj.status === 'passed') {
            console.log(`<yellow>│</yellow> <bgGreen><black> Passed </black></bgGreen> ${resObj.title}`);
          } else if (resObj.status === 'failed') {
            console.log(`<yellow>│</yellow> <bgRed><black> Failed </black></bgRed> <red>${resObj.title}</red>`);
          }
        });
      }
    }
  }, {
    key: "onRunComplete",
    value: function onRunComplete(contexts, result) {
      result.testResults.forEach(resultObj => {
        if (resultObj.failureMessage) {
          console.log(`<bgRed><black> ${resultObj.testFilePath.replace(`${__packageRoot()}/`, '')} </black></bgRed>`);
          const lines = resultObj.failureMessage.split('\n').map((line, i) => {
            if (i === 0) {
              return `<yellow>${line}</yellow>`;
            } else if (line.trim().slice(0, 8) === 'Expected') {
              return `<green>${line}</green>`;
            } else if (line.trim().slice(0, 8) === 'Received') {
              return `<red>${line}</red>`;
            } else if (line.trim().slice(0, 3) === 'at ') {
              return `<cyan>${line}</cyan>`;
            }

            return line;
          });
          console.log(`<white>${lines.join('\n')}\n</white>`);
        }
      });
      const titleBg = result.numFailedTests > 0 ? 'bgRed' : 'bgGreen';
      console.log(`<${titleBg}><black> Stats </black></${titleBg}>\n`);
      console.log(`- <yellow>total</yellow>  tests: <yellow>${result.numTotalTests}</yellow>`);
      console.log(`- <green>passed</green> tests: <green>${result.numPassedTests}</green>`);
      console.log(`- <red>failed</red> tests: <red>${result.numFailedTests}</red>`);
    }
  }]);

  return SJestOutputReporter;
}();

module.exports = SJestOutputReporter;