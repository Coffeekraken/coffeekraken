"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
const SFrontspec_1 = __importDefault(require("../../doc/SFrontspec"));
class SFrontspecScssStreamActionInterface extends SInterface_1.default {
}
SFrontspecScssStreamActionInterface.definitionObj = {
    frontspec: {
        type: 'Boolean|Object'
    }
};
/**
 * @name            SFrontspecScssStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This action take care of integrating the previous finded "frontspec.json" files
 * into the actual codebase handled by this stream action.
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecScssStreamAction extends SActionsStreamAction_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            sourceProp: 'data',
            id: 'SFrontspecScssStreamAction'
        }, settings));
        this.constructor.definitionObj = {
            [this._settings.sourceProp]: {
                type: 'String',
                required: true
            }
        };
    }
    /**
     * @name          run
     * @type          Function
     * @async
     *
     * Override the base class run method
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(streamObj, settings) {
        return super.run(streamObj, async (resolve, reject) => {
            if (!streamObj.frontspec)
                return resolve(streamObj);
            const frontspec = new SFrontspec_1.default();
            const promise = frontspec.json();
            promise.catch((e) => {
                reject(e);
            });
            const res = await promise;
            if (res)
                streamObj.frontspec = res;
            else
                return resolve(streamObj);
            let codeString = '';
            codeString += this._processFrontspecObj(streamObj.frontspec);
            if (streamObj.frontspec.children) {
                Object.keys(streamObj.frontspec.children).forEach((childPath) => {
                    const frontspecObj = streamObj.frontspec.children[childPath];
                    codeString += this._processFrontspecObj(frontspecObj);
                });
            }
            // prepend the resulting frontspec imports, init, etc... in the streamObj
            if (!streamObj[settings.sourceProp])
                streamObj[settings.sourceProp] = '';
            streamObj[settings.sourceProp] = `
        ${codeString}
        ${streamObj[settings.sourceProp]}
      `;
            resolve(streamObj);
        });
    }
    _processFrontspecObj(frontspecObj) {
        let frontspecCodeString = '';
        if (!frontspecObj.src || !frontspecObj.src.scss)
            return frontspecCodeString;
        Object.keys(frontspecObj.src.scss).forEach((name) => {
            const jsObj = frontspecObj.src.scss[name];
            if (!jsObj.path && !jsObj.code) {
                return reject(`Sorry but the "<yellow>src.scss.${name}</yellow>" frontspec object does not contain any "<cyan>path</cyan>" or "<cyan>code</cyan>" properties...`);
            }
            else if (!jsObj.path && jsObj.code && jsObj.includes('[path]')) {
                return reject(`Sorry but the "<yellow>src.scss.${name}</yellow>" frontspec object does contain a "<cyan>code</cyan>" property that include some "<magenta>[path]</magenta>" token(s) but it does not contain the "<cyan>path</cyan>" required property...`);
            }
            let codeString = jsObj.code || '';
            if (jsObj.path) {
                codeString = codeString.replace('[path]', jsObj.path);
            }
            if (codeString === '' &&
                jsObj.path &&
                path !== 'frontspec.json' &&
                frontspecObj.package) {
                codeString = `@import '${jsObj.path}';`;
            }
            frontspecCodeString += `
            ${codeString}
          `;
        });
        return frontspecCodeString;
    }
}
exports.default = SFrontspecScssStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFrontspecScssStreamAction.interface = SFrontspecScssStreamActionInterface;
