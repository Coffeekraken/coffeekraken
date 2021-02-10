"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../node/path/packageRoot"));
exports.default = {
    /**
     * @name            rootDir
     * @namespace       config.storage
     * @type            String
     * @default         ${__packageRoot()}
     *
     * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: `${packageRoot_1.default()}`,
    /**
     * @name            localDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.rootDir]/.local
     *
     * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    localDir: `[config.storage.rootDir]/.local`,
    /**
     * @name            srcDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.rootDir]/src
     *
     * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    srcDir: `[config.storage.rootDir]/src`,
    /**
     * @name            distDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.rootDir]/src
     *
     * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    distDir: `[config.storage.rootDir]/dist`,
    /**
     * @name            cacheDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.localDir]/cache
     *
     * Configure where is located the "cache" folder
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cacheDir: `[config.storage.localDir]/cache`,
    /**
     * @name            tmpDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.localDir]/cache
     *
     * Configure where is located the "temp" folder
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    tmpDir: `[config.storage.localDir]/temp`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yYWdlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJFQUFxRDtBQUVyRCxrQkFBZTtJQUNiOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsR0FBRyxxQkFBYSxFQUFFLEVBQUU7SUFFN0I7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSxpQ0FBaUM7SUFFM0M7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sRUFBRSw4QkFBOEI7SUFFdEM7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSwrQkFBK0I7SUFFeEM7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSxpQ0FBaUM7SUFFM0M7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sRUFBRSxnQ0FBZ0M7Q0FDekMsQ0FBQyJ9