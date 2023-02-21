// @ts-nocheck

import { __observeAttributes } from '@coffeekraken/sugar/dom';
import __autoCast from '../../../shared/string/autoCast';

/**
 * @name      whenAttribute
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
 *
 * @feature       Detect attribute changes
 * @feature       Possibility to pass a check function to check if the attribute suits your needs
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
 * @param 		{String} 					attribute 			The attribute to monitor
 * @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
 * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenAttribute } from '@coffeekraken/sugar/dom'
 * __whenAttribute(myCoolHTMLElement, 'value').then((value) => {
 * 		// the value attribute exist on the element
 * });
 * // with a checkFn
 * __whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
 * 		// make sure the value is a number
 * 		return typeof(newVal) === 'number';
 * }).then((value) => {
 * 		// do something with your number value...
 * });
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenAttribute(elm, attrName, checkFn = null) {
    return new Promise(async (resolve, reject) => {
        if (elm.hasAttribute(attrName)) {
            const value = __autoCast(elm.getAttribute(attrName));
            if (checkFn && checkFn(value, value)) {
                resolve(value);
                return;
            } else if (!checkFn) {
                resolve(value);
                return;
            }
        }

        const obs = __observeAttributes(elm);

        obs.on('attribute', (mutation) => {
            if (mutation.attributeName === attrName) {
                const value = __autoCast(
                    mutation.target.getAttribute(mutation.attributeName),
                );
                if (checkFn && checkFn(value, mutation.oldValue)) {
                    resolve(value);
                    obs.cancel();
                } else if (!checkFn) {
                    resolve(value);
                    obs.cancel();
                }
            }
        });
    });
}
