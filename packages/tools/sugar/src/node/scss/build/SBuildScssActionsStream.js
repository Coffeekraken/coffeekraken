"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStream_1 = __importDefault(require("../../stream/SActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const filename_1 = __importDefault(require("../../fs/filename"));
const SFsOutputStreamAction_1 = __importDefault(require("../../stream/actions/SFsOutputStreamAction"));
const SRenderScssStreamAction_1 = __importDefault(require("./actions/SRenderScssStreamAction"));
const SFsFilesResolverStreamAction_1 = __importDefault(require("../../stream/actions/SFsFilesResolverStreamAction"));
const path_1 = __importDefault(require("path"));
const SBuildScssInterface_1 = __importDefault(require("./interface/SBuildScssInterface"));
/**
 * @name            SBuildScssActionsStream
 * @namespace           sugar.node.build.scss
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
 * import SBuildScssActionsStream from '@coffeekraken/sugar/node/build/SBuildScssActionsStream';
 * const myStream = new SBuildScssActionsStream();
 * myStream.start({
 *    input: '...',
 *    outputDir: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildScssActionsStream extends SActionsStream_1.default {
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
            render: SRenderScssStreamAction_1.default,
            fsOutput: SFsOutputStreamAction_1.default
        }, deepMerge_1.default({
            id: 'SBuildScssActionsStream',
            name: 'Build SCSS Actions Stream',
            before: (streamObj) => {
                return streamObj;
            },
            afterActions: {
                filesResolver: (streamObj) => {
                    streamObj.filename = filename_1.default(streamObj.input);
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
                ? streamObj.filename.replace('.scss', '.prod.css')
                : streamObj.filename.replace('.scss', '.css'));
        }
        if (streamObj.outputDir && streamObj.filename && streamObj.sourcemapData) {
            streamObj.outputStack.sourcemapData = path_1.default.resolve(streamObj.outputDir, streamObj.prod
                ? streamObj.filename.replace('.css', '.prod.css.map')
                : streamObj.filename.replace('.css', '.css.map'));
        }
        return streamObj;
    }
}
exports.default = SBuildScssActionsStream;
SBuildScssActionsStream.interface = SBuildScssInterface_1.default;
