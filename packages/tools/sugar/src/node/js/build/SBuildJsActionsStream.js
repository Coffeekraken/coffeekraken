"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SActionsStream_1 = __importDefault(require("../../stream/SActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const filename_1 = __importDefault(require("../../fs/filename"));
const SFsFilesResolverStreamAction_1 = __importDefault(require("../../stream/actions/SFsFilesResolverStreamAction"));
const SFsOutputStreamAction_1 = __importDefault(require("../../stream/actions/SFsOutputStreamAction"));
const SCompileJsStreamAction_1 = __importDefault(require("./actions/SCompileJsStreamAction"));
const path_1 = __importDefault(require("path"));
module.exports = class SBuildJsActionsStream extends SActionsStream_1.default {
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
            filesResolver: SFsFilesResolverStreamAction_1.default,
            compile: SCompileJsStreamAction_1.default,
            fsOutput: SFsOutputStreamAction_1.default
        }, deepMerge_1.default({
            id: 'SBuildJsActionsStream',
            name: 'Build JS Actions Stream',
            before: (streamObj) => {
                streamObj.docMapInput = streamObj.input;
                return streamObj;
            },
            afterActions: {
                filesResolver: (streamObj) => {
                    if (streamObj.input) {
                        streamObj.filename = filename_1.default(streamObj.input);
                    }
                    return streamObj;
                },
                frontspecRead: (streamObj) => {
                    return streamObj;
                }
            },
            beforeActions: {
                fsOutput: (streamObj) => {
                    return this._ensureOutputStack(streamObj);
                }
            }
        }, settings));
    }
    _ensureOutputStack(streamObj) {
        if (!streamObj.outputStack)
            streamObj.outputStack = {};
        if (streamObj.outputDir && streamObj.filename) {
            streamObj.outputStack.data = path_1.default.resolve(streamObj.outputDir, streamObj.prod
                ? streamObj.inputObj.relPath.replace('.js', '.prod.js')
                : streamObj.inputObj.relPath.replace('.js', '.js'));
        }
        if (streamObj.outputDir && streamObj.filename && streamObj.sourcemapData) {
            streamObj.outputStack.sourcemapData = path_1.default.resolve(streamObj.outputDir, streamObj.prod
                ? streamObj.inputObj.relPath.replace('.js', '.prod.js.map')
                : streamObj.inputObj.relPath.replace('.js', '.js.map'));
        }
        return streamObj;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkSnNBY3Rpb25zU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkSnNBY3Rpb25zU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsaUZBQTJEO0FBQzNELHVFQUFpRDtBQUNqRCxpRUFBOEM7QUFDOUMscUhBQStGO0FBQy9GLHVHQUFpRjtBQUNqRiw4RkFBd0U7QUFDeEUsZ0RBQTBCO0FBK0IxQixpQkFBUyxNQUFNLHFCQUFzQixTQUFRLHdCQUFnQjtJQUMzRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsc0JBQXNCO1FBQ3RCLEtBQUssQ0FDSDtZQUNFLGFBQWEsRUFBRSxzQ0FBOEI7WUFDN0MsT0FBTyxFQUFFLGdDQUF3QjtZQUNqQyxRQUFRLEVBQUUsK0JBQXVCO1NBQ2xDLEVBQ0QsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSx1QkFBdUI7WUFDM0IsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDcEIsU0FBUyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUN4QyxPQUFPLFNBQVMsQ0FBQztZQUNuQixDQUFDO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUMzQixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7d0JBQ25CLFNBQVMsQ0FBQyxRQUFRLEdBQUcsa0JBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3JEO29CQUNELE9BQU8sU0FBUyxDQUFDO2dCQUNuQixDQUFDO2dCQUNELGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUMzQixPQUFPLFNBQVMsQ0FBQztnQkFDbkIsQ0FBQzthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUN0QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUMsQ0FBQzthQUNGO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGtCQUFrQixDQUFDLFNBQVM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXO1lBQUUsU0FBUyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkQsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDN0MsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDekMsU0FBUyxDQUFDLFNBQVMsRUFDbkIsU0FBUyxDQUFDLElBQUk7Z0JBQ1osQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO2dCQUN2RCxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FDckQsQ0FBQztTQUNIO1FBQ0QsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLGFBQWEsRUFBRTtZQUN4RSxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNsRCxTQUFTLENBQUMsU0FBUyxFQUNuQixTQUFTLENBQUMsSUFBSTtnQkFDWixDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUM7Z0JBQzNELENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUN6RCxDQUFDO1NBQ0g7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0YsQ0FBQSJ9