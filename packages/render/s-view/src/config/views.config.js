"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    /**
     * @name            rootDirs
     * @namespace       config.views
     * @type            string[]
     * @default          ['[config.storage.srcDir]/views']
     *
     * Specify the roots views directories
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDirs: [`[config.storage.srcDir]/views`],
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
         * @name          blade.php
         * @namespace     config.views.engines
         * @type          String
         *
         * Store the path where to find the blade.php template engine
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        'blade.php': path_1.default.resolve(__dirname, '../node/engines/blade/bladeViewEngine')
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
         * @name          'js,json'
         * @namespace     config.views.dataHandlers
         * @type          String
         *
         * Store the path where to find the data.js|json data handler
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        'js,json': path_1.default.resolve(__dirname, '../node/dataHandlers/js.js')
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlld3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBRTFCLGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSxDQUFDLCtCQUErQixDQUFDO0lBRTNDOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsaUNBQWlDO0lBRTNDOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUU7UUFDUDs7Ozs7Ozs7O1dBU0c7UUFDSCxXQUFXLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FDekIsU0FBUyxFQUNULHVDQUF1QyxDQUN4QztLQUNGO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksRUFBRTtRQUNaOzs7Ozs7Ozs7V0FTRztRQUNILFNBQVMsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSw0QkFBNEIsQ0FBQztLQUNuRTtDQUNGLENBQUMifQ==