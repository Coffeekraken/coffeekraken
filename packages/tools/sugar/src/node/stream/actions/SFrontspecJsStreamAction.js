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
class SFrontspecJsStreamActionInterface extends SInterface_1.default {
}
SFrontspecJsStreamActionInterface.definition = {
    frontspec: {
        type: 'Boolean|Object'
    }
};
module.exports = (_a = class SFrontspecJsStreamAction extends SActionsStreamAction_1.default {
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
        this: SFrontspecJsStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY0pzU3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250c3BlY0pzU3RyZWFtQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG1GQUE2RDtBQUM3RCx1RUFBaUQ7QUFDakQsd0VBQWtEO0FBQ2xELHNFQUFnRDtBQUVoRCxNQUFNLGlDQUFrQyxTQUFRLG9CQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2xCLFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxnQkFBZ0I7S0FDdkI7Q0FDRixDQUFDO0FBdUJKLHVCQUFTLE1BQU0sd0JBQXlCLFNBQVEsOEJBQXNCO1FBY3BFOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsRUFBRSxFQUFFLDBCQUEwQjthQUMvQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7WUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRztnQkFDNUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUMzQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZjthQUNGLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVE7WUFDckIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztvQkFBRSxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7Z0JBQ3JDLE1BQU0sT0FBTyxHQUFH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