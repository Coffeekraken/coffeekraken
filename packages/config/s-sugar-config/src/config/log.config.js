// TODO: doc
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
             * @name        types
             * @namespace     config.log
             * @type        String[]
             * @values      false,info,warning,error,verbose
             * @default      ['info','warning','error']
             *
             * Set the log types you want for your app.
             * - false: No log at all
             * - info: Default logs
             * - warning: Display the warnings
             * - error: Display the errors
             * - verbose: Detailed logs
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            types: ['info', 'warning', 'error'],
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7Ozs7Ozs7Ozs7O0lBSVosbUJBQXlCLEdBQUcsRUFBRSxNQUFNO1FBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTztRQUVwQyxPQUFPO1lBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFnQkc7WUFDSCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQztTQUN0QyxDQUFDO0lBQ04sQ0FBQztJQXZCRCw0QkF1QkMifQ==