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
const glob_1 = __importDefault(require("glob"));
const clone_1 = __importDefault(require("../../object/clone"));
const filename_1 = __importDefault(require("../../fs/filename"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SGlobResolverStreamActionInterface extends SInterface_1.default {
}
SGlobResolverStreamActionInterface.definition = {
    globProperty: {
        type: 'String',
        required: true
    }
};
module.exports = (_a = class SGlobResolverStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.globResolver'
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
            return super.run(streamObj, ({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
                // resolve glob pattern
                const rootDir = streamObj[streamObj.globProperty];
                const files = glob_1.default.sync(streamObj[streamObj.globProperty]);
                // build the streamObj stack
                const streamObjArray = [];
                // loop on each files founded
                files.forEach((filePath) => {
                    const newStreamObj = clone_1.default(streamObj);
                    newStreamObj[streamObj.globProperty] = filePath;
                    let cleanedRootDir = rootDir;
                    cleanedRootDir = cleanedRootDir.replace(filename_1.default(cleanedRootDir), '');
                    cleanedRootDir = cleanedRootDir
                        .replace(/\[.*\]/gm, '')
                        .replace(/\*{1,2}/gm, '')
                        .replace(/\(.*\)/gm, '')
                        .replace(/(\?|!|\+|@)/gm, '');
                    cleanedRootDir = cleanedRootDir.replace(/\/+$/, '');
                    let outputFilePath = filePath
                        .replace(cleanedRootDir, '')
                        .replace(filename_1.default(filePath), '');
                    if (outputFilePath.slice(0, 1) === '/')
                        outputFilePath = outputFilePath.slice(1);
                    newStreamObj.outputDir = newStreamObj.outputDir + '/' + outputFilePath;
                    if (newStreamObj.outputDir.slice(-1) === '/')
                        newStreamObj.outputDir = newStreamObj.outputDir.slice(0, -1);
                    delete newStreamObj.globProperty;
                    streamObjArray.push(newStreamObj);
                });
                resolve(streamObjArray);
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
        this: SGlobResolverStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dsb2JSZXNvbHZlclN0cmVhbUFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNHbG9iUmVzb2x2ZXJTdHJlYW1BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsbUZBQTZEO0FBQzdELGdEQUEwQjtBQUMxQiwrREFBeUM7QUFFekMsaUVBQThDO0FBQzlDLHVFQUFpRDtBQUNqRCx3RUFBa0Q7QUFFbEQsTUFBTSxrQ0FBbUMsU0FBUSxvQkFBWTs7QUFDcEQsNkNBQVUsR0FBRztJQUNsQixZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBdUJKLHVCQUFTLE1BQU0seUJBQTBCLFNBQVEsOEJBQXNCO1FBY3JFOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxFQUFFLEVBQUUsa0NBQWtDO2FBQ3ZDLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTO1lBQ3RDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN4RCx1QkFBdUI7Z0JBQ3ZCLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sS0FBSyxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUU3RCw0QkFBNEI7Z0JBQzVCLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFFMUIsNkJBQTZCO2dCQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ3pCLE1BQU0sWUFBWSxHQUFHLGVBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFeEMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUM7b0JBRWhELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQztvQkFDN0IsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQ3JDLGtCQUFhLENBQUMsY0FBYyxDQUFDLEVBQzdCLEVBQUUsQ0FDSCxDQUFDO29CQUNGLGNBQWMsR0FBRyxjQUFjO3lCQUM1QixPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQzt5QkFDdkIsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7eUJBQ3hCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO3lCQUN2QixPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNoQyxjQUFjLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRXBELElBQUksY0FBYyxHQUFHLFFBQVE7eUJBQzFCLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO3lCQUMzQixPQUFPLENBQUMsa0JBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO3dCQUNwQyxjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFM0MsWUFBWSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxjQUFjLENBQUM7b0JBQ3ZFLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO3dCQUMxQyxZQUFZLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUUvRCxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7b0JBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2dCQUVILE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBdEZDOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSxrQ0FBa0M7S0FDeEM7UUEyRUYifQ==