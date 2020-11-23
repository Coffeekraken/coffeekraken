"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStream_1 = __importDefault(require("../../stream/SActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const filename_1 = __importDefault(require("../../fs/filename"));
const SFsFilesResolverStreamAction_1 = __importDefault(require("../../stream/actions/SFsFilesResolverStreamAction"));
const SFsOutputStreamAction_1 = __importDefault(require("../../stream/actions/SFsOutputStreamAction"));
const SCompileJsStreamAction_1 = __importDefault(require("./actions/SCompileJsStreamAction"));
const path_1 = __importDefault(require("path"));
/**
 * @name            SBuildJsActionsStream
 * @namespace           sugar.node.build.js
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
 * import SBuildJsActionsStream from '@coffeekraken/sugar/node/build/SBuildJsActionsStream';
 * const myStream = new SBuildJsActionsStream();
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
class SBuildJsActionsStream extends SActionsStream_1.default {
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
}
exports.default = SBuildJsActionsStream;
