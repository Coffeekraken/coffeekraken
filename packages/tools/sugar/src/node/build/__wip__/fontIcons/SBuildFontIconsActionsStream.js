"use strict";
// @ts-nocheck
const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SFantasticonsStreamAction = require('./actions/SFantasticonStreamAction');
const __path = require('path');
/**
 * @name            SBuildIconsActionsStream
 * @namespace           sugar.node.build.icons
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some icons into fonticons
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * const SBuildIconsActionsStream = require('@coffeekraken/sugar/node/build/SBuildIconsActionsStream');
 * const myStream = new SBuildIconsActionsStream();
 * myStream.start({
 *    input: '...',
 *    output: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildIconsActionsStream extends __SActionsStream {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // init actions stream
        super({
            fantasticon: __SFantasticonsStreamAction
        }, __deepMerge({
            id: 'SBuildIconsActionsStream',
            name: 'Build Font Icons Actions Stream',
            before: (streamObj) => {
                return streamObj;
            },
            afterActions: {},
            beforeActions: {}
        }, settings));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRm9udEljb25zQWN0aW9uc1N0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCdWlsZEZvbnRJY29uc0FjdGlvbnNTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sMkJBQTJCLEdBQUcsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7QUFDbEYsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sd0JBQXlCLFNBQVEsZ0JBQWdCO0lBQ3RFOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixzQkFBc0I7UUFDdEIsS0FBSyxDQUNIO1lBQ0UsV0FBVyxFQUFFLDJCQUEyQjtTQUN6QyxFQUNELFdBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSwwQkFBMEI7WUFDOUIsSUFBSSxFQUFFLGlDQUFpQztZQUN2QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDcEIsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQztZQUNELFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRSxFQUFFO1NBQ2xCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDIn0=