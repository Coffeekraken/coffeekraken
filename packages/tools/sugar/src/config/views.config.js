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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlld3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBRzFCLGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSwrQkFBK0I7SUFFeEM7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSxpQ0FBaUM7SUFFM0M7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7V0FTRztRQUNILEtBQUssRUFBRSxjQUFNLENBQUMsT0FBTyxDQUNuQixTQUFTLEVBQ1QsK0NBQStDLENBQ2hEO0tBQ0Y7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsWUFBWSxFQUFFO1FBQ1o7Ozs7Ozs7OztXQVNHO1FBQ0gsRUFBRSxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHFDQUFxQyxDQUFDO0tBQ3JFO0NBQ0YsQ0FBQyJ9