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
const writeFile_1 = __importDefault(require("../../fs/writeFile"));
const toString_1 = __importDefault(require("../../string/toString"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const get_1 = __importDefault(require("../../object/get"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsOutputStreamActionInterface extends SInterface_1.default {
}
SFsOutputStreamActionInterface.definition = {
    outputStack: {
        type: 'Object',
        required: false
    }
};
module.exports = (_a = class SFsOutputStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.fs.output'
            }, settings));
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
        run(streamObj, settings = this._settings) {
            return super.run(streamObj, ({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                if (!streamObj.outputStack || typeof streamObj.outputStack !== 'object') {
                    this.warn(`The streamObj does not contain any "<cyan>outputStack</cyan>" property so no file will be saved at all...`);
                    return resolve(streamObj);
                }
                // loop on the files to save
                const outputStackKeys = Object.keys(streamObj.outputStack);
                for (let i = 0; i < outputStackKeys.length; i++) {
                    const key = outputStackKeys[i];
                    const outputPath = streamObj.outputStack[key];
                    const readableOutputPath = outputPath.replace(packageRoot_1.default(process.cwd()), '');
                    if (!get_1.default(streamObj, key))
                        continue;
                    yield writeFile_1.default(outputPath, toString_1.default(get_1.default(streamObj, key), {
                        beautify: true
                    }));
                }
                resolve(streamObj);
            }));
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
        this: SFsOutputStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzT3V0cHV0U3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZzT3V0cHV0U3RyZWFtQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG1GQUE2RDtBQUM3RCxtRUFBNkM7QUFDN0MscUVBQStDO0FBQy9DLHlFQUFtRDtBQUNuRCx1RUFBaUQ7QUFDakQsMkRBQXFDO0FBQ3JDLHdFQUFrRDtBQUVsRCxNQUFNLDhCQUErQixTQUFRLG9CQUFZOztBQUNoRCx5Q0FBVSxHQUFHO0lBQ2xCLFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLEtBQUs7S0FDaEI7Q0FDRixDQUFDO0FBcUJKLHVCQUFTLE1BQU0scUJBQXNCLFNBQVEsOEJBQXNCO1FBY2pFOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxFQUFFLEVBQUUsK0JBQStCO2FBQ3BDLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTO1lBQ3RDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUksT0FBTyxTQUFTLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtvQkFDdkUsSUFBSSxDQUFDLElBQUksQ0FDUCwyR0FBMkcsQ0FDNUcsQ0FBQztvQkFDRixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDM0I7Z0JBRUQsNEJBQTRCO2dCQUM1QixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFM0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQy9DLE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUMzQyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUM1QixFQUFFLENBQ0gsQ0FBQztvQkFDRixJQUFJLENBQUMsYUFBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7d0JBQUUsU0FBUztvQkFDckMsTUFBTSxtQkFBVyxDQUNmLFVBQVUsRUFDVixrQkFBVSxDQUFDLGFBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQ2hDLFFBQVEsRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FDSCxDQUFDO2lCQUNIO2dCQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBekVDOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSw4QkFBOEI7S0FDcEM7UUE4REYifQ==