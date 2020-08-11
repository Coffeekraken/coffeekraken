"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __childProcess = require('child_process');

var __deepMerge = require('../object/deepMerge');

var __SPromise = require('../promise/SPromise');

var __uniqid = require('../string/uniqid');

var __parse = require('../string/parse');

var __hotkey = require('../keyboard/hotkey');

var __tkill = require('tree-kill');

var __registerProcess = require('./registerProcess');

var __getRegisteredProcesses = require('./getRegisteredProcesses');

var __wait = require('../time/wait');

var __clone = require('../object/clone');
/**
 * @name                                spawn
 * @namespace           node.process
 * @type                                Function
 *
 * This function is a wrapper for the native "spawn" one that add the Promise support
 *
 * @param       {String}        command           The command to execute
 * @param       {Array|Object}    [argsOrSettings=null]     Either an Array of args, or an object of settings
 * @param       {Object}        [settings=null]               An object of settings for your spawn command. This is the same as the settings of the native spawn
 *
 * @TODO        settings documentation
 * @TODO        API documentation (isClosed, etc...)
 *
 * @example       js
 * const spawn = require('@coffeekraken/sugar/node/process/spawn');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function spawn(command, argsOrSettings, settings) {
  if (argsOrSettings === void 0) {
    argsOrSettings = null;
  }

  if (settings === void 0) {
    settings = null;
  }

  var childProcess;
  var runningProcess = {
    id: __uniqid(),
    start: Date.now(),
    end: null,
    duration: null,
    stdout: [],
    stderr: [],
    command,
    state: 'idle',
    args: Array.isArray(argsOrSettings) ? argsOrSettings : []
  };
  var argsArray = [];
  var defaultSettings = {
    lazy: false,
    before: null,
    after: null,
    shell: true,
    env: _objectSpread(_objectSpread({}, process.env), {}, {
      CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL ? process.env.CHILD_PROCESS_LEVEL + 1 : 1,
      IS_CHILD_PROCESS: true
    })
  };

  if (typeof argsOrSettings === 'object') {
    settings = __deepMerge(defaultSettings, argsOrSettings);
  } else if (Array.isArray(argsOrSettings)) {
    argsArray = argsOrSettings;
  }

  if (typeof settings === 'object') {
    settings = __deepMerge(defaultSettings, settings);
  }

  if (settings.id) runningProcess.id = settings.id;
  var promise = new __SPromise((resolve, reject, trigger, cancel) => {
    // check if not lazy
    if (settings.lazy === false) run();
  }, {
    id: runningProcess.id
  });

  function runBeforeAfterCommand(when, command, argsArray, spawnSettings) {
    if (argsArray === void 0) {
      argsArray = [];
    }

    if (spawnSettings === void 0) {
      spawnSettings = {};
    }

    var pro = new __SPromise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        var result = true;
        promise.trigger("".concat(when, ".start"), {
          time: Date.now()
        });
        promise.log("Cleaning the <cyan>".concat(runningProcess.id, "</cyan>..."));

        if (typeof settings[when] === 'function') {
          result = yield settings[when](command, argsArray, spawnSettings);
        } else if (typeof settings[when] === 'string') {
          var _pro = spawn(settings[when], [], _objectSpread({
            id: settings.id + '.' + when
          }, spawnSettings)).start();

          _pro.on('log,error', value => {
            if (!value) return;
            value.value = "  - ".concat(value.value);
            promise.trigger('log', value);
          }); // __SPromise.pipe(pro, promise, {
          //   stacks: 'log,error'
          // });


          result = yield _pro;
        }

        yield __wait(1500);
        promise.trigger("".concat(when, ".end"), {
          time: Date.now()
        });
        resolve(result);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    return pro;
  }

  function run() {
    return _run.apply(this, arguments);
  }

  function _run() {
    _run = _asyncToGenerator(function* () {
      var spawnSettings = __clone(settings);

      delete spawnSettings.lazy;
      delete spawnSettings.before;
      delete spawnSettings.after;
      delete spawnSettings.id;

      if (settings.before) {
        var res = yield runBeforeAfterCommand('before', command, [], spawnSettings);
      }

      childProcess = __childProcess.spawn(command, argsArray, spawnSettings);
      promise.childProcess = childProcess; // runningProcess.childProcess = childProcess;

      __hotkey('ctrl+c', {
        once: true
      }).on('press', () => {
        childProcess.kill();
      }); // save the process


      __registerProcess(promise); // before start


      promise.trigger('beforeStart', {
        time: Date.now(),
        process: runningProcess
      }); // start

      runningProcess.state = 'running';
      promise.trigger('start', {
        time: Date.now(),
        process: runningProcess
      });
      var finished = false;

      var resolveOrReject = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (what, extendObj, code, signal) {
          if (extendObj === void 0) {
            extendObj = {};
          }

          if (finished) return;
          finished = true;
          runningProcess.end = Date.now();
          runningProcess.duration = runningProcess.end - runningProcess.start;

          if (settings.after) {
            yield runBeforeAfterCommand('after', command, [], spawnSettings);
          }

          promise[what](_objectSpread(_objectSpread({}, extendObj), {}, {
            code,
            signal,
            time: Date.now(),
            process: runningProcess
          }));
        });

        return function resolveOrReject(_x3, _x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }(); // close


      childProcess.on('close', (code, signal) => {
        if (!code && signal) {
          runningProcess.state = 'killed';
          resolveOrReject('reject', {}, code, signal);
        } else if (code === 0 && !signal) {
          // console.log('CC');
          runningProcess.state = 'success';
          resolveOrReject('resolve', {}, code, signal);
        } else {
          runningProcess.state = 'error';
          resolveOrReject('reject', {
            error: runningProcess.stderr.join('\n')
          }, code, signal);
        }
      }); // error

      childProcess.on('error', error => {
        runningProcess.state = 'error';
        resolveOrReject('reject', {
          error
        }, 1, null);
      }); // stdout data

      var triggerBuffer = 0;
      childProcess.stdout.on('data', /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(function* (value) {
          var logsArray = value.toString().split('⠀').filter(l => l !== ''); // logsArray.forEach(async (log) => {

          for (var log of logsArray) {
            var resultReg = /^#result\s(.*)$/gm;

            if (log.match(resultReg)) {
              runningProcess.state = 'success';
              resolveOrReject('resolve', {
                value: __parse(log.replace('#result ', ''))
              }, 0, null);
              return;
            }

            runningProcess.stdout.push(log);
            yield promise.trigger('log', {
              process: runningProcess,
              time: Date.now(),
              value: log
            });
          }
        });

        return function (_x7) {
          return _ref3.apply(this, arguments);
        };
      }()); // stderr data

      childProcess.stderr.on('data', error => {
        // console.log(error.toString());
        runningProcess.stderr.push(error.toString());
        promise.trigger('error', {
          process: runningProcess,
          time: Date.now(),
          error: error.toString(),
          value: error.toString()
        });
      }); // return the promise

      return promise;
    });
    return _run.apply(this, arguments);
  }

  promise.run = run;

  promise.hasAfterCommand = () => settings.after !== null;

  promise.isClosed = () => {
    return runningProcess.state === 'killed' || runningProcess.state === 'success' || runningProcess.state === 'error';
  };

  promise.process = runningProcess;

  promise.log = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.forEach(arg => {
      runningProcess.stdout.push(arg.toString());
      promise.trigger('log', {
        value: arg.toString()
      });
    });
  };

  var _promiseCancel = promise.cancel.bind(promise);

  promise.cancel = () => {
    return new __SPromise((resolve, reject) => {
      var pid = childProcess.pid; // childProcess && childProcess.kill('SIGTERM');
      // if (pid) console.log(`kill -9 ${pid}`);
      // __childProcess.spawn(`kill -9 ${pid}`);

      if (pid) {
        __tkill(pid, 'SIGTERM', e => {
          if (e) {
            reject(e);
          } else {
            resolve();
          }

          _promiseCancel(e);
        });
      }
    });
  };

  return promise;
};