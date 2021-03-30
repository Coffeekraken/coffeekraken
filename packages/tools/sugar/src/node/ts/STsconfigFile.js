"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SFile_1 = __importDefault(require("../fs/SFile"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
const folderPath_1 = __importDefault(require("../fs/folderPath"));
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
const uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
class STsconfigFile extends SFile_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzY29uZmlnRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc2NvbmZpZ0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBa0M7QUFDbEMsOEVBQXdEO0FBQ3hELHNFQUFzRDtBQUN0RCw2RUFBdUQ7QUFDdkQsa0VBQTRDO0FBQzVDLHdFQUFrRDtBQUNsRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGtGQUE0RDtBQUM1RCx3RUFBa0Q7QUEwQmxELE1BQXFCLGFBQWMsU0FBUSxlQUFPO0lBQ2hEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksb0JBQW9CO1FBQ3RCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBbUIsRUFBRSxRQUFxQztRQUNwRSxJQUFJLElBQUksR0FBRyxXQUFXLENBQUM7UUFFdkIsMkNBQTJDO1FBQzNDLE1BQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLElBQUksRUFBRTtnQkFDSixVQUFVLEVBQUU7b0JBQ1YsT0FBTyxFQUFFO3dCQUNQLENBQUMsT0FBTyxFQUFFLEVBQUU7NEJBQ1YsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFO2dDQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29DQUNwQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dDQUFFLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUM3QyxDQUFDLENBQUMsQ0FBQzs2QkFDSjs0QkFDRCxPQUFPLE9BQU8sQ0FBQzt3QkFDakIsQ0FBQztxQkFDRjtpQkFDRjthQUNGO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsYUFBYSxDQUFDLEVBQUc7UUFDZixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxpQkFBaUIsQ0FBQyxFQUFHO1FBQ25CLDJDQUEyQztRQUMzQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTNDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsV0FBVyxHQUFHLDJCQUFtQixDQUMvQixpQkFBaUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQ3BDLElBQUksQ0FBQyxjQUNQLElBQUksZ0JBQVEsRUFBRSxPQUFPLENBQ3RCLENBQUM7WUFDRix1QkFBZSxDQUFDLEdBQUcsRUFBRTtnQkFDbkIsSUFBSTtvQkFDRixZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUM5QjtnQkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxXQUFXLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUxQyxrQkFBa0I7UUFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixJQUFJO2dCQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDNUM7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1NBQ2Y7UUFFRCx1QkFBdUI7UUFDdkIsdUJBQWUsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFM0MsaUJBQWlCO1FBQ2pCLFlBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFVLE9BQU8sQ0FBQyxDQUFDO1FBRWpELCtCQUErQjtRQUMvQixhQUFhO1FBQ2IsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0Y7QUFoSUQsZ0NBZ0lDIn0=