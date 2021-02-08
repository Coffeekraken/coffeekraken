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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1ByZWZpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9QcmVmaXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBU2Q7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsU0FBd0IsVUFBVSxDQUFDLEtBQUs7UUFDdEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN0RCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUUxQix5QkFBeUI7UUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsK0JBQStCO1lBQy9CLDJCQUEyQjtTQUM1QjtRQUVELFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQixvRUFBb0U7UUFFcEUsNkNBQTZDO1FBRTdDLDRCQUE0QjtRQUU1Qix5Q0FBeUM7UUFFekMsa0RBQWtEO1FBRWxELDJDQUEyQztRQUMzQyxnQ0FBZ0M7UUFDaEMsTUFBTTtRQUVOLEVBQUU7UUFDRixNQUFNO1FBRU4sMEJBQTBCO1FBQzFCLHVDQUF1QztRQUV2QyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFqQ0QsNkJBaUNDO0lBRUQsU0FBUyxRQUFRLENBQUMsR0FBRztRQUNuQix1Q0FBdUM7UUFDdkMsSUFBTSxHQUFHLEdBQUcsOEJBQThCLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztRQUN6QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyQixJQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUcsQ0FBQyxDQUFDLENBQUksSUFBSSxTQUFJLENBQUcsQ0FBQztnQkFDdEQsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtnQkFDbkMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxJQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFHLFFBQVUsQ0FBQyxDQUFDLENBQUksSUFBSSxTQUFJLFFBQVUsQ0FBQztnQkFDcEUsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQyJ9