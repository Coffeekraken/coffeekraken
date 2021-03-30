"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const filename_1 = __importDefault(require("../fs/filename"));
const SJsFile_1 = __importDefault(require("../js/SJsFile"));
// @ts-ignore
class STsFile extends SJsFile_1.default {
    // static interfaces = {
    //   compilerParams: {
    //     apply: false,
    //     class: __STsCompilerParamsInterface
    //   },
    //   this: {
    //     apply: true,
    //     class: __STsFileInterface
    //   }
    // };
    /**
     * @name      tsFileSettings
     * @type      ISTsFileSettings
     * @get
     *
     * Access the tsFile settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get tsFileSettings() {
        return this._settings.tsFile;
    }
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(path, settings = {}) {
        super(path, deepMerge_1.default({
            id: filename_1.default(path),
            tsFile: {}
        }, settings));
    }
}
exports.default = STsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBd0Q7QUFDeEQsOERBQTJDO0FBRTNDLDREQUFtRTtBQXNDbkUsYUFBYTtBQUNiLE1BQU0sT0FBUSxTQUFRLGlCQUFTO0lBQzdCLHdCQUF3QjtJQUN4QixzQkFBc0I7SUFDdEIsb0JBQW9CO0lBQ3BCLDBDQUEwQztJQUMxQyxPQUFPO0lBQ1AsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixnQ0FBZ0M7SUFDaEMsTUFBTTtJQUNOLEtBQUs7SUFFTDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGNBQWM7UUFDaEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBaUMsRUFBRTtRQUMzRCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsTUFBTSxFQUFFLEVBQUU7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxPQUFPLENBQUMifQ==