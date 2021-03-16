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
/**
 * @name            SFsCacheStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              wip
 *
 * This action allows you to make profit of the filesystem cache.
 * You can specify which streamObj property will be the cache id as well as
 * in which condition you want to bypass the cached value.
 * By default the cached value will be regenerated if the "input" property is a file and that this file has been saved after the cached value.
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsCacheStreamAction extends SActionsStreamAction_1.default {
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
}
exports.default = SFsCacheStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFsCacheStreamAction.interfaces = {
    this: SFsCacheStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzQ2FjaGVTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9zdHJlYW0vYWN0aW9ucy9TRnNDYWNoZVN0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFDN0QseUVBQW1EO0FBQ25ELDRDQUFzQjtBQUN0QiwyRUFBcUQ7QUFDckQsdUVBQWlEO0FBQ2pELDBEQUFvQztBQUNwQywyRUFBcUQ7QUFDckQsd0VBQWtEO0FBRWxELE1BQU0sNkJBQThCLFNBQVEsb0JBQVk7O0FBQy9DLHdDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxHQUFHLHFCQUFhLEVBQUUsOEJBQThCO0tBQzFEO0NBQ0YsQ0FBQztBQUdKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFxQixvQkFBcUIsU0FBUSw4QkFBc0I7SUFjdEU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLDhCQUE4QjtZQUNsQyxVQUFVLEVBQUUsT0FBTztTQUNwQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUztRQUN0QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDOUQsd0NBQXdDO1lBQ3hDLHVCQUFl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