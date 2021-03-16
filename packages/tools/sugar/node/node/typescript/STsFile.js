"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SJsFile_1 = __importDefault(require("../js/SJsFile"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const filename_1 = __importDefault(require("../fs/filename"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3R5cGVzY3JpcHQvU1RzRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDREQUFzQztBQUN0QyxvRUFBOEM7QUFDOUMsOERBQTJDO0FBMkMzQyxhQUFhO0FBQ2IsTUFBTSxPQUFRLFNBQVEsaUJBQVM7SUFDN0Isd0JBQXdCO0lBQ3hCLHNCQUFzQjtJQUN0QixvQkFBb0I7SUFDcEIsMENBQTBDO0lBQzFDLE9BQU87SUFDUCxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLGdDQUFnQztJQUNoQyxNQUFNO0lBQ04sS0FBSztJQUVMOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksY0FBYztRQUNoQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFpQyxFQUFFO1FBQzNELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixNQUFNLEVBQUUsRUFBRTtTQUNYLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELGtCQUFlLE9BQU8sQ0FBQyJ9