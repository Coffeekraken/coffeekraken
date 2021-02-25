// @ts-nocheck
import __isBase64 from '../is/base64';
import __base64 from '../crypt/base64';
import __deepMerge from '../object/deepMerge';
import __get from '../object/get';
import __set from '../object/set';
import __isJson from '../is/json';
/**
 * @name                          config
 * @namespace           js.core
 * @namespace                     Function
 *
 * Access the configuration setted using the "config(path, value)" function
 *
 * @param               {String}                  path                        The dotted config path to get like "log.mail"
 * @param               {Mixed}                   [value=null]                The value to set. Will return the setted value if passed
 * @return              {Mixed}                                               Return the config value wanted
 *
 * @example           js
 * import config from '@coffeekraken/sugar/js/core/js';
 * config('log.mail.host'); // => gmail.google.com
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
let __sugarConfig = window.sConfig || localStorage.getItem('sConfig') || {};
// if (typeof __sugarConfig === 'string' && __isBase64(__sugarConfig)) __sugarConfig = __base64.decrypt(__sugarConfig);
// if (typeof __sugarConfig === 'string' && __isJson(__sugarConfig)) __sugarConfig = JSON.parse(__sugarConfig);
export default (path, value = null) => {
    // process the path
    if (path === '.' || path === '' || !path) {
        path = '';
    }
    if (__isBase64(value)) {
        value = __base64.decrypt(value);
    }
    if (__isJson(value)) {
        value = JSON.parse(value);
    }
    if (typeof value === 'object' && (path === '.' || path === '' || !path)) {
        __sugarConfig = __deepMerge(__sugarConfig, value);
        return __sugarConfig;
    }
    let newValue;
    // check if is a set or get process
    if (value) {
        newValue = __set(__sugarConfig, path, value);
    }
    else {
        // get the wanted path
        newValue = __get(__sugarConfig, path);
    }
    // preparing the value to set in the storage
    let configToSave = __sugarConfig;
    if (typeof configToSave !== 'string')
        configToSave = JSON.stringify(configToSave);
    const encryptedConfig = __base64.encrypt(configToSave);
    // save the new settings
    window.sConfig = encryptedConfig;
    localStorage.setItem('sConfig', encryptedConfig);
    // return the new settings value
    return newValue;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFFOUMsT0FBTyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxNQUFNLGVBQWUsQ0FBQztBQUNsQyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVFLHVIQUF1SDtBQUN2SCwrR0FBK0c7QUFDL0csZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEVBQUU7SUFDcEMsbUJBQW1CO0lBQ25CLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ3hDLElBQUksR0FBRyxFQUFFLENBQUM7S0FDWDtJQUVELElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7SUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZFLGFBQWEsR0FBRyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELE9BQU8sYUFBYSxDQUFDO0tBQ3RCO0lBRUQsSUFBSSxRQUFRLENBQUM7SUFFYixtQ0FBbUM7SUFDbkMsSUFBSSxLQUFLLEVBQUU7UUFDVCxRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDOUM7U0FBTTtRQUNMLHNCQUFzQjtRQUN0QixRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN2QztJQUVELDRDQUE0QztJQUM1QyxJQUFJLFlBQVksR0FBRyxhQUFhLENBQUM7SUFDakMsSUFBSSxPQUFPLFlBQVksS0FBSyxRQUFRO1FBQ2xDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlDLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFdkQsd0JBQXdCO0lBQ3hCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO0lBQ2pDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRWpELGdDQUFnQztJQUNoQyxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUMifQ==