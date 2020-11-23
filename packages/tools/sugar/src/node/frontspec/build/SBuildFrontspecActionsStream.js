"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStream_1 = __importDefault(require("../../stream/SActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFsOutputStreamAction_1 = __importDefault(require("../../stream/actions/SFsOutputStreamAction"));
const SBuildFrontspecInterface_1 = __importDefault(require("./interface/SBuildFrontspecInterface"));
const SBuildFrontspecStreamAction_1 = __importDefault(require("./actions/SBuildFrontspecStreamAction"));
/**
 * @name            SBuildFrontspecActionsStream
 * @namespace           sugar.node.build.frontspec
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily frontspec files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * import SBuildFrontspecActionsStream from '@coffeekraken/sugar/node/build/frontspec/SBuildFrontspecActionsStream';
 * const myStream = new SBuildFrontspecActionsStream();
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
class SBuildFrontspecActionsStream extends SActionsStream_1.default {
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
            buildFrontspec: SBuildFrontspecStreamAction_1.default,
            fsOutput: SFsOutputStreamAction_1.default
        }, deepMerge_1.default({
            id: 'SBuildFrontspecActionsStream',
            name: 'Build Frontspec.json Actions Stream',
            afterActions: {},
            beforeActions: {}
        }, settings));
    }
}
exports.default = SBuildFrontspecActionsStream;
SBuildFrontspecActionsStream.interface = SBuildFrontspecInterface_1.default;
