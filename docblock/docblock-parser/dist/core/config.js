'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _boolean = require('../tags/boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _oneSplit = require('../tags/one-split');

var _oneSplit2 = _interopRequireDefault(_oneSplit);

var _class = require('../tags/class');

var _class2 = _interopRequireDefault(_class);

var _type = require('../tags/type');

var _type2 = _interopRequireDefault(_type);

var _param = require('../tags/param');

var _param2 = _interopRequireDefault(_param);

var _return = require('../tags/return');

var _return2 = _interopRequireDefault(_return);

var _example = require('../tags/example');

var _example2 = _interopRequireDefault(_example);

var _property = require('../tags/property');

var _property2 = _interopRequireDefault(_property);

var _see = require('../tags/see');

var _see2 = _interopRequireDefault(_see);

var _implements = require('../tags/implements');

var _implements2 = _interopRequireDefault(_implements);

var _author = require('../tags/author');

var _author2 = _interopRequireDefault(_author);

var _values = require('../tags/values');

var _values2 = _interopRequireDefault(_values);

var _js = require('../next-line-analyzer/js');

var _js2 = _interopRequireDefault(_js);

var _scss = require('../next-line-analyzer/scss');

var _scss2 = _interopRequireDefault(_scss);

var _php = require('../next-line-analyzer/php');

var _php2 = _interopRequireDefault(_php);

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
				"@abstract": _boolean2.default,

				/**
    * @name 	config.tags.@attribute
    * Map the @attribute tag with his analyze function
    * @type 	{Function}
    */
				"@attribute": _boolean2.default,

				/**
    * @name 	config.tags.@author
    * Map the @author tag with his analyze function
    * @type 	{Function}
    */
				"@author": _author2.default,

				/**
    * @name 	config.tags.@category
    * Map the @category tag with his analyze function
    * @type 	{Function}
    */
				"@category": _oneSplit2.default,

				/**
    * @name 	config.tags.@class
    * Map the @class tag with his analyze function
    * @type 	{Function}
    */
				"@class": _class2.default,

				/**
    * @name 	config.tags.@constructor
    * Map the @constructor tag with his analyze function
    * @type 	{Function}
    */
				"@constructor": _boolean2.default,

				/**
    * @name 	config.tags.@const
    * Map the @const tag with his analyze function
    * @type 	{Function}
    */
				"@const": _boolean2.default,

				/**
    * @name 	config.tags.@copyright
    * Map the @copyright tag with his analyze function
    * @type 	{Function}
    */
				"@copyright": _oneSplit2.default,

				/**
    * @name 	config.tags.@default
    * Map the @default tag with his analyze function
    * @type 	{Function}
    */
				"@default": _oneSplit2.default,

				/**
    * @name 	config.tags.@deprecated
    * Map the @deprecated tag with his analyze function
    * @type 	{Function}
    */
				"@deprecated": _boolean2.default,

				/**
    * @name 	config.tags.@event
    * Map the @event tag with his analyze function
    * @type 	{Function}
    */
				"@event": _boolean2.default,

				/**
    * @name 	config.tags.@example
    * Map the @example tag with his analyze function
    * @type 	{Function}
    */
				"@example": _example2.default,

				/**
    * @name 	config.tags.@extends
    * Map the @extends tag with his analyze function
    * @type 	{Function}
    */
				"@extends": _oneSplit2.default,

				/**
    * @name 	config.tags.@final
    * Map the @final tag with his analyze function
    * @type 	{Function}
    */
				"@final": _boolean2.default,

				/**
    * @name 	config.tags.@global
    * Map the @global tag with his analyze function
    * @type 	{Function}
    */
				"@global": _boolean2.default,

				/**
    * @name 	config.tags.@implements
    * Map the @implements tag with his analyze function
    * @type 	{Function}
    */
				"@implements": _implements2.default,

				/**
    * @name 	config.tags.@interface
    * Map the @interface tag with his analyze function
    * @type 	{Function}
    */
				"@interface": _boolean2.default,

				/**
    * @name 	config.tags.@name
    * Map the @name tag with his analyze function
    * @type 	{Function}
    */
				"@name": _oneSplit2.default,

				/**
    * @name 	config.tags.@override
    * Map the @override tag with his analyze function
    * @type 	{Function}
    */
				"@override": _boolean2.default,

				/**
    * @name 	config.tags.@package
    * Map the @package tag with his analyze function
    * @type 	{Function}
    */
				"@package": _oneSplit2.default,

				/**
    * @name 	config.tags.@param
    * Map the @param tag with his analyze function
    * @type 	{Function}
    */
				"@param": _param2.default,

				/**
    * @name 	config.tags.@private
    * Map the @private tag with his analyze function
    * @type 	{Function}
    */
				"@private": _boolean2.default,

				/**
    * @name 	config.tags.@property
    * Map the @property tag with his analyze function
    * @type 	{Function}
    */
				"@property": _property2.default,

				/**
    * @name 	config.tags.@protected
    * Map the @protected tag with his analyze function
    * @type 	{Function}
    */
				"@protected": _boolean2.default,

				/**
    * @name 	config.tags.@public
    * Map the @public tag with his analyze function
    * @type 	{Function}
    */
				"@public": _boolean2.default,

				/**
    * @name 	config.tags.@return
    * Map the @return  tag with his analyze function
    * @type 	{Function}
    */
				"@return": _return2.default,

				/**
    * @name 	config.tags.@see
    * Map the @see tag with his analyze function
    * @type 	{Function}
    */
				"@see": _see2.default,

				/**
    * @name 	config.tags.@todo
    * Map the @todo tag with his analyze function
    * @type 	{Function}
    */
				"@todo": _oneSplit2.default,

				/**
    * @name 	config.tags.@type
    * Map the @type tag with his analyze function
    * @type 	{Function}
    */
				"@type": _type2.default,

				/**
    * @name 	config.tags.@values
    * Map the @values tag with his analyze function
    * @type 	{Function}
    */
				"@values": _values2.default

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
				js: _js2.default,
				/**
    * @name 	config.nextLineAnalyzer.jsx
    * Map the jsx next line to his analyze function
    * @type 	{Function}
    */
				jsx: _js2.default,
				/**
     * @name 	config.nextLineAnalyzer.scss
     * Map the scss next line to his analyze function
     * @type 	{Function}
     */
				scss: _scss2.default,
				/**
     * @name 	config.nextLineAnalyzer.php
     * Map the php next line to his analyze function
     * @type 	{Function}
     */
				php: _php2.default
		}
};

exports.default = config;
module.exports = exports['default'];