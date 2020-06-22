"use strict";

/**
 * @name                docblock-parser.config.js
 * @namespace           src
 * @type                Object
 * 
 * Store the default config that can be overrided by the passed
 * one in the DocblockParser constructor
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
module.exports = {
  /**
   * @name              tags
   * @type              Object
   * 
   * Store the tags that you want to create support for or simply override
   * a default one. The object format is: { tagName: tagProcessorFn }
   * 
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  tage: {}
};