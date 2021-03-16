"use strict";
// @ts-nocheck
const __SActionsStream = require('../../stream/SActionsStream');
const __SJsConfigFileToJsonStreamAction = require('./config/SJsConfigFileToJsonStreamAction');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SGlobResolverStreamAction = require('../../stream/actions/SGlobResolverStreamAction');
const __path = require('path');
/**
 * @name            SBuildConfigActionsStream
 * @namespace       node.build.config
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
 * const SBuildConfigActionsStream = require('@coffeekraken/sugar/node/build/SBuildConfigActionsStream');
 * const myStream = new SBuildConfigActionsStream();
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
module.exports = class SBuildConfigActionsStream extends __SActionsStream {
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
            globResolver: __SGlobResolverStreamAction,
            jsToJson: __SJsConfigFileToJsonStreamAction,
            fsOutput: __SFsOutputStreamAction
        }, __deepMerge({
            id: 'build.config.actionsStream',
            name: 'Build Config Actions Stream',
            before: (streamObj) => {
                streamObj.globProperty = 'input';
                return streamObj;
            },
            afterActions: {
                globResolver: (streamObj) => {
                    if (streamObj.input) {
                        streamObj.filename = __getFilename(streamObj.input);
                    }
                    return streamObj;
                }
            },
            beforeActions: {
                fsOutput: (streamObj) => {
                    if (!streamObj.outputStack)
                        streamObj.outputStack = {};
                    if (streamObj.outputDir && streamObj.filename && streamObj.data) {
                        streamObj.outputStack.data = __path.resolve(streamObj.outputDir, streamObj.filename);
                    }
                    return streamObj;
                }
            }
        }, settings));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkQ29uZmlnQWN0aW9uc1N0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL2J1aWxkL19fd2lwX18vY29uZmlnL1NCdWlsZENvbmZpZ0FjdGlvbnNTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0saUNBQWlDLEdBQUcsT0FBTyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7QUFDOUYsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDdEQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDbkQsTUFBTSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsNENBQTRDLENBQUMsQ0FBQztBQUN0RixNQUFNLDJCQUEyQixHQUFHLE9BQU8sQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0FBQzlGLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLHlCQUEwQixTQUFRLGdCQUFnQjtJQUN2RTs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsc0JBQXNCO1FBQ3RCLEtBQUssQ0FDSDtZQUNFLFlBQVksRUFBRSwyQkFBMkI7WUFDekMsUUFBUSxFQUFFLGlDQUFpQztZQUMzQyxRQUFRLEVBQUUsdUJBQXVCO1NBQ2xDLEVBQ0QsV0FBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLDRCQUE0QjtZQUNoQyxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNwQixTQUFTLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztnQkFDakMsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQztZQUNELFlBQVksRUFBRTtnQkFDWixZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDMUIsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO3dCQUNuQixTQUFTLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3JEO29CQUNELE9BQU8sU0FBUyxDQUFDO2dCQUNuQixDQUFDO2FBQ0Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVzt3QkFBRSxTQUFTLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDdkQsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLElBQUksRUFBRTt3QkFDL0QsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDekMsU0FBUyxDQUFDLFNBQVMsRUFDbkIsU0FBUyxDQUFDLFFBQVEsQ0FDbkIsQ0FBQztxQkFDSDtvQkFDRCxPQUFPLFNBQVMsQ0FBQztnQkFDbkIsQ0FBQzthQUNGO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMifQ==