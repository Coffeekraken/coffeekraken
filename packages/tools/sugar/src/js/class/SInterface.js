// @ts-nocheck
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
    var _a;
    return (_a = /** @class */ (function () {
            function SInterface() {
            }
            return SInterface;
        }()),
        /**
         * @name              settings
         * @type              Object
         * @static
         *
         * Store the default settings that will be passed to the ```apply``` function
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _a.settings = {
            throw: true,
            return: 'String'
        },
        _a);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBMENkO1lBQVM7WUFpY1QsQ0FBQztZQUFELGlCQUFDO1FBQUQsQ0FBQyxBQWpjUTtRQUNQOzs7Ozs7Ozs7V0FTRztRQUNJLFdBQVEsR0FBRztZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxRQUFRO1NBQ2hCO1lBbWJGIn0=