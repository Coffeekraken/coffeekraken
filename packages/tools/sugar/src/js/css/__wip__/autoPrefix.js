// @ts-nocheck
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
    //     // .sel { ${value} } `));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1ByZWZpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9QcmVmaXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQVNkOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLEtBQUs7SUFDdEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN0RCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUUxQix5QkFBeUI7SUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDN0IsK0JBQStCO1FBQy9CLDJCQUEyQjtLQUM1QjtJQUVELFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoQixvRUFBb0U7SUFFcEUsNkNBQTZDO0lBRTdDLDRCQUE0QjtJQUU1Qix5Q0FBeUM7SUFFekMsa0RBQWtEO0lBRWxELDJDQUEyQztJQUMzQyxnQ0FBZ0M7SUFDaEMsTUFBTTtJQUVOLEVBQUU7SUFDRixNQUFNO0lBRU4sMEJBQTBCO0lBQzFCLHVDQUF1QztJQUV2QyxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxHQUFHO0lBQ25CLHVDQUF1QztJQUN2QyxNQUFNLEdBQUcsR0FBRyw4QkFBOEIsQ0FBQztJQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUN6QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN0RCxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksUUFBUSxFQUFFLENBQUM7WUFDcEUsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzlDO0FBQ0gsQ0FBQyJ9