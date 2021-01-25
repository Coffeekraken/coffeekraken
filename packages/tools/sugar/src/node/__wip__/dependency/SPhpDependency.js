"use strict";
// @ts-nocheck
const __SDependency = require('./SDependency');
/**
 * @name                    SPhpDependency
 * @namespace           sugar.node.dependency
 * @type                    Class
 * @wip
 *
 * This class is the one that take care of installing php on your system depending on the platform on which you are.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * const SPhpDependency = require('@coffeekraken/sugar/node/dependency/SPhpDependency');
 * const promise = SPhpDependency.install();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPhpDependency extends __SDependency {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // extend the base class
        super('php', __dirname + '/php.dependency.json', settings);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BocERlcGVuZGVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUGhwRGVwZW5kZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUVkLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLGNBQWUsU0FBUSxhQUFhO0lBQ3pEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2Qix3QkFBd0I7UUFDeEIsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEdBQUcsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGLENBQUMifQ==