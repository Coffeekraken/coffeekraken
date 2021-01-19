"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SClass_1 = __importDefault(require("../../class/SClass"));
const SEventEmitter_1 = __importDefault(require("../../event/SEventEmitter"));
/**
 * @name          SProcessStdio
 * @namespace     sugar.node.process
 * @type          Class
 * @wip
 *
 * This class represent the base one for all the process "Stdio"
 * compatible setting.
 *
 * @param     {ISProcessStdioCtorSettings}     [settings={}]       Some settings to configure your Stdio
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SProcessStdio from '@coffeekraken/sugar/node/process/SProcessStdio';
 * class MyCoolProcessStdio extends SProcessStdio {
 *    constructor(mySource, settings = {}) {
 *      super(source, settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessStdio extends SClass_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(source, settings = {}) {
        super(deepMerge_1.default({
            processStdio: {}
        }, settings));
        this._sources = Array.isArray(source) ? source : [source];
        this.expose(new SEventEmitter_1.default({
            id: this.id
        }), {
            as: 'eventEmitter',
            props: ['on', 'off', 'emit']
        });
    }
}
exports.default = SProcessStdio;
//# sourceMappingURL=SProcessStdio.js.map