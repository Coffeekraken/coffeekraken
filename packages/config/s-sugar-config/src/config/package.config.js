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
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            manager
             * @namespace       config.package
             * @type            String
             * @values          npm | yarn
             * @default         yarn
             *
             * Specify the package manager you want to use.
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            manager: 'yarn'
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLG1CQUF5QixHQUFHO1FBQ3hCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTztRQUVwQyxPQUFPO1lBQ0g7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxPQUFPLEVBQUUsTUFBTTtTQUNsQixDQUFDO0lBQ04sQ0FBQztJQWxCRCw0QkFrQkMifQ==