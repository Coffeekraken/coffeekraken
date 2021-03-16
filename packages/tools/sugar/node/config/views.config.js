"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    /**
     * @name            rootDir
     * @namespace       config.views
     * @type            String
     * @default          [config.storage.srcDir]/views
     *
     * Specify the root views directory
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: `[config.storage.srcDir]/views`,
    /**
     * @name            cacheDir
     * @namespace       config.views
     * @type            String
     * @default          [config.storage.cacheDir]
     *
     * Specify the views template rendering cache directory
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cacheDir: `[config.storage.cacheDir]/views`,
    /**
     * @name      engines
     * @namespace   config.views
     * @type      Object
     *
     * Store all the available engines when using the ```STemplate``` class.
     * You can override or add some engines here using the format "{extension}: {path}"
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    engines: {
        /**
         * @name          blade
         * @namespace     config.views.engines
         * @type          String
         *
         * Store the path where to find the blade.php template engine
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        blade: path_1.default.resolve(__dirname, '../node/template/engines/SBladeTemplateEngine')
    },
    /**
     * @name      dataHandlers
     * @namespace   config.views
     * @type      Object
     *
     * Store all the available dataHandlers when using the ```STemplate``` class.
     * You can override or add some dataHandlers here using the format "{extension}: {path}"
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    dataHandlers: {
        /**
         * @name          js
         * @namespace     config.views.dataHandlers
         * @type          String
         *
         * Store the path where to find the data.js|json data handler
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        js: path_1.default.resolve(__dirname, '../node/template/dataHandlers/js.js')
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy92aWV3cy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBMEI7QUFHMUIsa0JBQWU7SUFDYjs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFLCtCQUErQjtJQUV4Qzs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLGlDQUFpQztJQUUzQzs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFO1FBQ1A7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQ25CLFNBQVMsRUFDVCwrQ0FBK0MsQ0FDaEQ7S0FDRjtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLEVBQUU7UUFDWjs7Ozs7Ozs7O1dBU0c7UUFDSCxFQUFFLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUscUNBQXFDLENBQUM7S0FDckU7Q0FDRixDQUFDIn0=