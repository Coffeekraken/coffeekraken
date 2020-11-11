"use strict";

var _SError = _interopRequireDefault(require("../error/SError"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _SCache = _interopRequireDefault(require("../cache/SCache"));

var _node = _interopRequireDefault(require("../is/node"));

var _promisedHandlebars = _interopRequireDefault(require("promised-handlebars"));

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name            SDocblockOutput
 * @namespace       sugar.js.docblock
 * @type            Class
 *
 * This class represent an SDocblock output like "markdown", "html", etc...
 *
 * @param       {SDocblock}         docblockInstance        The docblock instance you want to output using this class
 * @param       {Object}            [settings={}]           Some settings to configure your output class:
 * - ...
 *
 * @todo      Javascript support
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SDocblock';
 * import SDocblockOutput from '@coffeekraken/sugar/js/docblock/SDocblockOutput';
 * class MyCoolOutput extends SDocblockOutput {
 *    constructor(docblockInstance, settings = {}) {
 *      super(docblockInstance, settings);
 *    }
 * }
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_temp = /*#__PURE__*/function () {
  /**
   * @name      _settings
   * @type      Object
   * @private
   *
   * Store the settings
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name      _docblockInstance
   * @type      SDocblock
   * @private
   *
   * Store the SDocblock instance to render
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SDocblockOutput(docblockInstance, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SDocblockOutput);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_docblockInstance", null);

    // save the settings
    this._settings = (0, _deepMerge.default)({
      templates: {},
      blocks: {},
      partials: {}
    }, settings); // save the docblock instance

    this._docblockInstance = docblockInstance; // init the handlebars helpers

    this._registerHandlerbarsHelpers();

    this._cache = new _SCache.default('SDocblockOutput');
  }
  /**
   * @name          _registerHandlerbarsHelpers
   * @type          Function
   * @private
   *
   * This method init the handlebar instance that will be used during the rendering process
   *
   * @since       2.0.0
   *
   */


  _createClass(SDocblockOutput, [{
    key: "_registerHandlerbarsHelpers",
    value: function _registerHandlerbarsHelpers() {
      var _this = this;

      this._handlebars = (0, _promisedHandlebars.default)(_handlebars.default, {
        promise: Promise
      });

      this._handlebars.registerHelper('include', type => {
        return new Promise( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(function* (resolve, reject) {
            if (!_this._docblockInstance.blocks || !_this._docblockInstance.blocks.length) return ''; // filter blocks

            var blocks = _this._docblockInstance.blocks.filter(block => {
              if (!block.toObject().type) return false;
              var rendered = block._rendered;
              block._rendered = true;
              return rendered !== true;
            });

            var renderedBlocks = [];

            for (var i = 0; i < blocks.length; i++) {
              var block = blocks[i];
              var result = yield _this.renderBlock(block.toObject());
              renderedBlocks.push(result);
            }

            resolve(renderedBlocks.join('\n\n'));
          });

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
      });
    }
    /**
     * @name          renderBlock
     * @type          Function
     * @async
     *
     * This method is the one take will render a block using the correct block template
     * and the passed block object data
     *
     * @param       {Object}          blockObj          The object representing the block to render
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {String}                            The rendered block
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "renderBlock",
    value: function () {
      var _renderBlock = _asyncToGenerator(function* (blockObj, settings) {
        if (settings === void 0) {
          settings = {};
        }

        if (blockObj.toObject && typeof blockObj.toObject === 'function') blockObj = blockObj.toObject();
        var type = typeof blockObj.type === 'string' ? blockObj.type.toLowerCase() : 'default';
        var template = this._settings.blocks[type] || this._settings.blocks.default;
        var compiledTemplateFn;
        var templateObj = {};

        if ((0, _node.default)()) {
          // get template object
          templateObj = this.getTemplateObj(template);
          var cacheObj = {
            partialsTemplateObj: this._partialsTemplateObj,
            template: templateObj,
            data: blockObj
          }; // check the cache

          var cachedValue = yield this._cache.get(cacheObj); // console.log('SE', Object.keys(cachedValue));

          if (!cachedValue) {
            compiledTemplateFn = this._handlebars.compile(templateObj.content, {
              noEscape: true
            });
            var renderedTemplate = yield compiledTemplateFn(blockObj); // save in chache

            this._cache.set(cacheObj, renderedTemplate); // return the rendered template


            return renderedTemplate;
          } else {
            return cachedValue;
          }
        } else {
          // return rendered template
          return 'Support for javascript is not available yet...';
        }
      });

      function renderBlock(_x3, _x4) {
        return _renderBlock.apply(this, arguments);
      }

      return renderBlock;
    }()
    /**
     * @name          getPartialsTemplateObj
     * @type        Function
     * @async
     *
     * This method loop on all the partials and read them with their stats if we are in node context
     *
     * @return      {Object}          The template object of all the partials
     *
     * @since       2.0.0
     *  @author 			Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
     */

  }, {
    key: "getPartialsTemplateObj",
    value: function getPartialsTemplateObj() {
      var partialsTemplateObj = {};
      Object.keys(this._settings.partials).forEach(partialName => {
        var partialPath = this._settings.partials[partialName];
        partialsTemplateObj[partialName] = this.getTemplateObj(partialPath); // register partials

        this._handlebars.unregisterPartial(partialName);

        this._handlebars.registerPartial(partialName, partialsTemplateObj[partialName].content);
      });
      return partialsTemplateObj;
    }
    /**
     * @name          getTemplateObj
     * @type          Function
     * @async
     *
     * This method take the template url setted in the settings object and
     * resolve it to get back a full template object with the path and the stats is we are in node context
     *
     * @param         {String}        template        The template path to get
     * @return      {Object}                          The template object with the path and the stats if we are in node context
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
     */

  }, {
    key: "getTemplateObj",
    value: function getTemplateObj(template) {
      var templateObj = {};

      if ((0, _node.default)()) {
        var __packageRoot = require('../../node/path/packageRoot');

        var __packageJson = require('../../node/package/json');

        var __fs = require('fs');

        var json = __packageJson();

        var stats, templatePath;

        if (__fs.existsSync(template)) {
          templatePath = template;
        } else if (__fs.existsSync("".concat(__packageRoot(), "/node_modules/").concat(template))) {
          templatePath = "".concat(__packageRoot(), "/node_modules/").concat(template);
        } else {
          throw new _SError.default("Sorry but the passed template url \"<yellow>".concat(template, "</yellow>\" does not exists..."));
        }

        stats = __fs.statSync(templatePath);
        delete require.cache[require.resolve(templatePath)];

        var content = require(templatePath);

        templateObj = {
          path: templatePath,
          content: content,
          mtime: stats.mtime
        };
      }

      return templateObj;
    }
    /**
     * @name          render
     * @type          Function
     * @async
     *
     * This method is the main one that will take each blocks in the docblock instance
     * and render them by passing each tags to the ```renderTag``` method.
     *
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {SPromise}                          An SPromise instance that will be resolved with the rendered string once it has been fully rendered
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "render",
    value: function render(settings) {
      var _this2 = this;

      if (settings === void 0) {
        settings = {};
      }

      this._partialsTemplateObj = this.getPartialsTemplateObj();
      return new _SPromise.default( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          // get the block in object format
          var blocksArray = _this2._docblockInstance.toObject(); // reset all blocks rendered state


          blocksArray.forEach(block => {
            block._rendered = false;
          }); // get the first block

          var firstBlock = blocksArray[0]; // get the template to render

          var type = typeof firstBlock.type === 'string' ? firstBlock.type.toLowerCase() : 'default';
          var template = _this2._settings.templates[type] || _this2._settings.templates.default;

          var templateObj = _this2.getTemplateObj(template); // render the template


          var compiledTemplateFn;
          compiledTemplateFn = _this2._handlebars.compile(templateObj.content, {
            noEscape: true
          });
          var renderedTemplate = yield compiledTemplateFn(); // resolve the rendering process with the rendered stack

          resolve(renderedTemplate);
        });

        return function (_x5, _x6, _x7, _x8) {
          return _ref2.apply(this, arguments);
        };
      }(), {
        id: 'SDocblockOutputRender'
      });
    }
  }]);

  return SDocblockOutput;
}(), _temp);