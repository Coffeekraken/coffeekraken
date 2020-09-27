"use strict";

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

var _handlebars = _interopRequireDefault(require("handlebars"));

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
      templates: {}
    }, settings); // save the docblock instance

    this._docblockInstance = docblockInstance; // init the handlebars helpers

    this._registerHandlerbarsHelpers();
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
      var includedTypes = [];

      _handlebars.default.registerHelper('include', type => {
        if (!this._docblockInstance.blocks || !this._docblockInstance.blocks.length) return ''; // filter blocks

        var blocks = this._docblockInstance.blocks.filter(block => {
          if (!block.toObject().type) return false;
          return type === '...' && includedTypes.indexOf(block.toObject().type.toLowerCase()) === -1 || block.toObject().type.toLowerCase() === type && includedTypes.indexOf(block.toObject().type.toLowerCase()) === -1;
        }).map(block => {
          return this.renderBlock(block.toObject());
        }); // save this included type


        includedTypes.push(type);
        return blocks.join('\n\n');
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
    value: function renderBlock(blockObj, settings) {
      if (settings === void 0) {
        settings = {};
      }

      if (blockObj.toObject && typeof blockObj.toObject === 'function') blockObj = blockObj.toObject();
      var type = typeof blockObj.type === 'string' ? blockObj.type.toLowerCase() : 'default';
      var template = this._settings.blocks[type] || this._settings.blocks.default;
      var compiledTemplateFn;

      try {
        compiledTemplateFn = _handlebars.default.compile(template, {
          noEscape: true
        });
      } catch (e) {
        console.log('BLOC ERROR', e);
      }

      var renderedTemplate = compiledTemplateFn(blockObj);
      return renderedTemplate;
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
      var _this = this;

      if (settings === void 0) {
        settings = {};
      }

      return new _SPromise.default( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          // get the block in object format
          var blocksArray = _this._docblockInstance.toObject(); // get the first block


          var firstBlock = blocksArray[0]; // get the template to render

          var type = typeof firstBlock.type === 'string' ? firstBlock.type.toLowerCase : 'default';
          var template = _this._settings.templates[type] || _this._settings.templates.default; // render the template

          var compiledTemplateFn;

          try {
            compiledTemplateFn = _handlebars.default.compile(template, {
              noEscape: true
            });
          } catch (e) {
            console.log('E>RROR', e);
          }

          var renderedTemplate = compiledTemplateFn(); // resolve the rendering process with the rendered stack

          resolve(renderedTemplate);
        });

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);

  return SDocblockOutput;
}(), _temp);