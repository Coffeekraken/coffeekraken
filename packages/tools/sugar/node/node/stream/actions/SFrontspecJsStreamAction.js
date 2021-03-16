"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
const SFrontspec_1 = __importDefault(require("../../doc/SFrontspec"));
class SFrontspecJsStreamActionInterface extends SInterface_1.default {
}
SFrontspecJsStreamActionInterface.definition = {
    frontspec: {
        type: 'Boolean|Object'
    }
};
/**
 * @name            SFrontspecJsStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              wip
 *
 * This action take care of integrating the previous finded "frontspec.json" files
 * into the actual codebase handled by this stream action.
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecJsStreamAction extends SActionsStreamAction_1.default {
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
            id: 'SFrontspecJsStreamAction'
        }, settings));
        this.constructor.definition = {
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
        return super.run(streamObj, ({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            if (!streamObj.frontspec)
                return resolve(streamObj);
            const frontspec = new SFrontspec_1.default();
            const promise = frontspec.json();
            promise.catch((e) => {
                reject(e);
            });
            const res = yield promise;
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
            streamObj[settings.sourceProp] = `
        ${codeString}
        ${streamObj[settings.sourceProp]}
      `;
            resolve(streamObj);
        }));
    }
    _processFrontspecObj(frontspecObj) {
        let frontspecCodeString = '';
        if (!frontspecObj.src || !frontspecObj.src.js)
            return frontspecCodeString;
        Object.keys(frontspecObj.src.js).forEach((name) => {
            const jsObj = frontspecObj.src.js[name];
            if (!jsObj.path && !jsObj.code) {
                return reject(`Sorry but the "<yellow>src.js.${name}</yellow>" frontspec object does not contain any "<cyan>path</cyan>" or "<cyan>code</cyan>" properties...`);
            }
            else if (!jsObj.path && jsObj.code && jsObj.includes('[path]')) {
                return reject(`Sorry but the "<yellow>src.js.${name}</yellow>" frontspec object does contain a "<cyan>code</cyan>" property that include some "<magenta>[path]</magenta>" token(s) but it does not contain the "<cyan>path</cyan>" required property...`);
            }
            let codeString = jsObj.code || '';
            if (jsObj.path) {
                codeString = codeString.replace('[path]', jsObj.path);
            }
            if (codeString === '' &&
                jsObj.path &&
                path !== 'frontspec.json' &&
                frontspecObj.package) {
                codeString = `import ${frontspecObj.package.name}/${jsObj.path};`;
            }
            frontspecCodeString += `
            ${codeString}
          `;
        });
        return frontspecCodeString;
    }
}
exports.default = SFrontspecJsStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFrontspecJsStreamAction.interfaces = {
    this: SFrontspecJsStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY0pzU3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvc3RyZWFtL2FjdGlvbnMvU0Zyb250c3BlY0pzU3RyZWFtQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG1GQUE2RDtBQUM3RCx1RUFBaUQ7QUFDakQsd0VBQWtEO0FBQ2xELHNFQUFnRDtBQUVoRCxNQUFNLGlDQUFrQyxTQUFRLG9CQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2xCLFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxnQkFBZ0I7S0FDdkI7Q0FDRixDQUFDO0FBR0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFxQix3QkFBeUIsU0FBUSw4QkFBc0I7SUFjMUU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLE1BQU07WUFDbEIsRUFBRSxFQUFFLDBCQUEwQjtTQUMvQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRztZQUM1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzNCLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRO1FBQ3JCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztnQkFBRSxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVwRCxNQUFN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