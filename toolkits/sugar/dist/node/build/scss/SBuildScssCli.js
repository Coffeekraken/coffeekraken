"use strict";

var _class, _temp;

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

var __sugarConfig = require('../../config/sugar');

var __SBuildScssActionsStream = require('../../build/scss/SBuildScssActionsStream');

var __SPromise = require('../../promise/SPromise');

var __deepMerge = require('../../object/deepMerge');
/**
 * @name            SBuildScssCli
 * @namespace           node.build.scss
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build SCSS cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SCli) {
  _inherits(SBuildScssCli, _SCli);

  var _super = _createSuper(SBuildScssCli);

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
  function SBuildScssCli(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SBuildScssCli);

    return _super.call(this, __deepMerge({
      id: 'build.scss',
      name: 'Build Scss'
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


  _createClass(SBuildScssCli, [{
    key: "_run",
    value: function _run(argsObj, settings) {
      if (settings === void 0) {
        settings = {};
      }

      return new __SPromise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          var stream = new __SBuildScssActionsStream({});
          var streamPromise = stream.start(argsObj);

          __SPromise.pipe(streamPromise, this);

          var res = yield streamPromise;
          resolve(res.streamObj.data);
        });

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }(), {
        id: 'cli.build.scss'
      }).start();
    }
  }]);

  return SBuildScssCli;
}(__SCli), _defineProperty(_class, "command", 'sugar build.scss %arguments'), _defineProperty(_class, "definitionObj", {
  input: {
    type: 'String',
    alias: 'i',
    description: 'Input files glob pattern',
    default: __sugarConfig('build.scss.input'),
    level: 1
  },
  outputDir: {
    type: 'String',
    alias: 'o',
    description: 'Output directory path',
    default: __sugarConfig('build.scss.outputDir'),
    level: 1
  },
  watch: {
    type: 'String|Object',
    alias: 'w',
    description: 'Watch files glob pattern or settings object',
    default: __sugarConfig('build.scss.watch'),
    level: 1
  },
  style: {
    type: 'String',
    alias: 's',
    description: 'Output style (nested,expanded,compact,compressed)',
    default: __sugarConfig('build.scss.style') || 'expanded',
    level: 1
  },
  map: {
    type: 'Boolean',
    alias: 'm',
    description: 'Generate a sourcemap file',
    default: __sugarConfig('build.scss.map') || true,
    level: 1
  },
  prod: {
    type: 'Boolean',
    alias: 'p',
    description: 'Generate the production ready files',
    default: __sugarConfig('build.scss.prod') || false,
    level: 1
  },
  sugarJsonDirs: {
    type: 'String|Array<String>',
    alias: 'a',
    description: 'Specify the directory where to search for sugar.json files',
    default: __sugarConfig('core.sugarJsonDirs'),
    level: 1
  },
  'import.sugar': {
    type: 'Boolean',
    description: 'Import the coffeekraken sugar toolkit',
    default: __sugarConfig('build.scss.import.sugar') || true,
    level: 1
  },
  'vendor.sass': {
    type: 'Object',
    description: 'Object passed to the sass compiler',
    default: __sugarConfig('build.scss.vendor.sass') || {},
    level: 2
  }
}), _temp);