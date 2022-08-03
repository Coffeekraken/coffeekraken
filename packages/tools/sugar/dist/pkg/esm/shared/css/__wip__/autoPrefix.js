// @ts-nocheck
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
export default function autoPrefix(style) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFTZDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FBQyxLQUFLO0lBQ3BDLElBQUksUUFBUSxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEQsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFFMUIseUJBQXlCO0lBQ3pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLCtCQUErQjtRQUMvQiwyQkFBMkI7S0FDOUI7SUFFRCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEIsb0VBQW9FO0lBRXBFLDZDQUE2QztJQUU3Qyw0QkFBNEI7SUFFNUIseUNBQXlDO0lBRXpDLGtEQUFrRDtJQUVsRCwyQ0FBMkM7SUFDM0MsZ0NBQWdDO0lBQ2hDLE1BQU07SUFFTixFQUFFO0lBQ0YsTUFBTTtJQUVOLDBCQUEwQjtJQUMxQix1Q0FBdUM7SUFFdkMsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsR0FBRztJQUNqQix1Q0FBdUM7SUFDdkMsTUFBTSxHQUFHLEdBQUcsOEJBQThCLENBQUM7SUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFHLEVBQUU7SUFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdEQsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7S0FDTjtTQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDckMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sT0FBTyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0tBQ047U0FBTTtRQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNoRDtBQUNMLENBQUMifQ==