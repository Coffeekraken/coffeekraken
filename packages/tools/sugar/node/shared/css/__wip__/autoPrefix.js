"use strict";
// @ts-nocheck
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
    let styleObj = typeof style === 'object' ? style : {};
    let prefixedStyleObj = {};
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
    const reg = /(\/\*\@-.*?)(?=\/\*\@-|\z)/gm;
    console.log(reg.exec(css));
}
function deepMap(object, handler, path = '') {
    if (Array.isArray(object)) {
        object.forEach((item, i) => {
            const newPath = path === '' ? `${i}` : `${path}.${i}`;
            deepMap(item, handler, newPath);
        });
    }
    else if (typeof object === 'object') {
        Object.keys(object).forEach((itemName) => {
            const itemValue = object[itemName];
            const newPath = path === '' ? `${itemName}` : `${path}.${itemName}`;
            deepMap(itemValue, handler, newPath);
        });
    }
    else {
        handler(object, path.split('.').pop(), path);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1ByZWZpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvY3NzL19fd2lwX18vYXV0b1ByZWZpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFTZDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxTQUF3QixVQUFVLENBQUMsS0FBSztJQUN0QyxJQUFJLFFBQVEsR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RELElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBRTFCLHlCQUF5QjtJQUN6QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QiwrQkFBK0I7UUFDL0IsMkJBQTJCO0tBQzVCO0lBRUQsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhCLG9FQUFvRTtJQUVwRSw2Q0FBNkM7SUFFN0MsNEJBQTRCO0lBRTVCLHlDQUF5QztJQUV6QyxrREFBa0Q7SUFFbEQsMkNBQTJDO0lBQzNDLGdDQUFnQztJQUNoQyxNQUFNO0lBRU4sRUFBRTtJQUNGLE1BQU07SUFFTiwwQkFBMEI7SUFDMUIsdUNBQXVDO0lBRXZDLE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQWpDRCw2QkFpQ0M7QUFFRCxTQUFTLFFBQVEsQ0FBQyxHQUFHO0lBQ25CLHVDQUF1QztJQUN2QyxNQUFNLEdBQUcsR0FBRyw4QkFBOEIsQ0FBQztJQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUN6QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN0RCxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksUUFBUSxFQUFFLENBQUM7WUFDcEUsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzlDO0FBQ0gsQ0FBQyJ9