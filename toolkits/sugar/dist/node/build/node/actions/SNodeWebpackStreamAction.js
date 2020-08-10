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

const __webpack = require('webpack');

const __getFilename = require('../../../fs/filename');

const __packageRoot = require('../../../path/packageRoot');

const __deepMerge = require('../../../object/deepMerge');

const __fs = require('fs');

const __path = require('path');

const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');

const __SBuildNodeCli = require('../SBuildNodeCli');

const __sugarConfig = require('../../../config/sugar');

const __babel = require('@babel/core');

const __tmpDir = require('../../../fs/tmpDir');

const __childProcess = require('child_process');
/**
 * @name                SNodeWebpackStreamAction
 * @namespace           node.build.node.actions
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
  _inherits(SNodeWebpackStreamAction, _SActionsStreamActio);

  var _super = _createSuper(SNodeWebpackStreamAction);

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
  function SNodeWebpackStreamAction(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SNodeWebpackStreamAction);

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


  _createClass(SNodeWebpackStreamAction, [{
    key: "run",
    value: function run(streamObj, settings) {
      settings = __deepMerge({
        babel: __sugarConfig('babel')
      }, settings);
      return _get(_getPrototypeOf(SNodeWebpackStreamAction.prototype), "run", this).call(this, streamObj, async (resolve, reject, trigger) => {
        if (streamObj.input.slice(-2) === 'ts') {
          // saving the file to render it
          const tmpDir = __tmpDir();

          const filePath = `${tmpDir}/${__getFilename(streamObj.input)}`;
          const outFilePath = `${filePath}.out`;
          this.log(`Precessing the typescript file "<cyan>${streamObj.input.replace(`${__packageRoot()}/`, '')}</cyan>"...`);
          console.log('XXX');

          __fs.writeFileSync(filePath, streamObj.data); // compiling the file


          const childProcess = __childProcess.execSync(`npx tsc --outFile ${outFilePath} ${filePath}`, {
            cwd: __packageRoot()
          });

          streamObj.data = __fs.readFileSync(outFilePath, 'utf8');
          return resolve(streamObj);
        }

        this.log(`Precessing the javascript file "<cyan>${streamObj.input.replace(`${__packageRoot()}/`, '')}</cyan>"...`);
        const result = await __babel.transformAsync(streamObj.data, {
          cwd: __packageRoot(__dirname),
          filename: streamObj.filename,
          sourceMaps: true,
          presets: [['@babel/preset-env', {
            targets: {
              node: 'current'
            }
          }]],
          ...settings.babel
        }).catch(error => {
          return reject(error);
        });
        streamObj.data = result.code;

        if (streamObj.map && result.map) {
          streamObj.sourcemapData = result.map;
        }

        return resolve(streamObj);
      });
    }
  }]);

  return SNodeWebpackStreamAction;
}(__SActionsStreamAction), _defineProperty(_class, "definitionObj", { ...__SBuildNodeCli.definitionObj
}), _temp);