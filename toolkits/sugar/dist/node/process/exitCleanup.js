"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __deepMerge = require('../object/deepMerge');

var __getRegisteredProcessed = require('./getRegisteredProcesses');

var __clear = require('clear');

var __fkill = require('fkill');

var __hotkey = require('../keyboard/hotkey');

var __spawn = require('../process/spawn');

var __parseHtml = require('../terminal/parseHtml');

var __keypress = require('keypress');
/**
 * @name              exitCleanup
 * @namespace           node.process
 * @type              Function
 *
 * This function register a handler on process exit and try to clean all the child process, etc...
 *
 * @param       {Function}       [handler=null]       A custom function to handle custom cleanup if you need. MUST return a promise that you have to resolve once the cleanup has been done
 * @param       {Object}        [settings={}]         An object of settings to configure your cleanup:
 * - childProcess (true) {Boolean}: Specify if you want to clean the child processes or not
 *
 * @example         js
 * const exitCleanup = require('@coffeekraken/sugar/node/process/exitCleanup');
 * exitCleanup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


var _exitCleanupRegistered = false;

module.exports = function exitCleanup(handler, settings) {
  if (handler === void 0) {
    handler = null;
  }

  if (settings === void 0) {
    settings = {};
  }

  if (_exitCleanupRegistered) return;
  _exitCleanupRegistered = true;

  __hotkey('ctrl+c', {
    once: true
  }).on('press', /*#__PURE__*/_asyncToGenerator(function* () {
    // check if all processes are closed
    var processes = __getRegisteredProcessed();

    var processesCount = Object.keys(processes).length;
    var remainingProcessesCount = Object.keys(processes).length;

    __keypress.disableMouse(process.stdout);

    console.log(__parseHtml('  Cleaning your system after <primary>Sugar</primary> execution...'));

    function processKilled() {
      return _processKilled.apply(this, arguments);
    }

    function _processKilled() {
      _processKilled = _asyncToGenerator(function* () {
        remainingProcessesCount--;

        if (remainingProcessesCount <= 0) {
          console.log(__parseHtml('  Cleaning the forgotten process(es)...'));

          var pro = __spawn('sugar util.kill all', {
            id: 'cleanup'
          }).on('log,error', value => {
            console.log(__parseHtml("    - ".concat(value.value)));
          }).on('cancel,finally', () => {
            console.log(__parseHtml("  All of the <cyan>".concat(processesCount, "</cyan> process(es) have been <green>successfully</green> closed")));
            process.exit();
          });
        }
      });
      return _processKilled.apply(this, arguments);
    }

    if (remainingProcessesCount > 0) {
      Object.keys(processes).forEach( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (key) {
          var processObj = processes[key];

          if (processObj.hasAfterCommand && processObj.hasAfterCommand()) {
            function waitForClose() {
              var p = new Promise(resolve => {
                processObj.on('close', () => {
                  resolve();
                }).on('log,error', value => {
                  console.log(__parseHtml("  ".concat(value.value)));
                });
              });
              return p;
            }

            yield waitForClose();
            processKilled();
          } else if (!processObj.exitCode && process.pid !== processObj.pid) {
            console.log(__parseHtml("  Killing the process with the PID <cyan>".concat(processObj.pid, "</cyan>")));
            yield __fkill(processObj.pid);
            processKilled();
          } else {
            processKilled();
          }
        });

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    } else {
      console.log(__parseHtml('  Cleaning the forgotten process(es)...'));
      yield __spawn('sugar util.kill all').on('log,error', value => {
        console.log(__parseHtml("    - ".concat(value.value)));
      }).on('cancel,finally', () => {
        console.log(__parseHtml("  All of the <cyan>".concat(processesCount, "</cyan> process(es) have been <green>successfully</green> closed")));
        process.exit();
      });
    }
  }));
};