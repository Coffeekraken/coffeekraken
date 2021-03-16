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
/**
 * @name            SGlobResolverStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              wip
 *
 * This class is a stream action that allows you resolve glob pattern by specifying the streamObj property that
 * is one. It will then return an array of streamObj handled normally by the SActionsStream instance
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SGlobResolverStreamAction extends SActionsStreamAction_1.default {
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
}
exports.default = SGlobResolverStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SGlobResolverStreamAction.interfaces = {
    this: SGlobResolverStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dsb2JSZXNvbHZlclN0cmVhbUFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL3N0cmVhbS9hY3Rpb25zL1NHbG9iUmVzb2x2ZXJTdHJlYW1BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsbUZBQTZEO0FBQzdELGdEQUEwQjtBQUMxQiwrREFBeUM7QUFFekMsaUVBQThDO0FBQzlDLHVFQUFpRDtBQUNqRCx3RUFBa0Q7QUFFbEQsTUFBTSxrQ0FBbUMsU0FBUSxvQkFBWTs7QUFDcEQsNkNBQVUsR0FBRztJQUNsQixZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBR0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFxQix5QkFBMEIsU0FBUSw4QkFBc0I7SUFjM0U7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtDQUFrQztTQUN2QyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUztRQUN0QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN4RCx1QkFBdUI7WUFDdkIsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRCxNQUFNLEtBQUssR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUU3RCw0QkFBNEI7WUFDNUIsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBRTFCLDZCQUE2QjtZQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3pCLE1BQU0sWUFBWSxHQUFHLGVBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFeEMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUM7Z0JBRWhELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQztnQkFDN0IsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQ3JDLGtCQUFhLENBQUMsY0FBYyxDQUFDLEVBQzdCLEVBQUUsQ0FDSCxDQUFDO2dCQUNGLGNBQWMsR0FBRyxjQUFjO3FCQUM1QixPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztxQkFDdkIsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7cUJBQ3hCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO3FCQUN2QixPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxjQUFjLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXBELElBQUksY0FBYyxHQUFHLFFBQVE7cUJBQzFCLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO3FCQUMzQixPQUFPLENBQUMsa0JBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO29CQUNwQyxjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFM0MsWUFBWSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxjQUFjLENBQUM7Z0JBQ3ZFLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO29CQUMxQyxZQUFZLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUvRCxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0JBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBdEZILDRDQXVGQztBQXRGQzs7Ozs7Ozs7R0FRRztBQUNJLG9DQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLGtDQUFrQztDQUN6QyxDQUFDIn0=