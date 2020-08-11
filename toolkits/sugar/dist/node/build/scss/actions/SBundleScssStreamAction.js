"use strict";

var _class, _temp;

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

var __SActionsStreamAction = require('../../../stream/SActionsStreamAction');

var __Bundler = require('scss-bundle').Bundler;

var __getFilename = require('../../../fs/filename');

var __isGlob = require('../../../is/glob');

var __isPath = require('../../../is/path');

var __deepMerge = require('../../../object/deepMerge');
/**
 * @name                SBundleScssStreamAction
 * @namespace           node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of transform a js object to an scss map
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SActionsStreamActio) {
  _inherits(SBundleScssStreamAction, _SActionsStreamActio);

  var _super = _createSuper(SBundleScssStreamAction);

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
  function SBundleScssStreamAction(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SBundleScssStreamAction);

    return _super.call(this, __deepMerge({
      name: 'Bundle',
      id: 'actionStream.action.scss.bundle'
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


  _createClass(SBundleScssStreamAction, [{
    key: "run",
    value: function run(streamObj, settings) {
      return _get(_getPrototypeOf(SBundleScssStreamAction.prototype), "run", this).call(this, streamObj, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject) {
          if (!__isPath(streamObj.input)) {
            return resolve(streamObj);
          }

          try {
            var bundler = new __Bundler(undefined, streamObj.input.split('/').slice(0, -1).join('/'));
            var bundledScssString = yield (yield bundler.bundle(__getFilename(streamObj.input))).bundledContent; // set the bundled content into the "data" property

            if (streamObj.data) streamObj.data += bundledScssString;else streamObj.data = bundledScssString;
          } catch (e) {}

          resolve(streamObj);
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);

  return SBundleScssStreamAction;
}(__SActionsStreamAction), _defineProperty(_class, "definitionObj", {
  input: {
    type: 'String',
    required: true
  }
}), _temp);