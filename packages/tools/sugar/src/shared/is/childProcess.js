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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name                            childProcess
     * @namespace           sugar.js.is
     * @type                            Function
     * @stable
     *
     * Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.
     *
     * @return        {Boolean}                             true if the process is running as a child process, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
     * isChildProcess(); // => false
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function childProcess() {
        var _a;
        if (!global || !global.process)
            return false;
        if (((_a = global.process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === 'test')
            return false;
        return (global.process.send !== undefined ||
            global.process.env.IS_CHILD_PROCESS ||
            global.process.ppid);
    }
    exports.default = childProcess;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGRQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hpbGRQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILFNBQVMsWUFBWTs7UUFDbkIsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLDBDQUFFLFFBQVEsTUFBSyxNQUFNO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDMUQsT0FBTyxDQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO1lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLFlBQVksQ0FBQyJ9