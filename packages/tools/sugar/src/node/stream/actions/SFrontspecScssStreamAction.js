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
class SFrontspecScssStreamActionInterface extends SInterface_1.default {
}
SFrontspecScssStreamActionInterface.definition = {
    frontspec: {
        type: 'Boolean|Object'
    }
};
/**
 * @name            SFrontspecScssStreamAction
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
            if (!streamObj[settings.sourceProp])
                streamObj[settings.sourceProp] = '';
            streamObj[settings.sourceProp] = `
        ${codeString}
        ${streamObj[settings.sourceProp]}
      `;
            resolve(streamObj);
        }));
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
SFrontspecScssStreamAction.interfaces = {
    this: SFrontspecScssStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY1Njc3NTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzcGVjU2Nzc1N0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFDN0QsdUVBQWlEO0FBQ2pELHdFQUFrRDtBQUNsRCxzRUFBZ0Q7QUFFaEQsTUFBTSxtQ0FBb0MsU0FBUSxvQkFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNsQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsZ0JBQWdCO0tBQ3ZCO0NBQ0YsQ0FBQztBQUdKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBcUIsMEJBQTJCLFNBQVEsOEJBQXNCO0lBYzVFOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLEVBQUUsRUFBRSw0QkFBNEI7U0FDakMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUc7WUFDNUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUTtRQUNyQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7Z0JBQUUsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7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