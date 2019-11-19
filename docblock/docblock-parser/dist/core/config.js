"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _boolean = _interopRequireDefault(require("../tags/boolean"));

var _oneSplit = _interopRequireDefault(require("../tags/one-split"));

var _class = _interopRequireDefault(require("../tags/class"));

var _type = _interopRequireDefault(require("../tags/type"));

var _param = _interopRequireDefault(require("../tags/param"));

var _return = _interopRequireDefault(require("../tags/return"));

var _example = _interopRequireDefault(require("../tags/example"));

var _property = _interopRequireDefault(require("../tags/property"));

var _see = _interopRequireDefault(require("../tags/see"));

var _implements = _interopRequireDefault(require("../tags/implements"));

var _author = _interopRequireDefault(require("../tags/author"));

var _values = _interopRequireDefault(require("../tags/values"));

var _js = _interopRequireDefault(require("../next-line-analyzer/js"));

var _scss = _interopRequireDefault(require("../next-line-analyzer/scss"));

var _php = _interopRequireDefault(require("../next-line-analyzer/php"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 	config
 * Default config object
 * @type 	{Object}
 */
var config = {
  /**
   * @name 	config.language
   * Set the language of the string to parse. (js, scss, etc...)
   * @type	{String}
   */
  language: null,

  /**
   * @name 	config.version
   * Set the version that will replace the \{version\} tokens inside the docblocks.
   * If not specified, will try to use the package.json version by default.
   * @type 	{String}
   */
  version: null,

  /**
   * @name 	config.tags
   * Map each tags with an analyze function that will populate the tag object properly
   * @type 	{Object}
   */
  tags: {
    /**
     * @name 	config.tags.@abstract
     * Map the @abstract tag with his analyze function
     * @type 	{Function}
     */
    "@abstract": _boolean.default,

    /**
     * @name 	config.tags.@attribute
     * Map the @attribute tag with his analyze function
     * @type 	{Function}
     */
    "@attribute": _boolean.default,

    /**
     * @name 	config.tags.@author
     * Map the @author tag with his analyze function
     * @type 	{Function}
     */
    "@author": _author.default,

    /**
     * @name 	config.tags.@category
     * Map the @category tag with his analyze function
     * @type 	{Function}
     */
    "@category": _oneSplit.default,

    /**
     * @name 	config.tags.@class
     * Map the @class tag with his analyze function
     * @type 	{Function}
     */
    "@class": _class.default,

    /**
     * @name 	config.tags.@constructor
     * Map the @constructor tag with his analyze function
     * @type 	{Function}
     */
    "@constructor": _boolean.default,

    /**
     * @name 	config.tags.@const
     * Map the @const tag with his analyze function
     * @type 	{Function}
     */
    "@const": _boolean.default,

    /**
     * @name 	config.tags.@copyright
     * Map the @copyright tag with his analyze function
     * @type 	{Function}
     */
    "@copyright": _oneSplit.default,

    /**
     * @name 	config.tags.@default
     * Map the @default tag with his analyze function
     * @type 	{Function}
     */
    "@default": _oneSplit.default,

    /**
     * @name 	config.tags.@deprecated
     * Map the @deprecated tag with his analyze function
     * @type 	{Function}
     */
    "@deprecated": _boolean.default,

    /**
     * @name 	config.tags.@event
     * Map the @event tag with his analyze function
     * @type 	{Function}
     */
    "@event": _boolean.default,

    /**
     * @name 	config.tags.@example
     * Map the @example tag with his analyze function
     * @type 	{Function}
     */
    "@example": _example.default,

    /**
     * @name 	config.tags.@extends
     * Map the @extends tag with his analyze function
     * @type 	{Function}
     */
    "@extends": _oneSplit.default,

    /**
     * @name 	config.tags.@final
     * Map the @final tag with his analyze function
     * @type 	{Function}
     */
    "@final": _boolean.default,

    /**
     * @name 	config.tags.@global
     * Map the @global tag with his analyze function
     * @type 	{Function}
     */
    "@global": _boolean.default,

    /**
     * @name 	config.tags.@implements
     * Map the @implements tag with his analyze function
     * @type 	{Function}
     */
    "@implements": _implements.default,

    /**
     * @name 	config.tags.@interface
     * Map the @interface tag with his analyze function
     * @type 	{Function}
     */
    "@interface": _boolean.default,

    /**
     * @name 	config.tags.@name
     * Map the @name tag with his analyze function
     * @type 	{Function}
     */
    "@name": _oneSplit.default,

    /**
     * @name 	config.tags.@override
     * Map the @override tag with his analyze function
     * @type 	{Function}
     */
    "@override": _boolean.default,

    /**
     * @name 	config.tags.@package
     * Map the @package tag with his analyze function
     * @type 	{Function}
     */
    "@package": _oneSplit.default,

    /**
     * @name 	config.tags.@param
     * Map the @param tag with his analyze function
     * @type 	{Function}
     */
    "@param": _param.default,

    /**
     * @name 	config.tags.@private
     * Map the @private tag with his analyze function
     * @type 	{Function}
     */
    "@private": _boolean.default,

    /**
     * @name 	config.tags.@property
     * Map the @property tag with his analyze function
     * @type 	{Function}
     */
    "@property": _property.default,

    /**
     * @name 	config.tags.@protected
     * Map the @protected tag with his analyze function
     * @type 	{Function}
     */
    "@protected": _boolean.default,

    /**
     * @name 	config.tags.@public
     * Map the @public tag with his analyze function
     * @type 	{Function}
     */
    "@public": _boolean.default,

    /**
     * @name 	config.tags.@return
     * Map the @return  tag with his analyze function
     * @type 	{Function}
     */
    "@return": _return.default,

    /**
     * @name 	config.tags.@see
     * Map the @see tag with his analyze function
     * @type 	{Function}
     */
    "@see": _see.default,

    /**
     * @name 	config.tags.@todo
     * Map the @todo tag with his analyze function
     * @type 	{Function}
     */
    "@todo": _oneSplit.default,

    /**
     * @name 	config.tags.@type
     * Map the @type tag with his analyze function
     * @type 	{Function}
     */
    "@type": _type.default,

    /**
     * @name 	config.tags.@values
     * Map the @values tag with his analyze function
     * @type 	{Function}
     */
    "@values": _values.default
  },

  /**
   * @name 	config.nextLineAnalyzer
   * Map each next line with an analyze function that will populate the tag object properly
   * @type 	{Object}
   */
  nextLineAnalyzer: {
    /**
     * @name 	config.nextLineAnalyzer.js
     * Map the js next line to his analyze function
     * @type 	{Function}
     */
    js: _js.default,

    /**
     * @name 	config.nextLineAnalyzer.jsx
     * Map the jsx next line to his analyze function
     * @type 	{Function}
     */
    jsx: _js.default,

    /**
     * @name 	config.nextLineAnalyzer.scss
     * Map the scss next line to his analyze function
     * @type 	{Function}
     */
    scss: _scss.default,

    /**
     * @name 	config.nextLineAnalyzer.php
     * Map the php next line to his analyze function
     * @type 	{Function}
     */
    php: _php.default
  }
};
var _default = config;
exports.default = _default;
module.exports = exports.default;