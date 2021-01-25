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
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const ensureDirSync_1 = __importDefault(require("../../fs/ensureDirSync"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const md5_1 = __importDefault(require("../../crypt/md5"));
const writeJsonSync_1 = __importDefault(require("../../fs/writeJsonSync"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsCacheStreamActionInterface extends SInterface_1.default {
}
SFsCacheStreamActionInterface.definition = {
    input: {
        type: 'String',
        required: true
    },
    cacheDir: {
        type: 'String',
        required: true,
        default: `${packageRoot_1.default()}/.cache/SFsCacheStreamAction`
    }
};
module.exports = (_a = class SFsCacheStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.fs.cache',
                idProperty: 'input'
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
                // make sure we have the cache directory
                ensureDirSync_1.default(streamObj.cacheDir);
                // generate the id
                const id = `${this._settings.id}-${md5_1.default.encrypt(streamObj[settings.idProperty])}`;
                // check if the output files exists or not
                let outputFilesExists = true;
                if (streamObj.outputStack) {
                    Object.keys(streamObj.outputStack).forEach((key) => {
                        const path = streamObj.outputStack[key];
                        if (!fs_1.default.existsSync(path)) {
                            outputFilesExists = false;
                        }
                    });
                }
                // cache file path
                const cacheFilePath = `${streamObj.cacheDir}/${id}.json`;
                // generate cache function
                function generateCache(streamObj) {
                    return new Promise(({ resolve, reject }) => {
                        writeJsonSync_1.default(cacheFilePath, {
                            streamObj,
                            _sugarVersion: require(`${packageRoot_1.default(__dirname)}/package.json`)
                                .version
                        });
                        resolve(streamObj);
                    });
                }
                // check if the cache file exists
                // or if the output files does not exists
                if (!fs_1.default.existsSync(cacheFilePath) || !outputFilesExists) {
                    this.registerCallback(generateCache, 'after');
                    return resolve(streamObj);
                }
                // get the timestamp of each files
                const inputStats = fs_1.default.statSync(streamObj.input);
                const cacheStats = fs_1.default.statSync(cacheFilePath);
                // check if the input file is newer that the cache one
                if (inputStats.mtimeMs > cacheStats.mtimeMs) {
                    this.registerCallback(generateCache, 'after');
                }
                else {
                    // load the cache file
                    const cacheJson = require(cacheFilePath);
                    // restore the streamObject
                    streamObj = cacheJson.streamObj;
                    // specify to the ActionStream that we need to skip all the next actions
                    emit('log', {
                        value: `#warning Skipping the next actions cause the data have been <primary>laoded from the cache</primary>...`
                    });
                    this.skipNextActions();
                }
                setTimeout(() => {
                    resolve(streamObj);
                });
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
        this: SFsCacheStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzQ2FjaGVTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnNDYWNoZVN0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFDN0QseUVBQW1EO0FBQ25ELDRDQUFzQjtBQUN0QiwyRUFBcUQ7QUFDckQsdUVBQWlEO0FBQ2pELDBEQUFvQztBQUNwQywyRUFBcUQ7QUFDckQsd0VBQWtEO0FBRWxELE1BQU0sNkJBQThCLFNBQVEsb0JBQVk7O0FBQy9DLHdDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxHQUFHLHFCQUFhLEVBQUUsOEJBQThCO0tBQzFEO0NBQ0YsQ0FBQztBQXlCSix1QkFBUyxNQUFNLG9CQUFxQixTQUFRLDhCQUFzQjtRQWNoRTs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7Z0JBQ0UsRUFBRSxFQUFFLDhCQUE4QjtnQkFDbEMsVUFBVSxFQUFFLE9BQU87YUFDcEIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDdEMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO2dCQUM5RCx3Q0FBd0M7Z0JBQ3hDLHVCQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVwQyxrQkFBa0I7Z0JBQ2xCLE1BQU0s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