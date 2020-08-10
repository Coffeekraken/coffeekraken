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
 * @name            SFsCacheStreamAction
 * @namespace           node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This action allows you to make profit of the filesystem cache.
 * You can specify which streamObj property will be the cache id as well as
 * in which condition you want to bypass the cached value.
 * By default the cached value will be regenerated if the "input" property is a file and that this file has been saved after the cached value.
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SActionsStreamActio) {
  _inherits(SFsCacheStreamAction, _SActionsStreamActio);

  var _super = _createSuper(SFsCacheStreamAction);

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
  function SFsCacheStreamAction(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SFsCacheStreamAction);

    return _super.call(this, __deepMerge({
      id: 'actionStream.action.fs.cache',
      idProperty: 'input'
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


  _createClass(SFsCacheStreamAction, [{
    key: "run",
    value: function run(streamObj, settings) {
      if (settings === void 0) {
        settings = this._settings;
      }

      return _get(_getPrototypeOf(SFsCacheStreamAction.prototype), "run", this).call(this, streamObj, async (resolve, reject, trigger, cancel) => {
        // make sure we have the cache directory
        __ensureDirSync(streamObj.cacheDir); // generate the id


        const id = `${this._settings.id}-${__md5.encrypt(streamObj[settings.idProperty])}`; // check if the output files exists or not

        let outputFilesExists = true;

        if (streamObj.outputStack) {
          Object.keys(streamObj.outputStack).forEach(key => {
            const path = streamObj.outputStack[key];

            if (!__fs.existsSync(path)) {
              outputFilesExists = false;
            }
          });
        } // cache file path


        const cacheFilePath = `${streamObj.cacheDir}/${id}.json`; // generate cache function

        function generateCache(streamObj) {
          return new Promise((resolve, reject) => {
            __writeJsonSync(cacheFilePath, {
              streamObj,
              _sugarVersion: require(`${__packageRoot(__dirname)}/package.json`).version
            });

            resolve(streamObj);
          });
        } // check if the cache file exists
        // or if the output files does not exists


        if (!__fs.existsSync(cacheFilePath) || !outputFilesExists) {
          this.registerCallback(generateCache, 'after');
          return resolve(streamObj);
        } // get the timestamp of each files


        const inputStats = __fs.statSync(streamObj.input);

        const cacheStats = __fs.statSync(cacheFilePath); // check if the input file is newer that the cache one


        if (inputStats.mtimeMs > cacheStats.mtimeMs) {
          this.registerCallback(generateCache, 'after');
        } else {
          // load the cache file
          const cacheJson = require(cacheFilePath); // restore the streamObject


          streamObj = cacheJson.streamObj; // specify to the ActionStream that we need to skip all the next actions

          trigger('log', {
            value: `Skipping the next actions cause the data have been <primary>laoded from the cache</primary>...`
          });
          this.skipNextActions();
        }

        resolve(streamObj);
      });
    }
  }]);

  return SFsCacheStreamAction;
}(__SActionsStreamAction), _defineProperty(_class, "definitionObj", {
  input: {
    type: 'String',
    required: true
  },
  cacheDir: {
    type: 'String',
    required: true,
    default: `${__packageRoot()}/.cache/SFsCacheStreamAction`
  }
}), _temp);