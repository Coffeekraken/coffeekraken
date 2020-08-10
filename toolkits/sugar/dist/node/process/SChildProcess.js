"use strict";

var _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const __SPromise = require('../promise/SPromise');

const __deepMerge = require('../object/deepMerge');

const __childProcess = require('child_process');

const __hotkey = require('../keyboard/hotkey');

const __registerProcess = require('./registerProcess');

const __uniqid = require('../string/uniqid');

const __buildCommandLine = require('../cli/buildCommandLine');

const __isPath = require('../is/path');

const __output = require('./output');
/**
 * @name              SChildProcess
 * @namespace         node.process
 * @type              Class
 *
 * This class allows you to spawn/fork some child process and having back an SPromise based instance on
 * which you can track the child process status using the ```on``` method to register to some
 * events like "start", "success", "error", etc...
 *
 * @todo            doc
 * @todo            tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp2 = /*#__PURE__*/function (_SPromise) {
  _inherits(SChildProcess, _SPromise);

  var _super = _createSuper(SChildProcess);

  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store the passed settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _commandOrPath
   * @type          String
   * @private
   *
   * Store the command of path to an executable file
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _runningProcess
   * @type          Object
   * @private
   *
   * Store the current running process
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @param         _processesStack
   * @type          Array<Object>
   * @private
   *
   * Store all the runned processes ojects
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SChildProcess(commandOrPath, settings) {
    var _temp, _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SChildProcess);

    (_temp = _this = _super.call(this, () => {}), _defineProperty(_assertThisInitialized(_this), "_settings", {}), _defineProperty(_assertThisInitialized(_this), "_commandOrPath", null), _defineProperty(_assertThisInitialized(_this), "_runningProcess", null), _defineProperty(_assertThisInitialized(_this), "_processesStack", []), _temp).start();
    _this._commandOrPath = commandOrPath;
    _this._settings = __deepMerge({
      id: __uniqid(),
      definitionObj: {},
      defaultParamsObj: {},
      method: __isPath(commandOrPath, true) ? 'fork' : 'spawn',
      before: null,
      after: null,
      shell: true,
      env: { ...process.env,
        CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL ? process.env.CHILD_PROCESS_LEVEL + 1 : 1,
        IS_CHILD_PROCESS: true
      }
    }, settings);
    return _this;
  }
  /**
   * @name            runningProcess
   * @type            Object
   * @get
   *
   * Get the running process object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SChildProcess, [{
    key: "run",

    /**
     * @name          run
     * @type          Function
     *
     * This method simply run a new process
     * and return a SPromise instance on which you can listen for the
     * exact same events that you can on the global SChildProcess isntance
     * but scoped to this running process.
     *
     * @param       {Object}         [params={}]          An object of parameters
     * @param       {Object}        [settings={}]       THe same settings object that you can pass to the SChildProcess instance constructor but only for this particular process
     * @return      (SPromise}                        An SPromise instance on which you can listen for events scoped to this particular process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function run(params, settings) {
      var _this2 = this;

      if (params === void 0) {
        params = {};
      }

      if (settings === void 0) {
        settings = {};
      }

      const promise = new __SPromise(async (resolve, reject, trigger, cancel) => {}).start();

      (async () => {
        let runningProcessId = settings.id || __uniqid();

        settings = __deepMerge(this._settings, settings); // build the command to run depending on the passed command in the constructor and the params

        const paramsToRun = __deepMerge(settings.defaultParamsObj, params); // console.log(paramsToRun, this._commandOrPath, settings.definitionObj);


        const commandToRun = __buildCommandLine(this._commandOrPath, settings.definitionObj, paramsToRun); // initialize the runningProcess object


        const runningProcess = {
          instanceId: this._settings.id,
          id: runningProcessId,
          promise: promise,
          settings: Object.assign({}, settings),
          start: Date.now(),
          end: null,
          duration: null,
          stdout: [],
          stderr: [],
          rawCommand: this._commandOrPath,
          params: paramsToRun,
          command: commandToRun,
          state: 'running',
          before: null,
          after: null
        }; // adding the runningProcess in the stack

        this._processesStack.push(runningProcess); // execute the "before" SChildProcess instance if setted


        if (settings.before) {
          if (!settings.before instanceof SChildProcess) {
            throw new Error(`The passed "<cyan>settings.before</cyan>" setting has to be an instance of the "<primary>SChildProcess</primary>" class...`);
          } // trigger a "before" event


          promise.trigger('before', {
            time: Date.now(),
            process: Object.assign({}, runningProcess)
          });
          this.trigger(`${runningProcessId}.before`, {
            time: Date.now(),
            process: Object.assign({}, runningProcess)
          }); // running the before child process

          runningProcess.before = await settings.before.run();
        } // extracting the spawn settings from the global settings object


        const spawnSettings = Object.assign({}, settings);
        ['id', 'definitionObj', 'defaultParamsObj', 'method', 'before', 'after'].forEach(key => {
          delete spawnSettings[key];
        }); // trigger a "start" event

        promise.trigger('start', {
          time: Date.now(),
          process: Object.assign({}, runningProcess)
        });
        this.trigger(`${runningProcessId}.start`, {
          time: Date.now(),
          process: Object.assign({}, runningProcess)
        }); // executing the actual command through the spawn node function

        const childProcess = __childProcess[settings.method || 'spawn'](commandToRun, [], spawnSettings); // listen for ctrl+c to kill the child process


        __hotkey('ctrl+c', {
          once: true
        }).on('press', () => {
          // console.log('THIEHIU');
          childProcess.kill();
        }); // register this child process globally


        __registerProcess(childProcess, runningProcess.id); // close


        let finished = false;

        const resolveOrReject = async function (what, extendObj, code, signal) {
          if (extendObj === void 0) {
            extendObj = {};
          }

          if (finished) return;
          finished = true;
          runningProcess.end = Date.now();
          runningProcess.duration = runningProcess.end - runningProcess.start;

          if (settings.after) {
            if (!settings.after instanceof SChildProcess) {
              throw new Error(`The passed "<cyan>settings.after</cyan>" setting has to be an instance of the "<primary>SChildProcess</primary>" class...`);
            } // trigger a "after" event


            promise.trigger('after', {
              time: Date.now(),
              process: Object.assign({}, runningProcess)
            });

            _this2.trigger(`${runningProcessId}.after`, {
              time: Date.now(),
              process: Object.assign({}, runningProcess)
            }); // running the after child process


            runningProcess.after = await settings.after.run();
          }

          promise[what]({ ...runningProcess,
            ...extendObj,
            code,
            signal
          });
        };

        childProcess.on('close', (code, signal) => {
          if (!code && signal) {
            runningProcess.state = 'killed';
            resolveOrReject('reject', {}, code, signal);
          } else if (code === 0 && !signal) {
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

        if (childProcess.stdout) {
          childProcess.stdout.on('data', log => {
            log = log.toString();
            const resultReg = /^#result\s(.*)$/gm;

            if (log.match(resultReg)) {
              runningProcess.state = 'success';
              resolveOrReject('resolve', {
                value: __parse(log.replace('#result ', ''))
              }, 0, null);
              return;
            }

            runningProcess.stdout.push(log.toString());
            promise.trigger('log', {
              value: log.toString()
            });
            this.trigger(`${runningProcessId}.'log`, {
              value: log.toString()
            });
          });
        } // stderr data


        if (childProcess.stderr) {
          childProcess.stderr.on('data', error => {
            runningProcess.stderr.push(error.toString());
            promise.trigger('error', {
              error: error.toString(),
              value: error.toString()
            });
            this.trigger(`${runningProcessId}.error`, {
              error: error.toString(),
              value: error.toString()
            });
          });
        }
      })();

      return promise;
    }
  }, {
    key: "runWithOutput",
    value: function runWithOutput(params, settings) {
      if (params === void 0) {
        params = {};
      }

      if (settings === void 0) {
        settings = {};
      }

      __output(this.run(params, settings));
    }
    /**
     * @name            hasAfterCommand
     * @type            Function
     *
     * Return true is the "settings.after" property is setted
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "hasAfterCommand",
    value: function hasAfterCommand() {
      return this.runningProcess ? this.runningProcess.settings.after !== null : this._settings.after !== null;
    }
    /**
     * @name            hasBeforeCommand
     * @type            Function
     *
     * Return true is the "settings.before" property is setted
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "hasBeforeCommand",
    value: function hasBeforeCommand() {
      return this.runningProcess ? this.runningProcess.settings.before !== null : this._settings.before !== null;
    }
    /**
     * @name          isClosed
     * @type          Function
     *
     * Return true if the last process is closed, false if not...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "isClosed",
    value: function isClosed() {
      return this.runningProcess ? this.runningProcess.state === 'killed' || this.runningProcess.state === 'success' || this.runningProcess.state === 'error' : false;
    }
    /**
     * @name        log
     * @type        Function
     *
     * This method simply log one or muliple message through the running process
     *
     * @param         {String}        ...logs         The message(s) you want to log
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "log",
    value: function log() {
      if (!this.runningProcess) return;

      for (var _len = arguments.length, logs = new Array(_len), _key = 0; _key < _len; _key++) {
        logs[_key] = arguments[_key];
      }

      logs.forEach(log => {
        this.runningProcess.stdout.push(log.toString());
        this.runningProcess.promise.trigger('log', {
          value: log.toString()
        });
        this.trigger(`${this.runningProcess.id}.log`, {
          value: log.toString()
        });
      });
    }
  }, {
    key: "runningProcess",
    get: function () {
      return this._processesStack.length ? this._processesStack[this._processesStack.length - 1] : null;
    }
  }]);

  return SChildProcess;
}(__SPromise), _temp2);