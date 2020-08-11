"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __webpack = require('webpack');

var __getFilename = require('../../../fs/filename');

var __packageRoot = require('../../../path/packageRoot');

var __deepMerge = require('../../../object/deepMerge');

var __fs = require('fs');

var __path = require('path');

var __SActionsStreamAction = require('../../../stream/SActionsStreamAction');

var __SBuildNodeCli = require('../SBuildNodeCli');

var __sugarConfig = require('../../../config/sugar');

var __babel = require('@babel/core');

var __tmpDir = require('../../../fs/tmpDir');

var __childProcess = require('child_process');
/**
 * @name                SNodeCompilerStreamAction
 * @namespace           node.build.node.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of passing babel, typescript, etc... on the output files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SActionsStreamActio) {
  _inherits(SNodeCompilerStreamAction, _SActionsStreamActio);

  var _super = _createSuper(SNodeCompilerStreamAction);

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SNodeCompilerStreamAction(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SNodeCompilerStreamAction);

    return _super.call(this, __deepMerge({
      id: 'actionStream.action.node.webpack'
    }, settings));
  }
  /**
   * @name          run
   * @type          Function
   * @async
   *
   * Override the base class run method
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SNodeCompilerStreamAction, [{
    key: "run",
    value: function run(streamObj, settings) {
      var _this = this;

      settings = __deepMerge({
        babel: __sugarConfig('babel')
      }, settings);
      return _get(_getPrototypeOf(SNodeCompilerStreamAction.prototype), "run", this).call(this, streamObj, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject, trigger) {
          if (streamObj.input.slice(-2) === 'ts') {
            // saving the file to render it
            var tmpDir = __tmpDir();

            var filePath = "".concat(tmpDir, "/").concat(__getFilename(streamObj.input));
            var outFilePath = "".concat(filePath, ".out");

            _this.log({
              group: settings.name,
              value: "Precessing the <magenta>typescript</magenta> file \"<cyan>".concat(streamObj.input.replace("".concat(__packageRoot(), "/"), ''), "</cyan>\"...")
            });

            __fs.writeFileSync(filePath, streamObj.data); // compiling the file


            var childProcess = __childProcess.execSync("npx tsc --outFile ".concat(outFilePath, " ").concat(filePath), {
              cwd: __packageRoot()
            });

            streamObj.data = __fs.readFileSync(outFilePath, 'utf8');
            return resolve(streamObj);
          }

          _this.log({
            group: settings.name,
            value: "Precessing the <magenta>javascript</magenta> file \"<cyan>".concat(streamObj.input.replace("".concat(__packageRoot(), "/"), ''), "</cyan>\"...")
          });

          var result = yield __babel.transformAsync(streamObj.data, _objectSpread({
            cwd: __packageRoot(__dirname),
            filename: streamObj.filename,
            sourceMaps: true,
            presets: [['@babel/preset-env', {
              targets: {
                node: 'current'
              }
            }]]
          }, settings.babel)).catch(error => {
            return reject(error);
          });
          streamObj.data = result.code;

          if (streamObj.map && result.map) {
            streamObj.sourcemapData = result.map;
          }

          return resolve(streamObj);
        });

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);

  return SNodeCompilerStreamAction;
}(__SActionsStreamAction);