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
     * @name                autoPrefix
     * @namespace           js.css
     * @type                Function
     *
     * Prefix your passed css style
     *
     * @param         {String}            style             The style you want to prefix in string format
     * @param         {String}            [return=null]     You can tell what you want back between "string" and "object". By default it will return the same style type that you have passed
     * @return        {String}                              The prefixed style
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function autoPrefix(style) {
        var styleObj = typeof style === 'object' ? style : {};
        var prefixedStyleObj = {};
        // check the passed param
        if (typeof style === 'string') {
            // styleObj = css.parse(style);
            // styleObj = parse(style);
        }
        parseCss(style);
        // __set(styleObj, 'stylesheet.rules.0.selectors.0', 'yououououou');
        // deepMap(styleObj, (value, name, path) => {
        //   if (name === 'value') {
        //     // __set(styleObj, path, 'hello');
        //     // __set(styleObj, path, css.parse(value));
        //     // __set(styleObj, path, css.parse(`
        //     // .sel { ${value} } `));
        //   }
        //
        // });
        // // prefixing the object
        // prefixedStyleObj = prefix(styleObj);
        return '';
    }
    exports.default = autoPrefix;
    function parseCss(css) {
        // const reg = /[\s\S]+\{[\s\S]+\}$/gm;
        var reg = /(\/\*\@-.*?)(?=\/\*\@-|\z)/gm;
        console.log(reg.exec(css));
    }
    function deepMap(object, handler, path) {
        if (path === void 0) { path = ''; }
        if (Array.isArray(object)) {
            object.forEach(function (item, i) {
                var newPath = path === '' ? "" + i : path + "." + i;
                deepMap(item, handler, newPath);
            });
        }
        else if (typeof object === 'object') {
            Object.keys(object).forEach(function (itemName) {
                var itemValue = object[itemName];
                var newPath = path === '' ? "" + itemName : path + "." + itemName;
                deepMap(itemValue, handler, newPath);
            });
        }
        else {
            handler(object, path.split('.').pop(), path);
        }
    }
});
//# sourceMappingURL=autoPrefix.js.map