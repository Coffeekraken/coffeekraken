// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SWatch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SWatch_1 = __importDefault(require("./SWatch"));
    /**
     * @name                      watch
     * @namespace           sugar.js.object
     * @type                      Function
     * @status              wip
     *
     * This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays
     *
     * @param       {Object|Array}        target          The array or object to watch
     * @param       {Object}          [settings={}]       A settings object to configure your watch process. Check the SWatch class documentation for more.
     * @return      {Object}                              Return the proxied object on which you can make all the updates that you want
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import watch from '@coffeekraken/sugar/js/object/watch';
     * let myObj = watch({
     *    hello: 'world'
     * }).on('*', watchResult => {
     *    // do something...
     * });
     * myObj.hello = 'plop';
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function watch(target, settings = {}) {
        const watchedObj = new SWatch_1.default(target, settings);
        return watchedObj;
    }
    exports.default = watch;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzREFBZ0M7SUFHaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGdCQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxrQkFBZSxLQUFLLENBQUMifQ==