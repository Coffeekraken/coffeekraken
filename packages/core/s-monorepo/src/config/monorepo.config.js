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
             * @name        packagesGlobs
             * @namespace   config.monorepo
             * @type       string[]
             * @default     ['packages/* / * /package.json']
             *
             * Specify some globs to search for packages relative to the monorepo root directory
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            packagesGlobs: ['packages/*/*/package.json'],
            /**
             * @name        filesToUpgrade
             * @namespace   config.monorepo
             * @type       string[]
             * @default     ['package.json','composer.json']
             *
             * Specify some files to upgrade in each packages when doing a monorepo.upgrade call
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            filesToUpgrade: ['package.json', 'composer.json'],
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ub3JlcG8uY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9ub3JlcG8uY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO1FBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTztRQUVwQyxPQUFPO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILGFBQWEsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1lBRTVDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxjQUFjLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDO1NBQ3BELENBQUM7SUFDTixDQUFDO0lBOUJELDRCQThCQyJ9