import __docblockBooleanTag from "../tags/boolean";
import __docblockOneValueTag from "../tags/one-split";
import __docblockClassTag from "../tags/class";
import __docblockTypeTag from "../tags/type";
import __docblockParamTag from "../tags/param";
import __docblockReturnTag from "../tags/return";
import __docblockExampleTag from "../tags/example";
import __docblockPropertyTag from "../tags/property";
import __docblockSeeTag from "../tags/see";
import __docblockImplementsTag from "../tags/implements";
import __docblockAuthorTag from "../tags/author";
import __docblockValuesTag from "../tags/values";

import __docblockNextLineAnalyzerJs from "../next-line-analyzer/js";
import __docblockNextLineAnalyzerScss from "../next-line-analyzer/scss";
import __docblockNextLineAnalyzerPhp from "../next-line-analyzer/php";

/**
 * @name 	config
 * Default config object
 * @type 	{Object}
 */
let config = {
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
    "@abstract": __docblockBooleanTag,

    /**
     * @name 	config.tags.@attribute
     * Map the @attribute tag with his analyze function
     * @type 	{Function}
     */
    "@attribute": __docblockBooleanTag,

    /**
     * @name 	config.tags.@author
     * Map the @author tag with his analyze function
     * @type 	{Function}
     */
    "@author": __docblockAuthorTag,

    /**
     * @name 	config.tags.@category
     * Map the @category tag with his analyze function
     * @type 	{Function}
     */
    "@category": __docblockOneValueTag,

    /**
     * @name 	config.tags.@class
     * Map the @class tag with his analyze function
     * @type 	{Function}
     */
    "@class": __docblockClassTag,

    /**
     * @name 	config.tags.@constructor
     * Map the @constructor tag with his analyze function
     * @type 	{Function}
     */
    "@constructor": __docblockBooleanTag,

    /**
     * @name 	config.tags.@const
     * Map the @const tag with his analyze function
     * @type 	{Function}
     */
    "@const": __docblockBooleanTag,

    /**
     * @name 	config.tags.@copyright
     * Map the @copyright tag with his analyze function
     * @type 	{Function}
     */
    "@copyright": __docblockOneValueTag,

    /**
     * @name 	config.tags.@default
     * Map the @default tag with his analyze function
     * @type 	{Function}
     */
    "@default": __docblockOneValueTag,

    /**
     * @name 	config.tags.@deprecated
     * Map the @deprecated tag with his analyze function
     * @type 	{Function}
     */
    "@deprecated": __docblockBooleanTag,

    /**
     * @name 	config.tags.@event
     * Map the @event tag with his analyze function
     * @type 	{Function}
     */
    "@event": __docblockBooleanTag,

    /**
     * @name 	config.tags.@example
     * Map the @example tag with his analyze function
     * @type 	{Function}
     */
    "@example": __docblockExampleTag,

    /**
     * @name 	config.tags.@extends
     * Map the @extends tag with his analyze function
     * @type 	{Function}
     */
    "@extends": __docblockOneValueTag,

    /**
     * @name 	config.tags.@final
     * Map the @final tag with his analyze function
     * @type 	{Function}
     */
    "@final": __docblockBooleanTag,

    /**
     * @name 	config.tags.@global
     * Map the @global tag with his analyze function
     * @type 	{Function}
     */
    "@global": __docblockBooleanTag,

    /**
     * @name 	config.tags.@implements
     * Map the @implements tag with his analyze function
     * @type 	{Function}
     */
    "@implements": __docblockImplementsTag,

    /**
     * @name 	config.tags.@interface
     * Map the @interface tag with his analyze function
     * @type 	{Function}
     */
    "@interface": __docblockBooleanTag,

    /**
     * @name 	config.tags.@name
     * Map the @name tag with his analyze function
     * @type 	{Function}
     */
    "@name": __docblockOneValueTag,

    /**
     * @name 	config.tags.@override
     * Map the @override tag with his analyze function
     * @type 	{Function}
     */
    "@override": __docblockBooleanTag,

    /**
     * @name 	config.tags.@package
     * Map the @package tag with his analyze function
     * @type 	{Function}
     */
    "@package": __docblockOneValueTag,

    /**
     * @name 	config.tags.@param
     * Map the @param tag with his analyze function
     * @type 	{Function}
     */
    "@param": __docblockParamTag,

    /**
     * @name 	config.tags.@private
     * Map the @private tag with his analyze function
     * @type 	{Function}
     */
    "@private": __docblockBooleanTag,

    /**
     * @name 	config.tags.@property
     * Map the @property tag with his analyze function
     * @type 	{Function}
     */
    "@property": __docblockPropertyTag,

    /**
     * @name 	config.tags.@protected
     * Map the @protected tag with his analyze function
     * @type 	{Function}
     */
    "@protected": __docblockBooleanTag,

    /**
     * @name 	config.tags.@public
     * Map the @public tag with his analyze function
     * @type 	{Function}
     */
    "@public": __docblockBooleanTag,

    /**
     * @name 	config.tags.@return
     * Map the @return  tag with his analyze function
     * @type 	{Function}
     */
    "@return": __docblockReturnTag,

    /**
     * @name 	config.tags.@see
     * Map the @see tag with his analyze function
     * @type 	{Function}
     */
    "@see": __docblockSeeTag,

    /**
     * @name 	config.tags.@todo
     * Map the @todo tag with his analyze function
     * @type 	{Function}
     */
    "@todo": __docblockOneValueTag,

    /**
     * @name 	config.tags.@type
     * Map the @type tag with his analyze function
     * @type 	{Function}
     */
    "@type": __docblockTypeTag,

    /**
     * @name 	config.tags.@values
     * Map the @values tag with his analyze function
     * @type 	{Function}
     */
    "@values": __docblockValuesTag
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
    js: __docblockNextLineAnalyzerJs,
    /**
     * @name 	config.nextLineAnalyzer.jsx
     * Map the jsx next line to his analyze function
     * @type 	{Function}
     */
    jsx: __docblockNextLineAnalyzerJs,
    /**
     * @name 	config.nextLineAnalyzer.scss
     * Map the scss next line to his analyze function
     * @type 	{Function}
     */
    scss: __docblockNextLineAnalyzerScss,
    /**
     * @name 	config.nextLineAnalyzer.php
     * Map the php next line to his analyze function
     * @type 	{Function}
     */
    php: __docblockNextLineAnalyzerPhp
  }
};

export default config;
