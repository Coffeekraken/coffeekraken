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

const __glob = require('glob');

const __clone = require('../../object/clone');

const __extractSame = require('../../string/extractSame');

const __getFilename = require('../../fs/filename');

const __deepMerge = require('../../object/deepMerge');
/**
 * @name            SGlobResolverStreamAction
 * @namespace           node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you resolve glob pattern by specifying the streamObj property that
 * is one. It will then return an array of streamObj handled normally by the SActionsStream instance
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SActionsStreamActio) {
  _inherits(SGlobResolverStreamAction, _SActionsStreamActio);

  var _super = _createSuper(SGlobResolverStreamAction);

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
  function SGlobResolverStreamAction(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SGlobResolverStreamAction);

    return _super.call(this, __deepMerge({
      id: 'actionStream.action.globResolver'
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


  _createClass(SGlobResolverStreamAction, [{
    key: "run",
    value: function run(streamObj, settings) {
      if (settings === void 0) {
        settings = this._settings;
      }

      return _get(_getPrototypeOf(SGlobResolverStreamAction.prototype), "run", this).call(this, streamObj, async (resolve, reject) => {
        // resolve glob pattern
        const rootDir = streamObj[streamObj.globProperty];

        const files = __glob.sync(streamObj[streamObj.globProperty]); // build the streamObj stack


        const streamObjArray = []; // loop on each files founded

        files.forEach(filePath => {
          const newStreamObj = __clone(streamObj);

          newStreamObj[streamObj.globProperty] = filePath;
          let cleanedRootDir = rootDir;
          cleanedRootDir = cleanedRootDir.replace(__getFilename(cleanedRootDir), '');
          cleanedRootDir = cleanedRootDir.replace(/\[.*\]/gm, '').replace(/\*{1,2}/gm, '').replace(/\(.*\)/gm, '').replace(/(\?|!|\+|@)/gm, '');
          cleanedRootDir = cleanedRootDir.replace(/\/+$/, '');
          let outputFilePath = filePath.replace(cleanedRootDir, '').replace(__getFilename(filePath), '');
          if (outputFilePath.slice(0, 1) === '/') outputFilePath = outputFilePath.slice(1);
          newStreamObj.outputDir = newStreamObj.outputDir + '/' + outputFilePath;
          if (newStreamObj.outputDir.slice(-1) === '/') newStreamObj.outputDir = newStreamObj.outputDir.slice(0, -1);
          delete newStreamObj.globProperty;
          streamObjArray.push(newStreamObj);
        });
        resolve(streamObjArray);
      });
    }
  }]);

  return SGlobResolverStreamAction;
}(__SActionsStreamAction), _defineProperty(_class, "definitionObj", {
  globProperty: {
    type: 'String',
    required: true
  }
}), _temp);