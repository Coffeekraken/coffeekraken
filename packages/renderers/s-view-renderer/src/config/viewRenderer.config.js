(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            rootDirs
             * @namespace       config.viewRenderer
             * @type            string[]
             * @default          ['[config.storage.src.rootDir]/views']
             *
             * Specify the roots views directories
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rootDirs: [`[config.storage.src.rootDir]/views`],
            /**
             * @name            cacheDir
             * @namespace       config.viewRenderer
             * @type            String
             * @default          [config.storage.package.cacheDir]
             *
             * Specify the views template rendering cache directory
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            cacheDir: `[config.storage.package.cacheDir]/views`,
            /**
             * @name          engines
             * @namespace     config.viewRenderer
             * @type          String[]
             * @default       ['@coffeekraken/s-view-renderer-engine-blade']
             *
             * Store which engines are available for this renderer
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            engines: ['@coffeekraken/s-view-renderer-engine-blade'],
            /**
              * @name          dataHandlers
              * @namespace     config.viewRenderer
              * @type          String[]
              * @default       ['@coffeekraken/s-view-renderer-data-handler-json']
              *
              * Store which data handlers are available for this renderer
              *
              * @since       2.0.0
              * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
              */
            dataHandlers: ['@coffeekraken/s-view-renderer-data-handler-js'],
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld1JlbmRlcmVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZXdSZW5kZXJlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFHQSxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBRXBDLE9BQU87WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUFFLENBQUMsb0NBQW9DLENBQUM7WUFFaEQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILFFBQVEsRUFBRSx5Q0FBeUM7WUFFbkQ7Ozs7Ozs7Ozs7ZUFVRztZQUNKLE9BQU8sRUFBRSxDQUFDLDRDQUE0QyxDQUFDO1lBRXZEOzs7Ozs7Ozs7O2dCQVVJO1lBQ0gsWUFBWSxFQUFFLENBQUMsK0NBQStDLENBQUM7U0FDbEUsQ0FBQztJQUNOLENBQUM7SUF4REQsNEJBd0RDIn0=