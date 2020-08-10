"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

const __SActionsStream = require('../../stream/SActionsStream');

const __deepMerge = require('../../object/deepMerge');

const __getFilename = require('../../fs/filename');

const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');

const __SJsObjectToScssStreamAction = require('./actions/SJsObjectToScssStreamAction');

const __SImportsStreamAction = require('./actions/SImportsStreamAction');

const __SBundleScssStreamAction = require('./actions/SBundleScssStreamAction');

const __SRenderSassStreamAction = require('./actions/SRenderSassStreamAction');

const __SPostCssStreamAction = require('./actions/SPostCssStreamAction');

const __SSugarJsonStreamAction = require('./actions/SSugarJsonStreamAction');

const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');

const __SFsCacheStreamAction = require('../../stream/actions/SFsCacheStreamAction');

const __SExtractStreamAction = require('../../stream/actions/SExtractStreamAction');

const __path = require('path');

const __sugarConfig = require('../../config/sugar');

const {
  stream
} = require('globby');
/**
 * @name            SBuildScssActionsStream
 * @namespace           node.build.scss
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * const SBuildScssActionsStream = require('@coffeekraken/sugar/node/build/SBuildScssActionsStream');
 * const myStream = new SBuildScssActionsStream();
 * myStream.start({
 *    input: '...',
 *    outputDir: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SActionsStream) {
  _inherits(SBuildScssActionsStream, _SActionsStream);

  var _super = _createSuper(SBuildScssActionsStream);

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SBuildScssActionsStream(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SBuildScssActionsStream);

    // init actions stream
    return _super.call(this, {
      filesResolver: __SFsFilesResolverStreamAction,
      fsCache: __SFsCacheStreamAction,
      bundle: __SBundleScssStreamAction,
      sugarJson: __SSugarJsonStreamAction,
      imports: __SImportsStreamAction,
      jsConfig: __SJsObjectToScssStreamAction,
      render: __SRenderSassStreamAction,
      extract: __SExtractStreamAction,
      postCss: __SPostCssStreamAction,
      fsOutput: __SFsOutputStreamAction
    }, __deepMerge({
      id: 'actionStream.build.scss',
      name: 'Build SCSS',
      actions: {
        filesResolver: {
          out: 'array'
        }
      },
      before: streamObj => {
        streamObj.jsObjectToScss = __sugarConfig('scss');
        return streamObj;
      },
      afterActions: {
        filesResolver: streamObj => {
          streamObj.filename = __getFilename(streamObj.input);
          return streamObj;
        }
      },
      beforeActions: {
        fsCache: streamObj => {
          if (!streamObj.outputStack) streamObj.outputStack = {};

          if (streamObj.outputDir && streamObj.filename) {
            streamObj.outputStack.data = __path.resolve(streamObj.outputDir, streamObj.prod ? streamObj.filename.replace('.scss', '.prod.css') : streamObj.filename.replace('.scss', '.css'));
          }

          return streamObj;
        },
        fsOutput: streamObj => {
          return streamObj;
        }
      }
    }, settings));
  }

  return SBuildScssActionsStream;
}(__SActionsStream);