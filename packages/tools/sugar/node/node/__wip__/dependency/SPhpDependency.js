"use strict";
// @ts-nocheck
const __SDependency = require('./SDependency');
/**
 * @name                    SPhpDependency
 * @namespace           sugar.node.dependency
 * @type                    Class
 * @status              wip
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BocERlcGVuZGVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9fX3dpcF9fL2RlcGVuZGVuY3kvU1BocERlcGVuZGVuY3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxjQUFlLFNBQVEsYUFBYTtJQUN6RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsd0JBQXdCO1FBQ3hCLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxHQUFHLHNCQUFzQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDRixDQUFDIn0=