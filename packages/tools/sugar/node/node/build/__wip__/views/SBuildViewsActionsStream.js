"use strict";
// @ts-nocheck
const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __SFsReadFileStreamAction = require('../../stream/actions/SFsReadFileStreamAction');
const __SFsUnlinkStreamAction = require('../../stream/actions/SFsUnlinkStreamAction');
const __globParent = require('glob-parent');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __path = require('path');
/**
 * @name            SBuildViewsActionsStream
 * @namespace           sugar.node.build.views
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
 * const SBuildViewsActionsStream = require('@coffeekraken/sugar/node/build/views/SBuildViewsActionsStream');
 * const myStream = new SBuildViewsActionsStream();
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
module.exports = class SBuildViewsActionsStream extends __SActionsStream {
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
            unlink: __SFsUnlinkStreamAction,
            filesResolver: __SFsFilesResolverStreamAction,
            readFile: __SFsReadFileStreamAction,
            fsOutput: __SFsOutputStreamAction
        }, __deepMerge({
            name: 'Build Views',
            actions: {
                filesResolver: {
                    ignoreFolders: [],
                    out: 'array'
                }
            },
            before: (streamObj) => {
                streamObj.inputDir = __globParent(streamObj.input);
                streamObj.unlink = streamObj.outputDir;
                return streamObj;
            },
            beforeActions: {
                fsOutput: (streamObj) => {
                    let outputPath = streamObj.input.replace(streamObj.inputDir, '');
                    if (outputPath.slice(0, 1) === '/')
                        outputPath = outputPath.slice(1);
                    if (!streamObj.outputStack)
                        streamObj.outputStack = {};
                    if (streamObj.outputDir && outputPath && streamObj.data) {
                        streamObj.outputStack.data = __path.resolve(streamObj.outputDir, outputPath);
                    }
                    return streamObj;
                }
            }
        }, settings));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkVmlld3NBY3Rpb25zU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYnVpbGQvX193aXBfXy92aWV3cy9TQnVpbGRWaWV3c0FjdGlvbnNTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sOEJBQThCLEdBQUcsT0FBTyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7QUFDcEcsTUFBTSx5QkFBeUIsR0FBRyxPQUFPLENBQUMsOENBQThDLENBQUMsQ0FBQztBQUMxRixNQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0FBQ3RGLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM1QyxNQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0FBQ3RGLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLHdCQUF5QixTQUFRLGdCQUFnQjtJQUN0RTs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsc0JBQXNCO1FBQ3RCLEtBQUssQ0FDSDtZQUNFLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsYUFBYSxFQUFFLDhCQUE4QjtZQUM3QyxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSx1QkFBdUI7U0FDbEMsRUFDRCxXQUFXLENBQ1Q7WUFDRSxJQUFJLEVBQUUsYUFBYTtZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsYUFBYSxFQUFFO29CQUNiLGFBQWEsRUFBRSxFQUFFO29CQUNqQixHQUFHLEVBQUUsT0FBTztpQkFDYjthQUNGO1lBQ0QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3BCLFNBQVMsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkQsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO2dCQUN2QyxPQUFPLFNBQVMsQ0FBQztZQUNuQixDQUFDO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUN0QixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNqRSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7d0JBQ2hDLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVuQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVc7d0JBQUUsU0FBUyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ3ZELElBQUksU0FBUyxDQUFDLFNBQVMsSUFBSSxVQUFVLElBQUksU0FBUyxDQUFDLElBQUksRUFBRTt3QkFDdkQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDekMsU0FBUyxDQUFDLFNBQVMsRUFDbkIsVUFBVSxDQUNYLENBQUM7cUJBQ0g7b0JBQ0QsT0FBTyxTQUFTLENBQUM7Z0JBQ25CLENBQUM7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDIn0=