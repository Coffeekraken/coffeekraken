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
    function default_1(env) {
        // if (env.platform !== 'node') return;
        return {
            /**
             * @name            input
             * @namespace       config.favicon
             * @type            String
             * @default         [config.storage.src.rootDir]/favicon/favicon.png
             *
             * Specify where the favicon source file is stored
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            input: '[config.storage.src.rootDir]/favicon/favicon.png',
            /**
             * @name            outDir
             * @namespace       config.favicon
             * @type            String
             * @default         [config.storage.dist.rootDir]/favicon
             *
             * Specify where the favicon output files have to be stored
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outDir: '[config.storage.dist.rootDir]/favicon',
            /**
             * @name            settings
             * @namespace       config.favicon
             * @type            String
             * @default         {}
             *
             * Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            settings: {}
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2aWNvbkJ1aWxkZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmF2aWNvbkJ1aWxkZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBS0EsbUJBQXlCLEdBQUc7UUFDeEIsdUNBQXVDO1FBRXZDLE9BQU87WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLGtEQUFrRDtZQUV6RDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLHVDQUF1QztZQUUvQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO0lBQ04sQ0FBQztJQTNDRCw0QkEyQ0MifQ==