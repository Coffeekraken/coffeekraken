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
var _a;
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
module.exports = (_a = class SFrontspecScssStreamAction extends SActionsStreamAction_1.default {
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
    },
    /**
     * @name            interface
     * @type             Object
     * @static
     *
     * Store the definition object that specify the streamObj required properties, types, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interfaces = {
        this: SFrontspecScssStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY1Njc3NTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzcGVjU2Nzc1N0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFDN0QsdUVBQWlEO0FBQ2pELHdFQUFrRDtBQUNsRCxzRUFBZ0Q7QUFFaEQsTUFBTSxtQ0FBb0MsU0FBUSxvQkFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNsQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsZ0JBQWdCO0tBQ3ZCO0NBQ0YsQ0FBQztBQXVCSix1QkFBUyxNQUFNLDBCQUEyQixTQUFRLDhCQUFzQjtRQWN0RTs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7Z0JBQ0UsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLEVBQUUsRUFBRSw0QkFBNEI7YUFDakMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUc7Z0JBQzVCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDM0IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2Y7YUFDRixDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7b0JBQUUsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRXBELE1BQU0sU0FBUyxHQUFHLElBQUksb0JBQVksRUFBRSxDQUFDO2dCQUNyQyxNQUFNLE9BQU8s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