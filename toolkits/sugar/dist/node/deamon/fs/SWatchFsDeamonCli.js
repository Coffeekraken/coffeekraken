"use strict";

var _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var __SCli = require('../../cli/SCli');

var __SPromise = require('../../promise/SPromise');

var __deepMerge = require('../../object/deepMerge');

var __chokidar = require('chokidar');

var __getFilename = require('../../fs/filename');

var __extension = require('../../fs/extension');

var __packageRoot = require('../../path/packageRoot');

var __fs = require('fs');

var __argsToString = require('../../cli/argsToString');

var __childProcess = require('child_process');
/**
 * @name            SWatchFsDeamonCli
 * @namespace           node.deamon.fs
 * @type            Class
 * @extends         SCli
 *
 * This class represent the watch filesystem deamon Cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SCli) {
  _inherits(SWatchFsDeamonCli, _SCli);

  var _super = _createSuper(SWatchFsDeamonCli);

  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SWatchFsDeamonCli(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SWatchFsDeamonCli);

    return _super.call(this, __deepMerge({
      id: 'deamon.fs',
      name: 'Deamon Fs'
    }, settings));
  }
  /**
   * @name            _run
   * @type            Function
   * @private
   *
   * This method is the one that will be called once you call ```run```.
   * The params passed are processed by the ```run``` parent method so you can
   * confidently trust them.
   * You MUST return an SPromise instance so that the spawned process can be
   * managed automatically in the parent ```run``` method.
   *
   * @param       {Object}        argsObj         The object of passed arguments
   * @param       {Object}        [settings={}]     The passed settings object
   * @return      {SPromise}                      An SPromise instance through which the parent method can register for events like "success", "log", etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SWatchFsDeamonCli, [{
    key: "_run",
    value: function _run(argsObj, settings) {
      if (settings === void 0) {
        settings = {};
      }

      return new __SPromise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          var runningTests = {};
          trigger('log', {
            value: "#start Starting the \"<yellow>".concat(settings.name, "</yellow>\" filesystem deamon...")
          });

          __chokidar.watch(argsObj.input, _objectSpread({
            persistent: true,
            followSymlinks: true
          }, settings)).on('ready', () => {
            trigger('log', {
              value: "#success The \"<yellow>".concat(settings.name, "</yellow>\" deamon is <green>ready</green>")
            });
          }).on('change', filepath => {
            if (runningTests[filepath]) return;
            runningTests[filepath] = true;

            var filename = __getFilename(filepath);

            var path = filepath.replace("/".concat(filename), '');
            var name = filename.replace(".".concat(__extension(filename)), '');
            trigger('log', {
              clear: true,
              value: "Update detected on the file \"<cyan>".concat(path.replace(__packageRoot(filepath) + '/', ''), "</cyan>\"")
            }); // reading the file content

            var content = __fs.readFileSync(filepath, 'utf8');

            var deamonReg = /\*\s?@deamon\.fs\s+(.*)/g;
            var deamonMatches = content.match(deamonReg);
            var command;

            if (deamonMatches && deamonMatches[0]) {
              command = deamonMatches[0].replace(/\s?\*\s?@deamon\.fs\s+/, '').trim();
            } else {
              command = argsObj.command;
            } // preparing the command to run


            var args = __argsToString(argsObj);

            command = command.replace('%path', path).replace('%name', name);
            trigger('log', {
              value: "Launching the command \"<magenta>".concat(command.replace("".concat(__packageRoot(), "/"), ''), "</magenta>\"...")
            });

            var childProcess = __childProcess.spawn(command, null, {
              stdio: 'inherit',
              shell: true
            }).on('close', () => {
              trigger('log', {
                value: "#success Process finished successfully"
              });
              delete runningTests[filepath];
            }).on('error', e => {
              console.log('EORROROROR', e);
            });
          }); // process.stdin.resume();

        });

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }(), {
        id: 'cli.deamon.fs'
      }).start();
    }
  }]);

  return SWatchFsDeamonCli;
}(__SCli), _defineProperty(_class, "command", 'sugar deamon.fs %arguments'), _defineProperty(_class, "definitionObj", {
  name: {
    type: 'String',
    alias: 'n',
    description: 'Specify the name of a configured deamon in the "deamons.config.js" file',
    level: 1,
    required: false
  },
  input: {
    type: 'String',
    alias: 'i',
    description: 'Input files glob pattern',
    level: 1,
    required: false
  },
  command: {
    type: 'String',
    alias: 'c',
    description: 'Specify the command you want to launch when fs update has been detected',
    level: 1,
    required: false
  }
}), _temp);