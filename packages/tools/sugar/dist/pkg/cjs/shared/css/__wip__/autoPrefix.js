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
 * @param         {String}            style             The style you want to prefix in string format
 * @param         {String}            [return=null]     You can tell what you want back between "string" and "object". By default it will return the same style type that you have passed
 * @return        {String}                              The prefixed style
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    //     // .sel { ${value} } `));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQVNkOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxLQUFLO0lBQ3BDLElBQUksUUFBUSxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEQsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFFMUIseUJBQXlCO0lBQ3pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLCtCQUErQjtRQUMvQiwyQkFBMkI7S0FDOUI7SUFFRCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEIsb0VBQW9FO0lBRXBFLDZDQUE2QztJQUU3Qyw0QkFBNEI7SUFFNUIseUNBQXlDO0lBRXpDLGtEQUFrRDtJQUVsRCwyQ0FBMkM7SUFDM0MsZ0NBQWdDO0lBQ2hDLE1BQU07SUFFTixFQUFFO0lBQ0YsTUFBTTtJQUVOLDBCQUEwQjtJQUMxQix1Q0FBdUM7SUFFdkMsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBakNELDZCQWlDQztBQUVELFNBQVMsUUFBUSxDQUFDLEdBQUc7SUFDakIsdUNBQXVDO0lBQ3ZDLE1BQU0sR0FBRyxHQUFHLDhCQUE4QixDQUFDO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksR0FBRyxFQUFFO0lBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0tBQ047U0FBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNwRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztLQUNOO1NBQU07UUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDaEQ7QUFDTCxDQUFDIn0=