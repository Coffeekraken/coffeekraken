"use strict";

var _class, _temp;

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

const __SActionsStreamAction = require('../SActionsStreamAction');

const __packageRoot = require('../../path/packageRoot');

const __fs = require('fs');

const __ensureDirSync = require('../../fs/ensureDirSync');

const __deepMerge = require('../../object/deepMerge');

const __md5 = require('../../crypt/md5');

const __writeJsonSync = require('../../fs/writeJsonSync');
/**
 * @name            SExtractStreamAction
 * @namespace           node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This actions allows you to extract some data from the specified streamObj property using custom comments syntax like "/* extract:propName *\/ ... /* extract *\/".
 * This "propName" specify in which streamObj property you want to save the extracted content.
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * - sourceProp ('data') {String}: Specify the source property you want to extract data from
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SActionsStreamActio) {
  _inherits(SExtractStreamAction, _SActionsStreamActio);

  var _super = _createSuper(SExtractStreamAction);

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
  function SExtractStreamAction(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SExtractStreamAction);

    _this = _super.call(this, __deepMerge({
      id: 'actionStream.action.extract',
      sourceProp: 'data'
    }, settings));
    _this.constructor.definitionObj = {
      [_this._settings.sourceProp]: {
        type: 'String',
        required: true
      }
    };
    return _this;
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


  _createClass(SExtractStreamAction, [{
    key: "run",
    value: function run(streamObj, settings) {
      return _get(_getPrototypeOf(SExtractStreamAction.prototype), "run", this).call(this, streamObj, async (resolve, reject) => {
        const reg = /\/\*\s?extract:([a-zA-Z0-9-_]+)\s?\*\/(((?!\/\*\s?extract\s?\*\/)(.|\n))*)\/\*\s?extract\s?\*\//g;
        const source = streamObj[settings.sourceProp];
        let myArray;

        while ((myArray = reg.exec(source)) !== null) {
          const prop = myArray[1];
          const string = myArray[2];
          streamObj[prop] = string;
        }

        resolve(streamObj);
      });
    }
  }]);

  return SExtractStreamAction;
}(__SActionsStreamAction), _defineProperty(_class, "definitionObj", {}), _temp);