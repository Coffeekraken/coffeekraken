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

const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');

const __deepMerge = require('../../../object/deepMerge');

const __globby = require('globby');

const __path = require('path');

const __packageRoot = require('../../../path/packageRoot');

const {
  stream
} = require('globby');
/**
 * @name                SSugarJsonStreamAction
 * @namespace           node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This action is responsible of searching for packages with a ```sugar.json``` root file
 * and impoirting the main css and scss files before compilation
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SActionsStreamActio) {
  _inherits(SSugarJsonStreamAction, _SActionsStreamActio);

  var _super = _createSuper(SSugarJsonStreamAction);

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
  function SSugarJsonStreamAction(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SSugarJsonStreamAction);

    return _super.call(this, __deepMerge({
      name: 'Sugar Json',
      id: 'actionStream.action.scss.sugarJson'
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


  _createClass(SSugarJsonStreamAction, [{
    key: "run",
    value: function run(streamObj, settings) {
      return _get(_getPrototypeOf(SSugarJsonStreamAction.prototype), "run", this).call(this, streamObj, async (resolve, reject) => {
        if (!streamObj.sugarJsonDirs) {
          this.warn(`No "<cyan>sugarJsonDirs</cyan>" has been specified so use the default value which is "<cyan>${__packageRoot()}</cyan>"...`);
          streamObj.sugarJsonDirs = [__packageRoot()];
        } // search for sugar.json files


        let dirs = streamObj.sugarJsonDirs;
        if (!Array.isArray(dirs)) dirs = [dirs];
        let files = [];

        for (let dir of dirs) {
          files = [...files, ...__globby.sync([`${dir}/sugar.json`, `${dir}/node_modules/*/sugar.json`, `${dir}/node_modules/*/*/sugar.json`])];
        } // read each sugar files


        files.forEach(filePath => {
          const sugarJson = require(filePath);

          const sugarJsonPath = __path.dirname(filePath);

          if (sugarJson.scss && sugarJson.scss.main) {
            streamObj.data = `
            @import "${sugarJsonPath}/${sugarJson.scss.main}";
            ${streamObj.data};
          `;
          }

          if (sugarJson.css && sugarJson.css.main) {
            streamObj.data = `
            @import "${sugarJsonPath}/${sugarJson.css.main}";
            ${streamObj.data}
          `;
          }
        });
        resolve(streamObj);
      });
    }
  }]);

  return SSugarJsonStreamAction;
}(__SActionsStreamAction), _defineProperty(_class, "definitionObj", {
  sugarJsonDirs: {
    type: 'String|Array<String>',
    required: false
  }
}), _temp);