"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
const folderPath_1 = __importDefault(require("../fs/folderPath"));
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
const uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
class STsconfigFile extends s_file_1.default {
    /**
     * @name          tsconfigFileSettings
     * @type          ISTsconfigFileSettings
     * @get
     *
     * Access the tsconfigFile settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get tsconfigFileSettings() {
        return this._settings.tsconfigFile;
    }
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(pathOrStack, settings) {
        let path = pathOrStack;
        // check if the passed path is a stack name
        const stacks = sugar_1.default('ts.stacks');
        if (stacks[pathOrStack])
            path = stacks[pathOrStack];
        super(path, deepMerge_1.default({
            file: {
                processors: {
                    content: [
                        (content) => {
                            if (this.tsconfigFileSettings.clean) {
                                Object.keys(content).forEach((prop) => {
                                    if (prop.match(/^_/))
                                        delete content[prop];
                                });
                            }
                            return content;
                        }
                    ]
                }
            },
            tsconfigFile: {
                clean: true
            }
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name          convertToJson
     * @type          Function
     * @async
     *
     * This method simply check if the file is a json already.
     * If not, it will rename the file and cast the content to a proper json one.
     *
     * @return        {Promise}                 A promise resolved once the file has been correctly converted
     *
     * @since             2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    convertToJson(to) {
        return new Promise((resolve, reject) => {
            const newFile = this.convertToJsonSync(to);
            resolve(newFile);
        });
    }
    /**
     * @name          convertToJsonSync
     * @type          Function
     *
     * This method simply check if the file is a json already.
     * If not, it will rename the file and cast the content to a proper json one.
     *
     * @return        {Promise}                 A promise resolved once the file has been correctly converted
     *
     * @since             2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    convertToJsonSync(to) {
        // check if this file is already a json one
        if (this.extension === 'json')
            return this;
        let destination = to;
        if (!to) {
            destination = replacePathTokens_1.default(`%tmpDir/files/${this.constructor.name}/${this.nameWithoutExt}.${uniqid_1.default()}.json`);
            onProcessExit_1.default(() => {
                try {
                    fs_1.default.unlinkSync(destination);
                }
                catch (e) { }
            });
        }
        destination = path_1.default.resolve(destination);
        // get the content
        let content = this.content;
        if (typeof content !== 'string') {
            try {
                content = JSON.stringify(content, null, 4);
            }
            catch (e) { }
        }
        // ensure folder exists
        ensureDirSync_1.default(folderPath_1.default(destination));
        // write new file
        fs_1.default.writeFileSync(destination, content);
        // return the new file instance
        // @ts-ignore
        return new this.constructor(destination, this._settings);
    }
}
exports.default = STsconfigFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzY29uZmlnRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc2NvbmZpZ0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMkM7QUFDM0MsOEVBQXdEO0FBQ3hELHNFQUFzRDtBQUN0RCw2RUFBdUQ7QUFDdkQsa0VBQTRDO0FBQzVDLHdFQUFrRDtBQUNsRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGtGQUE0RDtBQUM1RCx3RUFBa0Q7QUEwQmxELE1BQXFCLGFBQWMsU0FBUSxnQkFBTztJQUNoRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLG9CQUFvQjtRQUN0QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFdBQW1CLEVBQUUsUUFBcUM7UUFDcEUsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBRXZCLDJDQUEyQztRQUMzQyxNQUFNLE1BQU0sR0FBRyxlQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwRCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxJQUFJLEVBQUU7Z0JBQ0osVUFBVSxFQUFFO29CQUNWLE9BQU8sRUFBRTt3QkFDUCxDQUFDLE9BQU8sRUFBRSxFQUFFOzRCQUNWLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRTtnQ0FDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQ0FDcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3Q0FBRSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDN0MsQ0FBQyxDQUFDLENBQUM7NkJBQ0o7NEJBQ0QsT0FBTyxPQUFPLENBQUM7d0JBQ2pCLENBQUM7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELFlBQVksRUFBRTtnQkFDWixLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILGFBQWEsQ0FBQyxFQUFHO1FBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsaUJBQWlCLENBQUMsRUFBRztRQUNuQiwyQ0FBMkM7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQztRQUUzQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLFdBQVcsR0FBRywyQkFBbUIsQ0FDL0IsaUJBQWlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUNwQyxJQUFJLENBQUMsY0FDUCxJQUFJLGdCQUFRLEVBQUUsT0FBTyxDQUN0QixDQUFDO1lBQ0YsdUJBQWUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ25CLElBQUk7b0JBQ0YsWUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDOUI7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsV0FBVyxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFMUMsa0JBQWtCO1FBQ2xCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSTtnQkFDRixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtTQUNmO1FBRUQsdUJBQXVCO1FBQ3ZCLHVCQUFlLENBQUMsb0JBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTNDLGlCQUFpQjtRQUNqQixZQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBVSxPQUFPLENBQUMsQ0FBQztRQUVqRCwrQkFBK0I7UUFDL0IsYUFBYTtRQUNiLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGO0FBaElELGdDQWdJQyJ9