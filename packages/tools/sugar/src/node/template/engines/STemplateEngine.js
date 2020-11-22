"use strict";
const __STemplateEngineInterface = require('./interface/STemplateEngineInterface');
const __deepMerge = require('../../object/deepMerge');
const __sugarConfig = require('../../config/sugar');
/**
 * @name          STemplateEngine
 * @namespace     sugar.node.template.engines
 * @type          Class
 *
 * This class represent the base for a compatible ```STemplate``` engine
 * A template engine class MUST have some basic methods like:
 * - ```input```: A simple static property that tells if your template engine work with a "path" as input, or with a "string" (templateString) either...
 * - ```canRender```: A simple static method that take the template string as parameter and must return true if it can handle it and false if not
 * - ```render```: The main method that take as parameter either the view path to render, either directly the template string depending on his exposed static property ```input``` that can be either ```path``` or ```string``` as well as a data object to use for rendering process
 * -
 *
 * @param       {Object}      [settings={}]       A settings object to configure your template engine. Each template engines can have different settings but here's the default one:
 *
 * @Todo      documentation
 *
 * @example     js
 * const STemplateEngine = require('@coffeekraken/sugar/node/template/engines/STemplateEngine');
 * module.exports = class MyTemplateEngine extends STemplateEngine {
 *    static input = 'path';
 *    static canRender(templateString) {
 *      // ...
 *      return true;
 *    }
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 *    render(path, data = {}, settings = {}) {
 *      return new SPromise((resolve, reject, trigger, cancel) => {
 *        // ...
 *        resolve(compiledTemplateString);
 *      });
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STemplateEngine {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        /**
         * @name      _settings
         * @type      Object
         * @private
         *
         * Store the settings passed in the constructor
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        this._settings = __deepMerge({}, settings);
    }
}
module.exports = STemplateEngine;
// module.exports = __STemplateEngineInterface.implements(STemplateEngine);
