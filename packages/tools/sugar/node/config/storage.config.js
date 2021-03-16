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
    tmpDir: `[config.storage.localDir]/temp`,
    /**
     * @name            nodeModulesDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.rootDir]/node_modules
     *
     * Configure where is located the "node_modules" folder
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    nodeModulesDir: `[config.storage.rootDir]/node_modules`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL3N0b3JhZ2UuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkVBQXFEO0FBRXJELGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSxHQUFHLHFCQUFhLEVBQUUsRUFBRTtJQUU3Qjs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLGlDQUFpQztJQUUzQzs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxFQUFFLDhCQUE4QjtJQUV0Qzs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFLCtCQUErQjtJQUV4Qzs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLGlDQUFpQztJQUUzQzs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxFQUFFLGdDQUFnQztJQUV4Qzs7Ozs7Ozs7OztPQVVHO0lBQ0gsY0FBYyxFQUFFLHVDQUF1QztDQUN4RCxDQUFDIn0=