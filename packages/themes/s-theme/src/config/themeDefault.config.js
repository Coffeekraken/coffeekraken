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
        return {
            /**
             * @name          themeName
             * @namespace     config.themeDefault
             * @type          Number
             * @default      default
             *
             * Specify the default theme name
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            themeName: 'default',
            variants: {
                /**
                 * @name          light
                 * @namespace     config.themeDefault.variants
                 * @type          Object
                 * @default      [config.themeDefaultLight]
                 *
                 * Specify the default theme light variant
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                light: '[config.themeDefaultLight]',
                /**
                 * @name          dark
                 * @namespace     config.themeDefault.variants
                 * @type          Object
                 * @default      [config.themeDefaultDark]
                 *
                 * Specify the default theme dark variant
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                dark: '[config.themeDefaultDark]',
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEZWZhdWx0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lRGVmYXVsdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsT0FBTztZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFTLEVBQUUsU0FBUztZQUNwQixRQUFRLEVBQUU7Z0JBQ047Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLDRCQUE0QjtnQkFDbkM7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLDJCQUEyQjthQUNwQztTQUNKLENBQUM7SUFDTixDQUFDO0lBekNELDRCQXlDQyJ9