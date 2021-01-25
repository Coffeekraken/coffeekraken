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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkVmlld3NBY3Rpb25zU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkVmlld3NBY3Rpb25zU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUNoRSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN0RCxNQUFNLDhCQUE4QixHQUFHLE9BQU8sQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0FBQ3BHLE1BQU0seUJBQXlCLEdBQUcsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7QUFDMUYsTUFBTSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsNENBQTRDLENBQUMsQ0FBQztBQUN0RixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUMsTUFBTSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsNENBQTRDLENBQUMsQ0FBQztBQUN0RixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSx3QkFBeUIsU0FBUSxnQkFBZ0I7SUFDdEU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLHNCQUFzQjtRQUN0QixLQUFLLENBQ0g7WUFDRSxNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLGFBQWEsRUFBRSw4QkFBOEI7WUFDN0MsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsdUJBQXVCO1NBQ2xDLEVBQ0QsV0FBVyxDQUNUO1lBQ0UsSUFBSSxFQUFFLGFBQWE7WUFDbkIsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRTtvQkFDYixhQUFhLEVBQUUsRUFBRTtvQkFDakIsR0FBRyxFQUFFLE9BQU87aUJBQ2I7YUFDRjtZQUNELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNwQixTQUFTLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25ELFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQztZQUNELGFBQWEsRUFBRTtnQkFDYixRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDdEIsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDakUsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO3dCQUNoQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXO3dCQUFFLFNBQVMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUN2RCxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksVUFBVSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7d0JBQ3ZELFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ3pDLFNBQVMsQ0FBQyxTQUFTLEVBQ25CLFVBQVUsQ0FDWCxDQUFDO3FCQUNIO29CQUNELE9BQU8sU0FBUyxDQUFDO2dCQUNuQixDQUFDO2FBQ0Y7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyJ9