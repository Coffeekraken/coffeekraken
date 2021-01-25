"use strict";
// @ts-nocheck
const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SDocMapStreamAction = require('./actions/SDocMapStreamAction');
/**
 * @name            SBuildDocMapActionsStream
 * @namespace           sugar.node.build.docMap
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * const SBuildDocMapActionsStream = require('@coffeekraken/sugar/node/build/doc/SBuildDocMapActionsStream');
 * const myStream = new SBuildDocMapActionsStream();
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
module.exports = class SBuildDocMapActionsStream extends __SActionsStream {
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
            filesResolver: __SFsFilesResolverStreamAction,
            docMap: __SDocMapStreamAction,
            fsOutput: __SFsOutputStreamAction
        }, __deepMerge({
            id: 'SBuildDocMapActionsStream',
            name: 'Build docMap.json Actions Stream',
            actions: {
                filesResolver: {
                    ignoreFolders: [],
                    out: 'files'
                }
            },
            beforeActions: {
                fsOutput: (streamObj) => {
                    if (!streamObj.outputStack)
                        streamObj.outputStack = {};
                    if (streamObj.output && streamObj.data) {
                        streamObj.outputStack.data = streamObj.output;
                    }
                    return streamObj;
                }
            }
        }, settings));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRG9jTWFwQWN0aW9uc1N0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCdWlsZERvY01hcEFjdGlvbnNTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sOEJBQThCLEdBQUcsT0FBTyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7QUFDcEcsTUFBTSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsNENBQTRDLENBQUMsQ0FBQztBQUN0RixNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBRXZFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0seUJBQTBCLFNBQVEsZ0JBQWdCO0lBQ3ZFOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixzQkFBc0I7UUFDdEIsS0FBSyxDQUNIO1lBQ0UsYUFBYSxFQUFFLDhCQUE4QjtZQUM3QyxNQUFNLEVBQUUscUJBQXFCO1lBQzdCLFFBQVEsRUFBRSx1QkFBdUI7U0FDbEMsRUFDRCxXQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsMkJBQTJCO1lBQy9CLElBQUksRUFBRSxrQ0FBa0M7WUFDeEMsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRTtvQkFDYixhQUFhLEVBQUUsRUFBRTtvQkFDakIsR0FBRyxFQUFFLE9BQU87aUJBQ2I7YUFDRjtZQUNELGFBQWEsRUFBRTtnQkFDYixRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXO3dCQUFFLFNBQVMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUN2RCxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLElBQUksRUFBRTt3QkFDdEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztxQkFDL0M7b0JBQ0QsT0FBTyxTQUFTLENBQUM7Z0JBQ25CLENBQUM7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDIn0=