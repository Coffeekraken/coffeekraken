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
    return extension;
});
