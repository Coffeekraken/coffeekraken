// @ts-nocheck
// @shared
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
     * @name                    extension
     * @namespace           sugar.js.file
     * @type                    Function
     * @stable
     *
     * Return the passed file path extension
     *
     * @param           {String}            path                The file path to get the extension from
     * @return          {String}                                The file extension
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import extension from '@coffeekraken/sugar/js/file/extension';
     * extension('hello/world.jpg'); // => jpg
     *
     * @since           2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function extension(path) {
        var lastPart = path.split('/').pop();
        if (!lastPart.includes('.'))
            return '';
        return path.split('.').pop();
    }
    exports.default = extension;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtRQUNyQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=