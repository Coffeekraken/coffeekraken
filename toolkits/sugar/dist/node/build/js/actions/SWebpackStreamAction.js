"use strict";

var _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __webpack = require('webpack');

var __getFilename = require('../../../fs/filename');

var __packageRoot = require('../../../path/packageRoot');

var __deepMerge = require('../../../object/deepMerge');

var __fs = require('fs');

var __path = require('path');

var __SActionsStreamAction = require('../../../stream/SActionsStreamAction');

var __SBuildJsCli = require('../SBuildJsCli');

var __sugarConfig = require('../../../config/sugar');

var __babel = require('@babel/core');

var __getScssImportsStrings = require('../../scss/getScssImportsStrings');

var __jsObjectToScssMap = require('../../scss/jsObjectToScssMap');
/**
 * @name                SWebpackStreamAction
 * @namespace           node.build.js.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of passing webpack on the output files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SActionsStreamActio) {
  _inherits(SWebpackStreamAction, _SActionsStreamActio);

  var _super = _createSuper(SWebpackStreamAction);

  /**
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SWebpackStreamAction(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SWebpackStreamAction);

    return _super.call(this, __deepMerge({
      id: 'actionStream.action.js.webpack'
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


  _createClass(SWebpackStreamAction, [{
    key: "run",
    value: function run(streamObj, settings) {
      var _this = this;

      settings = __deepMerge({
        babel: __sugarConfig('babel'),
        webpack: __sugarConfig('webpack'),
        scss: {
          Config: {},
          imports: null
        }
      }, settings);
      return _get(_getPrototypeOf(SWebpackStreamAction.prototype), "run", this).call(this, streamObj, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject) {
          // pass over this action if we don't want to pack the files
          if (streamObj.pack === false || Array.isArray(streamObj.pack) && streamObj.pack.indexOf(streamObj.input) === -1) {
            _this.log("Skipping the <yellow>webpack</yellow> packaging action for the file <cyan>".concat(streamObj.input.replace(__packageRoot(), ''), "</cyan> and processing file using <cyan>babel</cyan>"));

            var result = yield __babel.transformAsync(streamObj.data, _objectSpread({
              cwd: __packageRoot(__dirname),
              filename: streamObj.filename,
              sourceMaps: true
            }, settings.babel)).catch(error => {
              return reject(error);
            });
            streamObj.data = result.code;

            if (streamObj.map && result.map) {
              streamObj.sourcemapData = result.map;
            }

            return resolve(streamObj);
          }

          var scssImportsString = __getScssImportsStrings(settings.scss.imports);

          var scssConfig = __jsObjectToScssMap(__sugarConfig('scss'), settings.scss.config);

          _this.log("Processing the <yellow>webpack</yellow> action for the file <cyan>".concat(streamObj.input.replace(__packageRoot(), ''), "</cyan>"));

          var webpackSettings = Object.assign({}, settings.webpack);

          var compiler = __webpack(__deepMerge({
            mode: streamObj.prod ? 'production' : 'development',
            entry: streamObj.input,
            stats: {
              errors: true,
              errorDetails: true
            },
            output: {
              path: streamObj.outputDir,
              filename: streamObj.prod ? __getFilename(streamObj.input).replace('.js', '.prod.js') : __getFilename(streamObj.input)
            },
            module: {
              rules: [{
                test: /\.s[ac]ss$/i,
                use: [// Creates `style` nodes from JS strings
                'style-loader', // Translates CSS into CommonJS
                'css-loader', // Compiles Sass to CSS
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('sass'),
                    prependData: "\n                          ".concat(scssConfig, "\n                          ").concat(scssImportsString.prepend, "\n                        ")
                  }
                }]
              }, {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: _objectSpread({
                    cwd: __packageRoot(__dirname),
                    presets: [['@babel/preset-env', {
                      targets: {
                        esmodules: true
                      }
                    }]]
                  }, settings.babel)
                }
              }, {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
              }]
            },
            resolveLoader: {
              modules: ["node_modules", __path.relative(__packageRoot(process.cwd()), "".concat(__packageRoot(__dirname), "/node_modules"))]
            },
            resolve: {
              symlinks: true,
              extensions: ['.tsx', '.ts', '.js'],
              modules: ['node_modules', 'src/js', __path.relative(__packageRoot(process.cwd()), "".concat(__packageRoot(__dirname), "/node_modules"))]
            },
            target: 'web',
            devtool: streamObj.map ? 'source-map' : false,
            context: __packageRoot(process.cwd())
          }, webpackSettings));

          compiler.run((error, stats) => {
            if (stats.hasErrors()) {
              var sts = stats.toJson();
              console.error(sts.errors);
              return reject(sts.errors);
            }

            if (stats.hasWarnings()) {
              var _sts = stats.toJson();

              console.error(_sts.warnings);
              return reject(_sts.warnings);
            } // reading the outputed file


            var output = __fs.readFileSync(__path.resolve(streamObj.outputDir, __getFilename(streamObj.input)), 'utf8'); // check if is a sourcemap


            var sourcemapOutput;

            if (streamObj.map) {
              sourcemapOutput = __fs.readFileSync(__path.resolve(streamObj.outputDir, __getFilename(streamObj.input) + '.map'), 'utf8');
            } // // if (!streamObj.dataBefore) streamObj.dataBefore = {};


            streamObj.data = output;
            if (sourcemapOutput) streamObj.sourcemapData = sourcemapOutput;
            resolve(streamObj);
          });
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);

  return SWebpackStreamAction;
}(__SActionsStreamAction), _defineProperty(_class, "definitionObj", _objectSpread({}, __SBuildJsCli.definitionObj)), _temp);